import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spin,
  Result,
  notification,
  Button,
  Space,
  Radio,
  Divider,
} from "antd";

import styles from "./Memorials.module.css";
import DeleteMemorialModal from "./Modals/DeleteMemorialModal/DeleteMemorialModal";
import MemorialsTable from "./MemorialsTable/MemorialsTable";
import MemorialModal from "./Modals/MemorialModal/MemorialModal";
import BlobService from "../../services/BlobService";

const Memorials = () => {
  const [memorials, setMemorials] = useState([]);
  const [unapprovedMemorials, setUnapprovedMemorials] = useState([]);
  const [tableView, setTableView] = useState("approved");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [deletingMemorial, setDeletingMemorial] = useState();
  const [memorialModalVisible, setMemorialModalVisible] = useState(false);

  const blobService = new BlobService();

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

  const saveMemorial = async (data) => {
    if (data.image) {
      const blobName = await blobService.uploadMemorialImage(
        data.image,
        data.Memorial.Image
      );
      data.Memorial.Image = blobName;
    }
    if (data.action === "put") {
      return axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/memorials/${data.Memorial.Id}`,
          {
            Image: data.Memorial.Image,
            Name: data.Memorial.Name,
            Status: data.Memorial.Status,
            Attributes: data.Memorial.Type.Attributes,
          }
        )
        .then(() => {
          saveLocalMemorial(data.memorial);
        })
        .catch((error) => {
          openNotification("Unable to save memorial.", error.message, "error");
        });
    } else if (data.action === "post") {
      return axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/memorials/values`,
          data.Memorial
        )
        .then((res) => {
          saveLocalMemorial();
        })
        .catch((error) => {
          openNotification("Unable to save memorial.", error.message, "error");
        });
    } else {
      throw new Error("Action not valid");
    }
  };

  const deleteLocalMemorial = (key) => {
    const tempMemorials =
      tableView === "approved" ? [...memorials] : [...unapprovedMemorials];
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
    tableView === "approved"
      ? setMemorials(tempMemorials)
      : setUnapprovedMemorials(tempMemorials);
    setDeletingMemorial(null);
  };

  const saveLocalMemorial = (memorial) => {
    window.location.reload();
  };

  const onDeleteClick = (memorial) => {
    setDeletingMemorial(memorial);
  };

  const updateMemorialStatus = (memorial, status) => {
    if (status === "live") {
      const validation = validateMemorialAttributes(memorial);
      if (!validation.valid) {
        openNotification("Memorial is not valid", validation.message, "error");
        return;
      }
    }
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/memorials/${memorial.Id}`, {
        Status: status,
      })
      .then(() => window.location.reload());
  };

  const validateMemorialAttributes = (memorial) => {
    let validation = { valid: true, message: "Memorial is valid" };
    memorial.Type.Attributes.forEach((attribute) => {
      if (!attribute.Value && attribute.Required) {
        validation = {
          valid: false,
          message:
            "All required attributes need values before the memorial can be approved",
        };
      }
    });
    return validation;
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
      <MemorialModal
        onCancel={() => setMemorialModalVisible(false)}
        visible={memorialModalVisible}
        saveMemorial={saveMemorial}
      />

      {deletingMemorial ? (
        <DeleteMemorialModal
          memorial={deletingMemorial}
          deleteSuccess={() => deleteLocalMemorial(deletingMemorial.key)}
          onCancelClick={() => setDeletingMemorial(null)}
        />
      ) : null}
      <Space align="center" className={styles.memorialActions}>
        <Button type="primary" onClick={() => setMemorialModalVisible(true)}>
          Add Memorial
        </Button>
        <Divider>
          <Radio.Group
            onChange={(e) => setTableView(e.target.value)}
            value={tableView}
            optionType="button"
            buttonStyle="solid"
            className={styles.tableViewRadio}
          >
            <Radio.Button value="approved">Approved</Radio.Button>
            <Radio.Button value="unapproved">Unapproved</Radio.Button>
          </Radio.Group>
        </Divider>
      </Space>

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
