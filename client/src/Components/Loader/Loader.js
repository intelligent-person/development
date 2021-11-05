import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="lds-heart">
      <div></div>
    </div>
  );
};

export default React.memo(Loader);
