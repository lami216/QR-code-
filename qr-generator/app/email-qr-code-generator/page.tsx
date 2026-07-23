import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["email-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">How mailto QR codes work</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The payload uses the standard mailto format. The address comes first;
          subject and body are safely encoded as query values. A scan can
          prepare a draft in a configured email app, but cannot deliver it.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Step-by-step instructions</h2>
        <Steps
          items={[
            "Enter the intended recipient address.",
            "Add an optional subject and concise message.",
            "Scan the preview and confirm every decoded field.",
            "Check the draft in more than one relevant email app.",
            "Download and test the final exported file.",
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-black">Useful in practice</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Use it on a support card to prepare a correctly addressed request
          while leaving the sender in control of review and delivery.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Expecting a scan to send a message.",
          "Putting private information in a publicly displayed draft.",
          "Skipping tests with special characters or long body text.",
        ]}
        limitations={[
          "Email apps may interpret draft fields differently.",
          "The payload is generated locally, but non-WiFi codes may be stored in browser local history.",
          "Anyone with the code can read its recipient and draft content.",
        ]}
      />
    </ToolPage>
  );
}
