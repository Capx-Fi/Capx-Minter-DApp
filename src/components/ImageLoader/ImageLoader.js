const { useState } = require("react");

function ImageLoader(props) {
  const [loaded, setLoaded] = useState(false);
  function onLoad() {
    console.log("loaded");
    setLoaded(true);
  }
  return (
    <>
      <img
        style={{ display: loaded ? "inline-block" : "none" }}
        onLoad={onLoad}
        src={props.src}
              alt={props.alt}
          className={props.styling}
        {...props}
      />
      {!loaded && props.loader}
    </>
  );
}

export default ImageLoader;