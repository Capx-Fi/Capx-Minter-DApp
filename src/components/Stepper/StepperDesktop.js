import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step.description,
          title: step.name,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full my-8 flex items-center"
            : "flex items-center"
        }
      >
        <div className="flex gap-x-6 twok:gap-x-12">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-4 border-capxGreen h-10 w-10 twok:h-12 twok:w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-capxGreen text-black font-bold border border-capxGreen "
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`flex flex-col justify-center text-black text-paragraph-2 leading-paragraph-2 twok:text-paragraph-1 twok:leading-paragraph-1 tracking-tight font-medium ${
              step.highlighted ? "font-bold" : ""
            }`}
          >
            <div>{step.title}</div>
            <div className="text-caption-3 leading-caption-3 twok:text-caption-2 text-gray-700 twok:leading-caption-2">
              {step.description}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="p-4 tracking-tight flex-col justify-between items-center ">
        <div className="font-bold text-paragraph-1 leading-paragraph-1 twok:text-subheading twok:leading-subheading mb-6">
          Mint in Four Simple Steps
        </div>
        {stepsDisplay}
      </div>
    </>
  );
};
export default Stepper;
