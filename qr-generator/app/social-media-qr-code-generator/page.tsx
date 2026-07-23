import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["social-media-qr-code-generator"];
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
          One profile, one direct destination
        </h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Paste the full public HTTPS URL for one profile. A direct URL is
          portable and transparent; this tool deliberately does not fake a
          multi-link landing page or platform integration.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Step-by-step instructions</h2>
        <Steps
          items={[
            "Open the public profile while signed out and copy its full URL.",
            "Paste the URL and verify the account name and platform domain.",
            "Customize while maintaining contrast and a clear quiet zone.",
            "Scan the preview and final export on several devices.",
            "Replace the code if the profile URL changes.",
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-black">Useful in practice</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Use it on packaging or a display to link directly to one verified
          public profile without an intermediary redirect.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Encoding an app-only share link that fails in browsers.",
          "Linking to a private, deleted or misspelled account.",
          "Implying that the static code measures scans or follows.",
        ]}
        limitations={[
          "Only one URL is supported; no multi-link page is created.",
          "QR Studio cannot control platform login prompts or availability.",
          "The code provides no analytics, verification or follower functionality.",
        ]}
      />
    </ToolPage>
  );
}
