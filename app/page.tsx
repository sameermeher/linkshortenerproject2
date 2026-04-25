import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LinkIcon, BarChart2, ShieldCheck, Zap, Globe, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, shareable short link in milliseconds — no configuration needed.",
  },
  {
    icon: BarChart2,
    title: "Click Analytics",
    description:
      "Track how many times each link has been clicked and see which links perform best from your dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your links are tied to your account. Only you can view, edit, or delete the links you create.",
  },
  {
    icon: Globe,
    title: "Always Available",
    description:
      "Built on serverless infrastructure so your short links redirect reliably at any scale, any time.",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description:
      "Copy your shortened URL to the clipboard instantly — no selecting, no highlighting.",
  },
  {
    icon: LinkIcon,
    title: "Custom Slugs",
    description:
      "Choose a memorable slug for your link instead of a random string to make sharing even easier.",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign up for free",
    description: "Create an account in seconds using your email or social login.",
  },
  {
    number: "02",
    title: "Paste your long URL",
    description: "Drop any URL into the input field in your dashboard.",
  },
  {
    number: "03",
    title: "Share your short link",
    description: "Copy the generated short link and share it anywhere.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <LinkIcon className="size-3.5" />
          <span>The simplest URL shortener</span>
        </div>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
          Shorten, Share &amp;{" "}
          <span className="text-primary">Track</span> your links
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Turn long, unwieldy URLs into clean short links in seconds. Monitor
          click performance from a simple dashboard — all in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Get started for free
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg" className="px-8">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Everything you need
            </h2>
            <p className="mt-3 text-muted-foreground">
              A focused set of features to manage your links without the
              complexity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className={cn(
                  "rounded-xl border border-border bg-background p-6",
                  "transition-shadow hover:shadow-md"
                )}
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Go from a long URL to a shareable short link in three steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="flex flex-col items-center text-center">
                <span className="mb-4 text-4xl font-extrabold text-primary/30">
                  {number}
                </span>
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Ready to shorten your first link?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Create a free account and start building your link library in
            under a minute.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="px-10">
              Create free account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
