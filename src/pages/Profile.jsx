// src/pages/admin/Profile.jsx
import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader"

export default function Profile() {
  // If you have Redux user state, you can read it here.
  // For now we’ll fetch once and keep in local state.
  const [me, setMe] = React.useState(null);
  const [pendingImg, setPendingImg] = useState(null); // { url, publicId, ... }
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  React.useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!ignore && data?.ok) setMe(data.user);
      } catch {}
    })();
    return () => { ignore = true; };
  }, []);

  async function saveAvatar() {
    if (!pendingImg?.url || !pendingImg?.publicId) return;
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me/avatar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ url: pendingImg.url, publicId: pendingImg.publicId }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to update avatar");

      // Update local state so UI reflects the new avatar immediately
      setMe((m) => (m ? { ...m, avatar: data.avatar } : m));
      setMsg("Profile picture updated.");
      setPendingImg(null);
    } catch (e) {
      setMsg(e.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-8">
      <header className="flex items-center gap-3">
        <h1 className="text-lg sm:text-xl font-semibold">My Profile</h1>
        {msg ? <span className="text-xs text-green-600">{msg}</span> : null}
      </header>

      {/* Avatar row */}
      <div className="flex items-center gap-5">
        <img
          src={pendingImg?.url || me?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="md:w-28 md:h-28 w-16 h-16 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/10"
        />

        <div className="space-y-3">
          <ImageUploader
            buttonText="Upload new picture"
            onUploaded={(img) => setPendingImg(img)}
          />

          <div className="flex gap-2">
            <button
              onClick={saveAvatar}
              disabled={!pendingImg || busy}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save"}
            </button>
            {pendingImg ? (
              <button
                onClick={() => setPendingImg(null)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
            ) : null}
          </div>

          <p className="text-xs opacity-70">
            Tip: JPG/PNG/WebP up to ~8MB. We store the image on Cloudinary and keep the URL here.
          </p>
        </div>
      </div>

      {/* Basic info (read-only for now) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border dark:border-white/10">
          <div className="text-xs uppercase opacity-60">Name</div>
          <div className="font-medium mt-1">{me?.name || "—"}</div>
        </div>
        <div className="p-4 rounded-xl border dark:border-white/10">
          <div className="text-xs uppercase opacity-60">Email</div>
          <div className="font-medium mt-1">{me?.email || "—"}</div>
        </div>
        <div className="p-4 rounded-xl border dark:border-white/10">
          <div className="text-xs uppercase opacity-60">Role</div>
          <div className="font-medium mt-1">{me?.role || "—"}</div>
        </div>
        <div className="p-4 rounded-xl border dark:border-white/10">
          <div className="text-xs uppercase opacity-60">Status</div>
          <div className="font-medium mt-1">{me?.status || "—"}</div>
        </div>
      </section>
    </div>
  );
}
