import { useEffect, useState } from "react";
import Stepper from "../../components/Stepper/StepperDesktop";
import StepControls from "../../components/StepControls/StepControls";
import BasicInformation from "../../components/FormSteps/BasicInfoDesktop";
import TokenType from "../../components/FormSteps/TokenTypeDesktop";
import Configuration from "../../components/FormSteps/Configuration";
import Summary from "../../components/FormSteps/SummaryDesktop";
import { useWeb3React } from "@web3-react/core";
import { useStepperContext } from "../../contexts/StepperContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./FormContainer.scss";
import ApproveModal from "../../components/Modal/VestAndApproveModal/ApproveModal";

const pinataSDK = require("@pinata/sdk");


const FormContainer = ({ setShowForm, chainIdInitial }) => {

  const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_API_SECRET);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepSkip, setStepSkip] = useState(true);
  const [files, setFiles] = useState([]);
  const { chainId, account } = useWeb3React();
  const { userData, setUserData } = useStepperContext();

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approveModalStatus, setApproveModalStatus] = useState(""); //beware on mobile take this component outside

  useEffect(() => {
    if (chainIdInitial !== chainId) {
      setShowForm(false);
      setUserData({});
    }
  }, [account, chainId]);

  const steps = [
    "Basic Information",
    "Choose Token Type",
    "Configuration",
    "Summary",
  ];

  const stepsd = [
    {
      name: "Basic Information",
      description: "Enter the basic details for your token",
    },
    {
      name: "Choose Token Type",
      description: "Select the type of token you want to create",
    },
    {
      name: "Configuration",
      description: "Advenced configuration of the token",
    },
    {
      name: "Summary",
      description: "Review your token and confirm",
    },
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
        return (
          <BasicInformation
            disableSteps={disableSteps}
            setDisableSteps={setDisableSteps}
            files={files}
            setFiles={setFiles}
          />
        );
      case 2:
        return (
          <TokenType
            disableSteps={disableSteps}
            setStepSkip={setStepSkip}
            setDisableSteps={setDisableSteps}
          />
        );
      case 3:
        return (
          <Configuration
            disableSteps={disableSteps}
            setDisableSteps={setDisableSteps}
          />
        );
      case 4:
        return <Summary files={files} />;
      default:
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    if (currentStep === 4 && direction === "next") {
      setApproveModalOpen(true);
    
      let pinataHash;

      try {
        pinataHash = await pinata.pinJSONToIPFS({
          description: userData.description,
          image64: userData?.image64
        });
      } catch (err) {
        console.log(err);
      }

      console.log("PINATA HASH 2", pinataHash);

      setTimeout(() => {
        setApproveModalOpen(false);
      }
      , 4000);
    }

    if (currentStep === 4 && direction === "back") {
      if (stepSkip) {
        newStep = 2;
      } else {
        newStep = 3;
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
      <ApproveModal
        open={approveModalOpen}
        setOpen={setApproveModalOpen}
        approveModalStatus={approveModalStatus}
        setApproveModalStatus={setApproveModalStatus}
      />
      <Header hiddenNav={true} />
      <div
        className={`py-32 maincontainer text-black flex gap-x-16 justify-between m-auto mt-auto px-24`}
      >
        <div
          className={`upper-container h-fit-content rounded-3xl px-14 py-10 w-28v bg-opacity-30 relative`}
        >
          <Stepper steps={stepsd} currentStep={currentStep} />
        </div>
        <div className="herocontainer px-12 py-4 w-60v rounded-3xl bg-opacity-30 relative">
          <div className="horizontal container">
            <div className="p-10 pb-4 ">{displayStep(currentStep)}</div>
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
};;

export default FormContainer;
