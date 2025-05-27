import axios from 'axios';

const API_BASE_URL = '/proxy';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

export interface CreateAccountRequest {
    name: string;
    country: string;
    balance: number;
}

export interface CreateTransactionRequest {
    fromAccountName: string;
    toAccountName: string;
    amount: number;
    fraudFlag?: boolean;
    fraudFlagReason?: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export const bankApi = {
    async createAccount(data: CreateAccountRequest): Promise<ApiResponse> {
        try {
            const response = await apiClient.post<ApiResponse>('/account', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error || 'Failed to create account');
            }
            throw new Error('Network error occurred');
        }
    },

    async createTransaction(data: CreateTransactionRequest): Promise<ApiResponse> {
        try {
            const response = await apiClient.post<ApiResponse>('/transaction', data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error || 'Failed to create transaction');
            }
            throw new Error('Network error occurred');
        }
    },
};