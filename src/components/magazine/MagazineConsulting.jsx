import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, BrainCircuit, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const STARTERS = [
  "How should I structure financing for a $2M commercial real estate deal?",
  "What's the best funding path for a business doing $80K/month in revenue?",
  "How do I evaluate an M&A target with negative EBITDA?",
  "What are the key metrics LPs look for in an emerging fund manager?",
];

export default function MagazineConsulting() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (question) => {
    if (!question.trim() || loading) return;
    const userMsg = { role: "user", content: question };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await base44.functions.invoke("businessConsultingChat", {
      question,
      history: messages,
    });

    setMessages(prev => [...prev, { role: "assistant", content: res.data.answer }]);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <section className="px-5 py-24 lg:px-8 border-t border-slate-800/60">
      <div className="mx-auto max-w-4xl">

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <BrainCircuit className="h-7 w-7 text-blue-400" />
          </div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">GLINFICO Business Consulting</p>
          <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">Ask an expert. Right now.</h2>
          <p className="mt-4 text-slate-400 leading-7 max-w-xl mx-auto">Our AI consulting engine is trained on capital markets, alternative lending, M&amp;A, real estate finance, and business strategy. Ask anything.</p>
        </motion.div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden shadow-2xl shadow-black/30">
          {/* Messages */}
          <div className="h-[420px] overflow-y-auto p-6 space-y-5">
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center gap-6">
                <p className="text-sm text-slate-500">Start with one of these or write your own question:</p>
                <div className="grid gap-3 w-full max-w-lg">
                  {STARTERS.map((s, i) => (
                    <button key={i} onClick={() => ask(s)}
                      className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-left text-slate-400 hover:border-blue-500/40 hover:text-white hover:bg-slate-800 transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="mt-1 h-8 w-8 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <BrainCircuit className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-7
                    ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700/50"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="mt-1 h-8 w-8 shrink-0 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 text-blue-400" />
                </div>
                <div className="rounded-2xl bg-slate-800 border border-slate-700/50 px-5 py-3.5 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="text-sm text-slate-400">Consulting...</span>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4 flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a business, finance, or strategy question..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-all"
            />
            <Button type="submit" disabled={!input.trim() || loading} className="rounded-xl px-5 h-12 bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">Powered by GLINFICO AI · For funding execution, <a href="/submit" className="text-blue-400 hover:text-blue-300">submit a deal →</a></p>
      </div>
    </section>
  );
}