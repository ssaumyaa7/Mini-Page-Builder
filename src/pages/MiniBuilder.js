// main mini builder page rendering all components
import React from "react";
import BlockElement from "../components/BlockElement/BlockElement";
import Modal from "../components/Modal/Modal";
import PageElement from "../components/PageElement/PageElement";
import MINI_BUILDER_STRINGS from "../strings/miniBuilderStrings";
import "./miniBuilder.css";

const STRINGS = MINI_BUILDER_STRINGS.BUILDER_PAGE;
const ELEMENT_INFO = MINI_BUILDER_STRINGS.ELEMENT_INFO;

const MiniBuilder = ({
  modalOpen,
  currentEl,
  handleCancel,
  handleSaveChanges,
  onDrop,
  onDragOver,
  onDragStart,
  handleKeyDown,
  list,
  exportPageConfiguration,
  handleUndo,
  handleRedo,
}) => {
  return (
    <div className="mini-builder-main">
      {/* Modal opens when user edits or adds new element */}
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
          {/* Renders all list of element on the page */}
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
        {/* Sidebar blocks component */}
        <div className="drop-block" onDragOver={(e) => onDragOver(e)}>
          <h5 className="block-title">{STRINGS.blocks.text}</h5>
          {ELEMENT_INFO.map((el) => (
            <BlockElement
              key={el.id}
              id={el.id}
              name={el.name}
              onDragStart={onDragStart}
            />
          ))}
          {/* Button to download page configuration */}
          <button className="export-btn" onClick={exportPageConfiguration}>
            {STRINGS.button.text}
          </button>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
      </div>
    </div>
  );
};

export default MiniBuilder;
