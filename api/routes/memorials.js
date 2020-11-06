const express = require("express");
const router = express.Router();
const Error = require("../error/error");

const Memorial = require("../models/Memorial");
const Value = require("../models/Value");

router.get("/", async (req, res) => {
  try {
    const memorials = await Memorial.query();
    res.status(200).json(memorials);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/types/attributes/values", async (req, res) => {
  try {
    const latLngFirst = req.query.latLngFirst
      ? JSON.parse(req.query.latLngFirst)
      : true;

    const memorials = await Memorial.query()
      .withGraphFetched("[Type(orderByName).[Attributes(orderByName).Values]]")
      .modifiers({
        orderByName: (queryBuilder) => {
          queryBuilder.orderBy("Name");
        },
      })
      .modify((queryBuilder) => {
        if (req.query.statusFilters) {
          queryBuilder.whereIn(
            "Memorials.Status",
            JSON.parse(req.query.statusFilters)
          );
        }
      });
    const formattedMemorials = [];
    for (let i = 0; i < memorials.length; i++) {
      const memorial = memorials[i];
      // The query above returns attributes with multiple values since there is a one-to-many relationship between
      //    attributes and values. However, there is only one value in that array that belongs to the memorial. This
      //    would be tons better if we actually knew how to implement that in the objection query, but this is the current
      //    brute force implementation.
      const attributesWithOneValue = memorial.Type.Attributes.map(
        (attribute) => {
          if (!attribute.Values || !attribute.Values.length) {
            delete attribute.Values;
            return attribute;
          }
          const value = attribute.Values.filter((value) => {
            return value.MemorialId === memorial.Id;
          })[0];
          value.Value = JSON.parse(value.Value);
          attribute.Value = value;
          delete attribute.Values;
          return attribute;
        }
      );
      memorial.Type.Attributes = attributesWithOneValue;
      if (!latLngFirst) {
        formattedMemorials.push(memorial);
        continue;
      }

      // Loop back to front because if latLngFirst is true, then we need to put them at the front
      //    of the array. Since attributes will be sorted by name, we will need unshift() Longitude first
      //    and then unshift Latitude. Going front to back will result in Longitude first.
      const sortedAttributes = [];
      for (let i = attributesWithOneValue.length - 1; i > -1; i--) {
        const attribute = attributesWithOneValue[i];
        const attributeName = attribute.Name.toLowerCase();
        attributeName === "latitude" || attributeName === "longitude"
          ? sortedAttributes.unshift(attribute)
          : sortedAttributes.push(attribute);
      }
      memorial.Type.Attributes = sortedAttributes;
      formattedMemorials.push(memorial);
    }
    res.status(200).json(formattedMemorials);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.get("/:id/types", async (req, res) => {
  try {
    const memorialType = await Memorial.relatedQuery("Type").for(req.params.id);
    res.status(200).json(memorialType);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      TypeId: req.body.TypeId,
    });
    res.status(201).json(memorial);
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.post("/values", async (req, res) => {
  try {
    const memorial = await Memorial.query().insert({
      Name: req.body.Name,
      TypeId: req.body.TypeId,
      Image: req.body.Image,
    });
    const insertValuePromises = [];
    req.body.Attributes.forEach((attribute) => {
      if (attribute.ValueType === "Yes/No") {
        attribute.Value = attribute.Value === "true";
      }
      attribute.Value = JSON.stringify(attribute.Value);
      const insertValuePromise = Value.query().insert({
        Value: attribute.Value,
        AttributeId: attribute.Id,
        MemorialId: memorial.Id,
      });
      insertValuePromises.push(insertValuePromise);
    });
    Promise.all(insertValuePromises).then((data) => {
      res.status(201).json(memorial.Id);
    });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const numMemorialsUpdated = await Memorial.query()
      .findById(req.params.id)
      .patch({
        Name: req.body.Name,
        Image: req.body.Image,
        Status: req.body.Status,
      });
    if (req.body.Attributes) {
      const valuePromises = [];
      req.body.Attributes.forEach((attribute) => {
        const newValue = {
          ...attribute.Value,
          Value: JSON.stringify(attribute.Value.Value),
        };
        valuePromises.push(
          Value.query().findById(attribute.Value.Id).patch(newValue)
        );
      });
      await Promise.all(valuePromises);
    }
    res
      .status(204)
      .json({ message: `Updated ${numMemorialsUpdated} memorial` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Value.query().delete().where("MemorialId", req.params.id);
    const numDeleted = await Memorial.query().deleteById(req.params.id);
    res.status(200).json({ message: `${numDeleted} memorial deleted.` });
  } catch (err) {
    Error.errorHandler(err, res);
  }
});

module.exports = router;
