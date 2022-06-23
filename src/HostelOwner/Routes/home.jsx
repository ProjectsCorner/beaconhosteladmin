import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * components
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";
import user from "../../app.config";

/**
 *
 * material
 */
import { Button } from "@material-ui/core";

/**
 * component styling
 */
import "./designs/home.css";

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
            <SideNav active="home" />
          </div>
          <div className="main-ctr card">
            <div className="dashboard-ctr">
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>{state.pdts.length}</div>
                    <div>Confirmed</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>
                      {state.pending_pdts.length}
                    </div>
                    <div>Pending</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>
                      {state.pdts.length + state.pending_pdts.length}
                    </div>
                    <div>Total</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>0%</div>
                    <div>Performance</div>
                  </div>
                </div>
              </div>
              <div className="pdts-header-btns">
                <div>
                  <h2>My Products</h2>
                </div>
                <div>
                  <Link to="/products/new">
                    <Button variant="outlined" color="primary">
                      New Product
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="dashboard-summury">
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
                            <td>...</td>
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
                            <td>....</td>
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
        </div>
      </div>
    </>
  );
};
