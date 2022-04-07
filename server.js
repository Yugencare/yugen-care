const express = require("express");
const path = require("path");
const fs = require("fs");
const getPageData = require("./servertags");
const getTeamData = require("./servertags/team");
const getProductData = require("./servertags/product");
const getBlogPageData = require("./servertags/blogs");

const { decode } = require("html-entities");
// import getPageData from "./servertags";
const app = express();

const PORT = process.env.PORT || 3003;
const indexPath = path.resolve(__dirname, ".", "build", "index.html");

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, ".", "build"), {
    maxAge: "30d",
  })
);

// here we serve the index.html page
app.get("/*", (req, res, next) => {
  fs.readFile(indexPath, "utf8", async (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    // get current location
    const URL = req.originalUrl;
    const SLUG = URL.split("/")
      .filter((e) => e)
      .pop();
    // console.log("Slug:" + SLUG);

    // get post info
    // console.log("URL:" + URL);
    var post = null;

    if (URL.includes("professionals") && !SLUG.includes("professionals")) {
      post = await getTeamData(SLUG);
    } else if (
      URL.includes("wellness-land") &&
      !SLUG.includes("wellness-land")
    ) {
      post = await getProductData(SLUG);
    } else if (URL.includes("research") && !SLUG.includes("research")) {
      post = await getBlogPageData(SLUG);
    } else {
      // console.log(SLUG);
      if (SLUG === undefined && URL === "/main") {
        post = await getPageData("home");
      } else if (SLUG.includes(".")) {
        post = null;
      } else {
        post = await getPageData(SLUG);
      }
    }

    if (post) {
      // console.log("Post:", post);

      // inject meta tags
      var SeoFields = "";
      if (post.meta) {
        SeoFields = `<title>${post.meta.title}</title><meta name="description" content="${post.meta.description}"/>`;
      }

      const properties = JSON.parse(post.properties);
      // console.log(properties);
      if (properties && properties.length !== 0) {
        properties.map(
          (prop) =>
            (SeoFields =
              SeoFields +
              `<meta property="${prop.property}" content="${prop.content}" />`)
        );
      }

      if (post.schema && post.schema.length !== 0) {
        var allschemas = "";

        for (let i = 0; i < post.schema.length; i++) {
          allschemas =
            allschemas +
            `<script type="application/ld+json">${JSON.stringify(
              post.schema[i]
            )}</script>`;
        }

        SeoFields = SeoFields + allschemas;
      }

      if (post.scripts) {
        SeoFields = SeoFields + decode(post.scripts);
      }
      console.log(SeoFields);
      htmlData = htmlData.replace(
        "<title>Yugen Care | by Dr. Gehad</title>",
        SeoFields
      );
    } else {
      htmlData = htmlData.replace(
        "<title>Yugen Care | by Dr. Gehad</title>",
        ""
      );
    }
    console.log(htmlData);
    return res.send(htmlData);
  });
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
