// Generate uniqueId using dateTime Stamp
const generateUniqueId = () => {
  const uniqueId = new Date().getTime(); // Get current timestamp
  return uniqueId;
};

export default generateUniqueId;
