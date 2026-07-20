import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["url-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">A direct, static website link</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Enter the complete HTTPS URL, including the correct path and campaign
          parameters. QR Studio encodes that address; it does not inspect,
          shorten or safety-scan it.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Create a URL QR code</h2>
        <Steps
          items={[
            "Open the intended page on a phone and copy its complete HTTPS URL.",
            "Paste it into the Website field and confirm every character.",
            "Customize the code while preserving contrast and quiet space.",
            "Test redirects and the mobile landing page from the preview.",
            "Download PNG, SVG or PDF and scan that actual export.",
          ]}
        />
        <p className="mt-4">
          <strong>Example:</strong> Encode <code>https://example.com/menu</code>{" "}
          for a menu sign only after confirming the path loads correctly on
          mobile.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Encoding a draft, login-only or desktop-only page.",
          "Using a misleading label or destination.",
          "Testing the typed URL but not its redirects.",
        ]}
        limitations={[
          "The destination cannot be edited in the downloaded static code.",
          "QR Studio does not perform malware or reputation checks.",
          "PNG is raster; SVG is scalable; PDF supports document workflows. Test the chosen output.",
        ]}
      />
    </ToolPage>
  );
}
