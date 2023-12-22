import React, { useState, useEffect, useMemo } from "react";
import "./miniBuilder.css";
import BlockElement from "../../components/BlockElement/BlockElement";
import elementInfo from "../../data/elementInfo";
import Modal from "../../components/Modal/Modal";
import PageElement from "../../components/PageElement/PageElement";

const MiniBuilder = () => {
  // State to keep check of Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEl, setCurrentEl] = useState(null);

  // Memoize localStorage value
  const storedListString = useMemo(() => localStorage.getItem("pageList"), []);

  // Initialize list with the parsed value or an empty array
  const [list, setList] = useState(
    storedListString ? JSON.parse(storedListString) : []
  );

  // Set list in localStorage
  useEffect(() => {
    localStorage.setItem("pageList", JSON.stringify(list));
  }, [list]);

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

      const isIdPresent = list.some(
        (el) => el.id == draggedElement.id
      );

      // If the id is present, update the position; otherwise, open the modal
      if (isIdPresent) {
        const updatedArray = list.map((el) =>
          el.id== draggedElement.id
            ? { ...el, x: mouseX, y: mouseY }
            : el
        );
        setList(updatedArray);
      } else {
        setModalOpen(true);
      }
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
  
  const handleSaveChanges = (inputValues) => {
    if (inputValues.text) {
      setList((prevList) =>
        currentEl
          ? prevList.map((el) => (el.id === currentEl.id ? { ...el, ...inputValues } : el))
          : [...prevList, inputValues]
      );
      setModalOpen(false);
      return;
    }
    alert("Please enter text");
  };
  

  const handleKeyDown = (e, el) => {
    if (e.key === "Delete") {
      setList((prevList) => prevList.filter((item) => item.id !== el.id));
      setCurrentEl(null);
    }
    if (e.key === "Enter") {
      setCurrentEl(el);
      setModalOpen(true);
    }
  };

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
    <div className="mini-builder-main">
      {modalOpen && (
        <Modal
          prevEl={currentEl}
          handleCancel={handleCancel}
          handleSaveChanges={handleSaveChanges}
        />
      )}
      <div
        className={`mini-builder-wrapper ${
          modalOpen ? "overlay" : "mini-builder-b"
        }`}
      >
        <div
          className="drop-target"
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => onDragOver(e)}
          onDragStart={(e) => onDragStart(e)}
        >
          {list?.map((el) => (
            <div
              onKeyDown={(e) => handleKeyDown(e, el)}
              tabIndex="0"
              className="drop-page-element"
              key={el.id}
            >
              <PageElement el={el} />
            </div>
          ))}
        </div>
        <div className="drop-block" onDragOver={(e) => onDragOver(e)}>
          <h5 className="block-title">BLOCKS</h5>
          {elementInfo.map((el) => (
            <BlockElement
              key={el.id}
              id={el.id}
              name={el.name}
              onDragStart={onDragStart}
            />
          ))}
          <button className="export-btn" onClick={exportPageConfiguration}>
            Export Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniBuilder;
