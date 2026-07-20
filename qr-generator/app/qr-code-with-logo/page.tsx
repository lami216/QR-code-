import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["qr-code-with-logo"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">
          Use a logo without hiding the code
        </h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The shared design controls keep logo selection alongside color, module
          and error-correction settings. A centered logo covers data modules, so
          it can reduce scannability even when the design looks polished.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Customize carefully</h2>
        <Steps
          items={[
            "Enter and verify the URL destination.",
            "In design settings, choose a clear logo with modest dimensions.",
            "Keep strong foreground/background contrast and the quiet zone clear.",
            "Select an appropriate error-correction level; higher is not a substitute for testing.",
            "Scan the actual PNG, SVG or PDF export at its final display or print size.",
          ]}
        />
        <p className="mt-4">
          <strong>Example:</strong> Add a small brand mark to a product-help
          URL, leaving the corner finder patterns and outer clear margin
          unobstructed.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Using a large logo that covers too many modules.",
          "Placing graphics in the quiet zone around the QR.",
          "Assuming high error correction guarantees a scan.",
        ]}
        limitations={[
          "Logo processing remains browser-side; no upload backend is added.",
          "Busy logos and low contrast can harm recognition.",
          "Physical size, material, lighting and scanner software still affect results.",
        ]}
      />
    </ToolPage>
  );
}
