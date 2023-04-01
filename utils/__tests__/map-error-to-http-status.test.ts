import { ERROR_MESSAGES } from "../../core/common/subscription/subscription-constants";
import { mapErrorToHttpStatus } from "../map-error-to-http-status";

describe("map error to http status code", () => {
  it("should map the known error message to his expected status code", () => {
    expect(mapErrorToHttpStatus(ERROR_MESSAGES.NOT_VALID)).toBe(400);
  });

  it("should be the 500 status code when the error is not known", () => {
    expect(mapErrorToHttpStatus("Internal error")).toBe(500);
  });
});
