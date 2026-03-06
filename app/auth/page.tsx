"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Tab,
  Tabs,
} from "@heroui/react";
import { motion } from "framer-motion";
import MinimalAmbientBackground from "@/components/ui/minimal-ambient-background";

const AuthShaderShowcase = dynamic(() => import("@/components/AuthShaderShowcase"), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] w-full rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_65%_30%,rgba(30,108,233,0.35),rgba(2,6,23,0.95)_60%)] sm:h-[380px] lg:h-[78vh] lg:min-h-[700px] lg:max-h-[820px]" />
  ),
});

type StoredUser = {
  institution: string;
  email: string;
  password: string;
};

const USERS_KEY = "carboniq_users_v1";
const SESSION_KEY = "carboniq_session_v1";

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(name: string, email: string) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
}

export default function AuthPage() {
  const router = useRouter();
  const [showShader, setShowShader] = useState(false);

  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupInstitution, setSignupInstitution] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) {
      const id = idle(() => setShowShader(true));
      return () => window.cancelIdleCallback?.(id);
    }
    const timeout = window.setTimeout(() => setShowShader(true), 250);
    return () => window.clearTimeout(timeout);
  }, []);

  const goToNext = () => {
    if (typeof window === "undefined") {
      router.push("/dashboard");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next");
    const safePath = nextParam && nextParam.startsWith("/") ? nextParam : "/dashboard";
    router.push(safePath);
  };

  const handleSignup = () => {
    setError("");
    setNotice("");
    if (!signupInstitution.trim()) return setError("enter your institution name.");
    if (!signupEmail.includes("@")) return setError("enter a valid email address.");
    if (signupPassword.length < 6) return setError("password must be at least 6 characters.");

    const users = loadUsers();
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === signupEmail.trim().toLowerCase(),
    );
    if (alreadyExists) return setError("this email already has an account. try log in.");

    const newUser: StoredUser = {
      institution: signupInstitution.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
    };
    saveUsers([...users, newUser]);
    saveSession(newUser.institution, newUser.email);
    goToNext();
  };

  const handleLogin = () => {
    setError("");
    setNotice("");

    const normalizedEmail = loginEmail.trim().toLowerCase();
    if (normalizedEmail === "admin@cgu-odisha.ac.in" && loginPassword === "12345") {
      saveSession("CGU Odisha Admin", normalizedEmail);
      router.push("/cgu-odisha/dashboard");
      return;
    }

    const users = loadUsers();
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === loginPassword,
    );
    if (!matchedUser) return setError("account not found. check details or sign up first.");
    saveSession(matchedUser.institution || "Campus Admin", matchedUser.email);
    goToNext();
  };

  const handleGoogleMock = () => {
    setError("");
    setNotice("google oauth is coming soon.");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#020617] px-4 py-6 text-[#E5E7EB] sm:px-6 lg:px-10 lg:py-8">
      <MinimalAmbientBackground className="opacity-45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(30,108,233,0.16),transparent_42%)]" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-[1180px] min-w-0 gap-4 sm:gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="mx-auto flex w-full min-w-0 flex-col overflow-hidden border border-white/10 bg-[#081227]/90 shadow-[0_25px_80px_rgba(2,6,23,0.75)] lg:h-[78vh] lg:min-h-[700px] lg:max-h-[820px]">
          <CardHeader className="flex flex-col items-center gap-2 pb-2 text-center">
            <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.24em] text-[#86efac]">Carboniq Access</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white">
              welcome to carboniq
            </h1>
            <p className="max-w-md font-[family-name:var(--font-inter)] text-base leading-relaxed text-white/72">
              set up your institution access in seconds.
            </p>
          </CardHeader>

          <CardBody className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-2">
            <Tabs
              aria-label="auth tabs"
              selectedKey={activeTab}
              onSelectionChange={(key) => {
                setActiveTab(key as "signup" | "login");
                setError("");
                setNotice("");
              }}
              color="success"
              variant="solid"
              disableAnimation
              classNames={{
                tabList: "w-full rounded-xl border border-white/10 bg-[#0b1220] p-1",
                tab: "h-10 rounded-lg",
                cursor: "bg-[#12301e]",
                tabContent: "font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white/70 data-[selected=true]:text-[#9dfcb3]",
              }}
            >
              <Tab key="signup" title="Sign Up">
                <div className="space-y-3 pt-2">
                  <Button
                    onPress={handleGoogleMock}
                    variant="bordered"
                    startContent={
                      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                        <path fill="#4CAF50" d="M24 44c5.167 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.151 35.092 26.675 36 24 36c-5.212 0-9.623-3.329-11.283-7.946l-6.52 5.025C9.505 39.556 16.227 44 24 44z"/>
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.034 12.034 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 39.198 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                      </svg>
                    }
                    className="h-11 w-full rounded-xl border border-white/25 bg-white/5 font-[family-name:var(--font-inter)] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/10 active:scale-[0.99]"
                  >
                    Sign up with Google
                  </Button>

                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/40">
                    <Divider className="bg-white/15" />
                    <span>or</span>
                    <Divider className="bg-white/15" />
                  </div>

                  <Input
                    type="text"
                    label="Institution Name"
                    placeholder="Enter your institution"
                    value={signupInstitution}
                    onValueChange={setSignupInstitution}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
                      label: "font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-wide",
                      input: "font-[family-name:var(--font-inter)] text-[15px]",
                    }}
                  />
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onValueChange={setSignupEmail}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
                      label: "font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-wide",
                      input: "font-[family-name:var(--font-inter)] text-[15px]",
                    }}
                  />
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={signupPassword}
                    onValueChange={setSignupPassword}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
                      label: "font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-wide",
                      input: "font-[family-name:var(--font-inter)] text-[15px]",
                    }}
                  />
                  <Button
                    onPress={handleSignup}
                    className="h-11 w-full rounded-xl bg-[#B6FF00] font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-wide text-black transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:brightness-95 active:scale-[0.99]"
                  >
                    Create account
                  </Button>

                  <p className="pt-1 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setError("");
                        setNotice("");
                      }}
                      className="font-semibold text-[#86efac] underline-offset-4 hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </Tab>

              <Tab key="login" title="Sign In">
                <div className="space-y-3 pt-2">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onValueChange={setLoginEmail}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
                      label: "font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-wide",
                      input: "font-[family-name:var(--font-inter)] text-[15px]",
                    }}
                  />
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onValueChange={setLoginPassword}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
                      label: "font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-wide",
                      input: "font-[family-name:var(--font-inter)] text-[15px]",
                    }}
                  />
                  <Button
                    onPress={handleLogin}
                    className="h-11 w-full rounded-xl bg-[#B6FF00] font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-wide text-black transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:brightness-95 active:scale-[0.99]"
                  >
                    Continue to dashboard
                  </Button>

                  <p className="pt-2 text-center text-sm text-white/70">
                    New to Carboniq?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("signup");
                        setError("");
                        setNotice("");
                      }}
                      className="font-semibold text-[#86efac] underline-offset-4 hover:underline"
                    >
                      Create account
                    </button>
                  </p>
                </div>
              </Tab>
            </Tabs>

            {notice ? <p className="mt-4 text-sm text-[#bef264]">{notice}</p> : null}
            {error ? <p className="mt-2 text-sm text-[#fca5a5]">{error}</p> : null}

            <p className="mt-4 text-center text-sm text-white/65">
              back to{" "}
              <Link href="/" className="text-[#86efac] underline-offset-4 hover:underline">
                home
              </Link>
            </p>
          </CardBody>
        </Card>

        {showShader ? (
          <AuthShaderShowcase
            className="h-[320px] sm:h-[380px] lg:h-[78vh] lg:min-h-[700px] lg:max-h-[820px]"
            heading="turn campus data into climate action."
            body="built for institutions that want measurable progress, clear accountability, and a stronger sustainability story."
          />
        ) : (
          <div className="h-[320px] w-full rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_65%_30%,rgba(30,108,233,0.35),rgba(2,6,23,0.95)_60%)] sm:h-[380px] lg:h-[78vh] lg:min-h-[700px] lg:max-h-[820px]" />
        )}
      </motion.div>
    </main>
  );
}
