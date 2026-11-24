import { defineField, defineType } from "sanity";

const readOnlyString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    readOnly: true,
  });

/** Stored, but ciphertext. Declared so Studio does not flag them as unknown. */
const hiddenString = (name: string) =>
  defineField({
    name,
    title: name,
    type: "string",
    readOnly: true,
    hidden: true,
  });

export const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    readOnlyString("source", "Form"),
    readOnlyString("subject", "Subject"),
    readOnlyString("heardAbout", "How they heard about us"),
    defineField({
      name: "heardAboutDetail",
      title: "How they heard about us (detail)",
      type: "text",
      rows: 3,
      readOnly: true,
    }),
    readOnlyString("referrer", "Referrer"),
    readOnlyString("landingPage", "Landing page"),
    readOnlyString("utmSource", "UTM source"),
    readOnlyString("utmMedium", "UTM medium"),
    readOnlyString("utmCampaign", "UTM campaign"),
    defineField({
      name: "attributionCapturedAt",
      title: "Attribution captured at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "spamSuspected",
      title: "Possible spam",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    readOnlyString("productType", "Product"),
    readOnlyString("estimatedQuantity", "Estimated quantity"),
    defineField({
      name: "packagingTypes",
      title: "Packaging types",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
      hidden: true,
    }),
    hiddenString("volumeRaw"),
    defineField({
      name: "volumeQty",
      title: "Volume quantity",
      type: "number",
      readOnly: true,
      hidden: true,
    }),
    hiddenString("volumeBand"),
    defineField({
      name: "belowMoq",
      title: "Below MOQ",
      type: "boolean",
      readOnly: true,
      hidden: true,
    }),
    hiddenString("complexity"),
    hiddenString("specNotes"),
    defineField({
      name: "plugAndPlayFit",
      title: "Plug and play",
      type: "boolean",
      readOnly: true,
      hidden: true,
    }),
    hiddenString("kind"),
    hiddenString("reviewStatus"),
    hiddenString("name"),
    hiddenString("company"),
    hiddenString("email"),
    hiddenString("phone"),
    hiddenString("message"),
    hiddenString("extra"),
    hiddenString("notes"),
  ],
  orderings: [
    {
      title: "Submitted, newest",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      heardAbout: "heardAbout",
      source: "source",
      submittedAt: "submittedAt",
      spamSuspected: "spamSuspected",
    },
    prepare({ heardAbout, source, submittedAt, spamSuspected }) {
      const title = heardAbout || source || "Enquiry";
      return {
        title: spamSuspected ? `[Possible spam] ${title}` : title,
        subtitle: submittedAt || source || "",
      };
    },
  },
});
