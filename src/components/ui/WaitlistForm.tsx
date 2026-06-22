"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      city: form.get("city"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg border border-silver/20 bg-ink px-4 py-3 text-offwhite placeholder:text-silver/40 outline-none focus:border-rosegold";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder="Your name" required className={field} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={field}
      />
      <input name="city" placeholder="City (e.g. Jeddah, Riyadh)" className={field} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-rosegold px-8 py-3 font-medium text-ink transition hover:bg-rosegold-soft disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the waitlist"}
      </button>
      {status === "sent" && (
        <p className="text-center text-rosegold-soft">
          You&apos;re on the list. The next secret will find you first.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
