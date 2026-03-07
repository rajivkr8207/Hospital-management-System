import React from "react";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  warning: "bg-yellow-500 text-black hover:bg-yellow-600",
  outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
