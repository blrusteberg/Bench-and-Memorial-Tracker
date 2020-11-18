import React, { useState } from "react";
import { Table, Space, Badge } from "antd";

import styles from "./MemorialsTable.module.css";
import AttributesTable from "./AttributesTable/AttributesTable";
import MemorialModal from "../Modals/MemorialModal/MemorialModal";
import { getDeleteAccess } from "../../../utils/utils";

const MemorialsTable = ({
  memorials,
  onUpdateMemorialStatusClick,
  onDeleteClick,
  saveMemorial,
}) => {
  const [editingMemorial, setEditingMemorial] = useState();

  const hasDeleteAccess = getDeleteAccess();

  const getChangeStatusAction = (record) => {
    switch (record.Status) {
      case "live":
        return (
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => onUpdateMemorialStatusClick(record, "on hold")}
          >
            Put on hold
          </button>
        );
      case "unapproved":
        return (
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => onUpdateMemorialStatusClick(record, "live")}
          >
            Approve
          </button>
        );
      case "on hold":
        return (
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => onUpdateMemorialStatusClick(record, "live")}
          >
            Go live
          </button>
        );
      default:
        return null;
    }
  };

  const onEditClick = (record) => {
    console.log("onEditClick", record);
    setEditingMemorial(record);
  };

  const formatMemorialsForTable = () =>
    memorials.map((memorial) => {
      memorial.key = memorial.Id;
      return memorial;
    });

  const memorialStatusToBadgeColor = new Map([
    ["unapproved", "yellow"],
    ["live", "green"],
    ["on hold", "red"],
  ]);

  const memorialStatusToBadgeText = new Map([
    ["unapproved", "Unapproved"],
    ["live", "Live"],
    ["on hold", "On hold"],
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      inputType: "Words",
      textWrap: "word-break",
      width: "35%",
    },
    {
      title: "Type",
      dataIndex: ["Type", "Name"],
      key: "type",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const memorialStatus = record.Status;
        return (
          <Badge
            color={memorialStatusToBadgeColor.get(memorialStatus)}
            text={memorialStatusToBadgeText.get(memorialStatus)}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (_, record) => (
        <Space size="large" align="center">
          {getChangeStatusAction(record)}
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => onEditClick(record)}
          >
            Edit
          </button>
          {hasDeleteAccess && (
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => onDeleteClick(record)}
            >
              Delete
            </button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <MemorialModal
        visible={editingMemorial != null}
        memorial={editingMemorial}
        onCancel={() => setEditingMemorial()}
        saveMemorial={saveMemorial}
      />
      <Table
        className={styles.Memorials}
        columns={columns}
        dataSource={formatMemorialsForTable()}
        expandedRowRender={(memorial) => {
          return <AttributesTable Attributes={memorial.Type.Attributes} />;
        }}
        bordered
        tableLayout="fixed"
      />
    </>
  );
};

export default MemorialsTable;
