const steps = [
  {
    title: "Discover Spaces",
    description: "Filter by category, price and capacity.",
  },
  {
    title: "Select Shoot Hours",
    description: "Pick a date and time slot.",
  },
  {
    title: "Book Instantly",
    description: "Confirm with transparent pricing.",
  },
  {
    title: "Create & Produce",
    description: "Arrive, set up and shoot.",
  },
];

export function HowBookingWorks() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How Booking Works
        </h2>
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
        />
        <p className="mt-4 text-center text-muted-foreground">
          From idea to production in four steps.
        </p>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col items-center text-center"
            >
              <span
                aria-hidden
                className="grid size-12 place-items-center rounded-full bg-amber-400 text-lg font-bold text-black"
              >
                {index + 1}
              </span>
              <span className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
