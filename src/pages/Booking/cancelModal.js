import { Zoom } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //   border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5),
    maxWidth: 650,
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function TransitionsModal({
  openModal,
  setOpenModal,
  ClearCart,
}) {
  const classes = useStyles();

  const HandleCancel = () => {
    setOpenModal(false);
    ClearCart();
  };

  return (
    <div className="text-center">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={openModal}>
          <div
            className={
              classes.paper + " Applyform content-block1 position-relative"
            }
          >
            <div onClick={() => setOpenModal(false)} className="close-drawer" />
            <h2 id="transition-modal-title">Clear your cart?</h2>
            <div id="transition-modal-description">
              <div className="container-fluid cancelcartform">
                <div className="row mt-2">
                  <div className="col-md-8 mt-3 pl-0 d-flex align-items-center">
                    <button
                      onClick={() => setOpenModal(false)}
                      className="btn2 mr-4"
                      style={{ background: "#968888" }}
                    >
                      Cancel
                    </button>
                    <button onClick={HandleCancel} className="btn2">
                      Clear
                    </button>
                    {/* {applied ? <CircularProgress /> : null} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  );
}
