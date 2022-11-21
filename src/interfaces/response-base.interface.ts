export interface ResponseBase<T> {
    data: T;
    statusCode: number;
    success: boolean;
    message: string;
}

export interface ErrorResponse<T> extends ResponseBase<T> {
    timestamp: Date;
    path: string;
}