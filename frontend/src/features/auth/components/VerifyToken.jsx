// app/verify-token/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VerifyUserToken } from "../services/auth.api";

const VerifyTokenPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [token, setToken] = useState("");
  const [countdown, setCountdown] = useState(5);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    console.log(tokenFromUrl);
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // eslint-disable-next-line react-hooks/immutability
      verifyToken(tokenFromUrl);
    } else {
      setVerificationStatus("error");
    }
  }, [searchParams]);

  useEffect(() => {
    let timer;
    if (verificationStatus === "success" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (verificationStatus === "success" && countdown === 0) {
      window.location.href = "/login";
    }
    return () => clearTimeout(timer);
  }, [verificationStatus, countdown]);

  const verifyToken = async (token) => {
    try {
      const res = await VerifyUserToken(token);
      console.log(res);
      if (res.status == 200) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    } catch (error) {
      setVerificationStatus("error");
    }
  };

  const handleRetry = () => {
    setVerificationStatus("verifying");
    verifyToken(token);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] to-[#E8E2D8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9F7E69] to-[#7A8B99] rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-light">+</span>
            </div>
            <span className="text-3xl font-serif text-[#2C3A4A]">MediCare</span>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-[#9F7E69] via-[#7A8B99] to-[#B48C6C]"></div>

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif text-[#2C3A4A] mb-2">
                Email Verification
              </h1>
              <p className="text-[#6B7280]">
                {verificationStatus === "verifying" &&
                  "Verifying your email address..."}
                {verificationStatus === "success" &&
                  "Your email has been successfully verified!"}
                {verificationStatus === "error" &&
                  "Verification failed. Please try again."}
              </p>
            </div>

            {/* Status Icon */}
            <div className="flex justify-center mb-8">
              {verificationStatus === "verifying" && (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-[#E8E2D8] border-t-[#9F7E69] animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-[#9F7E69]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {verificationStatus === "success" && (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6D8A7D] to-[#7A8B99] flex items-center justify-center animate-pulse">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C97C6D] to-[#B48C6C] flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Message */}
            <div className="text-center mb-8">
              {verificationStatus === "verifying" && (
                <div className="space-y-3">
                  <p className="text-[#2C3A4A]">
                    Please wait while we verify your email address.
                  </p>

                  <div className="flex justify-center space-x-1">
                    <span
                      className="w-2 h-2 bg-[#9F7E69] rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-[#7A8B99] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-[#B48C6C] rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              )}

              {verificationStatus === "success" && (
                <div className="space-y-4">
                  <div className="bg-[#6D8A7D]/10 rounded-2xl p-4">
                    <p className="text-[#2C3A4A]">
                      <span className="font-semibold text-[#6D8A7D]">
                        ✓ Success!
                      </span>{" "}
                      Your email has been verified.
                    </p>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    You can now log in to your account.
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Redirecting to login in{" "}
                    <span className="font-bold text-[#9F7E69]">
                      {countdown}
                    </span>{" "}
                    seconds...
                  </p>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="space-y-4">
                  <div className="bg-[#C97C6D]/10 rounded-2xl p-4">
                    <p className="text-[#2C3A4A]">
                      <span className="font-semibold text-[#C97C6D]">
                        ✗ Error!
                      </span>{" "}
                      The verification link is invalid or has expired.
                    </p>
                    {token && (
                      <p className="text-xs text-[#6B7280] mt-2 break-all">
                        Token: {token.substring(0, 20)}...
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    Please request a new verification link or contact support.
                  </p>
                </div>
              )}
            </div>

            {/* Token Info (if in development) */}
            {process.env.NODE_ENV === "development" && token && (
              <div className="mb-6 p-3 bg-[#F5F1EB] rounded-xl">
                <p className="text-xs text-[#6B7280] mb-1">Debug Info:</p>
                <p className="text-xs text-[#2C3A4A] break-all">
                  Token: {token}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {verificationStatus === "success" && (
                <Link
                  href="/login"
                  className="block w-full bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Go to Login
                </Link>
              )}

              {verificationStatus === "error" && (
                <>
                  <button
                    onClick={handleRetry}
                    className="block w-full bg-gradient-to-r from-[#9F7E69] to-[#7A8B99] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/resend-verification"
                    className="block w-full bg-[#F5F1EB] text-[#2C3A4A] py-3.5 rounded-xl font-medium hover:bg-[#E8E2D8] transition-colors text-center"
                  >
                    Resend Verification Email
                  </Link>
                </>
              )}

              {verificationStatus === "verifying" && (
                <button
                  disabled
                  className="block w-full bg-[#F5F1EB] text-[#6B7280] py-3.5 rounded-xl font-medium cursor-not-allowed"
                >
                  Verifying...
                </button>
              )}

              {/* Back to Home Link */}
              <Link
                href="/"
                className="block text-center text-sm text-[#6B7280] hover:text-[#9F7E69] transition-colors mt-4"
              >
                ← Back to Home
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-[#6B7280]">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-[#9F7E69] hover:text-[#7A8B99] transition-colors"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-[#6B7280]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure verification process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyTokenPage;
