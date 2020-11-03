import React from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadImageButton = ({
  fileList = null,
  fileUrl = "",
  onFileSelect = () => {},
  onRemove = () => {},
}) => {
  const uploadButtonProps = {
    name: "memorialImage",
    beforeUpload: (file) => {
      onFileSelect(file);
      return false;
    },
    onRemove: onRemove,
    fileList: fileList,
    listType: "picture-card",
    thumbUrl: fileUrl,
  };

  return (
    <Upload {...uploadButtonProps}>
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  );
};

export default UploadImageButton;
