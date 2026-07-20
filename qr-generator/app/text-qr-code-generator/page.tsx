import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["text-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">Plain text lives inside the QR</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Unlike a URL code, a text code embeds the message directly. It can
          hold a short instruction, public identifier or brief message without
          sending a reader to a website.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Encode a concise message</h2>
        <Steps
          items={[
            "Write the exact text a scanner should display.",
            "Remove unnecessary wording to reduce QR density.",
            "Generate and inspect the preview.",
            "Test the exported code with relevant scanner apps.",
            "Regenerate the code if the message changes.",
          ]}
        />
        <p className="mt-4">
          <strong>Example:</strong> Encode “Equipment ID: LAB-042” or a short
          public setup instruction. Do not embed passwords, recovery codes or
          other secrets.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Pasting a long document instead of a concise instruction.",
          "Embedding secrets that any scanner can reveal.",
          "Expecting scanner apps to format plain text consistently.",
        ]}
        limitations={[
          "The static message cannot be edited after export.",
          "Longer content creates a denser QR that may be harder to reproduce.",
          "Generation is local in the browser; non-WiFi items may be retained in local browser history.",
        ]}
      />
    </ToolPage>
  );
}
