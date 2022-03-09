import React from "react";

export function Text({
  size = 13,
  weight = 400,
  style = [],
  children,
  ...props
}) {
  return (
    <p
      style={{
        fontSize: size,
        fontFamily: "Poppins, sans-serif",
        fontWeight: weight,
        margin: 2,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
}
