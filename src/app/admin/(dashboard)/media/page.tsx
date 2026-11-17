"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { deleteMediaAssetAction } from "@/lib/cms/actions";
import { Search, Trash2, Copy, CheckCircle, AlertCircle } from "lucide-react";

interface MediaAsset {
  id: string;
  public_id: string;
  secure_url: string;
  format?: string | null;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
  alt_text?: string | null;
  created_at: string;
}

const DEFAULT_MEDIA: MediaAsset[] = [];

export default function AdminMediaLibrary() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newUploadedUrl, setNewUploadedUrl] = useState("");
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAssets = () => {
    fetch("/api/admin/media")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.assets && data.assets.length > 0) {
          setAssets([...data.assets, ...DEFAULT_MEDIA]);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchAssets();
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm(`Are you sure you want to delete "${asset.public_id}"?`)) return;

    setActionMsg(null);
    const res = await deleteMediaAssetAction(asset.public_id, asset.secure_url);

    if (res.success) {
      setAssets(assets.filter((a) => a.public_id !== asset.public_id));
      setActionMsg({ type: "success", text: "Media asset deleted successfully." });
    } else {
      setActionMsg({ type: "error", text: res.message || "Failed to delete asset." });
    }
  };

  const filteredAssets = assets.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return a.public_id.toLowerCase().includes(q) || (a.alt_text && a.alt_text.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            MEDIA ASSET LIBRARY
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Cloudinary-backed storage with automatic format optimization, dimensions, and reference safety checks.
          </p>
        </div>
      </div>

      {actionMsg && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
            actionMsg.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {actionMsg.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Upload New Asset Widget */}
      <AdminCard title="Direct Image Upload to Cloudinary">
        <ImageUploader
          label="Select image file to upload"
          value={newUploadedUrl}
          onChange={(url) => {
            setNewUploadedUrl(url);
            fetchAssets();
          }}
          helperText="Uploads are signed server-side and automatically tracked in the media database"
        />
      </AdminCard>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search media by filename or alt description..."
          className="w-full rounded-xl border border-[#E8DFD8] bg-white pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="group flex flex-col justify-between rounded-xl border border-[#E8DFD8] bg-white p-3 shadow-xs hover:border-[var(--color-burgundy)] transition-all overflow-hidden"
          >
            <div className="space-y-2">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#FBF8F5] border border-[#E8DFD8]">
                <Image
                  src={asset.secure_url}
                  alt={asset.alt_text || asset.public_id}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              <div>
                <span className="block font-mono text-[11px] font-bold text-[var(--color-burgundy)] truncate" title={asset.public_id}>
                  {asset.public_id}
                </span>
                <span className="block text-[10px] text-gray-400 font-mono">
                  {asset.width && asset.height ? `${asset.width} × ${asset.height}px` : "Standard web asset"}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E8DFD8] flex items-center justify-between">
              <button
                onClick={() => handleCopyUrl(asset.secure_url)}
                className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 hover:text-[var(--color-burgundy)]"
              >
                <Copy className="h-3 w-3" />
                <span>{copiedUrl === asset.secure_url ? "Copied!" : "Copy URL"}</span>
              </button>

              <button
                onClick={() => handleDelete(asset)}
                className="rounded p-1 text-red-600 hover:bg-red-50"
                title="Delete Media Asset"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
