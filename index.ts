type StatusResponseCode = 200 | 201 | 202 | 204 | 400 | 401 | 402 | 403 | 404 | 405

const defaultStatusResponseMessage: Record<StatusResponseCode | number, string> = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request",
    401: "Authorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
}

export default <FData>(statusCode: StatusResponseCode | number, message?: string, data?: FData) => {
    return {
        statusCode,
        message: message || defaultStatusResponseMessage[statusCode] || 'OK',
        data
    }
}