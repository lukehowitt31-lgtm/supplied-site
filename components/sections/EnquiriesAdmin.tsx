"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type {
  EnquiryInsights,
  EnquiryKind,
  EnquiryRecord,
  EnquiryReviewStatus,
} from "@/lib/enquiries/types";

const API_URL = "/api/admin/enquiries";
const TOKEN_KEY = "supplied_admin_token";
const LEGACY_TOKEN_KEY = "kb_admin_token";

type FilterId = "all" | "belowMoq" | "plugAndPlay" | "production";

function readStoredToken(): string {
  return (
    sessionStorage.getItem(TOKEN_KEY) ||
    sessionStorage.getItem(LEGACY_TOKEN_KEY) ||
    ""
  );
}

function persistToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(LEGACY_TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(LEGACY_TOKEN_KEY);
}

function formatPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export default function EnquiriesAdmin() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [insights, setInsights] = useState<EnquiryInsights | null>(null);
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchEnquiries = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${authToken}` },
        cache: "no-store",
      });
      if (res.status === 401) {
        setAuthenticated(false);
        setToken("");
        clearToken();
        setMessage({ type: "error", text: "Invalid token" });
        return;
      }
      if (!res.ok) throw new Error("Failed to load enquiries");
      const data = (await res.json()) as {
        enquiries?: EnquiryRecord[];
        insights?: EnquiryInsights;
      };
      setEnquiries(data.enquiries ?? []);
      setInsights(data.insights ?? null);
    } catch {
      setMessage({ type: "error", text: "Failed to load enquiries" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = readStoredToken();
    if (!saved) return;
    setToken(saved);
    setAuthenticated(true);
    void fetchEnquiries(saved);
  }, [fetchEnquiries]);

  const handleLogin = async () => {
    const t = tokenInput.trim();
    if (!t) return;
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (!res.ok) {
      setMessage({ type: "error", text: "Invalid token" });
      return;
    }
    persistToken(t);
    setToken(t);
    setAuthenticated(true);
    const data = (await res.json()) as {
      enquiries?: EnquiryRecord[];
      insights?: EnquiryInsights;
    };
    setEnquiries(data.enquiries ?? []);
    setInsights(data.insights ?? null);
    setMessage(null);
  };

  const patchEnquiry = async (
    id: string,
    body: Partial<
      Pick<
        EnquiryRecord,
        "kind" | "reviewStatus" | "notes" | "belowMoq" | "plugAndPlayFit"
      >
    >
  ) => {
    const res = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...body }),
    });
    if (!res.ok) {
      setMessage({ type: "error", text: "Could not save changes" });
      return;
    }
    const data = (await res.json()) as { entry?: EnquiryRecord };
    if (data.entry) {
      setEnquiries((current) =>
        current.map((row) => (row.id === id ? data.entry! : row))
      );
    }
    await fetchEnquiries(token);
  };

  const filtered = useMemo(() => {
    return enquiries.filter((row) => {
      if (filter === "belowMoq" && row.belowMoq !== true) return false;
      if (filter === "plugAndPlay" && !row.plugAndPlayFit) return false;
      if (
        filter === "production" &&
        !(row.volumeBand === "production" && row.belowMoq !== true)
      ) {
        return false;
      }
      if (!search.trim()) return true;
      const haystack = [
        row.company,
        row.name,
        row.email,
        row.productType,
        row.message,
        row.packagingTypes.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search.trim().toLowerCase());
    });
  }, [enquiries, filter, search]);

  const exportCsv = () => {
    const header = [
      "Date",
      "Company",
      "Name",
      "Email",
      "Product",
      "Quantity",
      "Below MOQ",
      "Complexity",
      "Plug and play",
      "Kind",
      "Message",
    ];
    const lines = [
      header.join(","),
      ...filtered.map((row) =>
        [
          formatDate(row.submittedAt),
          row.company,
          row.name,
          row.email,
          row.packagingTypes.join(" / ") || row.productType,
          row.estimatedQuantity || row.volumeRaw,
          row.belowMoq == null ? "" : row.belowMoq ? "Yes" : "No",
          row.complexity,
          row.plugAndPlayFit ? "Yes" : "No",
          row.kind,
          row.message,
        ]
          .map((value) => csvEscape(String(value ?? "")))
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "supplied-enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-supplied-bg flex items-center justify-center p-5">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-supplied-amber" />
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-supplied-ink/40">
                Enquiry insights
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-supplied-ink mb-2">
              Sign in
            </h1>
            <p className="text-sm text-supplied-ink/40 mb-6 leading-relaxed">
              Enter the same admin token used for Knowledge Hub.
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
            {message?.type === "error" && (
              <p className="text-[13px] text-red-600 mt-3 text-center">
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-supplied-bg">
      <div className="bg-supplied-ink text-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-2 h-2 rounded-full bg-supplied-amber" />
            <span className="text-[13px] font-semibold tracking-wide">
              Enquiry insights
            </span>
            <nav className="hidden sm:flex items-center gap-3 ml-4 text-[12px]">
              <Link href="/admin" className="text-white/40 no-underline hover:text-white">
                Home
              </Link>
              <span className="text-white">Enquiries</span>
              <Link
                href="/admin/knowledge"
                className="text-white/40 no-underline hover:text-white"
              >
                Knowledge Hub
              </Link>
            </nav>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              setToken("");
              clearToken();
            }}
            className="text-[12px] text-white/40 hover:text-white bg-transparent border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer font-sans transition-colors hover:border-white/25"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-8">
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-supplied-ink mb-2">
            Low-volume demand
          </h1>
          <p className="text-sm text-supplied-ink/50 max-w-[640px] leading-relaxed">
            Contact forms from here on are stored privately. Use this to see
            whether small jobs — digital mailers, fixed-format rigid boxes, and
            similar plug-and-play lines — are a real enough stream to open as a
            separate arm.
          </p>
        </div>

        {insights && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="Genuine enquiries" value={String(insights.genuine)} hint={`${insights.total} stored in total`} />
              <StatCard
                label="Below typical MOQ"
                value={String(insights.belowMoq)}
                hint={formatPct(insights.belowMoqShare)}
                accent
              />
              <StatCard
                label="Plug-and-play fit"
                value={String(insights.plugAndPlay)}
                hint="Simple formats under MOQ"
              />
              <StatCard
                label="Production-scale"
                value={String(insights.productionScale)}
                hint={`${insights.unknownVolume} with no quantity`}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <BreakdownCard
                title="Below-MOQ product mix"
                empty="No below-MOQ enquiries yet."
                items={insights.productMixBelowMoq}
              />
              <BreakdownCard
                title="Quantity asked for"
                empty="No quantity data yet."
                items={insights.quantityBands}
              />
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex gap-1 bg-white border border-supplied-ink/[0.06] rounded-lg p-1">
            {(
              [
                ["all", "All"],
                ["belowMoq", "Below MOQ"],
                ["plugAndPlay", "Plug & play"],
                ["production", "Production"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-semibold cursor-pointer font-sans border-0 ${
                  filter === id
                    ? "bg-supplied-ink text-white"
                    : "bg-transparent text-supplied-ink/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, product, message…"
            className="flex-1 px-4 py-2.5 rounded-[10px] text-sm font-sans border border-supplied-ink/10 outline-none bg-white focus:border-supplied-amber"
          />
          <button
            onClick={exportCsv}
            className="px-4 py-2.5 rounded-[10px] text-[12px] font-semibold bg-white border border-supplied-ink/10 cursor-pointer font-sans hover:border-supplied-amber"
          >
            Export CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] overflow-hidden">
          {loading ? (
            <p className="p-8 text-sm text-supplied-ink/40">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-sm text-supplied-ink/40">
              No enquiries stored yet. New contact form submissions will appear
              here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-supplied-ink/[0.06] text-[11px] uppercase tracking-wide text-supplied-ink/40">
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Company</th>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Qty</th>
                    <th className="px-4 py-3 font-semibold">Complexity</th>
                    <th className="px-4 py-3 font-semibold">Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <EnquiryRow
                      key={row.id}
                      row={row}
                      open={openId === row.id}
                      onToggle={() =>
                        setOpenId((current) =>
                          current === row.id ? null : row.id
                        )
                      }
                      onPatch={patchEnquiry}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-5">
      <div className="text-[11px] uppercase tracking-wide text-supplied-ink/40 font-semibold mb-2">
        {label}
      </div>
      <div
        className="text-3xl font-extrabold"
        style={{
          color: accent ? "#C8773E" : "#1A1A1A",
          fontFamily: "'Fraunces',serif",
        }}
      >
        {value}
      </div>
      <div className="text-[12px] text-supplied-ink/40 mt-1">{hint}</div>
    </div>
  );
}

function BreakdownCard({
  title,
  empty,
  items,
}: {
  title: string;
  empty: string;
  items: { label: string; count: number }[];
}) {
  const max = items[0]?.count ?? 1;
  return (
    <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-5">
      <h2 className="text-sm font-semibold text-supplied-ink mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-[13px] text-supplied-ink/40 m-0">{empty}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-supplied-ink">{item.label}</span>
                <span className="text-supplied-ink/40">{item.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-supplied-bg overflow-hidden">
                <div
                  className="h-full rounded-full bg-supplied-amber"
                  style={{ width: `${Math.max(8, (item.count / max) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EnquiryRow({
  row,
  open,
  onToggle,
  onPatch,
}: {
  row: EnquiryRecord;
  open: boolean;
  onToggle: () => void;
  onPatch: (
    id: string,
    body: Partial<
      Pick<
        EnquiryRecord,
        "kind" | "reviewStatus" | "notes" | "belowMoq" | "plugAndPlayFit"
      >
    >
  ) => Promise<void>;
}) {
  const [notes, setNotes] = useState(row.notes);

  useEffect(() => {
    setNotes(row.notes);
  }, [row.notes]);

  const product =
    row.packagingTypes.join(" / ") || row.productType || "Unspecified";

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-supplied-ink/[0.06] cursor-pointer hover:bg-supplied-bg/60"
      >
        <td className="px-4 py-3 whitespace-nowrap text-supplied-ink/60">
          {formatDate(row.submittedAt)}
        </td>
        <td className="px-4 py-3">
          <div className="font-semibold text-supplied-ink">
            {row.company || "—"}
          </div>
          <div className="text-[12px] text-supplied-ink/40">{row.name}</div>
        </td>
        <td className="px-4 py-3 text-supplied-ink">{product}</td>
        <td className="px-4 py-3 whitespace-nowrap">
          {row.estimatedQuantity || row.volumeRaw || "—"}
        </td>
        <td className="px-4 py-3 capitalize">{row.complexity}</td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {row.belowMoq ? <Pill color="amber">Below MOQ</Pill> : null}
            {row.plugAndPlayFit ? <Pill color="green">P&amp;P</Pill> : null}
            {row.kind !== "genuine" ? <Pill color="red">{row.kind}</Pill> : null}
          </div>
        </td>
      </tr>
      {open && (
        <tr className="bg-supplied-bg/40">
          <td colSpan={6} className="px-4 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-supplied-ink/40 font-semibold mb-2">
                  Message
                </div>
                <p className="text-[13px] text-supplied-ink leading-relaxed whitespace-pre-wrap m-0">
                  {row.message || "—"}
                </p>
                {row.specNotes ? (
                  <p className="text-[12px] text-supplied-ink/50 mt-3 mb-0">
                    Spec signals: {row.specNotes}
                  </p>
                ) : null}
              </div>
              <div className="text-[13px]">
                <div className="mb-3">
                  <span className="text-supplied-ink/40">Email · </span>
                  <a href={`mailto:${row.email}`} className="text-supplied-amber">
                    {row.email}
                  </a>
                </div>
                {row.phone ? (
                  <div className="mb-3 text-supplied-ink/70">{row.phone}</div>
                ) : null}
                <div className="flex flex-wrap gap-2 mb-4">
                  <select
                    value={row.kind}
                    onChange={(e) =>
                      onPatch(row.id, { kind: e.target.value as EnquiryKind })
                    }
                    className="px-2 py-1.5 rounded-md border border-supplied-ink/10 bg-white text-[12px] font-sans"
                  >
                    <option value="genuine">Genuine</option>
                    <option value="spam">Spam</option>
                    <option value="supplier">Supplier</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    value={row.reviewStatus}
                    onChange={(e) =>
                      onPatch(row.id, {
                        reviewStatus: e.target.value as EnquiryReviewStatus,
                      })
                    }
                    className="px-2 py-1.5 rounded-md border border-supplied-ink/10 bg-white text-[12px] font-sans"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="ignored">Ignored</option>
                  </select>
                  <button
                    onClick={() =>
                      onPatch(row.id, { plugAndPlayFit: !row.plugAndPlayFit })
                    }
                    className="px-2 py-1.5 rounded-md border border-supplied-ink/10 bg-white text-[12px] font-sans cursor-pointer"
                  >
                    {row.plugAndPlayFit ? "Unmark P&P" : "Mark P&P"}
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => {
                    if (notes !== row.notes) onPatch(row.id, { notes });
                  }}
                  placeholder="Internal notes"
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-supplied-ink/10 bg-white text-[12px] font-sans"
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Pill({
  children,
  color,
}: {
  children: ReactNode;
  color: "amber" | "green" | "red";
}) {
  const styles = {
    amber: "bg-[#C8773E]/10 text-[#C8773E]",
    green: "bg-[#4CAF7D]/10 text-[#3d8b63]",
    red: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${styles[color]}`}
    >
      {children}
    </span>
  );
}
