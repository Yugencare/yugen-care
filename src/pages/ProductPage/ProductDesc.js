import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { decode } from "html-entities";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import ProductReview from "./ProductReview";

const ratings = [
  {
    name: "Zeke Khan",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Ameera Khan",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Mueez Khan",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const styles = {
  tabs: {
    background: "transparent",
    fontFamily: "Raleway",
    borderBottom: "1px solid #e8e8e8",
    "& .MuiTab-wrapper": {
      fontFamily: "Raleway",
    },
  },
  slide: {
    padding: 15,
    minHeight: 100,
  },
};

class ProductDesc extends React.Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  HandleTab = (product, lang) => {
    let tabs = [];
    if (lang === "en") {
      if (product.tab_one && product.tab_one !== "") {
        tabs.push({
          tab: product.tab_one,
          description: product.tab_onedescription,
        });
      }
      if (product.tab_two && product.tab_two !== "") {
        tabs.push({
          tab: product.tab_two,
          description: product.tab_twodescription,
        });
      }
      if (product.tab_three && product.tab_three !== "") {
        tabs.push({
          tab: product.tab_three,
          description: product.tab_threedescription,
        });
      }
      if (product.tab_four && product.tab_four !== "") {
        tabs.push({
          tab: product.tab_four,
          description: product.tab_fourdescription,
        });
      }
    } else {
      if (product.tab_one_ar && product.tab_one_ar !== "") {
        tabs.push({
          tab: product.tab_one_ar,
          description: product.tab_one_ardescription,
        });
      }
      if (product.tab_two_ar && product.tab_two_ar !== "") {
        tabs.push({
          tab: product.tab_two_ar,
          description: product.tab_two_ardescription,
        });
      }
      if (product.tab_three_ar && product.tab_three_ar !== "") {
        tabs.push({
          tab: product.tab_three_ar,
          description: product.tab_three_ardescription,
        });
      }
      if (product.tab_four_ar && product.tab_four_ar !== "") {
        tabs.push({
          tab: product.tab_four_ar,
          description: product.tab_four_ardescription,
        });
      }
    }
    return tabs;
  };

  render() {
    const { index } = this.state;
    const { product, lang } = this.props;
    const RenderTabs = this.HandleTab(product, lang);
    const reviews = [];
    return (
      <div className="ProductDesc content-block1 position-relative">
        <div className="container-md ">
          <Tabs
            value={index}
            centered
            onChange={this.handleChange}
            style={styles.tabs}
            TabIndicatorProps={{
              style: { background: "rgb(71, 71, 71)", height: "1px" },
            }}
          >
            {RenderTabs.map((item, i) => (
              <Tab
                key={item.tab + i}
                label={<span className="tabLabel">{item.tab}</span>}
              />
            ))}
            {/* {product.tab_one && product.tab_one !== "" && (
              <Tab
                label={<span className="tabLabel">{product.tab_one}</span>}
              />
            )}
            {product.tab_two && product.tab_two !== "" && (
              <Tab
                label={<span className="tabLabel">{product.tab_two}</span>}
              />
            )} */}
            <Tab
              label={
                <span className="tabLabel">
                  {lang === "en" ? "REVIEWS" : "مراجعات"}
                </span>
              }
            />
          </Tabs>
          <SwipeableViews
            animateTransitions={false}
            index={index}
            onChangeIndex={this.handleChangeIndex}
          >
            {RenderTabs.map((item) => (
              <div
                dir={lang === "en" ? "ltr" : "rtl"}
                className={lang === "en" ? "row m-0" : "row m-0 text-right"}
                style={Object.assign({}, styles.slide)}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${decode(item.description)}`,
                  }}
                ></p>
              </div>
            ))}
            <div
              dir={lang === "en" ? "ltr" : "rtl"}
              className="row m-0"
              style={Object.assign({}, styles.slide)}
            >
              <ProductReview
                blog_title={lang === "en" ? product.name : product.name_ar}
                blog_slug={product.slug}
                blog_id={product.id}
                reviews={reviews}
              />
            </div>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

export default ProductDesc;
