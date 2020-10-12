export const getInputType = (dataIndex) => {
  if (Array.isArray(dataIndex)) {
    return "text";
  }
  switch (dataIndex) {
    case "Name":
      return "Words";
      break;
    default:
      return "Words";
  }
};
