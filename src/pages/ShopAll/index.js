import React from "react";
import { useParams } from "react-router";
import PageHeader from "../../layout/PageHeader";
import BrowseProducts from "./BrowseProducts";
//images

function ShopAll() {
  const params = useParams();

  return (
    <div className="ShopAll">
      <PageHeader
        pagename={
          params.tag &&
          params.tag !== "all" &&
          !params.tag.includes("deals") ? (
            <h1 style={{ textTransform: "capitalize" }}>
              {params.tag?.toLowerCase()}
            </h1>
          ) : (
            "Browse All Products"
          )
        }
      />
      <BrowseProducts />
    </div>
  );
}
export default ShopAll;
