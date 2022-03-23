import React, { useState, useEffect } from "react";
import axios from "axios";
import BoxList from "./Components/BoxList";
import { BoxesContext } from "./Context";
import EditBox from "./Components/EditBox";
import { PlusIcon } from "@heroicons/react/solid";

function App() {
  const [boxes, setBoxes] = useState([]);
  const [boxFilter, setBoxFilter] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingBox, setIsAddingBox] = useState(false);
  const [editingBox, setEditingBox] = useState("");

  const [loadingAdd, setLoadingAdd] = useState(false);

  const [error, setError] = useState("");

  const getAllBoxes = async () => {
    try {
      const response = await axios.get("/api/boxes");
      if (response.data.length) {
        setBoxes([...response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBoxes();
  }, []);

  const addBox = async (data) => {
    setLoadingAdd(true);
    try {
      const response = await axios.post("/api/boxes", data);
      if (response?.data) {
        setBoxes([response.data, ...boxes]);
        setIsAddingBox(false);
        setIsEditing(false);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
          .map((err) => err.msg)
          .join(", ");
        setError(errors);
      }
    } finally {
      setLoadingAdd(false);
    }
  };

  const editBox = async (newBox) => {
    setLoadingAdd(true);
    try {
      const response = await axios.put(`/api/boxes/${newBox._id}`, newBox);
      if (response?.data && Object.keys(response.data).length) {
        const copy = [...boxes];
        const index = copy.findIndex((box) => box._id === newBox._id);
        copy[index] = {
          ...newBox,
        };
        setBoxes([...copy]);
        setIsEditing(false);
        setIsAddingBox(false);
      }
    } catch (error) {
      setError("Failed to edit box");
    } finally {
      setLoadingAdd(false);
    }
  };

  const deleteBox = async (id) => {
    setBoxes([...boxes.filter((box) => box._id !== id)]);
    try {
      await axios.delete(`/api/boxes/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getProps = {
    boxes,
    boxFilter,
    isEditing,
    editingBox,
    loadingAdd,
    error,
  };

  const setProps = {
    setBoxes,
    setBoxFilter,
    setIsEditing,
    setEditingBox,
    setIsAddingBox,
    addBox,
    editBox,
    deleteBox,
  };

  return (
    <BoxesContext.Provider value={{ ...getProps, ...setProps }}>
      {!isAddingBox ? (
        <>
          <div
            className="w-12 text-blue-400 mx-auto hover:text-blue-600 cursor-pointer m-4"
            onClick={() => setIsAddingBox(true)}
          >
            <PlusIcon />
          </div>

          <div className="m-4">
            {isEditing ? (
              <EditBox {...editingBox} />
            ) : (
              <BoxList boxes={boxes} />
            )}
          </div>
        </>
      ) : (
        <EditBox newBox />
      )}
    </BoxesContext.Provider>
  );
}

export default App;
