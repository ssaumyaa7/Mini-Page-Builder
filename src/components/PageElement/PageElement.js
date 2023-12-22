import React, { useState } from "react";
import "./pageElement.css";

const PageElement = ({ el }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onPageElementClick = () => {
    setIsSelected(true);
  };

  const elementStyle = {
    position: "absolute",
    left: `${el.x}px`,
    top: `${el.y}px`,
    fontSize: `${el.fs}px`,
    fontWeight: el.fw,
  };

  return (
    <div
      onClick={onPageElementClick}
      draggable="true"
      style={elementStyle}
      id={el.id}
    >
      <p id={el.id} className={`${isSelected && "selected-element"}`}>
        {el.text}
      </p>
    </div>
  );
};

export default PageElement;
