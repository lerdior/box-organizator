import React, { useContext, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { BoxesContext } from "../Context";

function Box({ _id, name, description, theme, content, dimensions, location }) {
  const [showMore, setShowMore] = useState(false);
  const { setEditingBox, setIsEditing, deleteBox } = useContext(BoxesContext);

  return (
    <div
      className="rounded border border-white p-7 text-center m-4 relative"
      style={{ width: "70vw", minWidth: "200px" }}
    >
      <span
        className="w-6 cursor-pointer hover:animate-bounce hover:text-red-300 absolute top-2 right-1"
        onClick={() => {
          setEditingBox({
            _id,
            name,
            description,
            theme,
            content,
            dimensions,
            location,
          });
          setIsEditing(true);
        }}
      >
        <PencilIcon />
      </span>
      <span
        className="w-6 cursor-pointer hover:animate-bounce hover:text-red-300 absolute top-2 right-8"
        onClick={() => deleteBox(_id)}
      >
        <TrashIcon />
      </span>
      <h1 className="text-lg font-semibold">{name}</h1>
      <p>{content}</p>

      {showMore && (
        <>
          <p>{description}</p>
          <p>{theme}</p>
          <p>{dimensions}</p>
          <p>{location}</p>
        </>
      )}

      <div className="pt-4">
        <span
          className="text-blue-400 cursor-pointer inline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Hide" : "Show more"}
        </span>
      </div>
    </div>
  );
}

export default Box;
