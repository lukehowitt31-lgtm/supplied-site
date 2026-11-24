# Enquiries module — attribution fields

Handoff for the separate pipeline app. The website now stores attribution on the Sanity `enquiry` document as plain fields, and copies the same values onto the existing webhook and pull payload as **optional** keys.

Do not require the new keys. Ignore them if this app has not been updated yet. Existing payload fields are unchanged, including `extra.referralSource`.

Personal data (name, email, phone, company, message, cost-audit extras) is still only in the encrypted blob on the Sanity document, and still decrypted in the webhook the same way as before. The new fields are not encrypted, so they can be filtered in GROQ.

## Fields to read

| Field | Meaning |
| --- | --- |
| `heardAbout` | Required answer. One of: Google search, ChatGPT or another AI assistant, LinkedIn, Recommendation from someone, Event, Email from Supplied, Other. |
| `heardAboutDetail` | Optional free text when they picked Recommendation or Other. |
| `referrer` | `document.referrer` from the first page of the visit. Often empty for a direct visit. |
| `landingPage` | Path of that first page, such as `/products/mailer-boxes`. |
| `utmSource`, `utmMedium`, `utmCampaign` | Campaign tags from that first page. Empty when there were none. |
| `attributionCapturedAt` | When the first-visit record was stored in the browser. ISO 8601. Not the submit time. |
| `spamSuspected` | `true` when the message matched an agency-pitch phrase, or the form had no usable render timestamp. The enquiry is still saved. |

`extra.referralSource` is still written, and it matches `heardAbout`. Read the plain field. Use the encrypted one only for older documents.

On the webhook and `GET /api/pipeline/enquiries`, these arrive under an optional `attribution` object, plus optional `spamSuspected`. See `PIPELINE_ENQUIRY_API.md`. A client that ignores unknown JSON keys does not need a change to keep receiving enquiries.

`spamSuspected` does not change `module` or `recommendedAction`. The existing `qualification.kind` rules are unchanged. An enquiry whose message matches the older spam rules can still have `kind: "spam"` as well as `spamSuspected: true`.

## GROQ

```groq
*[_type == "enquiry"] | order(submittedAt desc) {
  _id,
  submittedAt,
  source,
  subject,
  heardAbout,
  heardAboutDetail,
  referrer,
  landingPage,
  utmSource,
  utmMedium,
  utmCampaign,
  attributionCapturedAt,
  spamSuspected
}
```

Hide flagged rows without hiding older documents, where the field is missing:

```groq
*[_type == "enquiry" && spamSuspected != true]
```

## Suggested UI

- On each enquiry, a source badge from `heardAbout`. When that is empty, show “Unknown” (that is every enquiry from before this change).
- A second line when present: `utmSource` / `utmMedium` / `utmCampaign`, otherwise the referrer host, otherwise the landing path.
- Show `heardAboutDetail` under the badge when it is set.
- A “Possible spam” badge when `spamSuspected` is true. Do not auto-delete these.
- A filter, default on, that hides `spamSuspected == true`. Keep a way to show them.

## Older enquiries

Documents created before this change have these fields empty or absent. `spamSuspected` is not `true` on them. Do not backfill. The August–November 2026 report found no `referralSource` on any enquiry, because the old question was optional and two of the three forms never asked it.
