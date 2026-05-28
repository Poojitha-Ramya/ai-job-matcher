import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Sparkles,
  Search,
  Bookmark,
  History,
  CheckCircle,
  FileText,
  UserCheck,
  TrendingUp,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "AI Job Matcher - Premium Student & Fresher Job Platform" },
      {
        name: "description",
        content:
          "Instant AI-powered resume analyzer, ATS scorer, and live job scraper built for students and entry-level job seekers.",
      },
    ],
  }),
});

function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="border-b border-border/40 bg-card/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            <div className="rounded-lg bg-primary p-1.5 text-primary-foreground transition-transform group-hover:scale-105">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              AI Job<span className="text-primary font-extrabold">Matcher</span>
            </span>
          </div>

          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-sm font-semibold">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="text-sm font-semibold text-destructive border-destructive/20 hover:bg-destructive/10"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button variant="ghost" className="text-sm font-semibold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="text-sm font-semibold rounded-xl px-4 py-2">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          The future of student job discovery is here
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-4xl">
          Supercharge Your Student Job Search with{" "}
          <span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-primary/80">
            AI Matcher
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Upload your resume to instantly check your ATS compatibility, extract skills, and scrape
          live entry-level jobs and internships tailored exactly to your background.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 w-full max-w-md">
          {user ? (
            <Link to="/dashboard" className="w-full">
              <Button className="h-12 w-full rounded-xl text-base font-semibold shadow-elegant flex items-center justify-center gap-2 group">
                Enter Workspace Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth/signup" className="w-full sm:flex-1">
                <Button className="h-12 w-full rounded-xl text-base font-semibold shadow-elegant flex items-center justify-center gap-2 group">
                  Get Started (Free)
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth/signin" className="w-full sm:flex-1">
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl text-base font-semibold border-border bg-card/60 backdrop-blur-md"
                >
                  Access Account
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Dashboard Preview Representation */}
        <div className="w-full max-w-4xl border border-border bg-card/50 rounded-2xl p-4 shadow-elegant mt-12 overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-border/60 text-xs text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 font-medium">demo_workspace_dashboard.tsx</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 pt-4 text-left">
            <div className="border border-border/80 bg-background/80 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                ATS Rank
              </span>
              <div className="relative mt-2 flex items-center justify-center h-20 w-20 rounded-full border-4 border-primary border-r-transparent">
                <span className="text-lg font-extrabold text-foreground">85%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Excellent skill validation</p>
            </div>

            <div className="md:col-span-2 border border-border/80 bg-background/80 rounded-xl p-4 space-y-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                Extracted Skills
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "HTML",
                  "CSS",
                  "TailwindCSS",
                  "Node.js",
                  "SQL",
                ].map((s, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="border-t border-border/60 pt-3 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                  Matched Roles
                </span>
                <div className="flex items-center justify-between text-xs border border-border bg-card p-2 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground truncate">Frontend Engineer Intern</p>
                    <p className="text-[10px] text-muted-foreground">Vercel Inc. • Remote</p>
                  </div>
                  <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[9px]">
                    94% score
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="bg-card py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Platform Features
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Everything students and freshers need to streamline their initial tech internship and
              job applications.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12">
            {/* Feature 1 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">AI Resume Parser</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Upload your PDF or Word doc. Our AI extracts core programming skills and experience
                fields to build a clean profile.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Live Web Scrapers</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connects seamlessly to n8n backend workflows. Scrapes online job postings matching
                your resume automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">ATS Match Rating</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Provides an instant compatibility score out of 100, advising which skills you should
                add to bypass resume filters.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Smart Filters</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Filter jobs by role type (Frontend, Backend, Fullstack, Data), location preference
                (remote, onsite), and job style.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <Bookmark className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Saved Jobs Vault</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Bookmark exciting job opportunities. Track application statuses, open detailed
                listings, and apply with ease.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border border-border bg-background p-6 rounded-2xl shadow-elegant space-y-4 hover:-translate-y-0.5 transition-all">
              <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Secure Persistence</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Integrates with Supabase Database and Supabase Auth. Safe password handling and
                database protection for your profile data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="font-bold text-foreground">AI Job Matcher</span>
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
