import axios, { AxiosError, AxiosResponse } from "axios";

// ---- Payload type ----
interface EmailPayload {
  to: string;
  subject: string;
  content: string;
}

// ---- API Success Response from backend ----
interface BackendResponse {
  message: string;
  [key: string]: unknown; // allow additional fields safely
}

// ---- Unified Response type ----
interface ApiResponse<T = unknown> {
  data?: T;
  message: string;
  error?: unknown;
  code: number;
  isOk: boolean;
}

// ---- Custom Response Helper ----
export const CustomResponse = <T>({
  data,
  message,
  error,
  code,
}: {
  data?: T;
  message: string;
  error?: unknown;
  code: number;
}): ApiResponse<T> => {
  const isOk = code >= 200 && code < 300;
  return { isOk, data, message, error, code };
};

// ---- Mail Submission Function ----
export const COMPOSE_EMAIL = async (
  payload: EmailPayload
): Promise<ApiResponse<BackendResponse>> => {
  try {
    const response: AxiosResponse<BackendResponse> = await axios.post(
      "https://smtp.dgovernorsplace.com/mailing/compose",
      payload
    );

    return CustomResponse<BackendResponse>({
      data: response.data,
      message: response.data.message ?? "Success",
      code: response.status,
    });
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    return CustomResponse({
      message: error.response?.data?.message || error.message,
      error,
      code: error.response?.status ?? 400,
    });
  }
};
