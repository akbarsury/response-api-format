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

type GenerateAPIResponseStatusCodeParams = StatusResponseCode | number

type GenerateAPIResponseOptionParams<TAPIResponseData> = {
    message?: string,
    data?: TAPIResponseData
}

export default <TData>(statusCode: GenerateAPIResponseStatusCodeParams, params?: GenerateAPIResponseOptionParams<TData>) => {
    return {
        statusCode,
        message: params?.message || defaultStatusResponseMessage[statusCode] || 'OK',
        data: params?.data
    }
}