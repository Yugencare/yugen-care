const axios = require("axios");

module.exports = getBlogPageData = async (url) => {
  try {
    // console.log(url);
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/pages/blog-meta-tags/" + url
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
