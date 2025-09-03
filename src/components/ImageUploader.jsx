import React, { useState } from "react";

/**
 * Usage:
 * <ImageUploader
 *   buttonText="Upload image"
 *   onUploaded={(img) => { // img = { url, publicId, width, height, format }
 *     console.log(img);
 *   }}
 * />
 */
export default function ImageUploader({ buttonText = "Upload image", onUploaded }) {
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handlePick(e) {
    setErr("");
    const file = e.target.files?.[0];
    if (!file) return;

    // (optional) simple client-side checks
    if (!file.type.startsWith("image/")) {
      setErr("Please select an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErr("Max file size is 8 MB.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setBusy(true);

    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: fd,
        credentials: "include", // important (you use cookies for auth)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      // Pass Cloudinary payload to parent: { url, publicId, width, height, format }
      onUploaded?.(data);
    } catch (e) {
      console.error(e);
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <label className="inline-flex items-center px-3 py-2 rounded-xl border   hover:bg-accent hover:text-blue-800 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
        <span className="text-sm font-medium">{busy ? "Uploading…" : buttonText}</span>
      </label>

      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-16 h-16 rounded-lg object-cover ring-1 ring-black/5 dark:ring-white/10"
        />
      ) : null}

      {err ? <span className="text-xs text-red-600">{err}</span> : null}
    </div>
  );
}
