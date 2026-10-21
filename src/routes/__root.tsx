import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BootScreen } from "@/components/boot-screen";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "EMOJI OLD MASTERS";

function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="font-sans text-3xl font-bold tracking-tight text-headline">
        Plate not found
      </h1>
      <p className="mt-3 text-muted">
        That work isn’t in the catalog. Return to the gallery to browse the
        plates.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
      >
        Back to gallery
      </Link>
    </main>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=6" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Public-domain Old Master paintings remade as live emoji mosaics. Change density, or try your own image.",
      },
      { name: "theme-color", content: "#0c0b0a" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <BootScreen />
          <SiteHeader />
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "border border-border bg-surface text-fg",
                title: "text-fg",
                description: "text-muted",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
