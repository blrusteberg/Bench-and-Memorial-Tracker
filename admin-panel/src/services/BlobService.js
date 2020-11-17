require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");

class BlobService {
  base_url = "hello";
  constructor() {
    this.blobServiceClient = new BlobServiceClient(
      `https://${process.env.REACT_APP_AZURE_BLOB_ACCOUNT_NAME}.blob.core.windows.net/${process.env.REACT_APP_AZURE_BLOB_SHARED_ACCESS_SIGNATURE}`
    );
    this.iconContainerClient = this.blobServiceClient.getContainerClient(
      process.env.REACT_APP_AZURE_BLOB_TYPE_ICON_CONTAINER_NAME
    );
    this.imageContainerClient = this.blobServiceClient.getContainerClient(
      process.env.REACT_APP_AZURE_BLOB_MEMORIAL_IMAGE_CONTAINER_NAME
    );
  }

  uploadMemorialImage = async (image, currentImageName = "") => {
    if (!image) {
      return;
    }
    await this.deleteImageBlob(currentImageName);
    const blobName = this.getBlobNameFromImage(image);
    const blockBlobClient = await this.imageContainerClient.getBlockBlobClient(
      blobName
    );
    await blockBlobClient.uploadBrowserData(image);
    return blobName;
  };

  deleteImageBlob = async (blobName) => {
    if (!blobName) {
      return;
    }
    return this.imageContainerClient.getBlockBlobClient(blobName).delete();
  };

  getBlobNameFromImage(image) {
    return `${image.uid}.${image.name.split(".").pop()}`;
  }
}

export default BlobService;
