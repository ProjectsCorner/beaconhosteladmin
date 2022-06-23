/**
 *
 * react imports
 *
 */
import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";
import user from "../../app.config";

/**
 * Mui
 */
import { Button } from "@material-ui/core";

/**
 *
 * Styling...
 */
import "./designs/products.css";

export default () => {
  /**
   * initial state
   */
  const [state, setState] = useState({ pdts: [], pending_pdts: [] });

  useEffect(() => {
    (async () => {
      const res = await new FormsApi().get("/seller/products/" + user.id);
      if (res === "Error") {
        console.log(res);
      } else {
        if (res.status) {
          let pending_pdts = [];
          let pdts = [];
          res.result.forEach((el) => {
            if (el.confirmed) {
              pdts = [...pdts, el];
            } else {
              pending_pdts = [...pending_pdts, el];
            }
          });
          setState({ ...state, pending_pdts, pdts });
        }
      }
    })();
  }, []);

  return (
    <>
      <TopBar />
      <div className="ctr">
        <div className="main">
          <div className="side-ctr card">
            <SideNav active="products" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>My Products</h2>
              </div>
              <div>
                <Link to="/products/new">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginInline: 10 }}
                  >
                    New Product
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginInline: 10 }}
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div className="pdts-grid-ctr trending">
              <div>
                <span>Pending Products</span>
                <table>
                  <thead>
                    <tr>
                      <th>Pdt Name</th>
                      <th>Pdt Price</th>
                      <th>Pdt Discount</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.pending_pdts.length === 0 ? (
                      <tr>
                        <td>No Pending Products to display</td>
                      </tr>
                    ) : (
                      state.pending_pdts.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.product_name}</td>
                            <td>{v.product_price}</td>
                            <td>{v.product_discount}</td>
                            <td>{v.product_brand}</td>
                            <td>
                              <Link to={`/product/${v.id}`}>
                                <Button variant="outlined" color="primary">
                                  Details
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pdts-grid-ctr trending">
              <div>
                <span>My Products</span>
                <table>
                  <thead>
                    <tr>
                      <th>Pdt Name</th>
                      <th>Pdt Price</th>
                      <th>Pdt Discount</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.pdts.length === 0 ? (
                      <tr>
                        <td>No Rows to display</td>
                      </tr>
                    ) : (
                      state.pdts.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.product_name}</td>
                            <td>{v.product_price}</td>
                            <td>{v.product_discount}</td>
                            <td>{v.product_brand}</td>
                            <td>
                              <Link to={`/product/${v.id}`}>
                                <Button variant="outlined" color="primary">
                                  Details
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
