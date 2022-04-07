import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AddProduct, OpenDrawer } from "../../app/Cart/cart";
import { getCategories, getProducts } from "../../app/E-commerce/products";
import Pro1 from "../../images/prod1.png";

const useStyles = makeStyles((theme) => ({
  category: {
    "& .MuiTextField-root": {
      marginLeft: theme.spacing(2),
      width: "20ch",
      [theme.breakpoints.down("1600")]: {
        width: "16ch",
      },
      [theme.breakpoints.down("1200")]: {
        marginLeft: theme.spacing(0),
        width: "12ch",
      },
      [theme.breakpoints.down("992")]: {
        marginLeft: theme.spacing(0),
        width: "10ch",
      },
      [theme.breakpoints.down("768")]: {
        marginLeft: theme.spacing(0),
        width: "100%",
      },
    },
  },
  sortby: {
    "& .MuiTextField-root": {
      width: "33.5ch",
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down("1600")]: {
        width: "27.3ch",
      },
      [theme.breakpoints.down("1200")]: {
        width: "21.4ch",
      },
      [theme.breakpoints.down("992")]: {
        width: "18.6ch",
      },
      [theme.breakpoints.down("768")]: {
        width: "90%",
      },
    },
  },
}));

const sortBy = [
  // {
  //   value: "popularity",
  //   label: "Sort by Popularity",
  // },
  {
    value: "best sellers",
    label: "Sort by Best Sellers",
    label_ar: "الأكثر مبيعًا",
  },
  {
    value: "newarrival",
    label: "New Arrival",
    label_ar: "أحدث ما وصل",
  },
  {
    value: "lowestprice",
    label: "Price (Low)",
    label_ar: "السعر: من الأقل إلى الأكثر",
  },
  {
    value: "highestprice",
    label: "Price (High)",
    label_ar: "السعر: من الأكثر إلى الأقل",
  },
  {
    value: "trending",
    label: " Trending",
    label_ar: "الموصى به",
  },
];

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#cab891",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#cab891",
      },
    },
  },
})(TextField);

function ViewProducts(props) {
  const classes = useStyles();
  const [catgegory, setCategory] = useState("");
  const [sortby, setSortby] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [ProductArray, setProductArray] = useState(products);
  const { status } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.products);
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getProducts());
      dispatch(getCategories());
    }
    dispatch(getCategories());
    setProductArray(products);
  }, [dispatch, products]);
  console.log(products);

  useEffect(() => {
    if (sortby === "newarrival") {
      let arraytoSort = [...ProductArray];
      setProductArray(
        arraytoSort.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    }
    if (sortby === "lowestprice") {
      let arraytoSort = [...ProductArray];
      setProductArray(
        arraytoSort.sort(
          (pro_a, pro_b) => parseFloat(pro_a.price) - parseFloat(pro_b.price)
        )
      );
    }
    if (sortby === "highestprice") {
      let arraytoSort = [...ProductArray];
      setProductArray(
        arraytoSort.sort(
          (pro_a, pro_b) => parseFloat(pro_b.price) - parseFloat(pro_a.price)
        )
      );
    }
  }, [sortby, catgegory]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    if (event.target.value === "all") {
      setProductArray(products);
    } else {
      let array = [];
      for (let index = 0; index < products.length; index++) {
        let flag = products[index].categories.some(
          (element) => element.value === event.target.value
        );
        if (flag) {
          array.push(products[index]);
        }
      }
      setProductArray(array);
    }
    // HandleSort(sortby);
  };

  function custom_sort(a, b) {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }
  const HandleSort = (event) => {
    setSortby(event);
  };

  const AddToCart = (product) => {
    dispatch(AddProduct({ product: product, quantity: 1 }));
    dispatch(OpenDrawer());
  };

  return (
    <div className="ViewProducts content-block1 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-md-7 col-sm-9 ">
            <div className="d-flex">
              {/* <h2 className="p-2">New Arrival</h2> */}
              {lang === "en" ? (
                <p className="ml-auto p-2">Categories</p>
              ) : (
                <p className="mr-auto p-2">فئات</p>
              )}
            </div>
          </div>

          <div className="col-xl-5 col-md-5 col-sm-7 d-flex ">
            <div className={classes.category}>
              <CssTextField
                required
                id="outlined-select-category"
                select
                value={catgegory}
                onChange={handleCategoryChange}
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Raleway" } }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="all"> {lang == "en" ? "All" : "الجميع"}</option>
                {categories?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {lang == "en" ? option.name : option.name_ar}
                  </option>
                ))}
              </CssTextField>
            </div>
            <div className={classes.sortby}>
              <CssTextField
                required
                id="outlined-select-sort"
                select
                value={sortby}
                onChange={(e) => HandleSort(e.target.value)}
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Raleway" } }}
                SelectProps={{
                  native: true,
                }}
              >
                {sortBy.map((option) => (
                  <option key={option.value} value={option.value}>
                    {lang == "en" ? option.label : option.label_ar}
                  </option>
                ))}
              </CssTextField>
            </div>
          </div>
        </div>

        <div className="row " style={{ marginTop: "50px" }}>
          {ProductArray.slice(0, 9).map((pro, idx) => (
            <div
              key={pro.id}
              className="product-box col-xl-4  col-md-6 col-sm-11"
            >
              <div
                to={`/wellness-land/${pro.slug}`}
                className="product-item"
                data-aos="fade-up"
                data-aos-delay={(idx * 150) % 450}
                data-aos-duration="1000"
              >
                <Link
                  to={`/wellness-land/${pro.slug}`}
                  data-aos="fade-up"
                  data-aos-delay={(idx * 150) % 450}
                  data-aos-duration="1000"
                >
                  <div className="product-item-image">
                    <img
                      src={
                        pro.images && pro.images.length !== 0
                          ? pro.images[0].url
                          : Pro1
                      }
                      alt={pro.name}
                    />
                    <div className="product-item-image-hover"></div>
                  </div>
                  <div className="product-item-content">
                    <div className="product-item-category">
                      {lang === "en" &&
                        pro.categories &&
                        pro.categories.length !== 0 &&
                        pro.categories[0].label}
                      {lang === "ar" &&
                        pro.categories &&
                        pro.categories.length !== 0 &&
                        pro.categories[0].label_ar}
                    </div>
                    <div className="product-item-title">
                      {lang === "en" ? pro.name : pro.name_ar}
                    </div>
                    <div className="product-item-price">
                      {pro.price} {lang === "en" ? "AED" : "د.إ"}
                    </div>
                  </div>
                </Link>
                <div className="product-item-content">
                  {/* <div className="d-flex"> */}
                  {pro.quantity ? (
                    <div
                      onClick={() => AddToCart(pro)}
                      className="button-pill"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        {lang === "en" ? "ADD TO CART" : "أضف إلى العربة"}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>
                        {lang === "en"
                          ? "Currently out of stock"
                          : "المنتج غير متوفر حاليا"}
                      </span>
                    </div>
                  )}
                  {/* <FavoriteTwoToneIcon className="button-pill" /> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-5 ">
          <Link to="/wellness-land/browse/all" className="btn2">
            {lang === "en" ? "Shop all" : "اظهار الكل"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
