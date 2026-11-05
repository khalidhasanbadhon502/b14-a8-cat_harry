import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden bg-background px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 42%, rgba(245,158,11,0.30), rgba(180,83,9,0.12) 45%, rgba(10,10,10,0) 75%)",
        }}
      />

      <div className="relative flex items-center justify-center gap-1 text-8xl leading-none font-bold tracking-tight text-foreground md:text-9xl">
        <span>4</span>
        <Image
          src="/images/favicon-64.png"
          alt="0"
          width={140}
          height={140}
          priority
          className="h-[0.78em] w-[0.78em]"
        />
        <span>4</span>
      </div>

      <h1 className="relative mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Cut! This scene doesn&apos;t exist.
      </h1>
      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        The page you&apos;re looking for has left the set. Head back and find
        your next space.
      </p>

      <Button
        render={<Link href="/" />}
        nativeButton={false}
        className="relative mt-8 bg-amber-400 px-6 text-black hover:bg-amber-300"
      >
        Return to Home
      </Button>
    </div>
  );
}
