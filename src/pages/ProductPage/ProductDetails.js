import { FormControl, InputLabel, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddProduct, OpenDrawer } from "../../app/Cart/cart";
import Blank from "../../images/blank.png";
import productItem1 from "../../images/prod3.jpg";
import ProductSlider from "./ProductSlider";
import { decode } from "html-entities";

// const product = [
//   {
//     img: productItem1,
//   },
//   {
//     img: productItem3,
//   },
//   {
//     img: productItem1,
//   },
//   {
//     img: productItem3,
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#cab891",
    margin: 0,
  },
  textf: {
    width: "15ch",
    // marginRight: 30,
    "& .MuiFilledInput-input": {
      padding: "15px 10px 15px",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "2px solid #57bbad",
    },
    [theme.breakpoints.down("1600")]: {
      width: "13ch",
    },
    [theme.breakpoints.down("1400")]: {
      width: "11ch",
    },
    [theme.breakpoints.down("1200")]: {
      // marginRight: 20,
      width: "10.5ch",
      "& .MuiFilledInput-input": {
        padding: "10px 10px 10px",
      },
    },
    [theme.breakpoints.down("997")]: {
      // marginRight: 10,
      width: "8.5ch",
      "& .MuiFilledInput-input": {
        padding: "6px 10px 6px",
      },
      "& .MuiFilledInput-adornedStart": {
        padding: "0",
      },
    },

    [theme.breakpoints.down("767")]: {
      width: "9ch",
      // marginRight: 15,
      "& .MuiFilledInput-input": {
        padding: "10px 10px 10px",
      },

      "& .MuiFilledInput-adornedStart": {
        paddingLeft: 0,
      },
    },
  },
}));

