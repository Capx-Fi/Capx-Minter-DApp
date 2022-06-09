import { useEffect, useState } from "react";
import Stepper from "../../components/Stepper/Stepper";
import StepControls from "../../components/StepControls/StepControls";
import { UseContextProvider } from "../../contexts/StepperContext";
import BasicInformation from "../../components/FormSteps/BasicInformation";
import TokenType from "../../components/FormSteps/TokenType";
import Configuration from "../../components/FormSteps/Configuration";
import Summary from "../../components/FormSteps/Summary";
import { useWeb3React } from "@web3-react/core";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./FormContainer.scss";

const FormContainer = ({ setShowForm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepSkip, setStepSkip] = useState(true);
  const [files, setFiles] = useState([]);
  const {chainId, account} = useWeb3React();

  useEffect(() => {
    setCurrentStep(1);
  },[account, chainId]);

  const steps = [
    "Basic Information",
    "Choose Token Type",
    "Configuration",
    "Summary",
  ];

  const [disableSteps, setDisableSteps] = useState({
    first: true,
    second: true,
    third: true,
    fourth: false,
  });


  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <BasicInformation disableSteps={disableSteps} setDisableSteps={setDisableSteps} files={files} setFiles={setFiles}/>;
      case 2:
        return <TokenType disableSteps={disableSteps} setStepSkip={setStepSkip} setDisableSteps={setDisableSteps}/>;
      case 3: 
        return <Configuration disableSteps={disableSteps} setDisableSteps={setDisableSteps} />;
      case 4:
        return <Summary files={files}/>;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (currentStep === 4 && direction === "next") {
      return;
    }

    if (currentStep === 4 && direction === "back") {
      if (stepSkip) {
        newStep=2;
      } else {
        newStep=3;
      }
      console.log(currentStep, newStep);
      setCurrentStep(newStep);
      return;
    }

    if (currentStep === 2 && direction === "next") {
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
    <div className="form_container h-screen flex-col">
      <Header hiddenNav={true} />
      <div
        className={`${
          currentStep === 2 ? "overflow-y-hidden pt-32 pb-8" : "py-32"
        } maincontainer text-black flex flex-col justify-center items-center m-auto mt-auto `}
      >
        {currentStep === 2 && <div className="h-32 text-transparent" id="specialdiv">
          HELLO
        </div>}

        <div className={`mt upper-container horizontal container rounded-3xl px-14 py-4 pb-12 w-40v bg-opacity-30 relative`}>
          <Stepper steps={steps} currentStep={currentStep}/>
        </div>
        <div className="herocontainer px-14 w-40v rounded-3xl bg-opacity-30 mt-10 relative">
          <div className="horizontal container mt-5 ">
            <div className="p-10 pb-4 ">
              <UseContextProvider>
                {displayStep(currentStep)}
              </UseContextProvider>
            </div>
          </div>

          {/* navigation button */}

          <StepControls
            handleClick={handleClick}
            currentStep={currentStep}
            disableSteps={disableSteps}
            steps={steps}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormContainer;
