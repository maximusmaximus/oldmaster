import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/try-secret")({
  beforeLoad: () => {
    throw redirect({ to: "/try" });
  },
  component: () => null,
});
