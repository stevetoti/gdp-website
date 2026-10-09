"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageCircle, Globe, UserRound, Bot, RefreshCw } from "lucide-react";
type Contact = {
  id: string;
  name: string | null;
  email: string | null;
  phone_e164: string | null;
};
type Conversation = {
  id: string;
  channel: "web" | "whatsapp";
  mode: "ai" | "human";
  unread_count: number;
  last_inbound_at: string | null;
  updated_at: string;
  gdp_chat_contacts: Contact | null;
};
type Message = {
  id: string;
  author: string;
  body: string;
  status: string;
  created_at: string;
  media: { url: string; type: string }[];
};
type ChatError = {
  id: string;
  service: string;
  code: string;
  created_at: string;
};
type Template = { sid: string; name: string };
export default function InboxPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null),
    [conversations, setConversations] = useState<Conversation[]>([]),
    [selected, setSelected] = useState<string | null>(null),
    [messages, setMessages] = useState<Message[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [text, setText] = useState(""),
    [errors, setErrors] = useState<ChatError[]>([]),
    [templates, setTemplates] = useState<Template[]>([]),
    [template, setTemplate] = useState(""),
    [variables, setVariables] = useState('{"1":"","2":""}'),
    [now, setNow] = useState(Date.now()),
    [contactName, setContactName] = useState(""),
    [contactEmail, setContactEmail] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const sendId = useRef<string | null>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const current = conversations.find((c) => c.id === selected);
  const closed =
    current?.channel === "whatsapp" &&
    (!current.last_inbound_at ||
      now - Date.parse(current.last_inbound_at) >= 86400000);
  const action = useCallback(async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("whatsapp-send", {
      body,
    });
    if (error) {
      let message = error.message;
      try {
        message = (await error.context.json()).error || message;
      } catch {}
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.error);
    return data;
  }, []);
  const refresh = useCallback(async () => {
    const [c, e] = await Promise.all([
      supabase
        .from("gdp_chat_conversations")
        .select("*,gdp_chat_contacts(*)")
        .order("updated_at", { ascending: false })
        .limit(200),
      supabase
        .from("gdp_chat_errors")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);
    if (c.error || e.error) {
      setError("Unable to load inbox. Check your administrator access.");
      return;
    }
    setConversations(c.data as Conversation[]);
    setErrors(e.data as ChatError[]);
  }, []);
  const loadMessages = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from("gdp_chat_messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: false })
      .limit(200);
    if (selectedRef.current !== id) return;
    if (error) setError("Unable to load messages");
    else setMessages(data.reverse() as Message[]);
  }, []);
  useEffect(() => {
    let active = true;
    supabase.rpc("gdp_chat_is_admin").then(({ data, error }) => {
      if (active) {
        setAllowed(!error && data === true);
        if (!error && data) {
          void refresh();
          void action({ action: "templates" })
            .then((d) => setTemplates(d.templates))
            .catch((e) => setError(e.message));
        }
      }
    });
    return () => {
      active = false;
    };
  }, [refresh, action]);
  useEffect(() => {
    if (!allowed) return;
    const channel = supabase
      .channel("gdp-inbox")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gdp_chat_conversations" },
        () => void refresh(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gdp_chat_messages" },
        () => {
          if (selectedRef.current) void loadMessages(selectedRef.current);
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "gdp_chat_errors" },
        () => void refresh(),
      )
      .subscribe();
    const interval = setInterval(() => {
      setNow(Date.now());
      void refresh();
      if (selectedRef.current) void loadMessages(selectedRef.current);
    }, 10000);
    return () => {
      void supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [allowed, refresh, loadMessages]);
  useEffect(() => {
    setMessages([]);
    setText("");
    sendId.current = null;
    if (selected) {
      void loadMessages(selected);
      void action({ action: "mark_read", conversation_id: selected }).catch(
        (e) => setError(e.message),
      );
    }
  }, [selected, loadMessages, action]);
  useEffect(() => {
    setContactName(current?.gdp_chat_contacts?.name || "");
    setContactEmail(current?.gdp_chat_contacts?.email || "");
  }, [current?.gdp_chat_contacts?.name, current?.gdp_chat_contacts?.email]);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  async function run(body: Record<string, unknown>) {
    if (!selected || busy) return;
    setBusy(true);
    setError("");
    try {
      await action({ ...body, conversation_id: selected });
      await refresh();
      await loadMessages(selected);
      if (body.action === "reply" || body.action === "send_template") {
        setText("");
        sendId.current = null;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }
  if (allowed === null) return <p className="p-6">Checking inbox access…</p>;
  if (!allowed)
    return (
      <div className="rounded-xl bg-white p-8">
        <h1 className="text-xl font-semibold">Administrator access required</h1>
        <p className="mt-2 text-slate-600">
          This inbox is restricted to approved Global Digital Prime
          administrators.
        </p>
      </div>
    );
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer inbox</h1>
          <p className="text-sm text-slate-500">
            Website and WhatsApp · one team, one assistant
          </p>
        </div>
        <button
          aria-label="Refresh inbox"
          onClick={() => void refresh()}
          className="rounded-lg border bg-white p-2"
        >
          <RefreshCw size={18} />
        </button>
      </header>
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {errors.length > 0 && (
        <details className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
          <summary className="cursor-pointer font-medium text-amber-900">
            Service alerts ({errors.length} recent)
          </summary>
          {errors.map((e) => (
            <p key={e.id} className="mt-2">
              {new Date(e.created_at).toLocaleString()} · {e.service}: {e.code}
            </p>
          ))}
        </details>
      )}
      <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[320px_1fr]">
        <aside className="max-h-[750px] overflow-y-auto border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="border-b p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recent conversations
          </div>
          {!conversations.length && (
            <p className="p-6 text-sm text-slate-500">
              New website and WhatsApp messages will appear here.
            </p>
          )}
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`flex w-full gap-3 border-b p-4 text-left hover:bg-slate-50 ${selected === c.id ? "bg-orange-50" : ""}`}
            >
              <span
                className={`mt-1 rounded-lg p-2 ${c.channel === "whatsapp" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}
              >
                {c.channel === "whatsapp" ? (
                  <MessageCircle size={18} />
                ) : (
                  <Globe size={18} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-900">
                  {c.gdp_chat_contacts?.name ||
                    c.gdp_chat_contacts?.phone_e164 ||
                    "Website visitor"}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {c.channel === "whatsapp" ? "WhatsApp" : "Website"} ·{" "}
                  {new Date(c.updated_at).toLocaleString()}
                </span>
                <span className="mt-2 inline-block rounded-full border px-2 py-0.5 text-[11px]">
                  {c.mode === "ai" ? "AI assistant" : "Human takeover"}
                </span>
              </span>
              {c.unread_count > 0 && (
                <span className="h-fit rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                  {c.unread_count}
                </span>
              )}
            </button>
          ))}
        </aside>
        <section className="flex min-w-0 flex-col">
          {!current ? (
            <div className="m-auto p-12 text-center text-slate-400">
              <MessageCircle className="mx-auto mb-3" size={36} />
              Select a conversation to reply.
            </div>
          ) : (
            <>
              <header className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
                <div>
                  <h2 className="font-semibold">
                    {current.gdp_chat_contacts?.name ||
                      current.gdp_chat_contacts?.phone_e164 ||
                      "Website visitor"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {current.mode === "ai"
                      ? "AI is handling new messages"
                      : "AI is paused for this conversation"}
                  </p>
                </div>
                <button
                  disabled={busy}
                  onClick={() =>
                    void run({
                      action: "set_mode",
                      mode: current.mode === "ai" ? "human" : "ai",
                    })
                  }
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-50"
                >
                  {current.mode === "ai" ? (
                    <UserRound size={16} />
                  ) : (
                    <Bot size={16} />
                  )}{" "}
                  {current.mode === "ai" ? "Take over" : "Hand back to AI"}
                </button>
              </header>
              <details className="border-b px-4 py-2 text-sm">
                <summary className="cursor-pointer text-slate-500">
                  Contact details
                </summary>
                <div className="my-2 flex flex-wrap gap-2">
                  <input
                    aria-label="Contact name"
                    placeholder="Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="rounded border p-2"
                  />
                  <input
                    aria-label="Contact email"
                    placeholder="Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="rounded border p-2"
                  />
                  <button
                    disabled={busy}
                    onClick={() =>
                      void run({
                        action: "contact",
                        name: contactName,
                        email: contactEmail,
                      })
                    }
                    className="rounded border px-3"
                  >
                    Save details
                  </button>
                </div>
              </details>
              <div
                className="h-[420px] flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[90%] rounded-xl border px-4 py-3 text-sm sm:max-w-[80%] ${m.author === "customer" ? "border-slate-200 bg-white" : m.author === "human" ? "ml-auto border-blue-200 bg-blue-50" : m.author === "system" ? "mx-auto border-amber-200 bg-amber-50" : "ml-auto border-orange-200 bg-orange-50"}`}
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {m.author === "ai"
                        ? "GDP assistant"
                        : m.author === "human"
                          ? "Team"
                          : m.author}
                    </p>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {m.body}
                    </p>
                    {m.media?.map((a, i) => (
                      <p
                        key={i}
                        className="mt-2 rounded border border-dashed p-2 text-xs text-slate-500"
                      >
                        Attachment ({a.type || "file"}) · available in Twilio;
                        authenticated media preview is not enabled.
                      </p>
                    ))}
                    <p className="mt-2 text-[10px] text-slate-400">
                      {new Date(m.created_at).toLocaleTimeString()} · {m.status}
                    </p>
                  </div>
                ))}
                <div ref={end} />
              </div>
              <div className="border-t p-4">
                {closed ? (
                  <div className="space-y-3">
                    <p className="text-sm text-amber-800">
                      The 24-hour reply window has closed. Send an approved
                      template to invite a response.
                    </p>
                    {templates.length ? (
                      <>
                        <select
                          aria-label="Approved template"
                          value={template}
                          onChange={(e) => setTemplate(e.target.value)}
                          className="w-full rounded-lg border p-2"
                        >
                          <option value="">Choose approved template</option>
                          {templates.map((t) => (
                            <option value={t.sid} key={t.sid}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                        <label className="block text-xs text-slate-600">
                          Template variables (JSON)
                          <textarea
                            value={variables}
                            onChange={(e) => setVariables(e.target.value)}
                            className="mt-1 w-full rounded border p-2"
                          />
                        </label>
                        <button
                          disabled={busy || !template}
                          onClick={() => {
                            try {
                              const v = JSON.parse(variables);
                              sendId.current ||= crypto.randomUUID();
                              void run({
                                action: "send_template",
                                content_sid: template,
                                variables: v,
                                request_id: sendId.current,
                              });
                            } catch {
                              setError("Enter valid JSON variables");
                            }
                          }}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-40"
                        >
                          Send template
                        </button>
                      </>
                    ) : (
                      <p className="text-sm text-slate-500">
                        No approved GDP templates are configured yet. The
                        customer can reopen the window by messaging you.
                      </p>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendId.current ||= crypto.randomUUID();
                      void run({
                        action: "reply",
                        text,
                        request_id: sendId.current,
                      });
                    }}
                  >
                    <textarea
                      aria-label="Reply to customer"
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        sendId.current = null;
                      }}
                      maxLength={4000}
                      rows={3}
                      placeholder="Write a reply…"
                      className="w-full resize-none rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Sending a reply pauses AI until you hand it back.
                      </p>
                      <button
                        disabled={busy || !text.trim()}
                        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                      >
                        {busy ? "Sending…" : "Send reply"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
