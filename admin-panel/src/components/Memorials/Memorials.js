import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Result, notification } from "antd";

import styles from "./Memorials.module.css";
import DeleteMemorialModal from "./Components/DeleteMemorialModal";
import MemorialsTable from "./MemorialsTable/MemorialsTable";

const Memorials = () => {
  const [memorials, setMemorials] = useState([
    {
      Id: "",
      Name: "",
      Type: {
        Id: "",
        Name: "",
        Attributes: [
          { Id: "", Name: "", ValueType: "", Required: false, Value: null },
        ],
      },
    },
  ]);
  const [error, setError] = useState();
  const [savingError, setSavingError] = useState();
  const [loading, setLoading] = useState(true);
  const [deletingMemorial, setDeletingMemorial] = useState();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/memorials/types/attributes/values`
      )
      .then((res) => {
        setMemorials(res.data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const saveMemorial = (row, key, onSuccess, onFail) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/memorials/${key}`, {
        Name: row.Name,
      })
      .then(() => {
        saveLocalMemorial(row, key);
        onSuccess();
      })
      .catch((error) => {
        setSavingError(error);
        openNotification("Unable to save memorial.", error.message, "error");
        onFail();
      });
  };

  const deleteLocalMemorial = (key) => {
    const tempMemorials = [...memorials];
    let deleteIndex = -1;
    for (let i = 0; i < tempMemorials.length; i++) {
      if (tempMemorials[i].Id === key) {
        deleteIndex = i;
        break;
      }
    }
    if (deleteIndex === -1) {
      return;
    }
    tempMemorials.splice(deleteIndex, 1);
    setMemorials(tempMemorials);
    setDeletingMemorial(null);
  };

  const saveLocalMemorial = (row, key) => {
    const newMemorials = [...memorials];
    const index = newMemorials.findIndex((memorial) => key === memorial.key);
    if (index > -1) {
      const item = newMemorials[index];
      newMemorials.splice(index, 1, { ...item, ...row });
    } else {
    }
    setMemorials(newMemorials);
  };

  const onDeleteClick = (memorial) => setDeletingMemorial(memorial);

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

  return error ? (
    <Result status="500" subTitle="Sorry, something went wrong." />
  ) : loading ? (
    <Spin tip="Loading Memorials..." />
  ) : (
    <>
      {deletingMemorial ? (
        <DeleteMemorialModal
          memorial={deletingMemorial}
          deleteSuccess={() => deleteLocalMemorial(deletingMemorial.key)}
          onCancelClick={() => setDeletingMemorial(null)}
        />
      ) : null}
      <MemorialsTable
        memorials={memorials}
        onDeleteClick={onDeleteClick}
        saveMemorial={saveMemorial}
      />
    </>
  );
};

export default Memorials;
