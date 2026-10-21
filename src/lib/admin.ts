import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      username: z.string().max(80),
      password: z.string().max(80),
    }),
  )
  .handler(async ({ data }) => {
    const { loginAdmin } = await import("./admin-session.server");
    return { ok: loginAdmin(data.username, data.password) };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutAdmin } = await import("./admin-session.server");
  logoutAdmin();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdminRequest } = await import("./admin-session.server");
  return { admin: await isAdminRequest() };
});

