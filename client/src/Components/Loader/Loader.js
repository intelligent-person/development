import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className={"loaderWrapper"}>
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
