const axios = require("axios");

module.exports = getPageData = async (url) => {
  try {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/meta-tags/" + url
    );
    const data = response.data.data;
    const string = {
      meta: data.meta,
      properties: JSON.stringify(data.properties),
    };
    return string;
  } catch (e) {
    // console.log(e);
    return undefined;
  }
};

// const data = getPageData();
// module.exports.DATA = data;
