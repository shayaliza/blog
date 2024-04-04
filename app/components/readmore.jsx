// import React, { useState } from "react";

// function ReadMore({ text }) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <>
//       <div
//         onClick={toggleExpanded}
//         className="text-pinkborder pt-3 block text-center m-auto font3 text-lg pb-20 "
//       >
//         {isExpanded ? (
//           <div className="">
//             {text}
//             {text}
//           </div>
//         ) : (
//           "Proceed with caution!"
//         )}
//       </div>
//     </>
//   );
// }

// export default ReadMore;
import React, { useState } from "react";

function ReadMore({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        onClick={toggleExpanded}
        className="text-pinkborder pt-6 block text-center m-auto font3 text-lg pb-20"
      >
        {isExpanded ? (
          <div className="">
            {text}
            <br />
            {"OK BYE"}
          </div>
        ) : (
          "Proceed with caution!"
        )}
      </div>
    </>
  );
}

export default ReadMore;
