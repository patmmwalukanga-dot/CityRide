import { afterEach, describe, expect, it, vi } from "vitest";
import { getHealth } from "./health";

describe("getHealth", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches health data with the native client", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          service: "nextjs-project-template",
          timestamp: "2026-05-23T00:00:00.000Z",
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );

    await expect(getHealth()).resolves.toMatchObject({
      status: 200,
      data: { ok: true },
    });
  });
});
