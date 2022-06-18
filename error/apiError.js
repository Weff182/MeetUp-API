class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    let apiError = new ApiError(400, message);
    apiError.name = 'Bad Request'
    return apiError
  }
  static forbiden(message) {
    let apiError = new ApiError(403, message);
    apiError.name = 'Forbiden'
    return apiError
  }
  static notFound(message) {
    let apiError = new ApiError(403, message);
    apiError.name = 'Not Found'
    return apiError
  }
}
module.exports = ApiError;
