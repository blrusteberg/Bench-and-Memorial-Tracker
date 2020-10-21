import React, { useEffect, useState } from 'react';
import { Button, Spin, Result } from 'antd';
import axios from "axios";
import styles from "./Accounts.module.css";
import "antd/dist/antd.css";

import DeleteAccountModal from "./Components/DeleteAccountModal";
import AddAccountModal from "./Components/AddAccountModal";
import AccountsTable from "./AccountsTable/AccountsTable";

const Accounts = () => {
  const[accounts, setAccounts] = useState([
      {
        Id: "",
        Username: "",
        Password: "",
        AccountType: "",
        DelAccess: ""
      }
    ],
  );

  const [loading, setLoading] = useState();
  const [deletingAccount, setDeletingAccount] = useState();
  const [error, setError] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/accounts`
      )
      .then((res) => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const deleteLocalAccounts = (key) => {
    const tempAccounts = [...accounts];
    let deleteIndex = -1;
    for (let i = 0; i < tempAccounts.length; i++) {
      if (tempAccounts[i].Id === key) {
        deleteIndex = i;
        break;
      }
    }
    if (deleteIndex === -1) {
      return;
    }
    tempAccounts.splice(deleteIndex, 1);
    setAccounts(tempAccounts);
    setDeletingAccount(null);
  };

  const saveLocalAttribute = (row, key) => {
    const newAccounts = [...accounts];
    const index = newAccounts.findIndex((account) => key === account.key);
    if (index > -1) {
      const item = newAccounts[index];
      newAccounts.splice(index, 1, { ...item, ...row });
    } else {
    }
    setAccounts(newAccounts);
  };

  const saveAccount = (account) => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/accounts`, account)
      .then((res) => {
        console.log(res.data);
        refreshPage();
      });
  };

  


  const onDeleteClick = (account) => setDeletingAccount(account);

  const onShowClick = (password) => {
    return (
      null
    )
  }

  const refreshPage = () => {
    window.location.reload(false);
  };

  const addAccountButtonClick = () => {
    setModalVisible(true);
  };

  return error ? (
    <Result status="500" subTitle="Sorry, something went wrong." />
  ) : loading ? (
    <Spin tip="Loading Accounts..." />
  ) : (
    <>
      {deletingAccount? (
        <DeleteAccountModal
          account={deletingAccount}
          deleteSuccess={() => deleteLocalAccounts(deletingAccount.key)}
          onCancelClick={() => setDeletingAccount(null)}
        />
      ) : null}
      <div className={styles.accountsContainer}>
        <Button
          className={styles.addAccountsButton}
          type="primary"
          onClick={addAccountButtonClick}
        >
          Add New Account
        </Button>
        <AddAccountModal
          accounts={accounts}
          addSuccess={refreshPage}
          modalVisible={modalVisible}
          saveAccount={saveAccount}
          onCancelClick={() => {
            setModalVisible(false);
          }}
        />
        <AccountsTable
          accounts={accounts}
          saveAccount={saveAccount}
          onDeleteClick={onDeleteClick}
          onShowClick={onShowClick}
        />
      </div>
    </>
  );
}
export default Accounts;