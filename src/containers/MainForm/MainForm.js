import React, { useEffect, useState } from "react";

import "./MainForm.scss";

import { useWeb3React } from "@web3-react/core";

import ChooseChain from "../../components/ChooseChain/ChooseChain";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import FormContainer from "../FormContainer/FormContainer";
import {useHistory} from "react-router-dom";


function MainForm() {
  const { active, account, chainId } = useWeb3React();
  const [showForm, setShowForm] = useState(false);
  
  return (
    <>
      {!active ? (
        <MetamaskModal/>
      ) : (
          showForm ? <FormContainer setShowForm={setShowForm} /> : <ChooseChain setShowForm={setShowForm}/>
      )}
    </>
  );
}

export default MainForm;
