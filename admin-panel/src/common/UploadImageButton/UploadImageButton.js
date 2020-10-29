const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log(path.resolve(__dirname, "../.env"));
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

// Enter your storage account name
const account = "memorialtrackerphotos";
const accountKey =
  "4HUAY5YcGt5hB1Ce+42ejKeyKaa4WXD9gCDKpec4ubPmg/Q593qqLg1wD9qujxv/S8NaDvxStGGPY08hvH+YMA==";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = "memorialicons";

async function main() {
  console.log(process.env);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

main();
