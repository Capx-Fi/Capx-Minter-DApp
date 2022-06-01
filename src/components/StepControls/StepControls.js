import NextIcon from "../../assets/next-black.svg";

export default function StepControls({ handleClick, currentStep, steps, stepOne }) {

    let disabled = false;

  if (currentStep === 1) {
    if (!stepOne) {
      disabled = true;
    }
  }
    
  
  return (
    <div className="container mb-16 flex justify-around">
      <div
        className="side-button justify-self-end rounded-2xl mt-8 justify-center items-center flex px-5 py-3 cursor-pointer"
        onClick={() => handleClick("back")}
      >
        <div className="button_text cursor-pointe text-black text-paragraph-2 leading-paragraph-2 font-bold">
          {"BACK"}
        </div>
      </div>

      <div
        className={`side-button ${disabled ? "side-button-disabled pointer-events-none cursor-not-allowed" : ""}justify-self-end rounded-2xl mt-8 justify-center items-center flex px-5 py-3 cursor-pointer`}
        onClick={() => handleClick("next")}
      >
        <div className="button_text cursor-pointer text-black text-paragraph-2 leading-paragraph-2 font-bold">
          {"NEXT"}
        </div>
      </div>
    </div>
  );
}
