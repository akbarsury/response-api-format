import type { H3Event } from 'h3';
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
    500: "Internal Server Error",
}

type GenerateAPIResponseStatusCodeParams = StatusResponseCode | number

type NullableResponseData<T> = T extends unknown ? undefined : T

type GenerateAPIResponseOptions<TResponseData> = {
    statusCode?: GenerateAPIResponseStatusCodeParams,
    message?: string,
    data?: TResponseData
}

const generateApiResponse = <TResponseData>(event: H3Event, options?: GenerateAPIResponseOptions<TResponseData>): { data: TResponseData } | undefined => {
    setResponseStatus(event, options?.statusCode || 200, defaultStatusResponseMessage[options?.statusCode || 200])
    return options?.data ? { data: options.data } : undefined
}

export default generateApiResponse