const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Error = require("../error/error");

const Account = require("../models/account.js");


router.get("/", async (req, res) => {
    try {
      const accounts = await Account.query();
      res.status(200).json(accounts);
    } catch (err) {
      Error.errorHandler(err, res);
    }
  });

router.post("/", async (req, res) => {
    try {
        const accounts = await Account.query().insert({
            username: req.body.username,
            password: req.body.password,
            accountType: req.body.accountType,
            delAccess: req.body.delAccess,
        });
        res.status(201).json(accounts);
    } catch (err) {
        Error.errorHandler(err, res);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await Account.query().findById(req.params.id);
        await Account.query().deleteById(req.params.id);
        res.status(202).json({ message: `${user.username} has been deleted`});
    } catch(err) {
        Error.errorHandler(err, res)
    }
})



  module.exports = router;