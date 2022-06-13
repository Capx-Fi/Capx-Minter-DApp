import React from "react";

const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = React.useState(options);

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
        <div key={index} className="text-caption-1 font-medium my-1">
          <label>
            <input
              readOnly
              type="checkbox"
              checked={item.checked || false}
              onClick={() => toggle(index)}
              className="mr-2"
            />
            {item.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default MultiselectCheckbox;
