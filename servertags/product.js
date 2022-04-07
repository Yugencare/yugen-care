const axios = require("axios");

module.exports = getProductData = async (url) => {
  try {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/products/metatags/" + url
    );
    
    const data = response.data.product;

    return data;
  } catch (e) {
    console.log("Error has occured");
  }
};
