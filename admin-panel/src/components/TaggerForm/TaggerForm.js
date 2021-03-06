import React, { useState, useEffect } from "react";
import cx from "classnames";
import axios from "axios";
import { Input, Button, Form, notification } from "antd";
import moment from "moment";

import styles from "./TaggerForm.module.css";
import "./TaggerForm.css";
import AttributeForm from "./AttributeForm/AttributeForm";
import TypeSelect from "../../common/TypeSelect/TypeSelect";
import BlobService from "../../services/BlobService";
import MemorialImageUpload from ".././Memorials/Modals/MemorialModal/MemorialImageUpload/MemorialImageUpload";
import { getCoordinateIds } from "../../utils/utils";

const TaggerForm = () => {
  const [Types, setTypes] = useState();
  const [Memorial, setMemorial] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [form] = Form.useForm();
  const [changesMade, setChangesMade] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [error, setError] = useState();

  const [selectedType, setSelectedType] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/types/attributes`)
      .then((res) => {
        setTypes(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const onSaveMemorialClick = async () => {
    const data = await form.validateFields();
    setIsSaving(true);
    saveMemorial({ memorial: formatFormDataForPost(data), action: "post" });
  };

  const saveMemorial = (data) => {
    const imageFile = data.memorial.Image?.file;
    delete data.memorial.Image;
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/memorials/values`,
        data.memorial
      )
      .then(async (res) => {
        const memorialId = res.data;
        const blobName = await new BlobService().uploadMemorialImage(imageFile);
        axios
          .put(
            `${process.env.REACT_APP_API_BASE_URL}/memorials/${memorialId}`,
            { Image: blobName }
          )
          .then((res) => {
            resetForm();
          });
      })
      .catch((error) => {
        openNotification("Unable to save memorial.", error.message, "error");
      });
  };

  const onImageSelect = (image) => {
    setSelectedImage(image);
    setChangesMade(true);
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
      DateRecorded: moment().format("MM/DD/YYYY"),
      Attributes: [],
    };

    Object.keys(data.Type.Attributes).forEach((key) => {
      if (moment.isMoment(data.Type.Attributes[key])) {
        data.Type.Attributes[key] = data.Type.Attributes[key].format(
          "MM/DD/YYYY"
        );
      }
      formattedMemorial.Attributes.push({
        Value: data.Type.Attributes[key],
        Id: key,
      });
    });

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
        setSelectedType(Types[i]);

        setLatitude("");
        setLongitude("");
      }
  };

  const resetForm = () => {
    form.resetFields();
    setSelectedType(null);
    setChangesMade(false);
    setSelectedImage(null);
    setIsSaving(false);
  };

  const onFillCoordinatesClick = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (pos) {
        const coordinateIds = getCoordinateIds(selectedType.Attributes);
        form.setFieldsValue({
          Type: {
            Attributes: {
              [coordinateIds.latitudeId]: pos.coords.latitude,
              [coordinateIds.longitudeId]: pos.coords.longitude,
            },
          },
        });
      }
    });
  };

  return isLoading ? (
    <div className={styles.loadingTitle}>Loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => setChangesMade(true)}
      >
        <div className={styles.typeWrapper}>
          <Form.Item
            name={["Type", "Id"]}
            label="Memorial Type"
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              width: "50%",
            }}
            rules={[{ required: true, message: "Select a type" }]}
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
          <>
            <Form.Item
              label="Memorial Name"
              name="Name"
              style={{ fontWeight: "bold" }}
              rules={[{ required: true, message: "Enter a memorial name" }]}
            >
              <Input
                label="Memorial Name"
                size="large"
                style={{ width: "100%", fontSize: "1.3rem" }}
              />
            </Form.Item>

            <AttributeForm
              key={selectedType.Id}
              Attributes={selectedType.Attributes}
              latitude={latitude}
              longitude={longitude}
            />
            <div className={styles.imageLabel}>Image</div>
            <Form.Item name="Image">
              <MemorialImageUpload
                onFileSelect={onImageSelect}
                blobName={Memorial && Memorial.Image}
                onRemove={() => setSelectedImage(null)}
              />
            </Form.Item>

            <Button
              type="primary"
              className={styles.fillCoordinatesButton}
              onClick={onFillCoordinatesClick}
              size="large"
              style={{ width: "75%", height: "5%", marginBottom: "5%" }}
            >
              Fill Coordinates
            </Button>

            <Button
              type="primary"
              size="large"
              style={{
                width: "75%",
                height: "5%",
                marginBottom: "25%",
                background: "#237804",
                border: "#237804",
              }}
              className={cx(styles.saveMemorialButton, {
                [styles.disabledButton]: isSaving,
              })}
              onClick={onSaveMemorialClick}
            >
              {isSaving ? <div>Saving... </div> : <div>Save Memorial</div>}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default TaggerForm;
