const fs = require("fs");

exports.validateMemorialTypes = (memorialTypes) => {
  let hasLatitude = false;
  let hasLongitude = false;

  memorialTypes.forEach((type) => {
    if (!type.name) {
      return false;
    }

    type.attributes.forEach((attr) => {
      if (attr.name === "latitude") {
        hasLatitude = true;
      }
      if (attr.name === "longitude") {
        hasLongitude = true;
      }

      if (!attr.name || !attr.value || attr.required === null) {
        return false;
      }
    });
  });
  return hasLatitude && hasLongitude;
};

exports.jsonReader = (filePath, cb) => {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
};
