import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    console.log(newSteps);
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
          description: step,
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
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-black bg-white">
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
            className={`absolute top-0 text-center text-black mt-16 w-32 text-caption-2 leading-caption-2 tracking-tight font-medium ${
              step.highlighted ? "font-bold" : ""
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-4 transition duration-500 ease-in-out  ${
            step.completed ? "border-capxGreen" : "border-white"
          }  `}
        ></div>
      </div>
    );
  });

  return (
    <>
      
      <div
        className="mx-4 p-4 flex justify-between items-center"
        
      >
        {stepsDisplay}
      </div>
    </>
  );
};
export default Stepper;
