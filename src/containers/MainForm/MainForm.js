import React, { useEffect, useState } from "react";

import "./MainForm.scss";

import { useWeb3React } from "@web3-react/core";
import { UseContextProvider } from "../../contexts/StepperContext";

import ChooseChain from "../../components/ChooseChain/ChooseChain";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import FormContainer from "../FormContainer/FormContainer";
import {useHistory} from "react-router-dom";


function MainForm() {
  const { active, account, chainId } = useWeb3React();
  const [showForm, setShowForm] = useState(false);
  const [chainIdInitial, setChainIdInitial] = useState(false);
  
  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : showForm ? (
        <UseContextProvider>
          <FormContainer
            setShowForm={setShowForm}
            chainIdInitial={chainIdInitial}
          />
        </UseContextProvider>
      ) : (
        <ChooseChain
          setChainIdInitial={setChainIdInitial}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
}

export default MainForm;
