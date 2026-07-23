import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["phone-qr-code-generator"];
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
});
export default function Page() {
  return (
    <ToolPage tool={tool}>
      <section>
        <h2 className="text-3xl font-black">How telephone QR codes work</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The generator prefixes the entered number with tel:. A compatible
          phone can recognize that URI and offer a dial action. The scanner and
          operating system—not QR Studio—control the prompt.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Step-by-step instructions</h2>
        <Steps
          items={[
            "Enter a plus sign, country code and phone number where possible.",
            "Remove labels and extensions unless you have tested their handling.",
            "Scan and verify the number shown in the dialer.",
            "Test on the phone types your audience uses.",
            "Export and test the code at its final size.",
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-black">Useful in practice</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Use it on a business card or appointment notice when reducing
          number-entry errors is helpful, while always printing the number too.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Omitting the country code for an international audience.",
          "Encoding a typo and testing only visual appearance.",
          "Presenting the code as a guaranteed emergency contact method.",
        ]}
        limitations={[
          "QR Studio never initiates or completes a call.",
          "Dialer and extension behavior varies by device.",
          "Do not rely on a QR code for emergency reliability or sole access.",
        ]}
      />
    </ToolPage>
  );
}
