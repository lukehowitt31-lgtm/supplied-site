# Enquiries module — attribution fields

Handoff for the separate pipeline app. The website stores attribution on the Sanity `enquiry` document. The same values are copied onto the existing webhook and pull payload as **optional** keys.

Do not require the new keys. Ignore them if this app has not been updated yet. Existing payload fields are unchanged.

Personal data (name, email, phone, company, message, cost-audit extras, and the free-text answer for how someone heard about us) is still only in the encrypted blob on the Sanity document, and is still decrypted in the webhook the same way as before. `heardAboutDetail` lives in that encrypted `extra` object. It is not a plain Sanity field, it is not shown in Studio, and it is not inside `attribution`.

## Fields to read

| Field | Meaning |
| --- | --- |
| `heardAbout` | Optional. One of: Google search, ChatGPT or another AI assistant, LinkedIn, Recommendation from someone, Event, Email from Supplied, Other. Empty when the submission had no known answer. The public forms still require a choice in the browser. |
| `referrer` | Origin of the first page's referrer, such as `https://chatgpt.com`. No path, query string, or fragment. Often empty for a direct visit. |
| `landingPage` | Path of that first page, such as `/products/mailer-boxes`. |
| `utmSource`, `utmMedium`, `utmCampaign` | Campaign tags from that first page. Empty when there were none. |
| `attributionCapturedAt` | When the first-visit record was stored in the browser. ISO 8601. Not the submit time. The field is omitted when it is empty. |
| `spamSuspected` | `true` when the message matched an agency-pitch phrase, or `formElapsedMs` was missing or under 3000. The enquiry is still saved. A filled honeypot is the only submission that is dropped before save. |

`extra.referralSource` is set to the same value as `heardAbout` when that value is present, for older readers. It is omitted when `heardAbout` is empty. `extra.heardAboutDetail` holds the optional free text when they picked Recommendation or Other. An unrecognised legacy answer such as `Instagram` is stored there as well, and is not rejected.

On the webhook and `GET /api/pipeline/enquiries`, these arrive under an optional `attribution` object, plus optional `spamSuspected`. The `attribution` object is omitted when every field is empty. It is never `{}`. Empty strings inside it are omitted. `heardAboutDetail` is not in that object; read it from decrypted `extra` when you need it. See `PIPELINE_ENQUIRY_API.md`. A client that ignores unknown JSON keys does not need a change to keep receiving enquiries.

`spamSuspected` does not change `module` or `recommendedAction`. The existing `qualification.kind` rules are unchanged. An enquiry whose message matches the older spam rules can still have `kind: "spam"` as well as `spamSuspected: true`.

## GROQ

```groq
*[_type == "enquiry"] | order(submittedAt desc) {
  _id,
  submittedAt,
  source,
  subject,
  heardAbout,
  referrer,
  landingPage,
  utmSource,
  utmMedium,
  utmCampaign,
  attributionCapturedAt,
  spamSuspected
}
```

`heardAboutDetail` is not in this projection. It is inside the encrypted `extra` string.

Hide flagged rows without hiding older documents, where the field is missing:

```groq
*[_type == "enquiry" && spamSuspected != true]
```

## Suggested UI

- On each enquiry, a source badge from `heardAbout`. When that is empty, show “Unknown” (that is every enquiry from before this change, and any submission that did not include a known answer).
- A second line when present: `utmSource` / `utmMedium` / `utmCampaign`, otherwise the referrer origin, otherwise the landing path.
- Show the decrypted `extra.heardAboutDetail` under the badge when it is set.
- A “Possible spam” badge when `spamSuspected` is true. Do not auto-delete these.
- A filter, default on, that hides `spamSuspected == true`. Keep a way to show them.

## Older enquiries

Documents created before this change have these fields empty or absent. `spamSuspected` is not `true` on them. Do not backfill. The August–November 2026 report found no `referralSource` on any enquiry, because the old question was optional and two of the three forms never asked it.
