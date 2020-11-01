import React from "react";
import { Menu } from "antd";
import {
  TeamOutlined,
  BankOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./NavigationPanel.module.css";
import { hasRole } from "../../../services/auth";

const navigationPanel = (props) => {
  return (
    <div className={styles.navigationPanelWrapper}>
      <Menu
        mode="vertical"
        className={styles.NavigationPanel}
        onClick={props.handleNavigationClick}
      >
        {hasRole(props.roles, ["admin"]) && (
          <Menu.Item
            className={styles.MenuItem}
            key="accounts"
            icon={
              <TeamOutlined style={{ fontSize: "1.5rem" }} theme="outlined" />
            }
          >
            <Link to="/accounts" className={styles.nav}>
              Accounts
            </Link>
          </Menu.Item>
        )}
        {hasRole(props.roles, ["admin", "clerk"]) && [
          <Menu.Item
            className={styles.MenuItem}
            key="memorials"
            icon={
              <BankOutlined style={{ fontSize: "1.5rem" }} theme="outlined" />
            }
          >
            <Link to="memorials" className={styles.nav}>
              Memorials
            </Link>
          </Menu.Item>,
          <Menu.Item
            className={styles.MenuItem}
            key="types"
            icon={
              <TagsOutlined style={{ fontSize: "1.5rem" }} theme="outlined" />
            }
          >
            <Link to="types" className={styles.nav}>
              Types
            </Link>
          </Menu.Item>,
          <Menu.Item
            className={styles.MenuItem}
            key="attributes"
            icon={
              <AppstoreAddOutlined
                style={{ fontSize: "1.5rem" }}
                theme="outlined"
              />
            }
          >
            <Link to="attributes" className={styles.nav}>
              Attributes
            </Link>
          </Menu.Item>,
        ]}
        <Menu.Item
          className={styles.MenuItem}
          key="taggerForm"
          icon={
            <SolutionOutlined style={{ fontSize: "1.5rem" }} theme="outlined" />
          }
        >
          <Link to="tagger-form" className={styles.nav}>
            Tagger Form
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default navigationPanel;
