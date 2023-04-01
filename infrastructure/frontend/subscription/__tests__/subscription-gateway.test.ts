import {
  rest,
  RestRequest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from "msw";
import { setupServer } from "msw/node";

let request: RestRequest;

const server = setupServer(
  rest.post("api/subscription", (req, res, ctx) => {
    request = req;
    return res(ctx.status(201));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("subscription gateway", () => {
  it("should ", () => {});
});
