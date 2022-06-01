import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Lottie from "lottie-react";
import ApproveToChain from "../../../assets/Approve/Approve-to-Chain.json";
import ApproveToChainSuccess from "../../../assets/Approve/Approve-successful.json";
import ApproveToChainFailure from "../../../assets/Approve/Approve-failed.json";
const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		outline: "none",
		zIndex: "9999",
		color: "#F1FAF2",
	},
	paper: {
		background: "linear-gradient(215.24deg, #263232 3.85%, #1a1f23 89.73%)",
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
		<p>
			Your tokens are being approved!
			<br />
			<span
				className="text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
				style={{ color: "#CCCCCC" }}
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
				className="text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
				style={{ color: "#CCCCCC" }}
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
			}}
		>
			<Fade in={open}>
				<div className={classes.paper}>
					<div className="flex flex-col justify-center mx-auto items-center laptop:h-72 pb-8 mt-8">
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
						<div className="text-white text-center leading-paragraph-2 screen:text-subheading screen:leading-subheading tablet:text-caption-1 tablet:leading-heading-1 desktop:text-subheading font-semibold w-8/12 laptop:w-6/12 desktop:w-8/12">
							{approveModalStatus === "success"
								? "Your tokens are now successfully approved"
								: approveModalStatus === "failure"
								? errorMessage
								: approveMessage}
						</div>
					</div>
					<hr className="border-dark-200 mt-2 h-2"></hr>
				</div>
			</Fade>
		</Modal>
	);
}

export default ApproveModal;
