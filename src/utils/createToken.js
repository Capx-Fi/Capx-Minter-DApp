import BigNumber from "bignumber.js";
import Web3 from "web3";
import { useHistory } from "react-router-dom";

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
  setMintModalStatus,
  setMintModalOpen,
  setCreatedAddress
) => {
  // Start Loading
  const web3 = new Web3(Web3.givenProvider);

  const factory = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);

  let deployedAddress = null;
  if (typeOfToken > 12) {
    try {
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
    } catch (error) {
      console.error("Create Reflective token error: ", error);
      setMintModalStatus("failure");
      setTimeout(() => {
        setMintModalOpen(false);
      }, 3000);
      return;
    }
     console.log(deployedAddress);
     let tempAddress =
       deployedAddress.events.NewTokenDeployed.returnValues.token;
    //  console.log(tempAddress);
    //  if (tempAddress) {
    //    const token = new web3.eth.Contract(ERC20_ABI, tempAddress);
    //    let checkResult;
    //    try {
    //      checkResult = await token.methods.name().call();
    //    } catch (error) {
    //      console.error("Token Not deployed Properly 3", error);
    //      setMintModalStatus("failure");
    //      setTimeout(() => {
    //        setMintModalOpen(false);
    //      }, 3000);
    //      return;
    //    }
    //    console.log(checkResult);
    //    if (checkResult === tokenName) {
    //    } else {
    //      console.error("Token Not deployed Properly 1");
    //      setMintModalStatus("failure");
    //      setTimeout(() => {
    //        setMintModalOpen(false);
    //      }, 3000);
    //      return;
    //    }
    //  } else {
    //    console.error("Token Not deployed Properly 2");
    //    setMintModalStatus("failure");
    //    setTimeout(() => {
    //      setMintModalOpen(false);
    //    }, 3000);
    //    return;
    //  }
     setMintModalStatus("success");
     setTimeout(() => {
       setCreatedAddress(tempAddress);
     }, 3000);
  } else {
    try {
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
      console.error("Create token error: ", error);
      setMintModalStatus("failure");
      setTimeout(() => {
        setMintModalOpen(false);
      }, 3000);
      return;
    }
    // Change modal from deploying to checking
    // console.log(deployedAddress);
    let tempAddress =
      deployedAddress.events.NewTokenDeployed.returnValues.token;
    // console.log(tempAddress);
    // if (tempAddress) {
    //   const token = new web3.eth.Contract(ERC20_ABI, tempAddress);
    //   let checkResult;
    //   try {
    //     checkResult = await token.methods.name().call();
    //   } catch (error) {
    //     console.error("Token Not deployed Properly 3", error);
    //     setMintModalStatus("failure");
    //     setTimeout(() => {
    //       setMintModalOpen(false);
    //     }, 3000);
    //     return;
    //   }
    //   console.log(checkResult);
    //   if (checkResult == tokenName) {
    //   } else {
    //     console.error("Token Not deployed Properly 1");
    //     setMintModalStatus("failure");
    //     setTimeout(() => {
    //       setMintModalOpen(false);
    //     }, 3000);
    //     return;
    //   }
    // } else {
    //   console.error("Token Not deployed Properly 2");
    //   setMintModalStatus("failure");
    //   setTimeout(() => {
    //     setMintModalOpen(false);
    //   }, 3000);
    //   return;
    // }
    setMintModalStatus("success");
    setTimeout(() => {
      setCreatedAddress(tempAddress);
    }, 3000);
  }
};
