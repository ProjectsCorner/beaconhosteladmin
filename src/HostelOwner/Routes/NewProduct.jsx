/**
 * imports for the new product component
 */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Components
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import user from "../../app.config";

/**
 * material
 */
import { Button, TextField, Snackbar } from "@material-ui/core";
import { Alert as MuiAlert, Slide } from "@mui/material";

/**
 * Files
 *
 *
 */
import FileUpload from "../../api/files";

/**
 *  Api
 */
import FormsApi from "../../api/api";

/**
 *
 * Styling
 */
import "./designs/products.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 *
 * functional component we are exporting
 */

export default () => {
  /**
   *
   * hooks used in the component
   */
  const navigate = useNavigate();
  const [state, setState] = useState({
    step: 1,
    fieldsError: false,
    product_id: null,
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });

  /**
   *
   * @param {formElement} event  Form to be submitted
   *
   * @returns void
   *
   * Method collects info & submits pdt info to the server
   */

  const submitProductInfo = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "Please Wait...",
        snackBarStatus: "info",
        snackBarOpen: true,
      },
    });

    let formDataInstance = new FormData(e.target);

    /**
     * convert formdata into javascript object using foreach on the formdatainstance
     */

    let form_contents = {};
    formDataInstance.forEach((el, i) => {
      form_contents[i] = el;
    });
    let res = await new FormsApi().post("/product/new", form_contents);
    if (res !== "Error") {
      if (res.status) {
        setState({
          ...state,
          step: 2,
          product_id: res.result.id,
          mui: {
            ...state.mui,
            snackBarMessage: "Product Added.....",
            snackBarStatus: "success",
            snackBarOpen: true,
          },
        });
      } else {
        setState({
          ...state,
          mui: {
            ...state.mui,
            snackBarMessage: "Some Error Occurred, Try again later...",
            snackBarStatus: "error",
            snackBarOpen: true,
          },
        });
      }
    } else {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: "Network Error, Try again",
          snackBarStatus: "error",
          snackBarOpen: true,
        },
      });
    }
  };

  /**
   *
   * Method below handles closing of the MUI alert
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "",
        snackBarOpen: false,
        snackBarStatus: "info",
      },
    });
  };

  return (
    <>
      <Snackbar
        open={state.mui.snackBarOpen}
        anchorOrigin={state.mui.snackBarPosition}
        autoHideDuration={4000}
        onClose={handleClose}
        message={state.mui.snackBarMessage}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleClose}
          severity={state.mui.snackBarStatus}
          sx={{ width: "100%" }}
        >
          {state.mui.snackBarMessage}
        </Alert>
      </Snackbar>

      <TopBar />
      <div className="ctr">
        <div className="main">
          <div className="side-ctr card">
            <SideNav active="home" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>New Product</h2>
              </div>
              <Link to="/">
                <Button variant="outlined" color="primary">
                  Back
                </Button>
              </Link>
            </div>
            <div className="progress_bar_new_product">
              <div
                style={
                  state.step === 1
                    ? { width: "2%" }
                    : state.step === 2
                    ? { width: "50%" }
                    : { width: "100%" }
                }
              ></div>
            </div>
            <div className="pdts-form-ctr">
              <div className="new_product_form">
                <form
                  onSubmit={submitProductInfo}
                  className="inputs_ctr"
                  style={
                    state.step === 2
                      ? { opacity: "0.4", pointerEvents: "none" }
                      : {}
                  }
                >
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Product Information
                  </div>
                  <div className="inputs_ctr_border">
                    <input
                      type="text"
                      name="seller"
                      value={user.id}
                      hidden
                      onChange={() => {}}
                    />
                    <div className="inputs_ctr_flex">
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Product Name"
                        name="product_name"
                        style={{ width: "45%" }}
                        error={state.fieldsError}
                        helperText={
                          state.fieldsError
                            ? "This field maybe empty, but its required"
                            : ""
                        }
                      />
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Price (UGX)"
                        type="number"
                        name="product_price"
                        style={{ width: "45%" }}
                        error={state.fieldsError}
                        helperText={
                          state.fieldsError
                            ? "This field maybe empty, but its required"
                            : ""
                        }
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Product Description"
                        name="product_description"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Discount(UGX)"
                        type="number"
                        name="product_discount"
                        style={{ width: "45%" }}
                        error={state.fieldsError}
                        helperText={
                          state.fieldsError
                            ? "This field maybe empty, but its required"
                            : ""
                        }
                      />
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Brand"
                        name="product_brand"
                        style={{ width: "45%" }}
                      />
                    </div>
                    <div className="inputs_ctr_halfwidth">
                      <TextField
                        required
                        variant="outlined"
                        color="primary"
                        label="Product Details"
                        multiline
                        name="product_details"
                        style={{ width: "45%" }}
                        error={state.fieldsError}
                        helperText={
                          state.fieldsError
                            ? "This field maybe empty, but its required"
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 20,
                    }}
                  >
                    <Button variant="outlined" color="primary" type="submit">
                      Submit Product
                    </Button>
                  </div>
                </form>
                <div
                  className="inputs_ctr"
                  style={
                    state.step === 1
                      ? { opacity: "0.4", pointerEvents: "none" }
                      : {}
                  }
                >
                  <FileUpload product={state.product_id} confirming={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
