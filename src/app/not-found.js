import Image from "next/image";
import React from "react";
import img from "@/../public/assets/404.svg";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="w-1/3">
      <Image width={1000} height={1000} className="object-fill" src={img} />
      </div>
      <h1>400 - Bad Request</h1>
      <p>
        The request could not be understood by the server due to malformed
        syntax. Please modify your request and try again.
      </p>
    </div>
  );
};

export default NotFound;
