import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { getState } from "store/rx.store";
import { AUTHORIZATION_KEY, CONTENT_TYPE_KEY } from "constants/key";
import {
  ErrorResponse,
  ResponseBase,
} from "interfaces/response-base.interface";
import axiosInstance from "./axios";
import { INetwork } from "interfaces/network.interface";
import { getSession } from "next-auth/react";
import { SessionUser } from "interfaces/session.interface";

const handleResponseAxios = <T = any>(
  res: AxiosResponse<any>
): ResponseBase<T> => {
  const { statusCode, success, data, message } = res.data;
  return {
    statusCode,
    success,
    data,
    message,
  };
};

const handleAxiosError = <T = any>(error: AxiosError): ErrorResponse<T> => {
  if (typeof error.response !== "undefined") {
    const { statusCode, success, data, message, path, timestamp } =
      error.response as any;
    return {
      statusCode,
      success,
      data,
      message,
      path,
      timestamp,
    };
  } else {
    return {
      statusCode: 500,
      success: false,
      data: {} as any,
      message: "Exception",
      path: "",
      timestamp: new Date(),
    };
  }
};

async function Request<T = unknown>(config: AxiosRequestConfig) {
  const { token } = getState("auth");
  const session = await getSession();

  const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: Number(process.env.NEXT_PUBLIC_TIMEOUT_MIL_SEC) || 10000,
    headers: {
      [CONTENT_TYPE_KEY]: "application/json",
      [AUTHORIZATION_KEY]: `Bearer ${
        (session?.user as SessionUser)?.access_token ||
        token ||
        config.headers?.[AUTHORIZATION_KEY] ||
        ""
      }`,
    },
  };

  return new Promise<ResponseBase<T> | null>((rs, rj) => {
    axiosInstance
      .request({ ...defaultConfig, ...config })
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res);
        rs(result);
      })
      .catch((error: AxiosError) => {
        console.log({ error });
        const result = handleAxiosError(error);
        rj(result);
      });
  });
}

export const handleParameter = <T extends INetwork>(
  props: T,
  method: Method
): AxiosRequestConfig => {
  const { url, body, params } = props;
  return {
    ...props,
    method,
    url,
    data: body,
    params,
  };
};

// get
async function Get<T>(params: INetwork) {
  return Request<T>(handleParameter(params, "GET"));
}

// post
async function Post<T>(params: INetwork) {
  return Request<T>(handleParameter(params, "POST"));
}
// patch
async function Patch<T>(params: INetwork) {
  return Request<T>(handleParameter(params, "PATCH"));
}

// put
async function Put<T>(params: INetwork) {
  return Request<T>(handleParameter(params, "PUT"));
}

// put
async function Delete<T>(params: INetwork) {
  return Request<T>(handleParameter(params, "DELETE"));
}

export const networkService = {
  Request,
  Get,
  Post,
  Put,
  Delete,
  Patch,
};
