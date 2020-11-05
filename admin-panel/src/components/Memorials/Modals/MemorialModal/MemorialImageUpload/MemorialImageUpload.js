import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadImageButton = ({
  blobName,
  onFileSelect = () => {},
  onRemove = () => {},
  ...restProps
}) => {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    console.log("useEffect [MemorialImageUpload.js]");
    if (blobName) {
      setFileList(getFileList());
    }
  }, []);

  const getBlobUrl = () =>
    blobName
      ? `https://${process.env.REACT_APP_AZURE_BLOB_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_AZURE_BLOB_MEMORIAL_IMAGE_CONTAINER_NAME}/${blobName}`
      : "";

  const getFileList = () => [
    {
      uid: -1,
      name: blobName,
      status: "done",
      url: getBlobUrl(),
      thumbUrl: getBlobUrl(),
    },
  ];

  const onFileSelectClick = (file) => {
    setFileList([file]);
  };

  const onRemoveClick = () => {
    setFileList([]);
    onRemove();
  };

  const props = {
    ...restProps,
    name: "memorialImage",
    beforeUpload: (file) => {
      onFileSelectClick(file);
      onFileSelect(file);
      return false;
    },
    onRemove: onRemoveClick,
    showPreviewIcon: true,
    fileList: fileList,
    listType: "picture-card",
    thumbUrl: getBlobUrl(),
  };

  return (
    <Upload {...props}>
      {fileList.length ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadImageButton;
