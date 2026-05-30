// ProfilePopup.jsx
import React, { useState } from "react";

import { LogOut, Pencil, QrCode } from "lucide-react";

import QRModal from "./QRModal";

export default function ProfilePopup() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="absolute top-14 right-0 w-[320px] rounded-2xl border border-gray-200 bg-white shadow-xl p-5 z-50 bg-white">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile</h2>

      {/* Avatar */}
      <div className="flex justify-center mb-5 relative">
        <img
          src="https://i.pravatar.cc/120"
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <button className="absolute bottom-1 right-[88px] bg-white border rounded-full p-1 shadow hover:bg-gray-100 transition">
          <Pencil size={14} className="text-gray-600" />
        </button>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">Name</label>

        <div className="mt-1 flex items-center justify-between border rounded-lg px-3 py-2">
          <span className="text-gray-700">Rohan</span>

          <button>
            <Pencil size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">Phone Number</label>

        <div className="mt-1 flex items-center justify-between border rounded-lg px-3 py-2">
          <span className="text-gray-700">+91 98765 43210</span>

          <button>
            <Pencil size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* UPI */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">UPI ID</label>

        <div className="mt-1 flex items-center justify-between border rounded-lg px-3 py-2">
          <span className="text-gray-700">rohan.p@okaxis</span>

          <button
            onClick={() => setShowQR(!showQR)}
            className="hover:bg-gray-100 p-1 rounded transition"
          >
            <QrCode size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* QR */}
      <QRModal show={showQR} onClose={() => setShowQR(false)} />

      {/* Logout */}
      <button className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
