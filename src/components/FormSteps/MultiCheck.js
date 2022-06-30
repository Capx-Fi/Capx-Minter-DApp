import React from "react";
import { Tooltip } from "@material-ui/core";
import InfoIcon from "../../assets/info-icon.svg";
import { checkboxTooltipInfo } from "./TokenTypeData";

const MultiselectCheckbox = ({ onChange, data, setData }) => {
  const toggle = (index) => {
    const newData = [...data];
    newData.splice(index, 1, {
      label: data[index].label,
      checked: !data[index].checked,
    });

    setData(newData);
    onChange(newData.filter((x) => x.checked));
  };

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="text-caption-3 twok:text-caption-1 font-medium my-1"
        >
          <label>
            <input
              readOnly
              type="checkbox"
              checked={item.checked || false}
              onClick={() => toggle(index)}
              // className="mr-2 text-capxGreen focus:ring-0 shadow-none focus:shadow-none ring-offset-0"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-green-300 w-3 h-3  twok:h-4 twok:w-4 rounded mr-2"
              style={{
                color: "green",
                border: "1px solid green",
                backgroundColor: "green",
              }}
            />
            {item.label}
            <Tooltip
              title={
                <span className="text-caption-2 block p-1 font-medium">
                  {checkboxTooltipInfo[item.label]}
                </span>
              }
              arrow
            >
              <img
                src={InfoIcon}
                alt="info"
                className="inline-block w-2.5 desktop:w-3 twok:w-4 ml-2 -mt-0.5"
              />
            </Tooltip>
          </label>
        </div>
      ))}
      <div
        className="text-caption-2 desktop:text-caption-1 twok:text-paragraph-2 font-medium my-1 mt-3 cursor-pointer rounded-lg px-4 w-fit-content"
        onClick={() => {
          const newData = [...data];
          newData.forEach((item) => {
            item.checked = false;
          });
          setData(newData);
          onChange(newData.filter((x) => x.checked));
        }}
      >
        Clear
      </div>
    </>
  );
};

export default MultiselectCheckbox;
