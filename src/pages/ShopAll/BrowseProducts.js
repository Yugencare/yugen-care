import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
        width: "18ch",
      },
      [theme.breakpoints.down("1200")]: {
        marginLeft: theme.spacing(0),
        width: "16ch",
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
        width: "100%",
        marginTop: theme.spacing(2),
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

const price = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "30",
    label: "Less than 30 Dhs",
  },
  {
    value: "50",
    label: "Less than 50 Dhs",
  },
  {
    value: "100",
    label: "Less than 100 Dhs",
  },
  {
    value: "200",
    label: "Less than 200 Dhs",
  },
  {
    value: "500",
    label: "Less than 500 Dhs",
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

function BrowseProducts(props) {
  const classes = useStyles();
  const [catgegory, setCategory] = useState("");
  const [sortby, setSortby] = useState("popularity");
  const [sortbyPrice, setSortbyPrice] = useState("all");

  function aos_duration(num) {
    let duration = ((num % 3) + 1) * 300 + 1000;
    return duration.toString();
  }

  const [numOFProds, setNumOFProds] = useState(9);
  const [buttonHide, setButtonHide] = useState("block");

  const ViewMoreProds = () => {
    setButtonHide("none");
    setNumOFProds(products.length);
  };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [ProductArray, setProductArray] = useState(products);
  const { status } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.products);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getProducts());
      dispatch(getCategories());
    }
    dispatch(getCategories());
    if (params.tag?.includes("deals")) {
      let array = [];
      for (let index = 0; index < products.length; index++) {
        let flag = products[index].tags.some(
          (element) => slugify(element) === params.tag.split("-")[1]
        );
        if (flag) {
          array.push(products[index]);
        }
      }
      setProductArray(array);
    } else if (params.tag !== "all") {
      console.log(params);
      setProductArray(
        products.filter((pro) => pro.services?.label === params.tag)
      );
    } else {
      setProductArray(products);
    }
  }, [dispatch, products, params.tag]);
  console.log(products);

  useEffect(() => {
    if (sortby === "newarrival") {
      let arraytoSort = [...ProductArray];
      arraytoSort = arraytoSort.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      CallPriceSort(arraytoSort);
    }
    if (sortby === "lowestprice") {
      let arraytoSort = [...ProductArray];
      arraytoSort = arraytoSort.sort(
        (pro_a, pro_b) => parseFloat(pro_a.price) - parseFloat(pro_b.price)
      );
      CallPriceSort(arraytoSort);
    }
    if (sortby === "highestprice") {
      let arraytoSort = [...ProductArray];
      arraytoSort = arraytoSort.sort(
        (pro_a, pro_b) => parseFloat(pro_b.price) - parseFloat(pro_a.price)
      );
      CallPriceSort(arraytoSort);
    } else {
      CallPriceSort(ProductArray);
    }
  }, [sortby, catgegory, sortbyPrice]);

  const CallPriceSort = (ArrayOfProducts) => {
    if (sortbyPrice === "all") {
      setProductArray(ArrayOfProducts);
    }
    if (sortbyPrice === "30") {
      let arraytoSort = [...ArrayOfProducts];
      arraytoSort = arraytoSort.filter(
        (product) => parseFloat(product.price) <= 30
      );
      setProductArray(arraytoSort);
    }
    if (sortbyPrice === "50") {
      let arraytoSort = [...ArrayOfProducts];
      arraytoSort = arraytoSort.filter(
        (product) => parseFloat(product.price) <= 50
      );
      setProductArray(arraytoSort);
    }
    if (sortbyPrice === "100") {
      let arraytoSort = [...ArrayOfProducts];
      arraytoSort = arraytoSort.filter(
        (product) => parseFloat(product.price) <= 100
      );
      setProductArray(arraytoSort);
    }
    if (sortbyPrice === "200") {
      let arraytoSort = [...ArrayOfProducts];
      arraytoSort = arraytoSort.filter(
        (product) => parseFloat(product.price) <= 200
      );
      setProductArray(arraytoSort);
    }
    if (sortbyPrice === "500") {
      let arraytoSort = [...ArrayOfProducts];
      arraytoSort = arraytoSort.filter(
        (product) => parseFloat(product.price) <= 500
      );
      setProductArray(arraytoSort);
    }
  };

  const slugify = (string) => {
    const slug = string
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace("&", "and") // Replace spaces with -
      .replace(/\s+/g, "") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    return slug;
  };

  const handleCategoryChange = (event) => {
    if (event.target.value === "all") {
      if (params.tag.includes("deals")) {
        let array = [];
        console.log(params.tag.split("-")[1]);
        for (let index = 0; index < products.length; index++) {
          let flag = products[index].tags.some(
            (element) => slugify(element) === params.tag.split("-")[1]
          );
          if (flag) {
            array.push(products[index]);
          }
        }
        console.log(array);
        setProductArray(array);
      } else if (params.tag !== "all") {
        setProductArray(
          products.filter((pro) => pro.services?.label === params.tag)
        );
      } else {
        setProductArray(products);
      }
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
      if (params.tag.includes("deals")) {
        let newArray = [];
        for (let index = 0; index < array.length; index++) {
          let flag = array[index].tags.some(
            (element) => slugify(element) === params.tag.split("-")[1]
          );
          if (flag) {
            newArray.push(array[index]);
          }
        }
        setProductArray(newArray);
      } else if (params.tag !== "all") {
        console.log(params);
        setProductArray(
          array.filter((pro) => pro.services?.label === params.tag)
        );
      } else {
        setProductArray(array);
      }
    }
    setCategory(event.target.value);
  };

  function custom_sort(a, b) {
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  }
  const HandleSort = (event) => {
    setSortby(event);
  };
  const HandleSortPrice = (event) => {
    setSortbyPrice(event);
  };
  const AddToCart = (product) => {
    dispatch(AddProduct({ product: product, quantity: 1 }));
    dispatch(OpenDrawer());
  };
  return (
    <div className="BrowseProducts content-block1 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-xl-1">
            <p>{lang === "en" ? "Categories" : "فئات"}</p>
          </div>
          <div className="col-md-2">
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
          </div>

          <div className="col-md-1">
            <p>{lang === "en" ? "Price" : "سعر"}</p>
          </div>
          <div className="col-md-4">
            <div className={classes.category}>
              <CssTextField
                required
                id="outlined-select-price"
                select
                value={sortbyPrice}
                onChange={(e) => HandleSortPrice(e.target.value)}
                variant="outlined"
                size="small"
                InputLabelProps={{ style: { fontFamily: "Raleway" } }}
                SelectProps={{
                  native: true,
                }}
              >
                {price.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CssTextField>
            </div>
          </div>

          <div className="col-md-3 col-xl-4">
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

        {console.log()}
        <div className="row " style={{ marginTop: "50px" }}>
          {ProductArray.slice(0, numOFProds).map((pro, idx) => (
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
                      {" "}
                      {lang === "en" ? pro.name : pro.name_ar}
                    </div>
                    <div className="product-item-price">
                      {pro.price} {lang === "en" ? "AED" : "د.إ"}
                    </div>
                  </div>
                </Link>
                <div className="product-item-content">
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
                </div>
              </div>
            </div>
          ))}
        </div>
        {ProductArray.length === 0 && (
          <div className="text-center my-5">
            <h2>
              {lang === "en"
                ? "No Products found for"
                : "لم يتم العثور على منتجات ل"}{" "}
              {params.tag?.toLowerCase()}
            </h2>
            <div className="row justify-content-center">
              <div className="loadmore" style={{ display: buttonHide }}>
                <div className="btn-round">
                  <Link to="/wellness-land/browse/all">
                    {" "}
                    {lang === "en" ? "View All" : "اظهار الكل"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {ProductArray.length > 9 && (
          <div className="row justify-content-center">
            <div className="loadmore" style={{ display: buttonHide }}>
              <div className="btn-round">
                <a onClick={ViewMoreProds}>
                  {" "}
                  {lang === "en" ? "LOAD MORE" : "تحميل المزيد"}{" "}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseProducts;
