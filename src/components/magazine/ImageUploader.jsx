import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, X, Loader2 } from "lucide-react";

/**
 * ImageUploader — drop-zone + click-to-upload.
 * Props:
 *   value        : current image URL (string)
 *   onChange     : (url: string) => void  — called with the hosted URL after upload
 *   label        : optional label text
 *   className    : optional wrapper className
 */
export default function ImageUploader({ value, onChange, label = "Upload Image", className = "" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      onChange(result.file_url);
    } catch (e) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-700/60">
          <img src={value} alt="Uploaded" className="w-full h-44 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="text-white text-sm font-medium">Replace image</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed h-44 cursor-pointer transition-all
            ${dragging ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800/40"}`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              <span className="text-xs text-slate-400">Uploading…</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6 text-slate-500" />
              <span className="text-sm text-slate-400">Click or drag an image here</span>
              <span className="text-xs text-slate-600">PNG, JPG, WEBP</span>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
}