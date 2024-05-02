export interface IResponseState {
  status:
    | "success"
    | "client-error"
    | "server-error"
    | "unknown"
    | "not-authorized";
  error?: IError;
}

export interface IError {
  code?: number;
  details?: Array<string>;
  message?: string;
}

export interface IResponse<T> extends IResponseState {
  res?: T | null;
}

const responseHandler = (res: {
  // `status` is the HTTP status code from the server response
  status: number;
}): IResponseState => {
  switch (true) {
    case /2[0-9][0-9]/.test(res.status.toString()): //2xx
      return {
        status: "success",
      };
    case /4[0-9][0-9]/.test(res.status.toString()): //4xx
      return {
        status:
          res.status.toString() === "403" ? "not-authorized" : "client-error",
      };
    case /5[0-9][0-9]/.test(res.status.toString()): //5xx
      return {
        status: "server-error",
      };
    default:
      return {
        status: "unknown",
      };
  }
};

const errorHandling = (error: any, request?: unknown) => {
  console.log({
    name: "Service Error",
    message: "",
    extra: {
      error: error,
      request: request,
    },
  });

  return {
    ...responseHandler({ status: error?.response?.status ?? 0 }),
    error: error?.response?.data,
  };
};

export const Util = {
  responseHandler,
  errorHandling,
};
