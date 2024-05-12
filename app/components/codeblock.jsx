import React from "react";

function CodeBlock({ code }) {
  return (
    <div className="relative justify-center flex mt-4">
      <pre className="overflow-auto z-0">
        <code className="block p-5 bg-black rounded-md text-green-600 w-11/12 m-auto overflow-x-auto md:w-full text-sm md:text-base">
          {code}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;
