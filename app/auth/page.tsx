"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import AuthShaderShowcase from "@/components/AuthShaderShowcase";

type StoredUser = {
  institution: string;
  name: string;
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

  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupInstitution, setSignupInstitution] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

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
    if (!signupName.trim()) return setError("enter your name.");
    if (!signupEmail.includes("@")) return setError("enter a valid email address.");
    if (signupPassword.length < 6) return setError("password must be at least 6 characters.");

    const users = loadUsers();
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === signupEmail.trim().toLowerCase(),
    );
    if (alreadyExists) return setError("this email already has an account. try log in.");

    const newUser: StoredUser = {
      institution: signupInstitution.trim(),
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
    };
    saveUsers([...users, newUser]);
    saveSession(newUser.name, newUser.email);
    goToNext();
  };

  const handleLogin = () => {
    setError("");
    setNotice("");
    const users = loadUsers();
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
        user.password === loginPassword,
    );
    if (!matchedUser) return setError("account not found. check details or sign up first.");
    saveSession(matchedUser.name, matchedUser.email);
    goToNext();
  };

  const handleGoogleMock = () => {
    setError("");
    setNotice("google oauth is coming soon.");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-8 text-[#E5E7EB] sm:px-6 lg:px-10 lg:py-10">
      <MinimalAmbientBackground className="opacity-45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(30,108,233,0.16),transparent_42%)]" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="mx-auto w-full max-w-xl border border-white/10 bg-[#081227]/90 shadow-[0_25px_80px_rgba(2,6,23,0.75)] lg:mx-0">
          <CardHeader className="flex flex-col items-start gap-2 pb-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[#86efac]">Carboniq Access</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white">
              build a lower-carbon campus
            </h1>
            <p className="text-sm text-white/70">create your college account or sign in to continue.</p>
          </CardHeader>

          <CardBody className="pt-5">
            <Tabs
              aria-label="auth tabs"
              selectedKey={activeTab}
              onSelectionChange={(key) => {
                setActiveTab(key as "signup" | "login");
                setError("");
                setNotice("");
              }}
              color="success"
              variant="underlined"
              classNames={{
                tabList: "gap-8",
                tab: "px-0 h-10",
                cursor: "bg-[#22C55E]",
                tabContent: "font-semibold data-[selected=true]:text-[#86efac]",
              }}
            >
              <Tab key="signup" title="Sign Up">
                <div className="space-y-4 pt-4">
                  <Button
                    onPress={handleGoogleMock}
                    variant="bordered"
                    className="h-12 w-full rounded-xl border border-white/25 bg-white/5 font-semibold text-white hover:bg-white/10"
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
                    }}
                  />
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="Enter your name"
                    value={signupName}
                    onValueChange={setSignupName}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
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
                    }}
                  />
                  <Button
                    onPress={handleSignup}
                    className="h-12 w-full rounded-xl bg-[#B6FF00] font-semibold text-black"
                  >
                    Create account
                  </Button>

                  <p className="pt-2 text-center text-sm text-white/70">
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
                <div className="space-y-4 pt-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onValueChange={setLoginEmail}
                    classNames={{
                      inputWrapper: "bg-[#0f172a] border border-white/10 hover:border-white/20",
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
                    }}
                  />
                  <Button
                    onPress={handleLogin}
                    className="h-12 w-full rounded-xl bg-[#B6FF00] font-semibold text-black"
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

            <p className="mt-6 text-center text-sm text-white/65">
              back to{" "}
              <Link href="/" className="text-[#86efac] underline-offset-4 hover:underline">
                home
              </Link>
            </p>
          </CardBody>
        </Card>

        <AuthShaderShowcase
          className="hidden lg:block"
          heading="track college emissions with confidence."
          body="measure campus energy, understand impact, and move your institution toward real sustainability goals."
        />
      </motion.div>
    </main>
  );
}
