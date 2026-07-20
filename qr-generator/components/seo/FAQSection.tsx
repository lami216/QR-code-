export type FAQ = { question: string; answer: string };

export function FAQSection({
  items,
  heading = "Frequently asked questions",
}: {
  items: readonly FAQ[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-3xl font-black">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 px-6 dark:divide-slate-800 dark:border-slate-800">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="cursor-pointer list-none font-bold">
              {item.question}
              <span aria-hidden="true" className="float-right text-teal-600">
                +
              </span>
            </summary>
            <p className="mt-3 pr-8 leading-7 text-slate-600 dark:text-slate-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
