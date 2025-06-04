// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-2 rounded-xl transition duration-300 ease-in-out font-semibold shadow-md hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
