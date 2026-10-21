import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin, adminLogout, adminStatus } from "@/lib/admin";

export function AdminLogin() {
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void adminStatus().then((status) => setAdmin(status.admin));
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { username, password } });
      if (!result.ok) {
        setError("That login didn’t work.");
        return;
      }
      setAdmin(true);
      setPassword("");
      setUsername("");
    } catch {
      setError("That login didn’t work.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-24 border-t border-border pt-10">
      {admin ? (
        <div className="space-y-4">
          <p className="text-sm text-muted">Staff mode is on. Hidden fan works stay off the public Fans gallery.</p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/" search={{ view: "fans" }}>
                Review fans
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                void adminLogout().then(() => setAdmin(false));
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => void onSubmit(e)} className="max-w-xs space-y-3">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Staff</p>
          <Input
            name="username"
            autoComplete="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="outline" disabled={busy} className="w-full">
            {busy ? "Checking…" : "Sign in"}
          </Button>
          {error && <p className="text-sm text-muted">{error}</p>}
        </form>
      )}
    </section>
  );
}
