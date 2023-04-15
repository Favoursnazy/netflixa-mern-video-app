import React from "react";
import { hasValidUrlProtocol } from "../utils/Functionalities";

const ImagePreview = ({ image, name }) => {
  return (
    <div className="w-32 mt-2 h-32 p-2 bg-main border boreder-border rounded">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};

export default ImagePreview;
