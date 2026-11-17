"use client";

import { useState } from "react";
import Image from "next/image";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveTestimonialAction, deleteTestimonialAction } from "@/lib/cms/actions";
import { Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, Star, User } from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  client_name: string;
  client_role: string;
  rating: number;
  avatar_url?: string | null;
  page_placement: "all" | "home" | "about" | "classes";
  order_index: number;
  status: "draft" | "published";
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "I spent years spinning my wheels on cardio machines. Within 12 weeks of structured strength coaching, I hit a bodyweight squat and completely rebuilt my energy.",
    client_name: "Sarah J.",
    client_role: "Online Coaching Client",
    rating: 5,
    avatar_url: "/images/avatar-1.jpg",
    page_placement: "all",
    order_index: 1,
    status: "published",
  },
  {
    id: "test-2",
    quote: "The form feedback and biomechanical adjustments were game-changing. I train 4 days a week now completely pain-free and stronger than ever.",
    client_name: "Rachel K.",
    client_role: "In-Person Training Client",
    rating: 5,
    avatar_url: "/images/avatar-2.jpg",
    page_placement: "all",
    order_index: 2,
    status: "published",
  },
  {
    id: "test-3",
    quote: "Having a female coach who truly understands hormonal cycles and progressive overload made all the difference in my body composition results.",
    client_name: "Emma D.",
    client_role: "Hybrid Athlete Client",
    rating: 5,
    avatar_url: "/images/avatar-3.jpg",
    page_placement: "all",
    order_index: 3,
    status: "published",
  },
];

export default function AdminTestimonialsManager() {
  const [items, setItems] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openCreateModal = () => {
    setEditingItem({
      id: "",
      quote: "",
      client_name: "",
      client_role: "Online Coaching Client",
      rating: 5,
      avatar_url: "/images/avatar-1.jpg",
      page_placement: "all",
      order_index: items.length + 1,
      status: "published",
    });
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
    setStatusMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setStatusMsg(null);

    const payload = {
      ...(editingItem.id && !editingItem.id.startsWith("test-") ? { id: editingItem.id } : {}),
      quote: editingItem.quote,
      client_name: editingItem.client_name,
      client_role: editingItem.client_role,
      rating: Number(editingItem.rating) || 5,
      avatar_url: editingItem.avatar_url || null,
      page_placement: editingItem.page_placement,
      order_index: Number(editingItem.order_index) || 1,
      status: editingItem.status,
    };

    const res = await saveTestimonialAction(payload);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Testimonial saved successfully." });
      if (editingItem.id) {
        setItems(items.map((i) => (i.id === editingItem.id ? editingItem : i)));
      } else {
        setItems([...items, { ...editingItem, id: `test-${Date.now()}` }]);
      }
      setIsModalOpen(false);
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to save testimonial." });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client testimonial?")) return;

    setStatusMsg(null);
    const res = await deleteTestimonialAction(id);
    if (res.success) {
      setItems(items.filter((i) => i.id !== id));
      setStatusMsg({ type: "success", text: "Testimonial deleted successfully." });
    } else {
      setStatusMsg({ type: "error", text: res.message || "Failed to delete testimonial." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            CLIENT REVIEWS & TESTIMONIALS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Manage genuine client reviews and success stories displayed across the website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-burgundy)]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {statusMsg && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs ${
            statusMsg.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <AdminCard key={item.id} className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <StatusBadge status={item.status} />
              </div>

              <blockquote className="text-xs text-gray-700 italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#E8DFD8]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-gray-100 border border-[#E8DFD8]">
                  {item.avatar_url ? (
                    <Image src={item.avatar_url} alt={item.client_name} fill className="object-cover" sizes="36px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-xs text-[var(--color-burgundy)]">
                    {item.client_name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    {item.client_role}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8DFD8] flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-400 uppercase">
                Placement: {item.page_placement}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="rounded p-1.5 text-gray-600 hover:bg-gray-100 hover:text-[var(--color-burgundy)] transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E8DFD8] p-6 shadow-xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
                {editingItem.id ? "Edit Testimonial" : "Add Client Testimonial"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                  Client Quote / Review
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                  placeholder="Paste real, verified client feedback here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_name}
                    onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. Sarah J."
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Role / Service Taken
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_role}
                    onChange={(e) => setEditingItem({ ...editingItem, client_role: e.target.value })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none"
                    placeholder="e.g. Online Coaching Client"
                  />
                </div>
              </div>

              <ImageUploader
                label="Client Avatar Photo"
                value={editingItem.avatar_url || ""}
                onChange={(url) => setEditingItem({ ...editingItem, avatar_url: url })}
                helperText="Square headshot (only with client consent)"
              />

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Rating (1-5)
                  </label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) || 5 })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none bg-white"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Placement
                  </label>
                  <select
                    value={editingItem.page_placement}
                    onChange={(e) => setEditingItem({ ...editingItem, page_placement: e.target.value as "all" | "home" | "about" | "classes" })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none bg-white"
                  >
                    <option value="all">All Pages</option>
                    <option value="home">Homepage Only</option>
                    <option value="about">About Page Only</option>
                    <option value="classes">Classes Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[var(--color-burgundy)] mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as "draft" | "published" })}
                    className="w-full rounded-lg border border-[#E8DFD8] p-2 text-xs focus:border-[var(--color-burgundy)] focus:outline-none bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8DFD8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-[#E8DFD8] px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[var(--color-burgundy)]/90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
