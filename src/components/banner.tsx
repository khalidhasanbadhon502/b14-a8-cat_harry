import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[35%] right-[6%] h-[480px] w-[640px] -translate-y-1/3 rounded-full bg-amber-500/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
        <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-sm text-amber-600 dark:text-amber-400">
          1,200+ creative spaces
        </span>

        <h1 className="mt-6 text-6xl leading-[1.05] font-bold tracking-tight text-foreground md:text-7xl">
          Find the Perfect Space
          <br />
          to Create.
        </h1>

        <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
          Book photo studios, sound stages and podcast rooms by the hour.
          Verified hosts, transparent pricing, instant booking.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            render={<Link href="/studios" />}
            nativeButton={false}
            size="lg"
            className="bg-amber-400 text-black hover:bg-amber-300"
          >
            Explore Studios
          </Button>
          <Button
            render={<Link href="/add-studio" />}
            nativeButton={false}
            size="lg"
            variant="outline"
          >
            Host Your Space
          </Button>
        </div>
      </div>
    </section>
  );
}
