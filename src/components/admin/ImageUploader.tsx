"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  required?: boolean;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function ImageUploader({ label, value, onChange, helperText, required }: ImageUploaderProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setStatus("error");
      setErrorMessage("File exceeds 8MB maximum size limit.");
      return;
    }

    // Validate image mime type
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setErrorMessage("Please select an image file (PNG, JPG, WebP, AVIF).");
      return;
    }

    setStatus("uploading");
    setErrorMessage(null);

    try {
      // 1. Request signed signature from our secure server route
      const signRes = await fetch("/api/admin/media/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "fitness-cms" }),
      });

      if (!signRes.ok) {
        // If Cloudinary is not configured, fall back to setting local demo URL
        const data = await signRes.json().catch(() => ({}));
        throw new Error(data.error || "Cloudinary is not configured. You can enter an image URL directly.");
      }

      const signData = await signRes.json();

      // 2. Upload directly to Cloudinary using the signature
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const cloudUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;
      const uploadRes = await fetch(cloudUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const uploadResult = await uploadRes.json();
      const secureUrl = uploadResult.secure_url;

      // 3. Register asset in Supabase media_assets
      await fetch("/api/admin/media/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_id: uploadResult.public_id,
          secure_url: secureUrl,
          format: uploadResult.format,
          width: uploadResult.width,
          height: uploadResult.height,
          bytes: uploadResult.bytes,
          alt_text: file.name.replace(/\.[^/.]+$/, ""),
        }),
      });

      onChange(secureUrl);
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-burgundy)]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {helperText && <span className="text-[11px] text-gray-500">{helperText}</span>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview Box */}
        <div
          suppressHydrationWarning
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E8DFD8] bg-[#FBF8F5] flex items-center justify-center"
        >
          {value ? (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized={value.startsWith("http") && !value.includes("res.cloudinary.com")}
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-300" />
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="https://res.cloudinary.com/... or image URL"
              className="w-full rounded-lg border border-[#E8DFD8] bg-white px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:border-[var(--color-burgundy)] focus:outline-none"
            />
            <label className="flex shrink-0 items-center gap-1.5 cursor-pointer rounded-lg bg-[var(--color-burgundy)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--color-burgundy)]/90 transition-colors">
              {status === "uploading" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <UploadCloud className="h-3.5 w-3.5" />
              )}
              <span>{status === "uploading" ? "Uploading..." : "Upload"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={status === "uploading"}
                className="hidden"
              />
            </label>
          </div>

          {status === "error" && errorMessage && (
            <div className="flex items-center gap-1 text-[11px] text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5 shrink-0" />
              <span>Image uploaded to Cloudinary successfully.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
