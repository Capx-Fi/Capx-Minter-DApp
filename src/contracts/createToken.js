import BigNumber from "bignumber.js";
import Web3 from "web3";
import {useHistory} from "react-router-dom";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const createNewToken = async (
    account,
    FACTORY_ABI,
    ERC20_ABI,
    FACTORY_ADDRESS,
    tokenName,
    tokenSymbol,
    tokenOwner,
    tokenDecimals,
    tokenInitialSupply,
    tokenTotalSupply,
    typeOfToken,
    parameters, // list of 6 parameters
    documentHash,
    setApproveModalStatus,
    setApproveModalOpen,
    setSuccess
) => {
    // Start Loading
    const web3 = new Web3(Web3.givenProvider);
   
    const factory = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);

    let deployedAddress = null;
  if (typeOfToken > 12) {
    try {
      console.log("Await started...");
      deployedAddress = await factory.methods
        .createReflectiveToken(
          tokenName,
          tokenSymbol,
          tokenDecimals,
          tokenInitialSupply,
          [tokenOwner, parameters[5]],
          parameters.slice(0, 5),
          typeOfToken,
          documentHash
        )
        .send({ from: account });
      console.log("Await finished");
    } catch (error) {
      console.log("First error: " + error);
      console.error("Create Reflective token error: ", error);
      setApproveModalStatus("failure");
      setTimeout(() => {
        setApproveModalOpen(false);
      }, 2500);
      return;
    }
  } else {
    try {
      console.log("Creating 2...");
      deployedAddress = await factory.methods
        .createToken(
          tokenName,
          tokenSymbol,
          tokenOwner,
          tokenDecimals,
          tokenInitialSupply,
          tokenTotalSupply,
          typeOfToken,
          documentHash
        )
        .send({ from: account });
    } catch (error) {
      console.log("Second error: " + error);
      console.error("Create token error: ", error);
      setApproveModalStatus("failure");
      setTimeout(() => {
        setApproveModalOpen(false);
      }, 2500);
      return;
    }
  }
        // Change modal from deploying to checking
      console.log("Checking...");
        console.log(deployedAddress);
        let tempAddress = deployedAddress.events.NewTokenDeployed.returnValues.token;
        console.log(tempAddress);
      if (tempAddress) {
        console.log("Checking inside if...");
            const token = new web3.eth.Contract(ERC20_ABI, tempAddress);
            let checkResult;
        try {
          console.log("Checking token...");
                checkResult = await token.methods.name().call();
        } catch (error) {
          console.log("Third error: " + error);
                console.error("Token Not deployed Properly 3", error);
                setApproveModalStatus("failure");
                setTimeout(() => {
                  setApproveModalOpen(false);
                }, 2500);
                return;
            }
            console.log(checkResult);
            if (checkResult == tokenName) {
                
                
            } else {
                
                console.error("Token Not deployed Properly 1")
                setApproveModalStatus("failure");
                setTimeout(() => {
                  setApproveModalOpen(false);
                }, 2500);
                return;
            }
        } else {
            console.error("Token Not deployed Properly 2")
            setApproveModalStatus("failure");
            setTimeout(() => {
              setApproveModalOpen(false);
            }, 2500);
            return;
      }
      console.log("Checking outside if success...");
        setApproveModalStatus("success");
        setTimeout(() => {
            setSuccess(true);
        }, 3000);
    }
