"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "/api/admin/enquiries";
const TOKEN_KEY = "supplied_admin_token";
const LEGACY_TOKEN_KEY = "kb_admin_token";

export default function AdminHome() {
  const [tokenInput, setTokenInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved =
      sessionStorage.getItem(TOKEN_KEY) ||
      sessionStorage.getItem(LEGACY_TOKEN_KEY);
    if (saved) setAuthenticated(true);
  }, []);

  const handleLogin = async () => {
    const t = tokenInput.trim();
    if (!t) return;
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) {
      setError("Invalid token");
      return;
    }
    sessionStorage.setItem(TOKEN_KEY, t);
    sessionStorage.setItem(LEGACY_TOKEN_KEY, t);
    setAuthenticated(true);
    setError(null);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-supplied-bg flex items-center justify-center p-5">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-supplied-amber" />
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-supplied-ink/40">
                Supplied internal
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-supplied-ink mb-2">
              Sign in
            </h1>
            <p className="text-sm text-supplied-ink/40 mb-6 leading-relaxed">
              Same admin token as Knowledge Hub. This area is not linked from
              the public site.
            </p>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Admin token"
              className="w-full px-4 py-3 rounded-[10px] text-sm font-sans border border-supplied-ink/10 outline-none bg-supplied-bg focus:border-supplied-amber transition-colors mb-3"
            />
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 rounded-[10px] bg-supplied-ink text-white text-sm font-semibold cursor-pointer font-sans hover:bg-black transition-colors"
            >
              Sign in
            </button>
            {error && (
              <p className="text-[13px] text-red-600 mt-3 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-supplied-bg">
      <div className="bg-supplied-ink text-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-supplied-amber" />
            <span className="text-[13px] font-semibold tracking-wide">
              Supplied internal
            </span>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              sessionStorage.removeItem(TOKEN_KEY);
              sessionStorage.removeItem(LEGACY_TOKEN_KEY);
            }}
            className="text-[12px] text-white/40 hover:text-white bg-transparent border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer font-sans transition-colors hover:border-white/25"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 md:px-10 py-12">
        <h1 className="text-3xl font-extrabold text-supplied-ink mb-2">
          Internal tools
        </h1>
        <p className="text-sm text-supplied-ink/50 mb-8">
          Not indexed, not in the public nav. Bookmark these URLs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToolCard
            href="/admin/enquiries"
            title="Enquiry insights"
            body="Stored contact forms, volumes, and plug-and-play demand."
          />
          <ToolCard
            href="/admin/knowledge"
            title="Knowledge Hub"
            body="Add and edit Q&A entries used by the site assistant."
          />
        </div>
      </div>
    </div>
  );
}

function ToolCard({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl border border-supplied-ink/[0.06] p-6 no-underline hover:border-supplied-amber/40 transition-colors"
    >
      <div className="text-[15px] font-semibold text-supplied-ink mb-1">
        {title}
      </div>
      <p className="text-[13px] text-supplied-ink/50 leading-relaxed m-0">
        {body}
      </p>
    </Link>
  );
}
