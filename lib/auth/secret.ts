const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

if (!secret && process.env.NODE_ENV === "production") {
  throw new Error("AUTH_SECRET (or NEXTAUTH_SECRET) must be set in production");
}

export const authSecret = secret;
