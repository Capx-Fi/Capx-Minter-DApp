import EthLogo from "../../assets/ethereum-logo.svg";
import "./Summary.scss"
import { useStepperContext } from "../../contexts/StepperContext";

export default function Final() {
  const { userData, setUserData } = useStepperContext();

  return (
    <div className="flex flex-col summary">
      <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
        Summary
      </div>
      <div className="bg-white bg-opacity-20 p-6 rounded-xl mt-4 py-10">
        <div className="flex flex-row items-stretch w-full gap-x-2">
          <div className="flex items-center px-8">
            <div>
              <img
                className="w-16 h-16 rounded-lg"
                src={EthLogo}
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
              {userData?.website ? <div className="inline-block">
                <span className="font-bold">Website</span>: {userData.website} &nbsp;
              </div> : null}
              {userData?.twitter ? <div className="inline-block">
                <span className="font-bold">Twitter</span> : {userData.twitter} &nbsp;
              </div> : null}
              {userData?.telegram ? <div className="inline-block">
                <span className="font-bold">Telegram</span> : {userData.telegram} &nbsp;
              </div> : null}
            </div>
          </div>
        </div>

        <div className="w-full border-t-2 border-white mt-4 pt-4 px-4">
          <div className="text-caption-1 leading-caption-1">
            <span className="font-bold text-paragraph-2">Token Features</span>
            <div className="flex flex-wrap w-full mt-2 gap-y-2">
              <div className="w-1/2">ERC20 Compliant</div>
              <div className="w-1/2">Mintable</div>
              <div className="w-1/2">Liquidity Generator</div>
              <div className="w-1/2">Verified Source Code</div>
              <div className="w-1/2">Burnable</div>
              <div className="w-1/2">Donation (Charity)</div>
            </div>
          </div>
        </div>

        <div className="w-full border-t-2 border-white w-full mt-4 pt-4 px-4">
          <div className="text-caption-1 leadign-caption-1">
            <span className="font-bold text-paragraph-2">Advanced Details</span>
          </div>
          <div className="flex flex-wrap w-full mt-2 gap-y-1">
            <div className="w-1/2">Initial Supply : {userData.tokenSupply}</div>
            <div className="w-1/2">Total Supply : {userData.tokenSupply}</div>
            <div className="w-1/2">Owner : {userData.tokenOwner.substring(0,6)+"..."}</div>
            {userData?.marketingWalletAddress ? <div className="w-1/2">Marketing Address : {userData.marketingWalletAddress.substring(0,6)+"..."}</div> : null}
            {userData?.taxFeePercentage ? <div className="w-1/2">Tax Fee : {userData.taxFeePercentage}</div> : null}
            {userData?.liquidityFeePercentage ? <div className="w-1/2">Liquidity Fee : {userData.liquidityFeePercentage}</div> : null}
            {userData?.autoLPThreshold ? <div className="w-1/2">Liquidity Threshold : {userData.autoLPThreshold}</div> : null}
            {userData?.burnFeePercentage ? <div className="w-1/2">Burn Fee : {userData.burnFeePercentage}</div> : null}
            {userData?.marketingFeePercentage ? <div className="w-1/2">Marketing Fee : {userData.marketingFeePercentage}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
