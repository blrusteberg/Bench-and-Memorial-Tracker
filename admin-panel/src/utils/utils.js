export const getCoordinateIds = (attributes) => {
  let latId = "";
  let lngId = "";
  attributes.forEach((attribute) => {
    if (attribute.Name.toLowerCase() === "latitude") {
      latId = attribute.Id;
    }
    if (attribute.Name.toLowerCase() === "longitude") {
      lngId = attribute.Id;
    }
  });
  return { latitudeId: latId, longitudeId: lngId };
};

export const getDeleteAccess = () => {
  return ((localStorage.getItem("DeleteAccess") || sessionStorage.getItem("DeleteAccess") === "true") ? true : false)
}