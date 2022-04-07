import { decode } from "html-entities";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../../app/E-commerce/products";
import LoadingOverlay from "../../components/LoadingOverlay";
import product1 from "../../images/prod4.jpg";
import product2 from "../../images/prod5.jpg";
import product3 from "../../images/prod6.jpg";
import Errorpage from "../../layout/Errorpage";
import ProductDesc from "./ProductDesc";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";

function ProductPage() {
  const dispatch = useDispatch();
  const { product, productStatus } = useSelector((state) => state.products);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  useEffect(() => {
    ////Passing page ID reference

    dispatch(getProduct({ slug: params.product }));
  }, [dispatch, params.product]);

  if (product.id) {
    console.log(product);
  }
  if (productStatus === "failed") {
    return <Errorpage />;
  }
  const meta = {
    title: product.name,
    description: decode(product.description),
  };

  const schema = {
    "@context": "https://www.schema.org",
    "@type": "product",
    logo: "https://yugencare.com/wp-content/themes/twentytwentyone/assets/images/logo-n.jpg",
    name: product.name,
    category:
      product.categories && product.categories.length !== 0
        ? product.categories[0].label
        : null,
    image:
      product.images && product.images.length !== 0
        ? product.images[0].url
        : null,
    description: decode(product.description),
    aggregateRating: {
      "@type": "aggregateRating",
      ratingValue: "5",
      reviewCount: "21",
    },
  };
  const properties = [
    {
      content:
        product.images && product.images.length !== 0
          ? product.images[0].url
          : null,
      property: "og:image",
    },
    {
      content: product.name,
      property: "og:title",
    },
    {
      content: decode(product.description),
      property: "og:description",
    },
    {
      content: `https://yugencare.com/wellness-land/${product.slug}`,
      property: "og:url",
    },
  ];
  return productStatus === "success" ? (
    <div className="ProductPage position-relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {properties?.length !== 0 && properties !== null
          ? properties.map((prpty, idx) => (
              <meta
                key={prpty.content}
                property={prpty.property}
                content={prpty.content}
              />
            ))
          : null}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      {/* <div className="parrallax-container ">
        <div className="parallax y-left"></div>
      </div> */}
      <ProductDetails />
      <ProductDesc product={product} lang={lang} />
      <RelatedProducts />
    </div>
  ) : (
    <LoadingOverlay />
  );
}
export default ProductPage;
