import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "1,200+", label: "Creative spaces" },
  { value: "10k+", label: "Bookings completed" },
  { value: "4.9", label: "Average rating" },
  { value: "24/7", label: "Host support" },
];

const values = [
  {
    title: "Transparency",
    description:
      "Clear hourly rates and deposits, with no hidden fees at checkout.",
  },
  {
    title: "Trust",
    description:
      "Verified profiles and liability protection on every confirmed booking.",
  },
  {
    title: "Craft",
    description:
      "We celebrate the people who make things, and the spaces that help them.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl leading-[1.15] font-bold tracking-tight md:text-5xl">
              We help creators find the room where great work happens.
            </h1>
            <div
              aria-hidden
              className="mt-5 h-1 w-16 rounded-full bg-amber-400"
            />
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              StudioSpace connects filmmakers, photographers, podcasters and
              musicians with verified studio hosts. Our mission is to make
              professional creative spaces accessible, transparent and
              instantly bookable.
            </p>
            <Button
              render={<Link href="/studios" />}
              nativeButton={false}
              className="mt-8 bg-amber-400 text-black hover:bg-amber-300"
            >
              Explore Studios
            </Button>
          </div>

          <div
            aria-hidden
            className="aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]"
            style={{
              background:
                "linear-gradient(125deg, #c17a33 0%, #7a5433 22%, #3a3a4f 50%, #232640 72%, #14162c 100%)",
            }}
          />
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-amber-400">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            Our Values
          </h2>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
