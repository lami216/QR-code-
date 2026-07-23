import { NoteGrid, Steps, ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/seo/metadata";
import { tools } from "@/lib/seo/tools";

const tool = tools["calendar-qr-code-generator"];
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
          What the calendar payload contains
        </h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          The tool creates a compact VCALENDAR 2.0 event with summary, start,
          end, location and description. Compatible apps may offer to import it;
          QR Studio does not create a hosted calendar or attendee invitation.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-black">Step-by-step instructions</h2>
        <Steps
          items={[
            "Enter a clear title, start and end date-time.",
            "Add a concise location and description.",
            "Confirm the end occurs after the start.",
            "Scan into representative calendar apps and inspect every field.",
            "Test again from another timezone before broad distribution.",
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-black">Useful in practice</h2>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
          Use it on an event poster after testing the exact local time and venue
          in the calendar apps your attendees use.
        </p>
      </section>
      <NoteGrid
        mistakes={[
          "Assuming the displayed timezone field is embedded as a TZID.",
          "Publishing an end time before the start time.",
          "Treating a static event as an updateable invitation.",
        ]}
        limitations={[
          "Current serialization uses floating local date-times without TZID or UTC conversion.",
          "Calendar import behavior differs between scanners and apps.",
          "No organizer, attendees, recurrence, reminders or update identifiers are included.",
        ]}
      />
    </ToolPage>
  );
}
