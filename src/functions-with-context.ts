import { Context } from "../context";

interface CreateUser {
  name: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export async function createUser(user: CreateUser, ctx: Context) {
  if (user.acceptTermsAndConditions) {
    return ctx.prisma.user.create({
      data: user,
    });
  } else {
    throw new Error("User must accept terms!");
  }
}
