import "./Accordion.scss";
import { Tooltip, withStyles } from "@material-ui/core";

const Accordion = ({ item, index, handleSelect, userData }) => {

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      background: "#2A383C",
      color: "#F1FAF2",
      maxWidth: 800,
      fontSize: theme.typography.pxToRem(12),
      borderRadius: "4px",
      zIndex: 100,
    },
  }))(Tooltip);
    
    return (
      <div
        className={`${
          userData?.tokenType === item.id ? "pointer-events-none" : ""
        } tab w-full overflow-hidden rounded-2xl accordion_bg mt-6
        ${userData?.tokenType === item.id ? "animate-scaleUp shadow-md" : ""}`}
      >
        <input
          className="absolute opacity-0"
          onChange={() => handleSelect(item.id)}
          checked={userData?.tokenType === item.id}
          value={item.id}
          id={`tab-single-${index}`}
          type="radio"
          name={item.id}
        />
        <label
          className="block p-5 leading-caption-1 cursor-pointer"
          for={`tab-single-${index}`}
        >
          <span className="font-semibold text-paragraph-1 leading-subheading">
            {item.name}
          </span>
          <br></br>
          <span className="text-caption-1 font-medium leading-caption-1">
            {item.description}
          </span>
        </label>

        <div className="tab-content overflow-hidden">
          <p className="p-5 accordion_bg_dark text-caption-2 leading-caption-2 font-medium">
            <div className="text-caption-1 leading-caption-1">
              <span className="font-bold text-paragraph-2">Token Features</span>
              <div className="flex flex-wrap w-full mt-2 gap-y-2">
                {Object.keys(item.features).map((feature, index) => {
                  return (
                    <div className="w-1/2 flex justify-between" key={index}>
                      <div>{feature}</div>
                      {item.features[feature] ? (
                        <div className="pr-8 text-green-600">
                          &#10003;
                          {/* &nbsp; <HtmlTooltip title="info">i</HtmlTooltip> */}
                        </div>
                      ) : (
                        <div className="pr-8">&#10060;</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </p>
        </div>
      </div>
    );
}

export default Accordion;