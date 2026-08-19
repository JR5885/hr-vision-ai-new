"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AIDiagnostics from "@/components/AIDiagnostics";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [summary, setSummary] = useState("");

  return (
    <main className="min-h-screen bg-canvas">
      <Header />
      <Hero />
      <AIDiagnostics onResult={setSummary} />
      <ServicesGrid />
      <ContactForm summary={summary} />

      <footer className="px-4 py-10 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} HR Vision AI. Powered by Claude.
      </footer>
    </main>
  );
}