function ProductDetails() {
  const classes = useStyles();
  const [value, setValue] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const { product } = useSelector((state) => state.products);
  const { lang } = useSelector((state) => state.lang);

  const [mainImage, setMainImage] = useState(
    product.images && product.images.length !== 0 && product.images[0].url
  );
  const [imageSelected, setimageSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const HandleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleMainImage = (image, index) => {
    setMainImage(image);
    setimageSelected((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? !imageSelected[idx] : (imageSelected[idx] = false)
      )
    );
  };
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const AddToCart = () => {
    dispatch(AddProduct({ product: product, quantity: quantity }));
    dispatch(OpenDrawer());
    console.log(cart);
  };
  const [state, setState] = React.useState({
    qty: 1,
    name: "hai",
  });

  const handleQChange = (event) => {
    const name = event.target.name;

    setQuantity(parseInt(event.target.value));
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    e.target.style.backgroundPosition = `${x}% ${y}%`;
  };
  const handleMouseEnter = (e) => {
    e.target.src = Blank;
    e.target.style.backgroundImage = `url(${mainImage})`;
  };
  const handleMouseLeave = (e) => {
    e.target.src = mainImage;
    e.target.style.backgroundImage = "";
  };
  const renderOptions = () => {
    let options = [];

    if (product.quantity < 7) {
      for (let index = 0; index < product.quantity; index++) {
        options.push(<option value={index + 1}>{index + 1}</option>);
      }
    } else {
      for (let index = 0; index < 7; index++) {
        options.push(<option value={index + 1}>{index + 1}</option>);
      }
    }
    return options;
  };
  const CheckDiscount = () => {
    let SamePrice = false;
    SamePrice = product.original_price !== product.price;
    return (
      <p className="mb-0 mb-sm-3">
        {SamePrice && (
          <small>
            {product.original_price} {lang === "en" ? "AED" : "د.إ"}
          </small>
        )}
        <span>
          {product.price} {lang === "en" ? "AED" : "د.إ"}{" "}
        </span>
        <strong> &nbsp; {lang === "en" ? " incl. VAT" : ""}</strong>
      </p>
    );
  };
  return (
    <div className="ProductDetails content-block4 position-relative">
      <div className="container-sm">
        <div className="row">
          <div className="col-md-7 col-xl-7 d-flex">
            <div className="productOnDesktop col-2 text-right">
              {product.images &&
                product.images.length !== 0 &&
                product.images.map((prod, idx) => (
                  <img
                    key={prod.id}
                    className="productimg-small"
                    style={{
                      border: imageSelected[idx] ? "1px solid #5b5b5b" : "none",
                    }}
                    onClick={() => handleMainImage(prod.url, idx)}
                    src={prod.url}
                    alt=""
                  />
                ))}
            </div>
            <div className="productOnDesktop col-10">
              <div className="productimg-main">
                <div className="productcontainer">
                  <img
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    src={mainImage}
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundPosition: "0% 0%",
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="productOnMobile col-sm-12">
              <ProductSlider product={product} />
            </div>
          </div>
          <div className="p-container col-md-4">
            <div className="row p-spacing">
              <ul className="list-inline mb-0 breadcrumbs">
                <li className="list-inline-item">
                  <Link to="/wellness-land/browse/all">
                    {lang === "en" ? "Shop All" : "تسوق"}
                  </Link>
                </li>
                {product.services && (
                  <>
                    <i>/</i>
                    <li className="list-inline-item">
                      <Link
                        to={`/wellness-land/browse/${product.services.label}`}
                      >
                        {lang === "en"
                          ? product.services?.label
                          : product.services?.label_ar}
                      </Link>
                    </li>
                  </>
                )}
                <i>/</i>
                <li className="list-inline-item">
                  <span>{lang === "en" ? product.name : product.name_ar}</span>
                </li>
              </ul>
            </div>
            <div className="rating row p-spacing">
              <Rating
                dir="ltr"
                name="simple-controlled"
                value={5}
                className={classes.root}
                readOnly
                precision={0.1}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
              <p> &nbsp; 5/5</p>
            </div>

            <div className="productHeading row mt-1 ">
              <h2>{lang === "en" ? product.name : product.name_ar}</h2>
            </div>
            <div className="row price d-flex mt-0  mt-md-3">
              {CheckDiscount()}
            </div>
            <div className="row">
              {product.quantity && product.quantity < 7 ? (
                <p style={{ marginBottom: 0 }}>
                  {lang === "en" ? (
                    <>
                      Only{" "}
                      <span style={{ color: "red" }}> {product.quantity} </span>
                      pieces remaining!
                    </>
                  ) : (
                    <>
                      فقط{" "}
                      <span style={{ color: "red" }}> {product.quantity} </span>
                      قطع متبقية!
                    </>
                  )}
                </p>
              ) : (
                product.quantity === 0 && (
                  <p style={{ marginBottom: 0 }}>
                    {lang === "en" ? (
                      <span style={{ color: "red" }}>
                        {" "}
                        Currently out of stock{" "}
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        {" "}
                        المنتج غير متوفر حاليا{" "}
                      </span>
                    )}
                  </p>
                )
              )}
            </div>

            <div className="row p2-spacing">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${decode(
                    lang === "en" ? product.description : product.description_ar
                  )}`,
                }}
              ></p>
            </div>
            {product.quantity ? (
              <div className="row mt-3 d-flex align-items-center justify-content-even">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="qty-native-simple">
                    {" "}
                    {lang === "en" ? "Qty" : "الكمية"}
                  </InputLabel>
                  <Select
                    native
                    value={state.qty}
                    className={classes.textf}
                    onChange={handleQChange}
                    defaultValue={1}
                    inputProps={{
                      name: "qty",
                      id: "qty-native-simple",
                    }}
                  >
                    {renderOptions()}
                  </Select>
                </FormControl>
                {/* <Select
                native
                value={state.age}
                onChange={handleQChange}
                variant="filled"
                label="Age"
                inputProps={{
                  name: "age",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select> */}
                {/* <TextField
                id="standard-select-quantity"
                select
                value={quantity}
                onChange={handleChange}
                className={classes.textf}
                InputLabelProp={{
                  style: {
                    fontFamily: "Raleway",
                    borderBottom: "1px solid #57bbad",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment className={classes.filled} position="end">
                      Qty
                    </InputAdornment>
                  ),
                }}
                variant="filled"
              >
                {quantities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
                <div onClick={AddToCart} className="cartbtn">
                  <Link to="#">
                    {" "}
                    {lang === "en" ? "ADD TO CART" : "أضف إلى العربة"}
                  </Link>
                </div>
                {/* <ButtonBase onClick={HandleFavorite}>
                {isFavorited ? (
                  <FavoriteIcon color="secondary" fontSize="large" />
                ) : (
                  <FavoriteBorderIcon fontSize="large" />
                )}
              </ButtonBase> */}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
