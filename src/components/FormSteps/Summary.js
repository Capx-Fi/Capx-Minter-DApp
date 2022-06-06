import EthLogo from "../../assets/ethereum-logo.svg";
import "./Summary.scss"
import { useStepperContext } from "../../contexts/StepperContext";
import tokenTypeData from "./TokenTypeData";

export default function Summary({file}) {
  const { userData, setUserData } = useStepperContext();
  const currentToken = tokenTypeData.find((item) => {
    return item.id === userData.tokenType;
  });

  const featuresToDisplay = currentToken.advancedFeatures;

  return (
    <div className="flex flex-col summary">
      <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
        Summary
      </div>
      <div className="bg_translucent bg-opacity-20 p-6 rounded-xl mt-4 py-10">
        <div className="flex flex-row items-stretch w-full gap-x-2">
          <div className="flex items-center px-8">
            <div>
              <img
                className="w-16 h-16 rounded-lg"
                src={file === null ? EthLogo : file}
                alt="snapshot view"
              />
            </div>
          </div>
          <div className="flex flex-col w-full text-caption-1 leading-paragraph-1">
            <div>
              {" "}
              <span className="font-bold">Name</span> : {userData.tokenName}{" "}
            </div>
            <div>
              {" "}
              <span className="font-bold">Symbol</span> : {userData.tokenSymbol}{" "}
            </div>
            <div className="flex-row gap-x-2">
              {userData?.website ? (
                <div className="inline-block">
                  <span className="font-bold">Website</span>: {userData.website}{" "}
                  &nbsp;
                </div>
              ) : null}
              {userData?.twitter ? (
                <div className="inline-block">
                  <span className="font-bold">Twitter</span> :{" "}
                  {userData.twitter} &nbsp;
                </div>
              ) : null}
              {userData?.telegram ? (
                <div className="inline-block">
                  <span className="font-bold">Telegram</span> :{" "}
                  {userData.telegram} &nbsp;
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-full border-t-2 border-black mt-4 pt-4 px-4">
          <div className="text-caption-1 leading-caption-1">
            <span className="font-bold text-capxGreen text-paragraph-2">
              Token Features
            </span>
            <div className="flex flex-wrap w-full mt-2 gap-y-2">
              {Object.keys(currentToken.features).map((item, index) =>
                currentToken.features[item] ? (
                  <div className="w-1/2" key={index}>
                    {item}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        <div className="w-full border-t-2 border-black w-full mt-4 pt-4 px-4">
          <div className="text-caption-1 leadign-caption-1">
            <span className="font-bold text-capxGreen text-paragraph-2">
              Advanced Details
            </span>
          </div>
          <div className="flex flex-wrap w-full mt-2 gap-y-1">
            <div className="w-full mb-2">
              <span className="font-bold">Owner</span> : <br></br>
              {userData.tokenOwner}
            </div>
            {featuresToDisplay.substring(7) === "1" ? (
              <div className="w-full mb-2">
                <span className="font-bold">Marketing Address</span> : <br></br>
                {userData.marketingWalletAddress}
              </div>
            ) : null}

            <div className="w-1/2">
              <span className="font-bold">Initial Supply</span> :{" "}
              {featuresToDisplay.substring(0, 1) === "1"
                ? userData.initialSupply
                : userData.tokenSupply}
            </div>
            {featuresToDisplay.substring(1, 2) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Total Supply</span> :{" "}
                {userData.totalSupply}
              </div>
            ) : null}
            {featuresToDisplay.substring(2, 3) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Tax Fee</span> :{" "}
                {userData.taxFeePercentage}
              </div>
            ) : null}
            {featuresToDisplay.substring(4, 5) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Liquidity Fee</span>:{" "}
                {userData.liquidityFeePercentage}
              </div>
            ) : null}
            {featuresToDisplay.substring(6, 7) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Liquidity Threshold</span> :{" "}
                {userData.autoLPThreshold}
              </div>
            ) : null}
            {featuresToDisplay.substring(3, 4) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Burn Fee</span> :{" "}
                {userData.burnFeePercentage}
              </div>
            ) : null}
            {featuresToDisplay.substring(5, 6) === "1" ? (
              <div className="w-1/2">
                <span className="font-bold">Marketing Fee</span> :{" "}
                {userData.marketingFeePercentage}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
