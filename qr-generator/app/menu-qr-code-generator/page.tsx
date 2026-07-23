import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["menu-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">A direct link to your live menu</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          This implementation uses the supported URL payload. It works honestly
          because the QR points to a menu you already host; it does not pretend
          to store dishes, prices, dietary data or images.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Step-by-step instructions</h2>
        <Steps
          items={[
            "Publish a fast, mobile-friendly HTTPS menu page.",
            "Paste its final public URL in the Website field.",
            "Check prices, allergens, opening hours and accessibility on the page.",
            "Test the QR in the lighting and placement guests will encounter.",
            "Keep a printed or staff-assisted alternative available.",
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-black">Useful in practice</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Use it for a menu page you can maintain at a stable URL, with
          accessible alternatives for guests who cannot scan.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Linking to a PDF that is difficult to read on a phone.",
          "Using a private editing or expiring preview URL.",
          "Placing the code where glare, damage or distance prevents scanning.",
        ]}
        limitations={[
          "QR Studio does not host or manage menu content.",
          "A changed destination URL requires a new static code.",
          "Scanning requires a compatible device and usually network access.",
        ]}
      />
    </ToolPage>
  );
}
