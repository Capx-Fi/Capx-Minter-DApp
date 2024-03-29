import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Lottie from "lottie-react";
import ApproveToChain from "../../../assets/Approve/spinningCoinLottie.json"; //approving
import ApproveToChainSuccess from "../../../assets/Approve/greenTickLottie.json";
import ApproveToChainFailure from "../../../assets/Approve/redCrossLottie.json";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    zIndex: "9999",
    color: "#F1FAF2",
    padding: "0px",
  },
  paper: {
    background: "white",
    border: "1px solid #2f3137",
    borderRadius: "27px",
    overflow: "hidden",
    margin: "0px",
    padding: "0",
    outline: "none",
    width: "800px",
    "@media (max-width:1300px)": {
      width: "600px",
      borderRadius: "24px",
    },
    "@media (max-width:640px)": {
      width: "400px",
      borderRadius: "24px",
    },

    "@media (max-width:420px)": {
      width: "280px",
      borderRadius: "16px",
    },
  },
  backDrop: {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
}));
function MintModal({
  imageData,
  buyMode,
  openAdUrl,
  handleBuy,
  showModal,
  open,
  setOpen,
  mintModalStatus,
}) {
  const [viewNFTID, setviewNFTID] = React.useState("");
  const [viewNFTDet, setviewNFTDet] = React.useState("");
  const classes = useStyles();

  const handleOpen = (index, items) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const approveMessage = [
    <p>
      Your tokens are being minted!
      <br />
      <span
        className="screen:text-caption-1 screen:leading-caption-3 text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
        style={{ color: "#2f3137" }}
      >
        Please do not reload or refresh the page.
      </span>
    </p>,
  ];

  const errorMessage = [
    <p>
      Oops! We have encountered an error.
      <br />
      <span
        className="screen:text-caption-1 leading-caption-1 text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
        style={{ color: "#2f3137" }}
      >
        {" "}
        Please try again!
      </span>
    </p>,
  ];

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="flex justify-between w-full items-center h-64 desktop:h-80 items-stretch">
            <div
              style={{ background: "#2F3137" }}
              className="w-2/5 flex justify-center items-center"
            >
              <Lottie
                className="w-24 screen:w-32 desktop:w-48"
                loop={true}
                animationData={
                  mintModalStatus === "success"
                    ? ApproveToChainSuccess
                    : mintModalStatus === "failure"
                    ? ApproveToChainFailure
                    : ApproveToChain
                }
              />
            </div>
            <div className="text-darkText text-left flex justify-center items-center w-full desktop:w-3/5 pl-2 pr-12 desktop:pr-20 desktop:pl-12 leading-paragraph-2 screen:text-paragraph-1 screen:leading-paragraph-2 desktop:leading-heading-1 tablet:text-caption-1 tablet:leading-heading-1 desktop:text-heading-2 font-semibold w-8/12 laptop:w-6/12 desktop:w-8/12">
              <div>
                {mintModalStatus === "success"
                  ? "Your tokens are now successfully minted"
                  : mintModalStatus === "failure"
                  ? errorMessage
                  : approveMessage}
              </div>
            </div>
          </div>
          {/* <hr className="border-dark-25 mt-2 h-2"></hr> */}
        </div>
      </Fade>
    </Modal>
  );
}


export default MintModal;
