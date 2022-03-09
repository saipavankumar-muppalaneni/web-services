import React from "react";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import logo from "../../assets/trans.png";

function FullLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}
      className="flex-col align-center justify-center"
    >
      <Lottie options={defaultOptions} height={150} width={150} />
      <div
        className="flex-row justify-center align-center"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <img src={logo} style={{ width: 100, height: 100 }} />
      </div>
    </div>
  );
}

export default FullLoading;
