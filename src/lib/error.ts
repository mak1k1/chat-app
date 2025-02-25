export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message)
    this.name = "AppError"
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    return { error: error.message, code: error.code, status: error.statusCode }
  }
  return {
    error: "Internal server error",
    code: "INTERNAL_ERROR",
    status: 500,
  }
}
