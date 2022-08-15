class ApiError extends Error {
  constructor(name, status, message) {
    super();
    this.name = name;
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError('Bad Request', 400, message);
  }

  static unauthorized(message) {
    return new ApiError('Unauthorized', 401, message);
  }

  static forbiden(message) {
    return new ApiError('Forbiden', 403, message);
  }

  static notFound(message) {
    return new ApiError('Not Found', 404, message);
  }
}
module.exports = ApiError;
