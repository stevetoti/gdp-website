"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Phone, ArrowUpRight } from "lucide-react";
type Message = { id: string; body: string; author: string; status: string };
export default function ChatWidget() {
  const [open, setOpen] = useState(false),
    [messages, setMessages] = useState<Message[]>([]),
    [text, setText] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [mode, setMode] = useState("ai");
  const end = useRef<HTMLDivElement>(null);
  const requestId = useRef<string | null>(null);
  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/chat", { cache: "no-store" });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setMessages(d.messages);
      setMode(d.mode);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chat unavailable");
    }
  }, []);
  useEffect(() => {
    if (!open) return;
    void refresh();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 2500);
    return () => clearInterval(timer);
  }, [open, refresh]);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  async function send() {
    if (busy || !text.trim()) return;
    setBusy(true);
    setError("");
    requestId.current ||= crypto.randomUUID();
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, request_id: requestId.current }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setText("");
      requestId.current = null;
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to send");
    } finally {
      setBusy(false);
    }
  }
  const waiting = mode === "ai" && messages.at(-1)?.author === "customer";
  return (
    <div className="fixed bottom-5 right-4 z-[70] sm:right-6">
      {open && (
        <section
          aria-label="Global Digital Prime chat"
          className="mb-3 flex h-[min(620px,80dvh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-slate-950 px-5 py-4 text-white">
            <div>
              <p className="font-semibold">Global Digital Prime</p>
              <p className="mt-1 text-xs text-slate-300">
                {mode === "human"
                  ? "Team conversation"
                  : "AI assistant · here to help"}
              </p>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </header>
          <div
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
            aria-live="polite"
          >
            {!messages.length && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                Welcome to Global Digital Prime. Tell us what you’re looking to
                build or improve, and we’ll help you explore the next step.
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.author === "customer" ? "ml-auto bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-800"}`}
              >
                <span className="mb-1 block text-[10px] uppercase tracking-wider opacity-60">
                  {m.author === "customer"
                    ? "You"
                    : m.author === "human"
                      ? "GDP team"
                      : m.author === "system"
                        ? "Conversation update"
                        : "GDP assistant"}
                </span>
                {m.body}
              </div>
            ))}
            {waiting && (
              <p className="text-xs text-slate-500">
                The assistant is preparing a reply…
              </p>
            )}
            <div ref={end} />
          </div>
          <div className="border-t border-slate-200 p-3">
            {error && (
              <p role="alert" className="mb-2 text-xs text-red-700">
                {error}
              </p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-end gap-2"
            >
              <textarea
                aria-label="Your message"
                rows={2}
                maxLength={4000}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  requestId.current = null;
                }}
                placeholder="How can we help?"
                className="min-w-0 flex-1 resize-none rounded-xl border border-slate-200 p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                aria-label="Send message"
                disabled={busy || !text.trim()}
                className="rounded-xl bg-orange-500 p-3 text-white disabled:opacity-40"
              >
                <Send size={20} />
              </button>
            </form>
            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>Type “agent” to request our team.</span>
              <a
                href="https://wa.me/16068067748"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-700"
              >
                WhatsApp <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>
      )}
      <div className="flex justify-end gap-2">
        <a
          href="tel:+16068067748"
          aria-label="Call Global Digital Prime"
          className="rounded-full bg-slate-900 p-4 text-white shadow-lg"
        >
          <Phone size={22} />
        </a>
        <button
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-4 font-medium text-white shadow-lg hover:bg-orange-600"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
          <span>{open ? "Close" : "Chat with us"}</span>
        </button>
      </div>
    </div>
  );
}
