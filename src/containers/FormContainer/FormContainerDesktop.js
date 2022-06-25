import { useEffect, useState } from "react";
import Stepper from "../../components/Stepper/StepperDesktop";
import StepControls from "../../components/StepControls/StepControls";
import BasicInformation from "../../components/FormSteps/Desktop/BasicInfoDesktop";
import TokenType from "../../components/FormSteps/Desktop/TokenTypeDesktop";
import Configuration from "../../components/FormSteps/Configuration";
import Summary from "../../components/FormSteps/Desktop/SummaryDesktop";
import { useWeb3React } from "@web3-react/core";
import { useStepperContext } from "../../contexts/StepperContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./FormContainer.scss";
import MintModal from "../../components/Modal/MintModal/MintModal";
import { ERC20_ABI } from "../../contracts/ERC20Token";
import { CAPX_FACTORY } from "../../contracts/CapxFactory";
import { createNewToken } from "../../utils/createToken";
import { useHistory } from "react-router-dom";
const pinataSDK = require("@pinata/sdk");

const FormContainer = ({ setShowForm, chainIdInitial, tokenTypeData }) => {
  const history = useHistory();
  const pinata = pinataSDK(
    process.env.REACT_APP_PINATA_API_KEY,
    process.env.REACT_APP_PINATA_API_SECRET
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [stepSkip, setStepSkip] = useState(true);
  const [files, setFiles] = useState([]);
  const { chainId, account } = useWeb3React();
  const { userData, setUserData } = useStepperContext();

  const [mintModalOpen, setMintModalOpen] = useState(false);
  const [mintModalStatus, setMintModalStatus] = useState(""); //beware on mobile take this component outside
  const [createdAddress, setCreatedAddress] = useState("");

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
            tokenTypeData={tokenTypeData}
          />
        );
      case 3:
        return (
          <Configuration
            disableSteps={disableSteps}
            setDisableSteps={setDisableSteps}
            tokenTypeData={tokenTypeData}
          />
        );
      case 4:
        return <Summary files={files} tokenTypeData={tokenTypeData} />;
      default:
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;
    if (currentStep === 4 && direction === "next") {
      setMintModalStatus("");
      setMintModalOpen(true);
      const tokenNumber = parseInt(userData.tokenType.substring(1));
      let pinataHash;
      try {
        pinataHash = await pinata.pinJSONToIPFS({
          description: userData.description,
          image64: userData?.image64,
          website: userData?.website,
          twitter: userData?.twitter,
          telegram: userData?.telegram,
        });

        console.log(
          "PARAMs",
          account,
          CAPX_FACTORY,
          ERC20_ABI,
          process.env.REACT_APP_CAPX_FACTORY_ADDRESS,
          userData.tokenName,
          userData.tokenSymbol,
          userData.tokenOwner,
          userData.tokenDecimal,
          userData?.initalSupply
            ? userData.initalSupply * Math.pow(10, userData.tokenDecimal)
            : userData.tokenSupply * Math.pow(10, userData.tokenDecimal),
          userData?.finalSupply
            ? userData.finalSupply * Math.pow(10, userData.tokenDecimal)
            : userData.tokenSupply * Math.pow(10, userData.tokenDecimal),
          tokenNumber,
          [
            userData?.taxFeePercentage ? userData.taxFeePercentage : 0,
            userData?.burnFeePercentage ? userData.burnFeePercentage : 0,
            userData?.liquidityFeePercentage
              ? userData.liquidityFeePercentage
              : 0,
            userData?.marketingFeePercentage
              ? userData.marketingFeePercentage
              : 0,
            userData?.autoLPThreshold ? userData.autoLPThreshold : 0,
            userData?.marketingWalletAddress
              ? userData.marketingWalletAddress
              : "0x0000000000000000000000000000000000000000",
          ],
          pinataHash?.IpfsHash
        );
        createNewToken(
          account,
          CAPX_FACTORY,
          ERC20_ABI,
          process.env.REACT_APP_CAPX_FACTORY_ADDRESS,
          userData.tokenName,
          userData.tokenSymbol,
          userData.tokenOwner,
          userData.tokenDecimal,
          userData?.initalSupply ? userData.initalSupply : userData.tokenSupply,
          userData?.finalSupply ? userData.finalSupply : userData.tokenSupply,
          tokenNumber,
          [
            userData?.taxFeePercentage ? userData.taxFeePercentage : 0,
            userData?.burnFeePercentage ? userData.burnFeePercentage : 0,
            userData?.liquidityFeePercentage
              ? userData.liquidityFeePercentage
              : 0,
            userData?.marketingFeePercentage
              ? userData.marketingFeePercentage
              : 0,
            userData?.autoLPThreshold ? userData.autoLPThreshold : 0,
            userData?.marketingWalletAddress
              ? userData.marketingWalletAddress
              : "0x0000000000000000000000000000000000000000",
          ],
          pinataHash?.IpfsHash,
          setMintModalStatus,
          setMintModalOpen,
          setCreatedAddress
        );
      } catch (err) {
        console.log(err);
        setMintModalStatus("failure");
        setTimeout(() => {
          setMintModalOpen(false);
        }, 2500);
        return;
      }
      console.log("PINATA HASH 2", pinataHash);
    }

    if (currentStep === 4 && direction === "back") {
      if (stepSkip) {
        newStep = 2;
      } else {
        newStep = 3;
      }
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

  useEffect(() => {
    if (createdAddress.length > 0) {
      history.push({
        pathname: "/tokens",
        state: {
          newlyCreated: true,
          createdAddress: createdAddress
        },
      });
    }
  }, [createdAddress]);

  return (
    <div className="form_container h-screen flex-col">
      <MintModal
        open={mintModalOpen}
        setOpen={setMintModalOpen}
        mintModalStatus={mintModalStatus}
        setMintModalStatus={setMintModalStatus}
      />
      <Header hiddenNav={true} />
      <div
        className={`py-32 maincontainer text-black flex gap-x-16 justify-between m-auto mt-auto px-24`}
      >
        <div
          className={`upper-container border border-lightGrayBorder h-fit-content rounded-3xl px-14 py-10 w-28v bg-opacity-30 relative`}
        >
          <Stepper steps={stepsd} currentStep={currentStep} />
        </div>
        <div className="herocontainer px-12 py-4 w-60v rounded-3xl bg-opacity-30 relative border border-lightGrayBorder">
          <div className="horizontal container">
            <div className="p-10 pb-4 ">{displayStep(currentStep)}</div>
          </div>
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
