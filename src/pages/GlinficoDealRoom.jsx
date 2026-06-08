import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Send } from "lucide-react";

const statusColors = {
  Submitted: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  Matched: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-300 border border-green-500/30",
  Funded: "bg-primary/20 text-primary border border-primary/30",
  Declined: "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function GlinficoDealRoom() {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const msgEndRef = useRef(null);

  useEffect(() => {
    base44.entities.Deal.list("-created_date", 50).then(data => {
      setDeals(data);
      if (data.length > 0) setSelectedDeal(data[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedDeal) return;
    base44.entities.DealMessage.filter({ deal_id: selectedDeal.id }, "created_date").then(setMessages);
  }, [selectedDeal]);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedDeal) return;
    const msg = await base44.entities.DealMessage.create({
      deal_id: selectedDeal.id,
      message: newMessage,
      sender_name: "You",
      sender_role: "User",
    });
    setMessages(prev => [...prev, msg]);
    setNewMessage("");
  };

  const filteredDeals = deals.filter(d => {
    const matchStatus = filterStatus === "All" || d.status === filterStatus;
    const matchSearch = !search || d.applicant_name?.toLowerCase().includes(search.toLowerCase()) || d.company_name?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statuses = ["All", "Submitted", "Matched", "Approved", "Funded"];

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white">GLINFICO DEAL ROOM™</h1>
          <p className="mt-2 text-muted-foreground">Collaborative space for brokers, lenders, and borrowers to close deals.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]" style={{ minHeight: "600px" }}>
            {/* Deal list */}
            <div className="flex flex-col rounded-xl border border-white/10 bg-card overflow-hidden">
              <div className="border-b border-white/10 p-4">
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none transition-all"
                  placeholder="Search deals..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className="mt-3 flex flex-wrap gap-1">
                  {statuses.map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${filterStatus === s ? "bg-primary text-primary-foreground" : "border border-white/15 text-muted-foreground hover:border-primary/40"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Active Deals</span>
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary font-semibold">({filteredDeals.length})</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredDeals.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">No deals found. <Link to="/submit" className="text-primary hover:underline">Submit one →</Link></div>
                ) : (
                  filteredDeals.map(deal => (
                    <button
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className={`w-full border-b border-white/5 p-4 text-left transition-all hover:bg-white/5 ${selectedDeal?.id === deal.id ? "bg-primary/10 border-l-2 border-l-primary" : ""}`}
                    >
                      <div className="font-semibold text-white">{deal.applicant_name}</div>
                      <div className="mt-1 text-sm text-primary font-bold">${deal.amount_requested?.toLocaleString()}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[deal.status] || "bg-muted text-muted-foreground"}`}>{deal.status}</span>
                        <span className="text-xs text-muted-foreground">{deal.deal_type}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Deal detail + chat */}
            {selectedDeal ? (
              <div className="flex flex-col rounded-xl border border-white/10 bg-card overflow-hidden">
                {/* Header */}
                <div className="border-b border-white/10 p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="font-bold text-white">{selectedDeal.applicant_name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDeal.deal_type} · ${selectedDeal.amount_requested?.toLocaleString()} · {selectedDeal.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={`mailto:alain.b@glinvestco.com?subject=Request Allocation — ${selectedDeal.applicant_name}`} className="rounded-lg border border-primary/40 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-all">
                        Request Allocation
                      </a>
                      <a href={`mailto:alain.b@glinvestco.com?subject=Sponsor Call — ${selectedDeal.applicant_name}`} className="rounded-lg bg-primary/20 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/30 transition-all">
                        Sponsor Call
                      </a>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                      Deal Room opened for {selectedDeal.applicant_name}. All parties notified.
                    </div>
                  )}
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender_name === "You" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${msg.sender_name === "You" ? "bg-primary text-primary-foreground" : "bg-white/10 text-foreground"}`}>
                        {msg.is_system ? <em className="text-xs opacity-70">{msg.message}</em> : msg.message}
                        <div className="mt-1 text-xs opacity-60">{msg.sender_name} · {new Date(msg.created_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={msgEndRef} />
                </div>

                {/* Message input */}
                <form onSubmit={sendMessage} className="border-t border-white/10 p-4 flex gap-3">
                  <input
                    className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none transition-all"
                    placeholder="Type a message... (Enter to send)"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                  />
                  <button type="submit" className="rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-xl border border-white/10 bg-card text-muted-foreground">
                Select a deal to view details
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Return to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}