export const successResponse = (res, code, message, data, token) => {
    return res.status(code).json({
        message,
        data,
        token
      });
}

export const errorResponse = (res, code, message, error) => {
    return res.status(code).json({
        message,
        error
      });
}
