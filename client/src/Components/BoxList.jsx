import React, { useContext } from "react";
import { BoxesContext } from "../Context";
import Box from "./Box";
import Search from "./Search";

function BoxList({ boxes }) {
  const { boxFilter } = useContext(BoxesContext);

  return (
    <div className="grid justify-center">
      <Search />
      {boxes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(
          (box) =>
            box.content.toLowerCase().includes(boxFilter.toLowerCase()) ||
            box.theme.toLowerCase().includes(boxFilter.toLowerCase())
        )
        .map((box) => {
          return <Box key={box._id} {...box} />;
        })}
    </div>
  );
}

export default BoxList;
