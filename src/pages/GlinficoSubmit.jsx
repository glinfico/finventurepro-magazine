import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Upload, X, CheckCircle } from "lucide-react";

const dealTypes = ["MCA Funding", "Real Estate Capital", "M&A Financing", "Loan Servicing"];
const timeOptions = ["Less than 1 year", "1-2 years", "2-5 years", "5+ years"];
const creditOptions = ["Below 500", "500-580", "580-650", "650-700", "700-750", "750+"];
const industryOptions = ["Retail", "Restaurant / Food Service", "Healthcare", "Construction", "Transportation", "Real Estate", "Technology", "Professional Services", "Manufacturing", "Other"];

const STEPS = ["Applicant Info", "Deal Details", "Documents", "Review"];

export default function GlinficoSubmit() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    applicant_name: "", company_name: "", email: "", phone: "",
    deal_type: "", amount_requested: "", business_description: "",
    monthly_revenue: "", time_in_business: "", credit_score: "",
    industry: "", use_of_funds: "", existing_debt: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.me().catch(() => null).then((u) => {
      if (u) {
        setUser(u);
        setForm(prev => ({
          ...prev,
          applicant_name: u.full_name || "",
          email: u.email || "",
        }));
      }
    });
  }, []);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedFiles(prev => [...prev, { name: file.name, url: file_url }]);
    }
    setUploading(false);
  };

  const removeFile = (idx) => setUploadedFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    setLoading(true);
    await base44.entities.Deal.create({
      ...form,
      amount_requested: parseFloat(form.amount_requested) || 0,
      monthly_revenue: parseFloat(form.monthly_revenue) || 0,
      existing_debt: parseFloat(form.existing_debt) || 0,
      status: "Submitted",
      user_role: user?.role || "guest",
      notes: uploadedFiles.length > 0
        ? `Documents: ${uploadedFiles.map(f => f.url).join(", ")}`
        : "",
    });
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass = "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all";

  const canAdvance = () => {
    if (step === 0) return form.applicant_name && form.email;
    if (step === 1) return form.deal_type && form.amount_requested;
    return true;
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="max-w-md text-center">
          <CheckCircle className="mx-auto mb-6 h-20 w-20 text-primary" />
          <h2 className="mb-3 text-3xl font-black text-white">Deal Submitted!</h2>
          <p className="mb-8 text-muted-foreground">Our AI engine is now matching your deal with the best lenders in our network. You'll hear back within 24–48 hours.</p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground hover:bg-primary/80 transition-all">View Dashboard</Link>
            <Link to="/" className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-foreground hover:border-white/40 transition-all">Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Smart Funding Router</div>
          <h1 className="mb-4 text-5xl font-black text-white">Submit a Deal</h1>
          <p className="text-muted-foreground">Our AI engine will match you with the right lenders instantly.</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-0">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-black transition-all ${i < step ? "border-primary bg-primary text-primary-foreground" : i === step ? "border-primary text-primary" : "border-white/20 text-muted-foreground"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`mt-1 hidden text-xs font-semibold sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 w-12 sm:w-20 transition-all ${i < step ? "bg-primary" : "bg-white/15"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-8">

          {/* Step 0: Applicant Info */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Applicant Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                  <input required className={inputClass} placeholder="Jane Smith" value={form.applicant_name} onChange={e => set("applicant_name", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company Name</label>
                  <input className={inputClass} placeholder="Acme LLC" value={form.company_name} onChange={e => set("company_name", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                  <input required type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
                  <input className={inputClass} placeholder="(555) 000-0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Industry</label>
                  <select className={inputClass} value={form.industry} onChange={e => set("industry", e.target.value)}>
                    <option value="">Select industry</option>
                    {industryOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Deal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Deal Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deal Type *</label>
                  <select required className={inputClass} value={form.deal_type} onChange={e => set("deal_type", e.target.value)}>
                    <option value="">Select deal type</option>
                    {dealTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount Requested ($) *</label>
                  <input required type="number" className={inputClass} placeholder="e.g. 250000" value={form.amount_requested} onChange={e => set("amount_requested", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly Revenue ($)</label>
                  <input type="number" className={inputClass} placeholder="e.g. 50000" value={form.monthly_revenue} onChange={e => set("monthly_revenue", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Existing Debt ($)</label>
                  <input type="number" className={inputClass} placeholder="e.g. 30000" value={form.existing_debt} onChange={e => set("existing_debt", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time in Business</label>
                  <select className={inputClass} value={form.time_in_business} onChange={e => set("time_in_business", e.target.value)}>
                    <option value="">Select</option>
                    {timeOptions.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Credit Score Range</label>
                  <select className={inputClass} value={form.credit_score} onChange={e => set("credit_score", e.target.value)}>
                    <option value="">Select</option>
                    {creditOptions.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Use of Funds</label>
                  <input className={inputClass} placeholder="e.g. Equipment purchase, working capital, expansion..." value={form.use_of_funds} onChange={e => set("use_of_funds", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Description</label>
                  <textarea rows={4} className={inputClass} placeholder="Describe your business, what you do, and any additional context..." value={form.business_description} onChange={e => set("business_description", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-primary">Supporting Documents</h3>
                <p className="text-xs text-muted-foreground">Upload bank statements, tax returns, or any relevant documents. PDF, JPG, PNG accepted.</p>
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 p-10 text-center hover:border-primary/50 transition-all">
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">{uploading ? "Uploading..." : "Click to upload files"}</span>
                <span className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG — max 10MB each</span>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                      <span className="text-sm text-foreground truncate">{f.name}</span>
                      <button onClick={() => removeFile(i)} className="ml-3 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground italic">Document upload is optional — you can also skip this step and submit documents later.</p>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Review Your Submission</h3>

              <div className="space-y-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Applicant</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{form.applicant_name}</span></div>
                    <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{form.email}</span></div>
                    {form.company_name && <div><span className="text-muted-foreground">Company:</span> <span className="text-foreground">{form.company_name}</span></div>}
                    {form.phone && <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{form.phone}</span></div>}
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Deal</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Type:</span> <span className="text-foreground">{form.deal_type}</span></div>
                    <div><span className="text-muted-foreground">Amount:</span> <span className="font-bold text-primary">${parseFloat(form.amount_requested || 0).toLocaleString()}</span></div>
                    {form.monthly_revenue && <div><span className="text-muted-foreground">Monthly Rev:</span> <span className="text-foreground">${parseFloat(form.monthly_revenue).toLocaleString()}</span></div>}
                    {form.credit_score && <div><span className="text-muted-foreground">Credit Score:</span> <span className="text-foreground">{form.credit_score}</span></div>}
                    {form.time_in_business && <div><span className="text-muted-foreground">Time in Business:</span> <span className="text-foreground">{form.time_in_business}</span></div>}
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Documents ({uploadedFiles.length})</div>
                    {uploadedFiles.map((f, i) => <div key={i} className="text-sm text-foreground">{f.name}</div>)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-foreground hover:border-white/40 transition-all">
                ← Back
              </button>
            )}
            <div className="flex-1" />
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance()}
                className="rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-primary/80 disabled:opacity-40 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-lg bg-primary px-8 py-3 font-black text-primary-foreground hover:bg-primary/80 disabled:opacity-60 transition-all"
              >
                {loading ? "Submitting..." : "🚀 Submit to GLINFICO Network"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}