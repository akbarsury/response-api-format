import type { H3Event, StatusCode } from 'h3';
type ResponseCodeSuccess = Extract<StatusCode, 200 | 201 | 202 | 204>
type ResponseCodeClientError = Extract<StatusCode, 400 | 401 | 402 | 403 | 404 | 405>
type ResponseCodeInternalError = Extract<StatusCode, 500>
type StatusResponseCode = ResponseCodeSuccess | ResponseCodeClientError | ResponseCodeInternalError

const defaultStatusResponseMessage: Record<StatusResponseCode, string> = {
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

type GenerateAPIResponseOptionParams<TAPIResponseCode, TAPIResponseData> = {
    statusCode?: TAPIResponseCode
    message?: string
    data?: TAPIResponseData
    errors?: Record<string, string>
}

const generateApiResponse = <TResponseCode extends StatusResponseCode = 200, TData = undefined>(
    event: H3Event,
    params: GenerateAPIResponseOptionParams<TResponseCode, TData> = {
        data: undefined
    }
    // ): TResponseCode extends ResponseCodeInternalError ? null : TResponseCode extends ResponseCodeClientError ? null : TData => {
): { errors: Record<string, string> | undefined, data: TData | undefined } => {
    setResponseStatus(
        event,
        params?.statusCode || 200,
        params?.message || defaultStatusResponseMessage[params.statusCode || 200]
    )

    return {
        data: params?.data && ((!params?.statusCode) || params?.statusCode && params?.statusCode >= 200 && params?.statusCode < 400) ? params.data : undefined,
        errors: !params?.data && params?.errors ? params.errors : undefined
        // data: params?.data ? params.data : undefined
        // errors: !params?.data && params?.errors ? params.errors : undefined
    }
}

export { generateApiResponse, generateApiResponse as default }