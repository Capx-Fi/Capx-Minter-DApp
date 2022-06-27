import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { UseContextProvider } from "../../contexts/StepperContext";
import ChooseChain from "../../components/ChooseChain/ChooseChain";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import FormContainerDesktop from "../FormContainer/FormContainerDesktop";
import fetchTokenTypes from "../../utils/fetchTokenTypes";
import LoadingScreen from "../LoadingScreen";

function MainForm({ tokenTypeData, setTokensData }) {
  const { active, account, chainId } = useWeb3React();
  const [showForm, setShowForm] = useState(false);
  const [chainIdInitial, setChainIdInitial] = useState(false);

  useEffect(() => {
    if (active) {
      fetchTokenTypes(setTokensData, chainId);
    }
  }, [active, chainId]);

  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : tokenTypeData === -1 ? <LoadingScreen /> : showForm ? (
        <>
          <UseContextProvider>
            <FormContainerDesktop
              setShowForm={setShowForm}
              chainIdInitial={chainIdInitial}
              tokenTypeData={tokenTypeData}
            />
          </UseContextProvider>
        </>
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
