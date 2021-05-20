import React from "react";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

export const NotRegistersFound = ({ title = "No hay registros" }) => {
  return (
    <div className="text-center">
      <SentimentVeryDissatisfiedIcon className="svg-not-register" />
      <h4>{title}</h4>
    </div>
  );
};
