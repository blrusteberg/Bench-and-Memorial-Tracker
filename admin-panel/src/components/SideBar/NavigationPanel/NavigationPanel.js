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
        {hasRole(props.roles, ["Admin"]) && (
          <Menu.Item
            className={styles.MenuItem}
            key="accounts"
            icon={<TeamOutlined className={styles.menuItemIcon} />}
          >
            <Link to="/accounts" className={styles.nav}>
              Accounts
            </Link>
          </Menu.Item>
        )}
        {hasRole(props.roles, ["Clerk"]) && [
          <Menu.Item
            className={styles.MenuItem}
            key="memorials"
            icon={<BankOutlined />}
          >
            <Link to="memorials" className={styles.nav}>
              Memorials
            </Link>
          </Menu.Item>,
          <Menu.Item
            className={styles.MenuItem}
            key="types"
            icon={<TagsOutlined className={styles.menuItemIcon} />}
          >
            <Link to="types" className={styles.nav}>
              Types
            </Link>
          </Menu.Item>,
          <Menu.Item
            className={styles.MenuItem}
            key="attributes"
            icon={<AppstoreAddOutlined className={styles.menuItemIcon} />}
          >
            <Link to="attributes" className={styles.nav}>
              Attributes
            </Link>
          </Menu.Item>,
        ]}
        <Menu.Item
          className={styles.MenuItem}
          key="taggerForm"
          icon={<SolutionOutlined className={styles.menuItemIcon} />}
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
