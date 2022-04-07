const axios = require("axios");

module.exports = getPageData = async (url) => {
  try {
    // console.log(url);
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/meta-tags/" + url
    );
    const data = response.data.data;

    const string = {
      meta: data.meta,
      schema: data.schema,
      properties: JSON.stringify(data.properties),
      schema_ar: data.schema_ar,
      properties_ar: JSON.stringify(data.properties_ar),
      scripts: data.scripts,
    };

    return string;
  } catch (e) {
    console.log("Error has occured");
  }
};

// module.exports = getTeamData = async (url) => {
//   try {
//     const response = await axios.get(
//       "https://server.yugencare.com/api/v1/teams/metatags/" + url
//     );
//     const data = response.data.teams;

//     return data;
//   } catch (e) {
//     console.log("Error has occured");
//   }
// };
// module.exports = getProductData = async (url) => {
//   try {
//     const response = await axios.get(
//       "https://server.yugencare.com/api/v1/products/metatags/" + url
//     );
//     const data = response.data.product;

//     return data;
//   } catch (e) {
//     console.log("Error has occured");
//   }
// };

// const data = getPageData();
// module.exports.DATA = data;
