"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@supabase/supabase-js";
import { MoveRight, Link2, Share2, BarChart3, Shield } from "lucide-react";
import Link from "next/link";
export type LandingPageProps = {
  user: User | null;
};

export default function LandingPage({ user }: LandingPageProps) {
  const { isAuthenticated, signOut, loading } = useAuth(user);
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Link2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">One Link</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Resources
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <>
              {isAuthenticated ? (
                <>
                  <Button onClick={signOut} disabled={loading}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="text-sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="rounded-full px-6">Get Started</Button>
                  </Link>
                </>
              )}
            </>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium">
                <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                  NEW
                </span>
                Custom domains now available
              </div>
              <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
                The only link your{" "}
                <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  bio will ever need.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                One Link is the ultimate solution to manage and share your
                multiple social links, products, and content from a single,
                beautiful landing page.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="h-14 rounded-full px-8 text-lg">
                    Claim your link <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-lg"
                >
                  See examples
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Join 10,000+ creators sharing their work.
              </p>
            </div>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 -z-10 h-full w-full opacity-50">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted/30 py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to grow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Simple tools to manage your online presence with ease.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Share2 className="h-6 w-6 text-primary" />}
                title="Consolidated Hub"
                description="One single link to rule them all. share everything you do in one place."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                title="Deep Analytics"
                description="Understand your audience with detailed click tracking and visitor data."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-primary" />}
                title="Safe & Secure"
                description="Enterprise-grade security for your data and your followers' privacy."
              />
              <FeatureCard
                icon={<MoveRight className="h-6 w-6 text-primary" />}
                title="Fast Setup"
                description="Go live in less than 3 minutes with our intuitive builder."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground sm:px-6">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground">
              LinkedIn
            </a>
          </div>
          <p>© {new Date().getFullYear()} One Link Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border bg-background p-8 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
