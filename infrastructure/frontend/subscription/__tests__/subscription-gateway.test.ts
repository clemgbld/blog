import { rest, RestRequest } from "msw";
import { setupServer } from "msw/node";
import { buildSubscriptionGateway } from "../subscription-gateway";
import "isomorphic-fetch";
import { API_ENDPOINT } from "../../rest-service/rest-service-constants";
import { SUBSCRIPTION_GATEWAY_ENDPOINT } from "../subscription-gateway-constants";

let request: RestRequest;

const server = setupServer(
  rest.post(
    `${API_ENDPOINT}${SUBSCRIPTION_GATEWAY_ENDPOINT}`,
    (req, res, ctx) => {
      request = req;
      return res(ctx.status(201), ctx.json({}));
    }
  )
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
  const email = "email@example.com";
  it("should successfully subscribe the blog reader to the news letter", async () => {
    const subscriptionGateway = buildSubscriptionGateway();
    await subscriptionGateway.subscribe(email);
    expect(await request.json()).toEqual({ email });
  });

  it("should handle errors", async () => {
    server.use(
      rest.post(
        `${API_ENDPOINT}${SUBSCRIPTION_GATEWAY_ENDPOINT}`,
        (req, res, ctx) => {
          request = req;
          return res(
            ctx.status(400),
            ctx.json({ message: "Something went wrong!" })
          );
        }
      )
    );

    const subscriptionGateway = buildSubscriptionGateway();

    await expect(
      async () => await subscriptionGateway.subscribe(email)
    ).rejects.toThrowError("Something went wrong!");
  });
});
