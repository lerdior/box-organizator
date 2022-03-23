import React, { useContext } from "react";
import { BoxesContext } from "../Context";

function Search() {
  const { boxFilter, setBoxFilter } = useContext(BoxesContext);

  return (
    <div className="flex flex-col my-4 max-w-xl place-self-center">
      <label>Search</label>
      <input
        type="text"
        value={boxFilter}
        onChange={(e) => setBoxFilter(e.target.value)}
      />
    </div>
  );
}

export default Search;
