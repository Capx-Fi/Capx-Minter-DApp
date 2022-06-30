import NextIcon from "../../assets/next.svg";
import BackIcon from "../../assets/back.svg";

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
    <div className="container mb-6 desktop:mb-6 twok:mb-12 flex justify-between px-10">
      <div
        className="back-button screen:w-32 desktop:w-36 twok:w-44 justify-self-end rounded-lg mt-8 justify-center items-center flex gap-x-2 px-3 py-1.5 desktop:py-2 twok:px-5 twok:py-3 cursor-pointer"
        onClick={() => handleClick("back")}
      >
        <div>
          <img alt="back_icon" src={BackIcon} className="w-4 twok:w-5" />
        </div>
        <div className="button_text cursor-pointer text-white text-caption-2 twok:text-paragraph-2 leading-paragraph-2 font-bold">
          {"BACK"}
        </div>
      </div>

      <div
        className={`side-button screen:w-32 desktop:w-36 twok:w-44 ${
          disabled
            ? "side-button-disabled opacity-60 cursor-not-allowed"
            : "cursor-pointer"
        } justify-self-end rounded-lg mt-8 justify-center items-center flex gap-x-2 px-3 py-1.5 desktop:py-2 twok:px-5 twok:py-3`}
        onClick={() => {
          if (!disabled) {
            handleClick("next");
          }
        }}
      >
        <div className="button_text text-white text-caption-2 twok:text-paragraph-2 leading-paragraph-2 font-bold">
          {currentStep === steps.length ? "CONFIRM" : "NEXT"}
        </div>
        {currentStep !== steps.length ? (
          <div>
            <img alt="next_icon" src={NextIcon} className="w-3 twok:w-3.5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
