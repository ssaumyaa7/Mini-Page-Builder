// Higher order component rendering mini builder page
import React, { useEffect, useMemo, useState } from "react";
import MiniBuilder from "../pages/MiniBuilder";

const miniBuilderContainer = (WrappedComponent) => () => {
  // State to keep check of Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEl, setCurrentEl] = useState(null);

  // Memoize localStorage value
  const storedListString = useMemo(() => localStorage.getItem("mainList"), []);
  const storageRedoList = useMemo(() => localStorage.getItem("updatedList"), []);

  // Initialize list with the parsed value or an empty array
  const [list, setList] = useState(
    storedListString ? JSON.parse(storedListString) : []
  );

  const [redoList, setRedoList] = useState(
    storageRedoList ? JSON.parse(storageRedoList) : []
  );

  // Set list in localStorage
  useEffect(() => {
    localStorage.setItem("mainList", JSON.stringify(list));
    localStorage.setItem("updatedList", JSON.stringify(redoList));
  }, [list, redoList]);

  // funcationality for Undo
  const handleUndo = () => {
    if (list.length > 0) {
      const undoElement = list.pop();
      setList([...list]);
      setRedoList((prevRedoList) => [...prevRedoList, undoElement]);
    }
  };
  // functionalisty for Redo
  const handleRedo = () => {
    if (redoList.length > 0) {
      const redoElement = redoList.pop();
      setRedoList([...redoList]);
      setList((prevList) => [...prevList, redoElement]);
    }
  };

  // Handle drag start event
  const onDragStart = (e) => {
    e.dataTransfer.setData("Text", e.target.id);
  };

  // Handle drag over event
  const onDragOver = (e) => {
    // Prevent the default behavior of the dragged element being opened in a new tab
    e.preventDefault();
  };

  // Handle drop event
  const onDrop = (e) => {
    // Prevent the default behavior of the dropped element being opened in a new tab
    e.preventDefault();

    // Get the data from the dropped element
    const data = e.dataTransfer.getData("Text");
    const draggedElement = document.getElementById(data);

    // Check if the dragged element exists
    if (draggedElement) {
      // Get the mouse coordinates at the drop location
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const isIdPresent = list.some((el) => el.id == draggedElement.id);

      // If the id is present, update the position; otherwise, open the modal
      if (isIdPresent) {
        const updatedArray = list.map((el) =>
          el.id == draggedElement.id ? { ...el, x: mouseX, y: mouseY } : el
        );
        setList(updatedArray);
      } else {
        setModalOpen(true);
      }
    }
  };

  // Function to handle the cancellation of changes in the modal
  const handleCancel = () => {
    setModalOpen(false);
  };

  // Function to handle saving changes from the modal
  const handleSaveChanges = (inputValues) => {
    if (inputValues.text) {
      // Update the list of items either by modifying an existing item or adding a new one
      setList((prevList) =>
        currentEl
          ? prevList.map((el) =>
              el.id === currentEl.id ? { ...el, ...inputValues } : el
            )
          : [...prevList, inputValues]
      );
      setModalOpen(false);
      return;
    }
    // If 'text' is not present, show an alert
    alert("Please enter text");
  };

  // Function to handle key events (e.g., Enter or Delete) on items in the list
  const handleKeyDown = (e, el) => {
    if (e.key === "Delete") {
      // Remove the item from the list based on its ID
      setList((prevList) => prevList.filter((item) => item.id !== el.id));
      setCurrentEl(null);
    }
    // Check if the pressed key is 'Enter'
    if (e.key === "Enter") {
      setCurrentEl(el);
      setModalOpen(true);
    }
  };

  // Function to export the current page configuration as a JSON file
  const exportPageConfiguration = () => {
    const jsonString = JSON.stringify(list, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mini_builder_page_configuration.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <WrappedComponent
      modalOpen={modalOpen}
      currentEl={currentEl}
      handleCancel={handleCancel}
      handleSaveChanges={handleSaveChanges}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      handleKeyDown={handleKeyDown}
      list={list}
      exportPageConfiguration={exportPageConfiguration}
      handleUndo={handleUndo}
      handleRedo={handleRedo}
    />
  );
};

export default miniBuilderContainer(MiniBuilder);
