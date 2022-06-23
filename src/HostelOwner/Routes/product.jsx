/**
 *
 * imports for react..
 */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/**
 *
 * Defined components
 *
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";
import FileUpload from "../../api/files";

/**
 *
 * imports for mateial ui
 */
import { Button, TextField, Snackbar, IconButton } from "@material-ui/core";
import {
  Alert as MuiAlert,
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

/**
 *
 * imports for css and other styling..
 */

import "./designs/products.css";

/**
 *
 * creates alert from material ui
 */

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ConfirmProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  /**
   *
   * initial state for the component
   */

  const [state, setState] = useState({
    product: {},
    seller: {},
    files: [],
    categories: [],
    sub_categories: [],
    selected_category: "",
    selected_sub_category: "",
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/product/${params.id}`);

      if (res !== "Error") {
        if (res.status !== false) {
          setState({
            ...state,
            product: res.result.product || {},
            seller: res.result.seller || {},
          });
        }
      }
    })();
  }, []);

  //mui
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      mui: { ...state.mui, snackBarMessage: "", snackBarOpen: false },
    });
  };

  return (
    <>
      <Snackbar
        open={state.mui.snackBarOpen}
        anchorOrigin={state.mui.snackBarPosition}
        autoHideDuration={5000}
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
                <h2>{state.product.product_name || "..."} Details</h2>
              </div>
              <div>
                <Link to="/">
                  <Button variant="outlined" color="primary">
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div className="pdts-form-ctr">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="new_product_form"
              >
                <div className="inputs_ctr">
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Product Information
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="inputs_ctr_flex">
                      <input
                        type="hidden"
                        name="product_id"
                        value={state.product.id || " "}
                        onChange={() => {}}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Name"
                        name="product_name"
                        style={{ width: "45%" }}
                        value={state.product.product_name || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_name: e.target.value,
                            },
                          });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Price"
                        name="product_price"
                        style={{ width: "45%" }}
                        value={state.product.product_price || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_price: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Description"
                        name="product_description"
                        style={{ width: "100%" }}
                        value={state.product.product_description || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_description: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Discount"
                        name="product_discount"
                        style={{ width: "45%" }}
                        value={state.product.product_discount || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_discount: e.target.value,
                            },
                          });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Brand"
                        name="product_brand"
                        style={{ width: "45%" }}
                        value={state.product.product_brand || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_brand: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Details"
                        multiline
                        name="product_details"
                        style={{ width: "100%" }}
                        value={state.product.product_details || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_details: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Seller Info
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Seller Name"
                        name="seller_name"
                        style={{ width: "45%" }}
                        value={state.seller.seller_name || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Location"
                        name="seller_location"
                        style={{ width: "45%" }}
                        value={state.seller.seller_location || " "}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Business Name"
                        name="seller_business_name"
                        style={{ width: "100%" }}
                        value={state.seller.seller_business_name || " "}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Email Address"
                        name="seller_email"
                        style={{ width: "45%" }}
                        value={state.seller.seller_email || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Phone Number"
                        name="seller_phone"
                        style={{ width: "45%" }}
                        value={state.seller.seller_phone || " "}
                      />
                    </div>
                  </div>
                </div>
                <div className="inputs_ctr">
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Product Images
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="images__preview_ctr">
                      {state.product.product_images
                        ? JSON.parse(state.product.product_images).length === 0
                          ? "No Files Chosen"
                          : JSON.parse(state.product.product_images).map(
                              (v, i) => {
                                return (
                                  <div key={i}>
                                    <img src={v} alt="PlusProductImage" />
                                  </div>
                                );
                              }
                            )
                        : "No Product Images"}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 20,
                    }}
                  ></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmProduct;
