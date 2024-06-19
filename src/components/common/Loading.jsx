import React from "react";

const Loading = () => {
  return (
    <>
      <main className=" min-h-screen flex justify-center items-center">
        <section className="flex justify-center items-center">
          <div className=" relative min-h-screen flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-16 w-16 border-4 border-solid border-t-transparent border-[#4E1B61]"></div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Loading;
