"use client";

import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
  "Mailer Boxes",
  "Rigid Boxes",
  "Shipping Boxes",
  "Paper Mailers",
  "Printed Cans",
  "Tissue Paper",
  "Paper Tape",
  "Advent Calendars",
  "Labels & Stickers",
  "Inserts & Fitments",
  "MOQs & Pricing",
  "Print Methods",
  "Samples",
  "Lead Times",
  "Sustainability",
  "About Supplied",
  "Process",
  "Industries",
  "Other",
];

interface KnowledgeEntry {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  created_at: string;
}

export default function KnowledgeAdmin() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const [activeTab, setActiveTab] = useState<"single" | "batch">("single");
  const [batchInput, setBatchInput] = useState("");
  const [batchSubmitting, setBatchSubmitting] = useState(false);
  const [batchProgress, setBatchProgress] = useState("");

  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEntries = useCallback(async (authToken: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/knowledge/ingest?token=${encodeURIComponent(authToken)}`
      );
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setToken("");
          sessionStorage.removeItem("kb_admin_token");
          setMessage({ type: "error", text: "Invalid token" });
          return;
        }
        throw new Error("Failed to load entries");
      }
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      setMessage({ type: "error", text: "Failed to load entries" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("kb_admin_token");
    if (saved) {
      setToken(saved);
      setAuthenticated(true);
      fetchEntries(saved);
    }
  }, [fetchEntries]);

  const handleLogin = async () => {
    const t = tokenInput.trim();
    if (!t) return;

    const res = await fetch(
      `/api/knowledge/ingest?token=${encodeURIComponent(t)}`
    );
    if (res.ok) {
      setToken(t);
      setAuthenticated(true);
      sessionStorage.setItem("kb_admin_token", t);
      const data = await res.json();
      setEntries(data.entries ?? []);
      setMessage(null);
    } else {
      setMessage({ type: "error", text: "Invalid token" });
    }
  };

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      setMessage({ type: "error", text: "Question and answer are required" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/knowledge/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          answer: answer.trim(),
          category,
          token,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add entry");
      }

      const data = await res.json();
      setEntries((prev) => [data.entry, ...prev]);
      setQuestion("");
      setAnswer("");
      setMessage({ type: "success", text: "Q&A added and embedded successfully" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add entry";
      setMessage({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this Q&A entry? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/knowledge/ingest", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      setEntries((prev) => prev.filter((e) => e.id !== id));
      setMessage({ type: "success", text: "Entry deleted" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      setMessage({ type: "error", text: msg });
    } finally {
      setDeletingId(null);
    }
  };

  const handleBatchSubmit = async () => {
    const raw = batchInput.trim();
    if (!raw) {
      setMessage({ type: "error", text: "Paste your Q&A data first" });
      return;
    }

    let items: Array<{ question: string; answer: string; category?: string }>;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        throw new Error("not an array");
      }
      items = parsed;
    } catch {
      setMessage({
        type: "error",
        text: 'Invalid JSON. Expected an array like: [{"question": "...", "answer": "...", "category": "..."}]',
      });
      return;
    }

    if (items.length === 0) {
      setMessage({ type: "error", text: "Array is empty" });
      return;
    }

    const invalid = items.filter(
      (i) => !i.question || !i.answer || typeof i.question !== "string" || typeof i.answer !== "string"
    );
    if (invalid.length > 0) {
      setMessage({
        type: "error",
        text: `${invalid.length} item(s) missing question or answer fields`,
      });
      return;
    }

    setBatchSubmitting(true);
    setBatchProgress(`Embedding & saving ${items.length} entries...`);
    setMessage(null);

    try {
      const res = await fetch("/api/knowledge/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, token }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Batch import failed");
      }

      const data = await res.json();
      setBatchInput("");
      setBatchProgress("");
      setMessage({
        type: data.errors > 0 ? "error" : "success",
        text: `Batch complete: ${data.success} added, ${data.errors} failed`,
      });
      fetchEntries(token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Batch import failed";
      setMessage({ type: "error", text: msg });
      setBatchProgress("");
    } finally {
      setBatchSubmitting(false);
    }
  };

  const filteredEntries = entries.filter((e) => {
    if (filterCategory !== "all" && e.category !== filterCategory) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        e.question.toLowerCase().includes(term) ||
        e.answer.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const categoryCounts = entries.reduce<Record<string, number>>((acc, e) => {
    const cat = e.category || "Uncategorised";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-supplied-bg flex items-center justify-center p-5">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-supplied-amber" />
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-supplied-ink/40">
                Knowledge Hub Admin
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-supplied-ink mb-2">
              Sign in
            </h1>
            <p className="text-sm text-supplied-ink/40 mb-6 leading-relaxed">
              Enter the admin token to manage Knowledge Hub Q&A entries.
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

  // Admin dashboard
  return (
    <div className="min-h-screen bg-supplied-bg">
      {/* Header */}
      <div className="bg-supplied-ink text-white">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-supplied-amber" />
            <span className="text-[13px] font-semibold tracking-wide">
              Knowledge Hub Admin
            </span>
            <span className="text-[11px] text-white/30 ml-2">
              {entries.length} entries
            </span>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              setToken("");
              sessionStorage.removeItem("kb_admin_token");
            }}
            className="text-[12px] text-white/40 hover:text-white bg-transparent border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer font-sans transition-colors hover:border-white/25"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-8">
        {/* Status message */}
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8">
          {/* Add new Q&A — tabbed form */}
          <div>
            <div className="bg-white rounded-2xl border border-supplied-ink/[0.06] p-6 sticky top-8">
              {/* Tabs */}
              <div className="flex gap-1 mb-5 bg-supplied-bg rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("single")}
                  className={`flex-1 py-2 rounded-md text-[13px] font-semibold cursor-pointer font-sans transition-all ${
                    activeTab === "single"
                      ? "bg-white text-supplied-ink shadow-sm"
                      : "bg-transparent text-supplied-ink/40 hover:text-supplied-ink/60"
                  }`}
                >
                  Single entry
                </button>
                <button
                  onClick={() => setActiveTab("batch")}
                  className={`flex-1 py-2 rounded-md text-[13px] font-semibold cursor-pointer font-sans transition-all ${
                    activeTab === "batch"
                      ? "bg-white text-supplied-ink shadow-sm"
                      : "bg-transparent text-supplied-ink/40 hover:text-supplied-ink/60"
                  }`}
                >
                  Batch import
                </button>
              </div>

              {activeTab === "single" ? (
                <>
                  <p className="text-[13px] text-supplied-ink/40 mb-5">
                    Add one Q&A entry. It will be embedded and available in the
                    Knowledge Hub immediately.
                  </p>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-supplied-ink mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border border-supplied-ink/10 outline-none bg-supplied-bg focus:border-supplied-amber transition-colors appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-supplied-ink mb-1.5">
                      Question <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g. What is the MOQ for rigid boxes?"
                      rows={2}
                      className="w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border border-supplied-ink/10 outline-none bg-supplied-bg focus:border-supplied-amber transition-colors resize-y"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-supplied-ink mb-1.5">
                      Answer <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="e.g. The minimum order quantity for rigid boxes is 500 units."
                      rows={4}
                      className="w-full px-3.5 py-2.5 rounded-[10px] text-sm font-sans border border-supplied-ink/10 outline-none bg-supplied-bg focus:border-supplied-amber transition-colors resize-y"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !question.trim() || !answer.trim()}
                    className={`w-full px-6 py-3 rounded-[10px] text-white text-sm font-semibold cursor-pointer font-sans transition-all ${
                      submitting || !question.trim() || !answer.trim()
                        ? "bg-supplied-ink/40 cursor-not-allowed"
                        : "bg-supplied-amber hover:brightness-110"
                    }`}
                  >
                    {submitting ? "Embedding & saving..." : "Add Q&A entry"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[13px] text-supplied-ink/40 mb-3">
                    Paste a JSON array of Q&A objects. Each object needs{" "}
                    <code className="text-[12px] bg-supplied-bg px-1.5 py-0.5 rounded">question</code>,{" "}
                    <code className="text-[12px] bg-supplied-bg px-1.5 py-0.5 rounded">answer</code>, and optionally{" "}
                    <code className="text-[12px] bg-supplied-bg px-1.5 py-0.5 rounded">category</code>.
                  </p>

                  <div className="bg-supplied-bg rounded-lg px-3.5 py-2.5 mb-4 text-[11px] text-supplied-ink/40 font-mono leading-relaxed">
                    {`[{"question": "...", "answer": "...", "category": "Mailer Boxes"}]`}
                  </div>

                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder={`[\n  {\n    "question": "What is the MOQ?",\n    "answer": "100 units for digital mailers.",\n    "category": "MOQs & Pricing"\n  }\n]`}
                    rows={12}
                    className="w-full px-3.5 py-2.5 rounded-[10px] text-[13px] font-mono border border-supplied-ink/10 outline-none bg-supplied-bg focus:border-supplied-amber transition-colors resize-y mb-4"
                  />

                  {batchProgress && (
                    <div className="text-[13px] text-supplied-amber font-medium mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-supplied-amber/30 border-t-supplied-amber rounded-full animate-spin" />
                      {batchProgress}
                    </div>
                  )}

                  <button
                    onClick={handleBatchSubmit}
                    disabled={batchSubmitting || !batchInput.trim()}
                    className={`w-full px-6 py-3 rounded-[10px] text-white text-sm font-semibold cursor-pointer font-sans transition-all ${
                      batchSubmitting || !batchInput.trim()
                        ? "bg-supplied-ink/40 cursor-not-allowed"
                        : "bg-supplied-amber hover:brightness-110"
                    }`}
                  >
                    {batchSubmitting
                      ? "Processing batch..."
                      : "Import all entries"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Existing entries */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h2 className="text-lg font-bold text-supplied-ink">
                Existing entries
              </h2>
              <div className="flex items-center gap-2">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="px-3.5 py-2 rounded-[10px] text-[13px] font-sans border border-supplied-ink/10 outline-none bg-white focus:border-supplied-amber transition-colors w-[200px]"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3.5 py-2 rounded-[10px] text-[13px] font-sans border border-supplied-ink/10 outline-none bg-white focus:border-supplied-amber transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">
                    All categories ({entries.length})
                  </option>
                  {Object.entries(categoryCounts)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([cat, count]) => (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-16 text-supplied-ink/40 text-sm">
                Loading entries...
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-16 text-supplied-ink/40 text-sm">
                {entries.length === 0
                  ? "No entries yet. Add your first Q&A above."
                  : "No entries match your filter."}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl border border-supplied-ink/[0.06] p-5 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {entry.category && (
                            <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-supplied-amber bg-supplied-amber/10 px-2 py-0.5 rounded-full">
                              {entry.category}
                            </span>
                          )}
                          <span className="text-[10px] text-supplied-ink/25">
                            #{entry.id}
                          </span>
                        </div>
                        <h3 className="text-[14px] font-semibold text-supplied-ink mb-1.5 leading-snug">
                          {entry.question}
                        </h3>
                        <p className="text-[13px] text-supplied-ink/50 leading-relaxed">
                          {entry.answer}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        disabled={deletingId === entry.id}
                        className="text-[11px] text-supplied-ink/25 hover:text-red-500 bg-transparent border border-supplied-ink/8 hover:border-red-200 rounded-lg px-2.5 py-1.5 cursor-pointer font-sans transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                      >
                        {deletingId === entry.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
