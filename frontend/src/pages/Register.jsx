import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import {
  Lock,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  ReceiptIndianRupee,
} from "lucide-react";

import loginleft from "../assets/loginleft.jpeg";
import logo from "../assets/logo.png";
import loginb1 from "../assets/loginb1.png";
import loginb3 from "../assets/loginb3.png";

function Register() {
  const navigate = useNavigate();
  const [upi, setUpi] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const upiRegex = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [upiError, setUpiError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Please enter your name");
      return;
    }
    if (upiError || passwordError) {
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    if (!upiRegex.test(upi)) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/public/register", {
        method: "POST",
        body: JSON.stringify({
          phone,
          upi,
          name: fullName,
          password,
        }),
      });

      alert(response.message);

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SECTION */}
        <div className="bg-[#fafafa] border-r border-gray-200 flex flex-col justify-between p-8 lg:p-10">
          {/* Logo */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 inline-block mr-3"
              />
              Split <span className="text-red-500">Expense</span>
            </h1>

            <p className="text-gray-500 mt-2 text-base lg:text-lg">
              Split costs. Save friendships.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center flex-1 py-8">
            <img
              src={loginleft}
              alt="illustration"
              className="w-[240px] lg:w-[360px] object-contain"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-5 text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <img src={loginb1} alt="" />
              </div>

              <h3 className="font-semibold text-base">Group Expenses</h3>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Add friends and create groups easily
              </p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <ReceiptIndianRupee size={34} className="text-green-500" />
              </div>

              <h3 className="font-semibold text-base">Track & Settle</h3>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Track every expense and settle up
              </p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <img src={loginb3} alt="" />
              </div>

              <h3 className="font-semibold text-base">Clear & Simple</h3>

              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                See who owes what instantly
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg">
            {/* Heading */}
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-gray-900">
                Create Your Account
              </h2>

              <p className="text-gray-500 mt-3">
                Join Split Expense and start splitting in seconds.
              </p>
            </div>

            {/* Full Name */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-red-400">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full ml-3 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-r text-gray-500">+91</div>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 outline-none"
                />
              </div>
            </div>

            {/* UPI ID */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700">
                UPI ID
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-red-400">
                <input
                  type="text"
                  placeholder="Enter your UPI ID"
                  value={upi}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUpi(value);

                    if (value && !upiRegex.test(value)) {
                      setUpiError("Invalid UPI ID");
                    } else {
                      setUpiError("");
                    }
                  }}
                  className="w-full outline-none"
                />
              </div>
              {upiError && (
                <p className="text-red-500 text-xs mt-1">{upiError}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-4 py-3">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;

                    setPassword(value);

                    if (value.length > 0 && value.length < 6) {
                      setPasswordError(
                        "Password must be at least 6 characters",
                      );
                    } else {
                      setPasswordError("");
                    }
                  }}
                  className="w-full ml-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>

              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-5">
              Use 6+ characters with a mix of letters, numbers & symbols.
            </p>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-lg px-4 py-3">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full ml-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              disabled={loading}
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-95 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login */}
            <p className="text-center text-gray-500 mt-12">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-red-500 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 mt-10 text-gray-400 text-sm">
              <ShieldCheck size={16} />

              <p>Your data is safe and secure with us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
