// ============================================================
// utils/response.js  —  Helper format response JSON seragam
// ============================================================

const success = (res, statusCode, message, data = null, extra = {}) => {
  const body = { success: true, message, ...extra };
  if (data !== null) body.data = data;
  return res.status(statusCode).json(body);
};

const error = (res, statusCode, message, details = null) => {
  const body = { success: false, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
};

module.exports = { success, error };
