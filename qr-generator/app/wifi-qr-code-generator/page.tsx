import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["wifi-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">How WiFi QR sharing works</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The QR payload contains the SSID (network name), security selection
          and password. Choose WPA for the form's WPA/WPA2-style option, WEP
          only for a matching legacy network, or no password for an open
          network. A scanner may offer to join using those values.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">
          Create and check your network sign
        </h2>
        <Steps
          items={[
            "Enter the SSID exactly as it appears on devices.",
            "Choose the matching security type and enter its password when required.",
            "Adjust styling without sacrificing contrast or the clear margin.",
            "Scan the preview and exported file before placing the sign.",
            "For visitors, use a guest network when that fits your network setup.",
          ]}
        />
        <p className="mt-4">
          <strong>Example:</strong> A café can encode its guest SSID and current
          WPA/WPA2-style password, then replace the printed code whenever either
          value changes.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Misspelling or changing the capitalization of the SSID.",
          "Selecting open network when a password is actually required.",
          "Sharing a code without scanning the final print.",
        ]}
        limitations={[
          "The static payload cannot update after export.",
          "Generation happens in the browser, but anyone with the code can attempt to read its payload.",
          "WiFi entries, including passwords, are excluded from QR Studio local history.",
        ]}
      />
    </ToolPage>
  );
}
