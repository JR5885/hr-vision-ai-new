"use client";

import { useEffect, useState } from "react";

export default function ContactForm({ summary }: { summary: string }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (summary) setMessage(summary);
  }, [summary]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-4xl border border-gray-100 bg-white p-8 shadow-elevate sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">預約診斷諮詢</h2>
        <p className="mt-2 text-sm text-ink-soft">
          留下您的聯絡資訊，我們將依據 AI 診斷結果，為您安排一對一戰略諮詢。
        </p>

        {submitted ? (
          <div className="mt-8 flex items-center gap-3 rounded-3xl bg-google-green/10 px-5 py-4 text-sm font-medium text-google-green">
            <span>✅</span>
            已收到您的預約需求，我們將盡快與您聯繫。
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="姓名 Name"
                className="rounded-2xl border border-gray-200 bg-canvas px-4 py-3 text-sm outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
              />
              <input
                required
                type="email"
                placeholder="公司信箱 Email"
                className="rounded-2xl border border-gray-200 bg-canvas px-4 py-3 text-sm outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
              />
            </div>
            <input
              placeholder="公司名稱 Company"
              className="w-full rounded-2xl border border-gray-200 bg-canvas px-4 py-3 text-sm outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="您的 HR 挑戰簡述（完成上方 AI 診斷後將自動帶入分析摘要）"
              className="w-full resize-none rounded-3xl border border-gray-200 bg-canvas px-4 py-3 text-sm outline-none transition focus:border-google-blue focus:ring-2 focus:ring-google-blue/20"
            />
            <button
              type="submit"
              className="ripple-btn w-full rounded-full bg-google-blue px-6 py-3 text-sm font-medium text-white shadow-elevate transition-transform hover:-translate-y-0.5"
            >
              送出預約
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
