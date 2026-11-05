import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    title: "Discover Spaces",
    description: "Browse verified studios and filter by category, price and capacity.",
  },
  {
    title: "Select Shoot Hours",
    description: "Pick a date and time slot with live availability.",
  },
  {
    title: "Book Instantly",
    description: "See transparent pricing and confirm in one click.",
  },
  {
    title: "Create & Produce",
    description: "Arrive, set up and shoot. Leave a review afterwards.",
  },
];

const sides = [
  {
    title: "For Creators",
    items: [
      "Search by category, price and capacity",
      "Check real-time availability before you book",
      "Pay a clear hourly rate plus a refundable deposit",
      "Download a PDF invoice for every confirmed booking",
    ],
  },
  {
    title: "For Hosts",
    items: [
      "List your space in a few minutes",
      "Set your own hourly rate and amenities",
      "Double-booking protection on every slot",
      "Manage listings and bookings from one dashboard",
    ],
  },
];

const faqs = [
  {
    question: "How do I book a studio?",
    answer:
      "Pick a studio, choose your date and time slot, then confirm in one click. You'll see the hourly rate, fees and refundable deposit before you pay.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. Cancel at least 48 hours before your session for a full refund. Reschedules are subject to the host's availability.",
  },
  {
    question: "What does the security deposit cover?",
    answer:
      "The deposit is held in case of damage or extra cleaning. It's released back to your card within 3 days of a completed booking.",
  },
  {
    question: "How do hosts get paid?",
    answer:
      "Payouts are sent to your linked account 24 hours after the session ends, minus StudioSpace's service fee.",
  },
  {
    question: "Are studios and hosts verified?",
    answer:
      "Every listing is reviewed before it goes live, and hosts complete identity verification so creators can book with confidence.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(245,158,11,0.32), rgba(180,83,9,0.12) 45%, rgba(10,10,10,0) 75%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 text-center md:pt-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            StudioSpace Works
          </h1>
          <div
            aria-hidden
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-400"
          />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            From finding the right room to wrapping your shoot, booking takes
            minutes, not days.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl px-6 pb-16 md:pb-20">
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card px-5 py-7 text-center"
              >
                <span
                  aria-hidden
                  className="mx-auto grid size-11 place-items-center rounded-full bg-amber-400 text-lg font-bold text-black"
                >
                  {index + 1}
                </span>
                <h2 className="mt-4 text-base font-semibold text-foreground">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for Both Sides
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
          />
          <p className="mt-4 text-center text-muted-foreground">
            Whether you rent a space or list one, we handle the details.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sides.map((side) => (
              <div
                key={side.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-lg font-semibold text-amber-400">
                  {side.title}
                </h3>
                <ul className="mt-3">
                  {side.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-3 text-sm text-foreground/90 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
          />

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-card px-6 py-1">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="not-last:border-border"
                >
                  <AccordionTrigger className="py-4 text-base text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
