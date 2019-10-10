import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./button";

const Toggleable = props => {
  const [visible, setVisible] = useState(false);

  const showIfVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <div style={showIfVisible}>{props.children}</div>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? "Cancel" : props.text}
      </Button>
    </div>
  );
};

Toggleable.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
}

export default Toggleable;
