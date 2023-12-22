// Utility files having common functions that could be used across project
// Generate uniqueId using dateTime Stamp
const generateUniqueId = () => {
  const uniqueId = new Date().getTime(); // Get current timestamp
  return uniqueId;
};

export default generateUniqueId;
