import React from "react";

import "./../css/general.css";
import "./../css/ActionControls.css";

const ActionControls = ({ processPlayerChoice, choiceList }) => {
  return (
    <div className="action-list ">
      {choiceList.map((choice, index) => (
        <button key={index} onClick={() => processPlayerChoice(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default ActionControls;
