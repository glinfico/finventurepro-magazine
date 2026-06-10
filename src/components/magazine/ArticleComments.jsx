import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MessageSquare, ThumbsUp, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function ArticleComments({ articleSlug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [likedIds, setLikedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fvp_liked_comments") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    base44.entities.Comment.filter({ article_slug: articleSlug }, "-created_date", 50)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [articleSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    const newComment = await base44.entities.Comment.create({
      article_slug: articleSlug,
      author_name: name.trim(),
      content: content.trim(),
      likes: 0,
    });
    setComments(prev => [newComment, ...prev]);
    setContent("");
    setSubmitting(false);
  };

  const handleLike = async (comment) => {
    if (likedIds.includes(comment.id)) return;
    const newLikes = (comment.likes || 0) + 1;
    await base44.entities.Comment.update(comment.id, { likes: newLikes });
    setComments(prev => prev.map(c => c.id === comment.id ? { ...c, likes: newLikes } : c));
    const updated = [...likedIds, comment.id];
    setLikedIds(updated);
    localStorage.setItem("fvp_liked_comments", JSON.stringify(updated));
  };

  return (
    <section className="px-5 py-16 lg:px-8 border-t border-slate-800/60">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-10">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          <h3 className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Discussion {comments.length > 0 && <span className="text-slate-600 ml-1">({comments.length})</span>}
          </h3>
        </div>

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="mb-12 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6 space-y-4">
          <p className="text-sm font-medium text-slate-300">Share your thoughts</p>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-colors"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's on your mind about this topic?"
            rows={4}
            maxLength={1000}
            className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/60 focus:outline-none transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600">{content.length}/1000</span>
            <button
              type="submit"
              disabled={submitting || !name.trim() || !content.trim()}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Post Comment
            </button>
          </div>
        </form>

        {/* Comments list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-sm text-slate-600 py-10">Be the first to start the conversation.</p>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {comments.map((comment, i) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-300 shrink-0">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{comment.author_name}</p>
                        <p className="text-xs text-slate-600">
                          {comment.created_date
                            ? formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })
                            : "just now"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLike(comment)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-all border ${
                        likedIds.includes(comment.id)
                          ? "bg-blue-600/20 border-blue-500/40 text-blue-300"
                          : "border-slate-700/60 text-slate-500 hover:border-slate-600 hover:text-slate-400"
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {comment.likes || 0}
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}