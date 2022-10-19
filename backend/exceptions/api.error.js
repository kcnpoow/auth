export default class ApiError extends Error {
  status;
  errors;

  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError('User is not authorized', 401);
  }

  static BadRequest(message, errors) {
    return new ApiError(message, 500, errors);
  }

  static Conflict(message) {
    return new ApiError(message, 409);
  }

  static NotFound(message) {
    return new ApiError(message, 404);
  }
}