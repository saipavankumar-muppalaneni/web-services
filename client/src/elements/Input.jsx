import React from "react";
import { Input as DefaultIuput, InputProps } from "antd";
import { Text } from '../elements'
function Input({ size = "large", type = "", rows = 4, err, ...props }) {
  if (type == "textArea") {
    return (
      <DefaultIuput.TextArea
        rows={rows}
        style={{ height: 150, borderRadius: 5, }}
        {...props}
      />
    );
  }
  return (
    <>
      <DefaultIuput
        type={type}
        size={size}
        style={{ height: 45, borderRadius: 5, borderColor: err ? 'red' : '' }}
        {...props}
      />
      {
        err ?
          <Text style={{ color: "red" }} size={'10'}>
            {err.message}
          </Text> : null
      }
    </>
  );
}

export { Input };
