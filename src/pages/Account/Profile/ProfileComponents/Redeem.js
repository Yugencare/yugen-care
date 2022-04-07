import { Fade, makeStyles, Modal, Paper } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import { FileCopy } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
}));

export default function Redeem({ reward }) {
  const classes = useStyles();
  const [openRedeem, setOpenRedeem] = useState(false);
  const [openalert, setOpen] = useState(false);
  const handleClose = () => {
    setOpenRedeem(false);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const CopyToClipboard = (e) => {
    navigator.clipboard.writeText(e);
    setOpen(true);
  };

  return (
    <>
      <button onClick={() => setOpenRedeem(true)}>Redeem</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRedeem}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={openRedeem} timeout={1000}>
          <Paper className="Redeem content-block1 position-relative">
            <div onClick={handleClose} className="close-drawer" />
            <div className="rewards_collapse mt-3">
              <p>{reward.reward_name} </p>
              <span>
                <p>Worth {reward.points_required} Points</p>
              </span>
            </div>
            <div className="redeem_code-container">
              <p>{reward.text_above}</p>
              <div className="Redeem_code">
                <p>{reward.id}</p>
                <FileCopy
                  className="mr-4"
                  onClick={() => CopyToClipboard(reward.id)}
                />
              </div>
              <p style={{ maxWidth: 300, marginBottom: "1.2rem" }}>
                <span>{reward.text_below}</span>
              </p>
              {/* <Link to="/book">Apply Now</Link> */}
            </div>
          </Paper>
        </Fade>
      </Modal>
      <Snackbar
        open={openalert}
        autoHideDuration={1200}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Coppied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
