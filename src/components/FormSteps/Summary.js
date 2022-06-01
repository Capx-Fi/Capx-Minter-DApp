export default function Final() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="font-bold text-heading-2 leading-heading-1 mb-3 ml-2">
          Summary
        </div>
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Order Summary
        </div>
        <a className="mt-10" href="/">
          <div className="h-10 px-5 rounded-lg text-paragraph-2 side-button text-black font-semibold flex items-center">
            <div>Confirm</div>
          </div>
        </a>
      </div>
    </div>
  );
}
