import { Button as Default } from "antd";
import React from "react";
import { ClipLoader } from "react-spinners";
import { colors } from "../constants";

function Button({ style, color = colors.primary, disabled, loading, children, ...props }) {
  return (
    <Default
      disabled={disabled || loading}
      style={{
        backgroundColor: color,
        height: 45,
        borderColor: color,
        width: "100%",
        ...style,
        fontWeight: 700,
        borderRadius: 8,
      }}
      type="primary"
      {...props}
    >
      {loading ?
        <ClipLoader color={'white'} loading={loading} size={25} />
        :
        children
      }
    </Default>
  );
}

export default Button;
