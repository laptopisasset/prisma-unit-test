import { MockContext, createMockContext, Context } from "../context";
import { createUser } from "../src/functions-with-context";

describe("User Moduke", () => {
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("should create new user", async () => {
    const user = {
      id: 1,
      name: "Rich",
      email: "hello@prisma.io",
      acceptTermsAndConditions: true,
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);

    await expect(createUser(user, ctx)).resolves.toEqual({
      id: 1,
      name: "Rich",
      email: "hello@prisma.io",
      acceptTermsAndConditions: true,
    });
  });

  test("should update a users name ", async () => {
    const user = {
      id: 1,
      name: "Rich Haines",
      email: "hello@prisma.io",
    };
    mockCtx.prisma.user.update.mockResolvedValue(user);

    await expect(updateUsername(user, ctx.prisma)).resolves.toEqual({
      id: 1,
      name: "Rich Haines",
      email: "hello@prisma.io",
    });
  });

  test("should fail if user does not accept terms", async () => {
    const user = {
      id: 1,
      name: "Rich Haines",
      email: "hello@prisma.io",
      acceptTermsAndConditions: false,
    };

    mockCtx.prisma.user.create.mockRejectedValue(
      new Error("User must accept terms!")
    );

    await expect(createUser(user, ctx.prisma)).resolves.toEqual(
      new Error("User must accept terms!")
    );
  });
});
