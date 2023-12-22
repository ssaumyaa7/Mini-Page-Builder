import React from "react";
import BlockElement from "../components/BlockElement/BlockElement";
import Modal from "../components/Modal/Modal";
import PageElement from "../components/PageElement/PageElement";
import elementInfo from "../data/elementInfo";
import "./miniBuilder.css";

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
}) => {
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
