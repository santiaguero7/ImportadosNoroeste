import React from "react";

interface SimpleToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  position?: "top" | "bottom";
}

const SimpleToast: React.FC<SimpleToastProps> = ({ message, isVisible, onClose, position = "top" }) => {
  if (!isVisible) return null;
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${position === "top" ? "-top-10" : "bottom-10"} z-50 px-4 py-2 bg-amber-300 text-black text-xs font-bold rounded shadow transition-all duration-300`}
      style={{ minWidth: 120, textAlign: "center", pointerEvents: "auto" }}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

export default SimpleToast;
