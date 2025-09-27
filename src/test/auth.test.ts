// src/api/auth.test.ts
import { describe, it, expect } from "vitest";
import type { IncomingHttpHeaders } from "http";

import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  it("returns API key when header is correct", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  it("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-secret-key",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when header is malformed", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when header is empty string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});
