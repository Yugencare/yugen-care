const axios = require("axios");
module.exports = getTeamData = async (url) => {
  try {
    const response = await axios.get(
      "https://server.yugencare.com/api/v1/teams/metatags/" + url
    );
    const data = response.data.teams;

    return data;
  } catch (e) {
    console.log("Error has occured");
  }
};
