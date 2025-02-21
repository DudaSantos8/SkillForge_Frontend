import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white p-6 shadow-lg rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export default Card;
