export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message?: string;
    data: T;
    meta?: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}