import { useClient } from "sanity";
import { useCallback, useEffect, useState } from "react";

interface DraftDoc {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
}

export function PublishAllDrafts() {
  const client = useClient({ apiVersion: "2026-03-13" });
  const [drafts, setDrafts] = useState<DraftDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<
    { id: string; ok: boolean; error?: string }[]
  >([]);

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await client.fetch<DraftDoc[]>(
        `*[_id in path("drafts.**")]{ _id, _type, title, name } | order(_type asc, title asc)`
      );
      setDrafts(docs);
      setSelected(new Set(docs.map((d) => d._id)));
    } catch {
      setDrafts([]);
    }
    setLoading(false);
  }, [client]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === drafts.length) setSelected(new Set());
    else setSelected(new Set(drafts.map((d) => d._id)));
  };

  const publishSelected = async () => {
    setPublishing(true);
    setResults([]);
    const batch: { id: string; ok: boolean; error?: string }[] = [];

    for (const draft of drafts.filter((d) => selected.has(d._id))) {
      const publishedId = draft._id.replace(/^drafts\./, "");
      try {
        const doc = await client.getDocument(draft._id);
        if (!doc) throw new Error("Draft not found");
        const { _id, ...rest } = doc;
        await client
          .transaction()
          .createOrReplace({ ...rest, _id: publishedId })
          .delete(draft._id)
          .commit();
        batch.push({ id: draft._id, ok: true });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        batch.push({ id: draft._id, ok: false, error: msg });
      }
    }

    setResults(batch);
    setPublishing(false);
    await fetchDrafts();
  };

  const label = (d: DraftDoc) =>
    d.title || d.name || d._id.replace("drafts.", "");

  return (
    <div style={{ padding: 32, maxWidth: 800, fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        Publish All Drafts
      </h2>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>
        Select the draft documents you want to publish, then hit the button.
      </p>

      {loading ? (
        <p style={{ color: "#999" }}>Loading drafts…</p>
      ) : drafts.length === 0 ? (
        <div
          style={{
            padding: 24,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            color: "#166534",
            fontSize: 14,
          }}
        >
          No unpublished drafts found — everything is published.
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <button
              onClick={toggleAll}
              style={{
                fontSize: 13,
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: "#fafafa",
                cursor: "pointer",
              }}
            >
              {selected.size === drafts.length ? "Deselect All" : "Select All"}
            </button>
            <span style={{ fontSize: 13, color: "#888" }}>
              {selected.size} of {drafts.length} selected
            </span>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            {drafts.map((d, i) => (
              <label
                key={d._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderBottom:
                    i < drafts.length - 1 ? "1px solid #f3f4f6" : "none",
                  cursor: "pointer",
                  background: selected.has(d._id) ? "#fefce8" : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.has(d._id)}
                  onChange={() => toggle(d._id)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {label(d)}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {d._type}
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={publishSelected}
            disabled={publishing || selected.size === 0}
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background:
                publishing || selected.size === 0 ? "#d1d5db" : "#C8773E",
              color: "#fff",
              cursor:
                publishing || selected.size === 0 ? "not-allowed" : "pointer",
            }}
          >
            {publishing
              ? "Publishing…"
              : `Publish ${selected.size} Document${selected.size !== 1 ? "s" : ""}`}
          </button>
        </>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Results
          </h4>
          {results.map((r) => (
            <div
              key={r.id}
              style={{
                fontSize: 13,
                padding: "6px 0",
                color: r.ok ? "#166534" : "#b91c1c",
              }}
            >
              {r.ok ? "✓" : "✗"} {r.id.replace("drafts.", "")}
              {r.error && (
                <span style={{ marginLeft: 8, color: "#999" }}>
                  — {r.error}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
