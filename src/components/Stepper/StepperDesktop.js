import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
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
        <div className="flex gap-x-12">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-4 border-capxGreen h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-capxGreen text-black font-bold border border-capxGreen "
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-black font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`flex flex-col justify-center text-black text-paragraph-1 leading-paragraph-1 tracking-tight font-medium ${
              step.highlighted ? "font-bold" : ""
            }`}
          >
            <div>{step.title}</div>
            <div className="text-caption-2 text-gray-700 leading-caption-2">{step.description}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
          <div className="p-4 tracking-tight flex-col justify-between items-center">
              <div className="font-bold text-subheading leading-subheading mb-6">Mint in Four Simple Steps</div>
        {stepsDisplay}
      </div>
    </>
  );
};
export default Stepper;
