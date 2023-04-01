import {
  rest,
  RestRequest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from "msw";
import { setupServer } from "msw/node";
import { buildSubscriptionGateway } from "../subscription-gateway";
import "isomorphic-fetch";

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
  it("should sucess fully subscribe the blog reader to the news letter", async () => {
    const email = "email@example.com";
    const subscriptionGateway = buildSubscriptionGateway();
    await subscriptionGateway.subscribe(email);
    expect(await request.json()).toEqual({ email });
  });
});
