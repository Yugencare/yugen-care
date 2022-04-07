import React from "react";
import { Link } from "react-router-dom";
import GradientBar from "../pages/Home/GradientBar";
import pageBG from "../images/pageheaderBG.jpg";
import { Skeleton } from "@material-ui/lab";
class PageHeaderSkeleton extends React.Component {
  render() {
    const { header } = this.props;
    console.log(header);
    return (
      <>
        <div
          className="PageHeader text-center"
          style={
            this.props.pagename === "View Cart"
              ? { background: "#f5f5f5" }
              : null
          }
        >
          <div className="whiteBG h-100">
            <div className="container h-100">
              <div
                className="row h-100 align-items-center"
                style={{ paddingTop: 100 }}
              >
                <div className="col-xl-12 ">
                  <h1 className="d-flex justify-content-center">
                    <Skeleton animation="wave" variant="rect" width="200px" />
                  </h1>
                  <ul className="list-inline mb-0 breadcrumbs">
                    <li className="list-inline-item">
                      <Skeleton animation="wave" variant="rect" width="40px" />
                    </li>
                    <i></i>
                    <li className="list-inline-item">
                      <Skeleton animation="wave" variant="rect" width="40px" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GradientBar h={5} />
      </>
    );
  }
}

export default PageHeaderSkeleton;
