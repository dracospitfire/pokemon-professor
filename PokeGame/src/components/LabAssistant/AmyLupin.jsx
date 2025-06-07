import { Link } from "react-router-dom";

import assistant from "../../assets/Images/icons/Assistant.svg";

const LabAssistant = ({ message = "Welcome", route = "/welcome" }) => {

  return (
    <>
      <div className="icon">
        <Link to={route} className="icon-assistant" >
          <img src={assistant} alt="take notes" className="assistant-icon" />
          <span className="icon-assistant-text">
            <strong>Amy Lupin</strong> - Lab Assistant<br />
            <strong>Notes: </strong>{message}</span>
        </Link>
      </div>
    </>
  );
};

export default LabAssistant;