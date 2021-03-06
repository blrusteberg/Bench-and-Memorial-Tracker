import React, { useState, useEffect } from "react";
import axios from "axios";
import { notification, Button, Spin, Result } from "antd";

import styles from "./Attributes.module.css";
import AttributesTable from "./AttributesTable/AttributesTable";
import DeleteAttributeModal from "./Components/DeleteAttributeModal";
import AddAttributeModal from "./Components/AddAttributeModal";

const Attributes = () => {
  const [attributes, setAttributes] = useState([
    {
      Id: "",
      Name: "",
      ValueType: "",
    },
  ]);
  const [error, setError] = useState();
  const [setSavingError] = useState();
  const [loading, setLoading] = useState(true);
  const [deletingAttribute, setDeletingAttribute] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/attributes`)
      .then((res) => {
        setAttributes(res.data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const saveAttribute = (row, key, onSuccess, onFail) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/attributes/${key}`, {
        Name: row.Name,
      })
      .then(() => {
        saveLocalAttribute(row, key);
        onSuccess();
      })
      .catch((error) => {
        setSavingError(error);
        openNotification("Unable to save attribute.", error.message, "error");
        onFail();
      });
  };

  const deleteLocalAttribute = (key) => {
    const tempAttributes = [...attributes];
    let deleteIndex = -1;
    for (let i = 0; i < tempAttributes.length; i++) {
      if (tempAttributes[i].Id === key) {
        deleteIndex = i;
        break;
      }
    }
    if (deleteIndex === -1) {
      return;
    }
    tempAttributes.splice(deleteIndex, 1);
    setAttributes(tempAttributes);
    setDeletingAttribute(null);
  };

  const saveLocalAttribute = (row, key) => {
    const newAttributes = [...attributes];
    const index = newAttributes.findIndex((attribute) => key === attribute.key);
    if (index > -1) {
      const item = newAttributes[index];
      newAttributes.splice(index, 1, { ...item, ...row });
    } else {
    }
    setAttributes(newAttributes);
  };

  const addAttribute = (attribute) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/attributes`, attribute)
      .then((res) => {
        window.location.reload();
      });
  };

  const onDeleteClick = (attribute) => setDeletingAttribute(attribute);

  const addAttributeButtonClick = () => {
    setModalVisible(true);
  };

  const openNotification = (
    message,
    description,
    type = null,
    onClick = () => {},
    onClose = () => {}
  ) => {
    notification.open({
      message: message,
      description: description,
      type: type,
      onClick: () => onClick(),
      onClose: () => onClose(),
    });
  };

  const attributeNameValidator = (input, currentValue = "") => {
    if (
      input.toLowerCase() === "latitude" ||
      input.toLowerCase() === "longitude"
    ) {
      return {
        valid: false,
        message: "Attribute name cannot be latitude or longitude",
      };
    }

    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].Name === input && input !== currentValue) {
        return { valid: false, message: "Attribute name already taken" };
      }
    }

    return { valid: true, message: "" };
  };

  return error ? (
    <Result status="500" subTitle="Sorry, something went wrong." />
  ) : loading ? (
    <Spin tip="Loading Attributes..." />
  ) : (
    <>
      {deletingAttribute ? (
        <DeleteAttributeModal
          attribute={deletingAttribute}
          deleteSuccess={() => deleteLocalAttribute(deletingAttribute.key)}
          onCancelClick={() => setDeletingAttribute(null)}
        />
      ) : null}
      <div className={styles.attributesContainer}>
        <Button
          className={styles.addAttributesButton}
          type="primary"
          onClick={addAttributeButtonClick}
        >
          Add New Attribute
        </Button>
        <AddAttributeModal
          attributeNameValidator={attributeNameValidator}
          attributes={attributes}
          addAttribute={addAttribute}
          modalVisible={modalVisible}
          onCancelClick={() => {
            setModalVisible(false);
          }}
        />
        <AttributesTable
          attributeNameValidator={attributeNameValidator}
          attributes={attributes}
          saveAttribute={saveAttribute}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </>
  );
};

export default Attributes;
