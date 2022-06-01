import React, { useRef, useState } from "react";
import dummyToken from "../../assets/dummyToken.svg";
import swapIcon from "../../assets/swapIcon.svg";
import threedot from "../../assets/threedot.svg";
import tradeInfo from "../../assets/tradeInfo.svg";
import cross from "../../assets/cross.svg";



function Accordion() {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setDisplay, setDisplayState] = useState("displayBorder");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setDisplayState(
      setActive === "active" ? "displayBorder" : "accordion__content"
    );
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-primary-green-300";
      case "In Progress":
        return "bg-warning-color-400";
      case "Expired":
        return "bg-cyan";
      case "Cancelled":
        return "bg-error-color-300";
      case "Partial":
        return "bg-primary-green-500";
      default:
        return "";
    }
  };
  return (
    <div className="pb-8">
      <div
        onClick={toggleAccordion}
        className="assetPairContainer"
      >
        <div className="tradesScreen_body_assetPairContainer_assetPair">
          <p className="tradesScreen_body_assetPairContainer_title">Assets</p>
          <div className="tradesScreen_body_assetPairContainer_value">
            <img className="w-5 mr-2" src={dummyToken} alt="token icon" />{" "}
            {"NKT"}
          </div>
        </div>
        <div className="tradesScreen_body_assetPairContainer_giveToken ">
          <p className="tradesScreen_body_assetPairContainer_title">
            {"NKT"}
          </p>
          <div className="tradesScreen_body_assetPairContainer_value">
            {90}
          </div>
        </div>
        <div className="tradesScreen_body_assetPairContainer_swapIcon ">
          <img className="" src={swapIcon} alt="swap icon" />
        </div>
        <div className="tradesScreen_body_assetPairContainer_getToken ">
          <p className="tradesScreen_body_assetPairContainer_title">
            {"NKT"}
          </p>
          <div className="tradesScreen_body_assetPairContainer_value">
            {90}
          </div>
        </div>
        <div className="tradesScreen_body_assetPairContainer_separator" />
        <div className="tradesScreen_body_assetPairContainer_status">
          <div
            className={`tradesScreen_body_assetPairContainer_status_value ${getStatusColor(
              "Completed"
            )}`}
          >
            {"Completed"}
          </div>
        </div>
        <div className="tradesScreen_body_assetPairContainer_chevron">
          <div className={setActive === "active" ? "" : ""}></div>
          <img className="" src={threedot} alt="dropdown icon" />
        </div>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={`accordion__content`}
      >
        <div className="accordion_header">
          <img className="w-4 mr-1" src={tradeInfo} alt="trade icon" />
          <div className="accordion_header_title">TRADE INFO</div>
        </div>
        <hr className="accordion_separator" />
        <div className="accordion_body">
          <div className="accordion_body_left">
            <div className="accordion_body_left_title">EXCHANGED SO FAR :</div>
            <div className="accordion_body_left_value">
              <div className="accordion_body_left_value_give">
                <span>{"NKT"}: </span>
                {90}
              </div>
              <div className="accordion_body_left_value_get">
                <span>{"NLT"}: </span>
                {90}
              </div>
            </div>
          </div>
          <div className="accordion_body_right">
            <div className="accordion_body_right_title">REMAINING :</div>
            <div className="accordion_body_right_value">
              <div className="accordion_body_right_value_give">
                <span>{"NKT"}: </span>
                {90}
              </div>
              <div className="accordion_body_right_value_get">
                <span>{"NLT"}: </span>
                {90}
              </div>
            </div>
          </div>
        </div>
        <div className="accordion_footer">
          {3 === 3 ? (
            <div
              className="accordion_footer_cancel"
            >
              CANCEL TRADE{" "}
              <img className="w-5 ml-2" src={cross} alt="cross icon" />
            </div>
          ) : (
            ""
          )}

          <hr className="accordion_sepend" />
        </div>
      </div>
    </div>
  );
}

export default Accordion;
