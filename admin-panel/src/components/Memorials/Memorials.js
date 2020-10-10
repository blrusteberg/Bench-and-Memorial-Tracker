import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, notification, Result } from "antd";

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingMemorial, setDeletingMemorial] = useState(null);

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

  const onDeleteClick = (memorial) => setDeletingMemorial(memorial);

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
      <MemorialsTable memorials={memorials} onDeleteClick={onDeleteClick} />
    </>
  );
};

export default Memorials;
