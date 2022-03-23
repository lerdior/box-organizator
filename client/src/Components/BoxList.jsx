import React from "react";
import Box from "./Box";

function BoxList({ boxes }) {
  return (
    <div className="grid justify-center">
      {boxes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((box) => {
          return <Box key={box._id} {...box} />;
        })}
    </div>
  );
}

export default BoxList;
