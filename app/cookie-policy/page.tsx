import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Supplied",
  description:
    "Cookie Policy for Supplied Agency Ltd — how we use cookies and similar technologies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="March 24, 2026">
      <p>
        This Cookie Policy explains how Supplied Agency Ltd (&ldquo;
        <strong>Company</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo;
        &ldquo;<strong>us</strong>,&rdquo; and &ldquo;<strong>our</strong>
        &rdquo;) uses cookies and similar technologies to recognize you when you
        visit our website at suppliedpackaging.com (&ldquo;<strong>Website</strong>
        &rdquo;). It explains what these technologies are and why we use them, as
        well as your rights to control our use of them.
      </p>
      <p>
        In some cases we may use cookies to collect personal information, or that
        becomes personal information if we combine it with other information.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small data files that are placed on your computer or mobile
        device when you visit a website. Cookies are widely used by website
        owners in order to make their websites work, or to work more efficiently,
        as well as to provide reporting information.
      </p>
      <p>
        Cookies set by the website owner (in this case, Supplied Agency Ltd) are
        called &ldquo;first-party cookies.&rdquo; Cookies set by parties other
        than the website owner are called &ldquo;third-party cookies.&rdquo;
        Third-party cookies enable third-party features or functionality to be
        provided on or through the website (e.g., advertising, interactive
        content, and analytics). The parties that set these third-party cookies
        can recognize your computer both when it visits the website in question
        and also when it visits certain other websites.
      </p>

      <h2>Why Do We Use Cookies?</h2>
      <p>
        We use a minimal number of cookies for technical reasons in order for our
        Website to operate correctly. We refer to these as &ldquo;essential&rdquo;
        or &ldquo;strictly necessary&rdquo; cookies. Our Website is built to
        minimise the use of cookies and tracking technologies wherever possible.
      </p>

      <h2>Cookies We Use</h2>

      <h3>Essential / Strictly Necessary Cookies</h3>
      <p>
        These cookies are required for the Website to function and cannot be
        switched off. They are usually only set in response to actions made by
        you which amount to a request for services, such as setting your privacy
        preferences or filling in forms.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Provider</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>__next</td>
            <td>Used by the website framework to maintain session state and ensure pages load correctly.</td>
            <td>suppliedpackaging.com</td>
            <td>Session</td>
          </tr>
        </tbody>
      </table>

      <h3>Session Storage</h3>
      <p>
        Our Website uses browser session storage (not cookies) in certain areas
        to temporarily store information during your browsing session. This data
        is automatically cleared when you close your browser tab. For example,
        the Knowledge Hub may use session storage to maintain conversation
        context during your visit.
      </p>

      <h3>Third-Party Cookies</h3>
      <p>
        We do not currently use any third-party advertising or analytics cookies
        on our Website. If this changes in the future, we will update this Cookie
        Policy accordingly and provide appropriate notice.
      </p>

      <h2>How Can I Control Cookies?</h2>
      <p>
        You have the right to decide whether to accept or reject cookies. Because
        we only use essential cookies required for the Website to function, these
        cannot be disabled without affecting your ability to use the site.
      </p>
      <p>
        You can set or amend your web browser controls to accept or refuse
        cookies. If you choose to reject cookies, you may still use our Website
        though your access to some functionality may be restricted.
      </p>
      <p>
        The following browsers provide guidance on managing cookies: Chrome,
        Firefox, Safari, Edge, and Opera. Please consult your browser&rsquo;s
        help menu for more information.
      </p>

      <h2>What About Other Tracking Technologies?</h2>
      <p>
        Cookies are not the only way to recognize or track visitors to a website.
        We may use other, similar technologies from time to time, like web
        beacons (sometimes called &ldquo;tracking pixels&rdquo; or &ldquo;clear
        gifs&rdquo;). We do not currently use any such tracking technologies on
        our Website.
      </p>

      <h2>How Often Will You Update This Cookie Policy?</h2>
      <p>
        We may update this Cookie Policy from time to time in order to reflect,
        for example, changes to the cookies we use or for other operational,
        legal, or regulatory reasons. Please therefore revisit this Cookie Policy
        regularly to stay informed about our use of cookies and related
        technologies.
      </p>
      <p>
        The date at the top of this Cookie Policy indicates when it was last
        updated.
      </p>

      <h2>Where Can I Get Further Information?</h2>
      <p>
        If you have any questions about our use of cookies or other technologies,
        please contact us at:
      </p>
      <p>
        Supplied Agency Ltd<br />
        167-169 Great Portland Street<br />
        5th Floor<br />
        London W1W 5PF<br />
        United Kingdom
      </p>
      <p>
        Email: hello@suppliedpackaging.com
      </p>
    </LegalPageLayout>
  );
}
