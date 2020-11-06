import React, { useState, useEffect } from "react";
import cx from "classnames";
import axios from "axios";

import styles from "./TaggerForm.module.css";
import AttributeForm from "./AttributeForm/AttributeForm";
import TypeSelect from "../../common/TypeSelect/TypeSelect";
import API from "../../services/API/API";
import BlobService from "../../services/BlobService";

import { Input, Button, Select, Form, notification } from "antd";
import moment from "moment";

const { Option } = Select;

const TaggerForm = () => {
  const [Types, setTypes] = useState();
  const [Memorial, setMemorial] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [form] = Form.useForm();
  const [changesMade, setChangesMade] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const [dateCreated, setDateCreated] = useState();
  const [selectedType, setSelectedType] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [areCoordsValid, setAreCoordsValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [fillCoordsClicked, setFillCoordsClicked] = useState(false);

  useEffect(() => {
    new API().Types.get(["attributes"])
      .then((res) => {
        console.log(res.data);
        setTypes(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        setError(error);
      });
  }, []);

  const onSaveMemorialClick = async () => {
    const data = await form.validateFields();
    console.log(data);
    setIsSaving(true);
    saveMemorial(
      { memorial: formatFormDataForPost(data), action: "post" },
      () => {
        setIsSaving(false);
        resetModalForm();
      }
    );
  };

  const saveMemorial = (data, onSuccess = () => {}, onFail = () => {}) => {
    const imageFile = data.memorial.Image;
    delete data.memorial.Image;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/memorials/values`,
        data.memorial
      )
      .then(async (res) => {
        const memorialId = res.data;
        const blobName = await new BlobService().uploadMemorialImage(
          memorialId,
          imageFile
        );
        axios
          .put(
            `${process.env.REACT_APP_API_BASE_URL}/memorials/${memorialId}`,
            { Image: blobName }
          )
          .then((res) => {
            onSuccess();
            saveLocalMemorial(data.memorial);
          });
      })
      .catch((error) => {
        openNotification("Unable to save memorial.", error.message, "error");
        onFail();
      });
  };
  const saveLocalMemorial = () => {
    window.location.reload();
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

  const formatFormDataForPost = (data) => {
    const formattedMemorial = {
      Name: data.Name,
      TypeId: data.Type.Id,
      Image: data.Image,
      Attributes: [],
    };

    Object.keys(data.Type.Attributes).forEach((key) => {
      formattedMemorial.Attributes.push({
        Value: data.Type.Attributes[key],
        Id: key,
      });
    });
    console.log(formattedMemorial);
    return formattedMemorial;
  };

  const onTypeSelect = (typeId) => {
    for (let i = 0; i < Types.length; i++)
      if (Types[i].Id === typeId) {
        form.setFieldsValue({
          Type: {
            Id: typeId,
          },
        });
        console.log(Types[i]);
        setSelectedType(Types[i]);
      }
  };

  const getInitialValues = () => {
    if (Memorial) {
      const initialValues = {
        ["Name"]: Memorial.Name,
        ["Image"]: Memorial.Image,
        ["Type"]: {
          ["Id"]: Memorial.Type.Id,
          ["Attributes"]: {},
        },
      };
      Memorial.Type.Attributes.forEach((attribute) => {
        initialValues["Type"]["Attributes"][attribute.Value.Id] =
          attribute.Value.Value;
      });
      return initialValues;
    }
    return null;
  };

  const resetModalForm = () => {
    form.resetFields();
    setSelectedType(null);
    setChangesMade(false);
    setSelectedImage(null);
    setIsSaving(false);
  };

  const onFillCoordinatesClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (pos) {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        Memorial.Attributes.forEach((attribute) => {
          if (attribute.Name.toLowerCase() === "latitude") {
            attribute.Value = latitude;
          }
          if (attribute.Name.toLowerCase() === "longitude") {
            attribute.Value = longitude;
          }
          setLatitude(latitude);
          setLongitude(longitude);
          setAreCoordsValid(true);
        });
      }
    });
  };

  const imageButtonHandler = (event) => {
    selectedFile(event.target.value[0]);
  };

  const fileUploadHandler = () => {};

  return isLoading ? (
    <div className={styles.loadingTitle}>Loading...</div>
  ) : (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        className={styles.formWrapper}
        onValuesChange={() => setChangesMade(true)}
        initialValues={getInitialValues()}
      >
        <div className={styles.dropDownWrapper}>
          <Form.Item
            name={["Type", "Id"]}
            label="Memorial Type"
            style={{ fontWeight: "bold" }}
            rules={[{ message: "Select a type" }]}
          >
            <TypeSelect
              Types={Types}
              onTypeSelect={onTypeSelect}
              disabled={Memorial}
            />
          </Form.Item>
        </div>
        {!selectedType ? (
          ""
        ) : (
          <div className={styles.formWrapper}>
            <Form.Item label="Memorial Name" name="Name">
              <Input
                className={styles.memorialNameInput}
                label="Memorial Name"
                maxLength={50}
                style={{ width: 200 }}
                size="large"
              />
            </Form.Item>
            <div className={styles.attributesWrapper}>
              <AttributeForm
                key={selectedType.Id}
                Attributes={selectedType.Attributes}
                latitude={latitude}
                longitude={longitude}
                areCoordsValid={areCoordsValid}
              />
            </div>
            {areCoordsValid ? null : (
              <div
                className={
                  areCoordsValid ? styles.noCoordsError : styles.coordsError
                }
              >
                Coordinates can't be empty.
              </div>
            )}

            <div className={styles.fillCoordinatesButtonWrapper}>
              <Button
                type="primary"
                className={styles.fillCoordinatesButton}
                onClick={onFillCoordinatesClick}
              >
                Fill Coordinates
              </Button>
            </div>
            <div className={styles.uploadButtonWrapper}>
              <input style={{ display: "none" }} type="file" />
              <Button
                type="primary"
                onClick={fileUploadHandler}
                className={styles.uploadButton}
              >
                Upload/Capture Image
              </Button>
            </div>

            <div className={styles.saveButtonWrapper}>
              <Button
                type="primary"
                style={{ background: "green", border: "green" }}
                className={cx(styles.saveMemorialButton, {
                  [styles.disabledButton]: isSaving,
                })}
                onClick={onSaveMemorialClick}
              >
                {isSaving ? <div>Saving... </div> : <div>Save Memorial</div>}
              </Button>
            </div>
            <div className={styles.alert}></div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default TaggerForm;
