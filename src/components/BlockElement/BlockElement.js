// Sidebar block component having three fields
import React from "react";
import gripVerticalIcon from "../../assets/images/grip-vertical.svg";
import "./blockElement.css";

const BlockElement = ({ onDragStart, id, name }) => {
  return (
    <div className="block-element-wrapper">
      <div
        onDragStart={(e) => onDragStart(e)}
        draggable="true"
        className="be-box"
        id={id}
      >
        <img
          id={id}
          className="be-box-img"
          src={gripVerticalIcon}
          alt="grip-icon"
        />
        <p id={id}>{name}</p>
      </div>
    </div>
  );
};

export default BlockElement;
