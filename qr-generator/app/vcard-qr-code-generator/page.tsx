import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["vcard-qr-code-generator"];
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
          Contact details in a vCard payload
        </h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The current vCard 3.0 output can include name, email, phone, company,
          job title, website and address. Keep optional fields concise: more
          characters make the QR denser.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Build a contact card</h2>
        <Steps
          items={[
            "Enter a recognizable first or last name.",
            "Add only the email, phone and professional details you intend to share publicly.",
            "Generate the code and review the visible values.",
            "Test contact import on multiple relevant devices or apps.",
            "Create a new code whenever a field changes.",
          ]}
        />
        <p className="mt-4">
          <strong>Example:</strong> A consultant might include a work name,
          business phone, company, title and public portfolio URL while omitting
          a home address.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Including every field when only a few are useful.",
          "Publishing personal details without considering who can scan them.",
          "Assuming all contacts apps map fields in exactly the same way.",
        ]}
        limitations={[
          "Contact import behavior varies by device and app.",
          "Personal details are embedded in a readable static payload.",
          "Updating a contact requires generating and distributing a new QR code.",
        ]}
      />
    </ToolPage>
  );
}
