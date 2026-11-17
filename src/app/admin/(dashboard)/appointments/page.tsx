"use client";

import { useState, useEffect } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateAppointmentStatusAction, deleteAppointmentAction } from "@/lib/cms/actions";
import { formatPhoneForWhatsApp } from "@/lib/utils";
import { Search, Mail, Phone, Calendar, Clock, MapPin, Trash2, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

interface AppointmentItem {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  session_type: string;
  location_preference: string;
  date_preference: string;
  time_of_day: string;
  notes?: string | null;
  status: "new" | "contacted" | "completed" | "cancelled";
  created_at: string;
}

export default function AdminAppointmentsManager() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(`/api/admin/appointments?status=${filterStatus}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore && data?.appointments) {
          setAppointments(data.appointments);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [filterStatus]);

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted" | "completed" | "cancelled") => {
    const res = await updateAppointmentStatusAction(id, newStatus);
    if (res.success) {
      setAppointments(appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      setActionMsg({ type: "success", text: `Inquiry status updated to ${newStatus}.` });
    } else {
      setActionMsg({ type: "error", text: res.message || "Failed to update status." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment inquiry?")) return;

    const res = await deleteAppointmentAction(id);
    if (res.success) {
      setAppointments(appointments.filter((a) => a.id !== id));
      setActionMsg({ type: "success", text: "Inquiry deleted." });
    } else {
      setActionMsg({ type: "error", text: res.message || "Failed to delete inquiry." });
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      apt.full_name.toLowerCase().includes(q) ||
      apt.email.toLowerCase().includes(q) ||
      apt.session_type.toLowerCase().includes(q) ||
      (apt.notes && apt.notes.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-burgundy)] uppercase">
            CONSULTATION INQUIRIES & APPOINTMENTS
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Incoming discovery calls, in-person movement screen requests, and client consultation leads.
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
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-[#E8DFD8] bg-white p-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or session..."
            className="w-full rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 font-mono">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#E8DFD8] bg-white px-3 py-1.5 text-xs font-medium text-gray-700 focus:border-[var(--color-burgundy)] focus:outline-none"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New (Pending)</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="rounded-xl border border-[#E8DFD8] bg-white p-12 text-center text-xs text-gray-400">
          Loading inquiries from database...
        </div>
      ) : filteredAppointments.length === 0 ? (
        <AdminCard>
          <div className="py-12 text-center space-y-2">
            <Calendar className="mx-auto h-8 w-8 text-gray-300" />
            <h3 className="text-sm font-semibold text-gray-700">No Consultation Inquiries Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              When prospective clients submit consultation requests on the public <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">/appointments</code> page, they will appear here securely.
            </p>
          </div>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <AdminCard key={apt.id} className="p-0">
              <div className="p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DFD8]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wider text-[var(--color-burgundy)]">
                        {apt.full_name}
                      </h3>
                      <StatusBadge status={apt.status} />
                    </div>
                    <span className="font-mono text-[11px] text-gray-400">
                      Submitted: {new Date(apt.created_at).toLocaleDateString()} at{" "}
                      {new Date(apt.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2">
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        handleStatusChange(
                          apt.id,
                          e.target.value as "new" | "contacted" | "completed" | "cancelled"
                        )
                      }
                      className="rounded-lg border border-[#E8DFD8] bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 focus:outline-none"
                    >
                      <option value="new">Mark as New</option>
                      <option value="contacted">Mark as Contacted</option>
                      <option value="completed">Mark as Completed</option>
                      <option value="cancelled">Mark as Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-[var(--color-burgundy)] shrink-0" />
                    <a href={`mailto:${apt.email}`} className="underline hover:text-[var(--color-burgundy)] truncate">
                      {apt.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-[var(--color-burgundy)] shrink-0" />
                    <span>{apt.phone || "No phone provided"}</span>
                    {apt.phone && (
                      <a
                        href={`https://wa.me/${formatPhoneForWhatsApp(apt.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0"
                        title="Chat with client on WhatsApp"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-[var(--color-burgundy)] shrink-0" />
                    <span className="capitalize">{apt.location_preference} ({apt.session_type})</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-4 w-4 text-[var(--color-burgundy)] shrink-0" />
                    <span>{apt.date_preference} • {apt.time_of_day}</span>
                  </div>
                </div>

                {/* Notes */}
                {apt.notes && (
                  <div className="rounded-lg bg-[#FBF8F5] p-3 text-xs text-gray-700 border border-[#E8DFD8]">
                    <span className="font-semibold text-[var(--color-burgundy)] block mb-0.5">
                      Client Goals / Notes:
                    </span>
                    <p className="leading-relaxed">{apt.notes}</p>
                  </div>
                )}
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
