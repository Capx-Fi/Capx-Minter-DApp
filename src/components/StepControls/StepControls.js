import NextIcon from "../../assets/next-black.svg";
import BackIcon from "../../assets/back-black.svg";

export default function StepControls({
  handleClick,
  currentStep,
  steps,
  disableSteps,
}) {
  let disabled = false;
  if (currentStep === 1 && disableSteps.first) {
    disabled = true;
  } else if (currentStep === 2 && disableSteps.second) {
    disabled = true;
  } else if (currentStep === 3 && disableSteps.third) {
    disabled = true;
  } else if (currentStep === 4 && disableSteps.fourth) {
    disabled = true;
  }

  return (
    <div className="container mb-16 flex justify-between px-10">
      <div
        className="back-button w-44 justify-self-end rounded-lg mt-8 justify-center items-center flex gap-x-2 px-5 py-3 cursor-pointer"
        onClick={() => handleClick("back")}
      >
        <div>
          <img alt="back_icon" src={BackIcon} className="w-5" />
        </div>
        <div className="button_text cursor-pointe text-black text-paragraph-2 leading-paragraph-2 font-bold">
          {"BACK"}
        </div>
      </div>

      <div
        className={`side-button w-44 ${
          disabled
            ? "side-button-disabled opacity-60 pointer-events-none cursor-not-allowed"
            : ""
        }justify-self-end rounded-lg mt-8 justify-center items-center flex gap-x-2 px-5 py-3 cursor-pointer`}
        onClick={() => handleClick("next")}
      >
        <div className="button_text cursor-pointer text-black text-paragraph-2 leading-paragraph-2 font-bold">
          {currentStep === steps.length ? "CONFIRM" : "NEXT"}
        </div>
        {currentStep !== steps.length ? <div>
          <img alt="next_icon" src={NextIcon} className="w-5" />
        </div> : null}
      </div>
    </div>
  );
}
