import React from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4";

interface AccentHeadingProps {
  as?: HeadingTag;
  text: string;
  className?: string;
  accentClassName?: string;
}

interface HeadingParts {
  before: string;
  accent?: string;
  after?: string;
}

const STEGA_CHAR_PATTERN = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/;

function splitHeadingText(text: string): HeadingParts {
  if (!text.trim()) {
    return { before: "" };
  }

  const markerStart = text.indexOf("[[");
  const markerEnd = text.indexOf("]]", markerStart + 2);
  if (markerStart >= 0 && markerEnd > markerStart) {
    const before = text.slice(0, markerStart);
    const accent = text.slice(markerStart + 2, markerEnd);
    const after = text.slice(markerEnd + 2);
    return { before, accent: accent || undefined, after: after || undefined };
  }

  const pipeIndex = text.indexOf("|");
  if (pipeIndex > 0) {
    const before = text.slice(0, pipeIndex);
    const accent = text.slice(pipeIndex + 1);
    return { before, accent: accent || undefined };
  }

  // Draft-mode stega strings must remain untouched for click-to-edit overlays.
  if (STEGA_CHAR_PATTERN.test(text)) {
    return { before: text };
  }

  const trimmedText = text.trim();
  const sentenceParts = trimmedText
    .split(". ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentenceParts.length > 1) {
    const before = sentenceParts.slice(0, -1).join(". ");
    const rawAccent = sentenceParts[sentenceParts.length - 1];
    const accent = rawAccent.endsWith(".") ? rawAccent : `${rawAccent}.`;
    return { before, accent };
  }

  const commaIndex = trimmedText.lastIndexOf(", ");
  if (commaIndex > 0) {
    return {
      before: trimmedText.slice(0, commaIndex + 1).trimEnd(),
      accent: trimmedText.slice(commaIndex + 1).trimStart(),
    };
  }

  const words = trimmedText.split(/\s+/);
  if (words.length > 2) {
    return {
      before: words.slice(0, -2).join(" "),
      accent: words.slice(-2).join(" "),
    };
  }

  return { before: text };
}

export function AccentHeading({
  as = "h2",
  text,
  className,
  accentClassName = "text-supplied-amber",
}: AccentHeadingProps) {
  const HeadingTag = as;
  const parts = splitHeadingText(text);

  if (!parts.accent) {
    return <HeadingTag className={className}>{parts.before}</HeadingTag>;
  }

  return (
    <HeadingTag className={className}>
      {parts.before}
      {" "}
      <em
        className={`font-fraunces italic font-medium ${accentClassName}`}
      >
        {parts.accent}
      </em>
      {parts.after ? ` ${parts.after}` : null}
    </HeadingTag>
  );
}
