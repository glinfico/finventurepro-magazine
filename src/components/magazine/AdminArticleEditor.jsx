import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Save, X, Loader2 } from "lucide-react";
import ImageUploader from "@/components/magazine/ImageUploader";

const CATEGORIES = ["finance", "economy", "insurance", "travel", "consulting", "retirement"];
const SECTIONS = ["Finance", "Economy", "Insurance", "Travel", "Business Consulting", "Retirement", "Cover Story", "Markets", "Venture", "Wealth", "Funding Intelligence", "Real Estate Capital"];

const EMPTY = {
  title: "", subtitle: "", section: "", category: "finance",
  author: "Editorial Team", read_time: "7 min read",
  published_date: new Date().toISOString().split("T")[0],
  intro: "", body_json: "[]", image_url: "", is_published: true, slug: "", tags: []
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminArticleEditor() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | article object
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [bodyText, setBodyText] = useState(""); // simple textarea for body sections

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.Article.list("-published_date", 50);
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setForm({ ...EMPTY });
    setBodyText("");
    setEditing("new");
  };

  const openEdit = (article) => {
    setForm({ ...article });
    // Convert body_json array to readable text for editing
    try {
      const parsed = JSON.parse(article.body_json || "[]");
      setBodyText(parsed.map(s => `## ${s.heading || ""}\n${s.content || ""}`).join("\n\n"));
    } catch {
      setBodyText("");
    }
    setEditing(article);
  };

  const closeEditor = () => { setEditing(null); setForm(EMPTY); setBodyText(""); };

  const parseBodyText = (text) => {
    // Parse ## Heading\nContent blocks into body_json
    const sections = text.split(/\n## /).filter(Boolean);
    return sections.map(block => {
      const [first, ...rest] = block.split("\n");
      const heading = first.replace(/^## /, "").trim();
      const content = rest.join("\n").trim();
      return { heading, content };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const slug = form.slug || slugify(form.title);
      const body_json = JSON.stringify(parseBodyText(bodyText));
      const tags = typeof form.tags === "string" ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : form.tags;
      const payload = { ...form, slug, body_json, tags };

      if (editing === "new") {
        await base44.entities.Article.create(payload);
      } else {
        await base44.entities.Article.update(editing.id, payload);
      }
      await fetchArticles();
      closeEditor();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (article) => {
    if (!window.confirm(`Delete "${article.title}"?`)) return;
    setDeleting(article.id);
    await base44.entities.Article.delete(article.id);
    setArticles(a => a.filter(x => x.id !== article.id));
    setDeleting(null);
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Article Manager</h3>
        {editing === null && (
          <button onClick={openNew}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-all">
            <Plus className="h-3.5 w-3.5" /> New Article
          </button>
        )}
      </div>

      {/* Editor Form */}
      {editing !== null && (
        <div className="space-y-4 border-t border-slate-700/60 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-300">{editing === "new" ? "New Article" : "Editing Article"}</p>
            <button onClick={closeEditor} className="text-slate-500 hover:text-white transition-colors"><X className="h-4 w-4" /></button>
          </div>

          {/* Hero Image Upload */}
          <ImageUploader
            label="Hero Image"
            value={form.image_url}
            onChange={url => set("image_url", url)}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Title *</label>
              <input value={form.title} onChange={e => set("title", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Slug (auto-generated if blank)</label>
              <input value={form.slug} onChange={e => set("slug", e.target.value)}
                placeholder={form.title ? slugify(form.title) : "article-slug"}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Subtitle</label>
            <input value={form.subtitle} onChange={e => set("subtitle", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Category *</label>
              <select value={form.category} onChange={e => set("category", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Section</label>
              <input value={form.section} onChange={e => set("section", e.target.value)}
                list="sections-list"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
              <datalist id="sections-list">{SECTIONS.map(s => <option key={s} value={s} />)}</datalist>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Read Time</label>
              <input value={form.read_time} onChange={e => set("read_time", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Author</label>
              <input value={form.author} onChange={e => set("author", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Published Date</label>
              <input type="date" value={form.published_date} onChange={e => set("published_date", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Tags (comma-separated)</label>
            <input
              value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
              onChange={e => set("tags", e.target.value)}
              placeholder="Finance, Macro, Investing"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Intro / Pull Quote</label>
            <textarea value={form.intro} onChange={e => set("intro", e.target.value)} rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none resize-none" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Body (use <span className="font-mono text-blue-300">## Heading</span> to start each section)</label>
            <textarea value={bodyText} onChange={e => setBodyText(e.target.value)} rows={12}
              placeholder={"## Introduction\nYour first paragraph here.\n\n## Second Section\nMore content here."}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white focus:border-blue-500/60 focus:outline-none resize-y font-mono" />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={e => set("is_published", e.target.checked)}
                className="rounded border-slate-600 bg-slate-800" />
              Published
            </label>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={handleSave} disabled={saving || !form.title}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-all disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : "Save Article"}
            </button>
            <button onClick={closeEditor}
              className="rounded-full border border-slate-700 px-6 py-2 text-sm text-slate-400 hover:text-white transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Articles List */}
      {editing === null && (
        <div className="border-t border-slate-700/60 pt-4 space-y-2">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-blue-400" /></div>
          ) : articles.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No articles yet. Create your first one above.</p>
          ) : (
            articles.map(a => (
              <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-800/40 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  {a.image_url && <img src={a.image_url} alt="" className="h-10 w-16 rounded-lg object-cover shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{a.title}</p>
                    <p className="text-xs text-slate-500">{a.category} · {a.published_date} · {a.is_published ? "Published" : "Draft"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(a)} className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white hover:border-blue-500/40 transition-all">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(a)} disabled={deleting === a.id}
                    className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50">
                    {deleting === a.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}