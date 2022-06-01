import { useState } from "react";
import Stepper from "../../components/Stepper/Stepper";
import StepControls from "../../components/StepControls/StepControls";
import { UseContextProvider } from "../../contexts/StepperContext";
import BasicInformation from "../../components/FormSteps/BasicInformation";
import TokenType from "../../components/FormSteps/TokenType";
import Configuration from "../../components/FormSteps/Configuration";
import Summary from "../../components/FormSteps/Summary";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./FormContainer.scss";

const FormContainer = ({ setShowForm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [stepSkip, setStepSkip] = useState(true);

  const steps = [
    "Basic Information",
    "Choose Token Type",
    "Configuration",
    "Summary",
  ];

  const [stepOne, setStepOne] = useState(true);
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BasicInformation setStepOne={setStepOne} />;
      case 2:
        return <TokenType setStepSkip={setStepSkip}/>;
      case 3:
        return <Configuration />;
      case 4:
        return <Summary />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    
    if (currentStep === 2 && direction==="next") {
      if (stepSkip) {
        newStep += 2;
      } else {
        newStep++;
        }
    } else {
        direction === "next" ? newStep++ : newStep--;
    }

    if (newStep === 0) {
      setShowForm(false);
      return;
    }
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="form_container h-screen flex bg-dark-400">
      <Header hiddenNav={true} />
      <div className="maincontainer flex flex-col justify-center items-center m-auto mt-auto py-32">
        <div className="upper-container horizontal container rounded-3xl px-14 py-4 pb-12 w-40v bg-opacity-30 text-white relative">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="herocontainer px-14 w-40v rounded-3xl bg-opacity-30 mt-10 text-white relative">
          <div className="horizontal container mt-5 ">
            <div className="p-10 ">
              <UseContextProvider>
                  {displayStep(currentStep)}
              </UseContextProvider>
            </div>
          </div>

          {/* navigation button */}
          {currentStep !== steps.length && (
              <StepControls
                handleClick={handleClick}
                currentStep={currentStep}
                stepOne={stepOne}
                steps={steps}
              />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormContainer;
