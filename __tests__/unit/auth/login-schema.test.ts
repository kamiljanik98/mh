import { describe, it, expect } from "vitest";
import { loginSchema } from "@/lib/validations/auth";

describe("loginSchema", () => {
  it("accepts a valid email and any non-empty password", () => {
    const result = loginSchema.safeParse({
      email: "valid@mail.com",
      password: "x",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "x",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "email")).toBe(true);
    }
  });

  it("rejects missing email", () => {
    const result = loginSchema.safeParse({
      password: "x",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "valid@mail.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "password")).toBe(
        true,
      );
    }
  });

  it("rejects missing password", () => {
    const result = loginSchema.safeParse({ email: "valid@mail.com" });
    expect(result.success).toBe(false);
  });
});
