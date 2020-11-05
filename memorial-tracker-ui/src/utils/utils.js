export const getCoordinatesOfMemorial = (memorial) => {
  let latitude = null;
  let longitude = null;
  memorial.Type.Attributes.forEach((attribute) => {
    if (attribute.Name.toLowerCase() === "latitude") {
      latitude = attribute.Value.Value;
    }
    if (attribute.Name.toLowerCase() === "longitude") {
      longitude = attribute.Value.Value;
    }
  });
  return { lat: latitude, lng: longitude };
};
