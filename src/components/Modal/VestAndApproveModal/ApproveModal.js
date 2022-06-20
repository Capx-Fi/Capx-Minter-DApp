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
		color: "#000",
	},
	paper: {
		background: "#fff",
		borderRadius: "35px",
		padding: theme.spacing(2, 0, 3),
		outline: "none",
		width: "800px",
		"@media (max-width:1023px)": {
			width: "500px",
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
		backdropFilter: "blur(5px)",
		backgroundColor: "rgba(0,0,0,0.5)",
	}
}));
function ApproveModal({
	imageData,
	buyMode,
	openAdUrl,
	handleBuy,
	showModal,
	open,
	setOpen,
	approveModalStatus,
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
		<p className="text-heading-2 leading-heading-2">
			Your tokens are being minted!
			<br />
			<span
				className="text-paragraph-2"
				style={{ color: "#000" }}
			>
				Please do not reload or refresh the page.
			</span>
		</p>,
	];

	const errorMessage = [
    <p className="text-heading-2 leading-heading-2">
      Oops! We have encountered an error.
      <br />
      <span className="text-paragraph-2" style={{ color: "#000" }}>
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
					<div className="flex flex-col justify-center mx-auto items-center laptop:h-72 pb-8 mt-12">
						<Lottie
							className="w-24 tablet:w-32 laptop:w-48"
							loop={true}
							animationData={
								approveModalStatus === "success"
									? ApproveToChainSuccess
									: approveModalStatus === "failure"
									? ApproveToChainFailure
									: ApproveToChain
							}
						/>
						<div className="text-black mt-10 text-center leading-heading-2 text-heading-2 font-semibold w-10/12">
							{approveModalStatus === "success"
								? "Your tokens are now successfully minted"
								: approveModalStatus === "failure"
								? errorMessage
								: approveMessage}
						</div>
					</div>
					<hr className="border-gray-400 mt-2 h-2"></hr>
				</div>
			</Fade>
		</Modal>
	);
}

export default ApproveModal;
