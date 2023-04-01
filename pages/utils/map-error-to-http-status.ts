import { ERROR_MESSAGES } from "../../core/common/subscription/subscription-constants";

const DEFAUL_HTTP_ERRO_CODE = 500;

const ERROR_TO_STATUS_MAPPING = {
  [ERROR_MESSAGES.NOT_VALID]: 400,
  [ERROR_MESSAGES.TOO_LONG]: 400,
  [ERROR_MESSAGES.EMPTY]: 400,
  [ERROR_MESSAGES.DUPLICATED]: 400,
};

export const mapErrorToHttpStatus = (errorMessage: string) =>
  ERROR_TO_STATUS_MAPPING[errorMessage]
    ? ERROR_TO_STATUS_MAPPING[errorMessage]
    : DEFAUL_HTTP_ERRO_CODE;
