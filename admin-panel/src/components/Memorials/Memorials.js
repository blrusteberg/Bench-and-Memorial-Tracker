import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Result, notification, Radio } from "antd";

import styles from "./Memorials.module.css";
import DeleteMemorialModal from "./Components/DeleteMemorialModal";
import MemorialsTable from "./MemorialsTable/MemorialsTable";

const Memorials = () => {
  const [memorials, setMemorials] = useState([
    {
      Id: "",
      Name: "",
      Statue: "",
      Type: {
        Id: "",
        Name: "",
        Attributes: [
          { Id: "", Name: "", ValueType: "", Required: false, Value: null },
        ],
      },
    },
  ]);
  const [unapprovedMemorials, setUnapprovedMemorials] = useState();
  const [tableView, setTableView] = useState("approved");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [deletingMemorial, setDeletingMemorial] = useState();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/memorials/types/attributes/values`
      )
      .then((res) => {
        const approvedMemorials = [];
        const unapprovedMemorials = [];
        const approvedStatuses = ["live", "approved", "on hold"];
        res.data.forEach((memorial) =>
          approvedStatuses.includes(memorial.Status)
            ? approvedMemorials.push(memorial)
            : unapprovedMemorials.push(memorial)
        );
        setMemorials(approvedMemorials);
        setUnapprovedMemorials(unapprovedMemorials);
        setTableView(
          unapprovedMemorials.length === 0 ? "approved" : "unapproved"
        );
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

  const updateMemorialStatus = (memorial, status) => {
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/memorials/${memorial.Id}`, {
        Status: status,
      })
      .then(() => window.location.reload());
  };

  const openNotification = (
    message,
    description,
    type = null,
    onClick = () => {},
    onClose = () => {}
  ) =>
    notification.open({
      message: message,
      description: description,
      type: type,
      onClick: () => onClick(),
      onClose: () => onClose(),
    });

  return error ? (
    <Result status="500" subTitle="Sorry, something went wrong." />
  ) : loading ? (
    <Spin tip="Loading Memorials..." />
  ) : (
    <div className={styles.Memorials}>
      {deletingMemorial ? (
        <DeleteMemorialModal
          memorial={deletingMemorial}
          deleteSuccess={() => deleteLocalMemorial(deletingMemorial.key)}
          onCancelClick={() => setDeletingMemorial(null)}
        />
      ) : null}
      <Radio.Group
        options={[
          { label: "Approved", value: "approved" },
          { label: "Unapproved", value: "unapproved" },
        ]}
        onChange={(e) => setTableView(e.target.value)}
        value={tableView}
        optionType="button"
        buttonStyle="solid"
        className={styles.tableViewRadio}
      />
      <MemorialsTable
        tableView={tableView}
        memorials={tableView === "approved" ? memorials : unapprovedMemorials}
        onUpdateMemorialStatusClick={updateMemorialStatus}
        onDeleteClick={onDeleteClick}
        saveMemorial={saveMemorial}
      />
    </div>
  );
};

export default Memorials;
