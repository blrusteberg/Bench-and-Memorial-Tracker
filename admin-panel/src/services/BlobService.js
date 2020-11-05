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

  uploadMemorialImage = async (memorialId, image, currentImageName = "") => {
    if (!image || !image.file) {
      return;
    }
    const blobPromises = [];
    if (currentImageName) {
      blobPromises.push(
        this.imageContainerClient.getBlockBlobClient(currentImageName).delete()
      );
    }
    const blobName = memorialId + image.file.name;
    const blockBlobClient = this.imageContainerClient.getBlockBlobClient(
      blobName
    );
    blobPromises.push(blockBlobClient.uploadBrowserData(image.file));
    await Promise.all(blobPromises);
    return blobName;
  };
}

export default BlobService;
