import React, { useState } from "react";
import crossIcon from "../../assets/images/cross.svg";
import MINI_BUILDER_STRINGS from "../../strings/miniBuilderStrings";
import generateUniqueId from "../../utils/randomIdGenerator";
import "./modal.css";

const STRINGS = MINI_BUILDER_STRINGS.MODAL;

const Modal = ({ prevEl, handleCancel, handleSaveChanges }) => {
  const [inputValues, setInputValues] = useState(
    prevEl || {
      text: "",
      x: "",
      y: "",
      fs: "",
      fw: "",
      id: generateUniqueId(),
    }
  );

  const handleChange = (id, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const onSave = () => {
    handleSaveChanges(inputValues);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-header">
        <p className="modal-title">{STRINGS.label.text}</p>
        <img
          className="modal-icon"
          src={crossIcon}
          id="img1"
          onClick={handleCancel}
          alt="cross-icon"
        />
      </div>
      <InputElement
        id="text"
        text="Text"
        prevValue={prevEl?.text}
        onChange={handleChange}
      />
      <InputElement
        id="x"
        text="X"
        prevValue={prevEl?.x}
        onChange={handleChange}
      />
      <InputElement
        id="y"
        text="Y"
        prevValue={prevEl?.y}
        onChange={handleChange}
      />
      <InputElement
        id="fs"
        text="Font Size"
        prevValue={prevEl?.fs}
        onChange={handleChange}
      />
      <InputElement
        id="fw"
        text="Font Weight"
        prevValue={prevEl?.fw}
        onChange={handleChange}
      />
      <button type="button" className="btn-primary" onClick={onSave}>
        {STRINGS.button.text}
      </button>
    </div>
  );
};

const InputElement = ({ prevValue, id, text, onChange }) => {
  const [value, setValue] = useState(prevValue || "");
  const handleChangeLocal = (e) => {
    setValue(e.target.value);
    onChange(id, e.target.value);
  };

  return (
    <div className="input-element">
      <h5 className="input-text" id={id}>
        {text}
      </h5>
      <input
        className="input-field"
        id={`input-${id}`}
        value={value}
        onChange={handleChangeLocal}
      />
    </div>
  );
};

export default Modal;
