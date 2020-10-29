require("dotenv").config({ path: "../.env" });
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

class BlobService {
  base_url = "hello";
  constructor() {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      process.env.AZURE_BLOB_ACCOUNT_NAME,
      process.env.AZURE_BLOB_ACCOUNT_KEY
    );
    this.blobServiceClient = new BlobServiceClient(
      `https://${process.env.AZURE_BLOB_ACCOUNT_NAME}.blob.core.windows.net`,
      sharedKeyCredential
    );
    this.iconContainerClient = this.blobServiceClient.getContainerClient(
      process.env.AZURE_BLOB_TYPE_ICON_CONTAINER_NAME
    );
    this.imageContainerClient = this.blobServiceClient.getContainerClient(
      process.env.AZURE_BLOB_MEMORIAL_IMAGE_CONTAINER_NAME
    );
  }

  uploadMemorialImage = async (memorialId, image) => {
    console.log("UPLOAD MEMORIAL IAMGE CALLED", memorialId, image);

    const blockBlobClient = this.imageContainerClient.getBlockBlobClient(
      memorialId + new Date().getTime()
    );
    const uploadImageResponse = await blockBlobClient.upload(image, 1);
    return uploadImageResponse;
  };
}

export default BlobService;
