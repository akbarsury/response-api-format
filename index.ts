import type { H3Event } from 'h3';
type StatusResponseCode = 200 | 201 | 202 | 204 | 400 | 401 | 402 | 403 | 404 | 405

const defaultStatusResponseMessage: Record<StatusResponseCode | number, string> = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    500: "Internal Server Error",
}


interface GenerateAPIResponseOptionParams<TAPIResponseData> {
    statusCode?: StatusResponseCode | number
    message?: string
    data?: TAPIResponseData
    errors?: Record<string, string>[]
}

export default <TData>(
    event: H3Event,
    params?: GenerateAPIResponseOptionParams<TData>
) => {
    setResponseStatus(
        event,
        params?.statusCode || 200,
        params?.message || defaultStatusResponseMessage[params?.statusCode || 200]
    )

    return {
        data: params?.data ? params.data : undefined,
        errors: !params?.data && params?.errors ? params.errors : undefined
    }
}