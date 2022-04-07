require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemap-routes.js").default;
const Sitemap = require("react-router-sitemap/index.es5").default;
const axios = require("axios");

async function generateSitemap() {
  try {
    const response1 = await axios.get(
      "https://server.yugencare.com/api/v1/pages/"
    );
    const page_data = await response1.data.pages;

    // Fetchig all CMS pages
    let slugMap = [];
    let slugMapBlog = [];
    let slugMapBlogPages = [];
    let slugMapDoc = [];
    let slugMapProducts = [];

    if (page_data) {
      for (var i = 0; i < page_data.length; i++) {
        if (
          page_data[i].page_template.label === "Yugen Service Page Template 1"
        ) {
          slugMap.push({ slug: page_data[i].slug });
        }
      }
    }

    const response2 = await axios.get(
      "https://server.yugencare.com/api/v1/blogs/"
    );
    const blog_data = await response2.data.blogs;

    if (blog_data) {
      for (var i = 0; i < blog_data.length; i++) {
        slugMapBlog.push({ id: blog_data[i].slug });
        for (let j = 0; j < blog_data[i].blog_pages.length; j++) {
          const blogpageR = await axios.get(
            "https://server.yugencare.com/api/v1/pages/" +
              blog_data[i].blog_pages[j].value
          );
          const blog_pagedata = await blogpageR.data.page;
          slugMapBlogPages.push({
            slug: blog_data[i].slug,
            id: blog_pagedata.tab_slug,
          });
        }
      }
    }

    const response3 = await axios.get(
      "https://server.yugencare.com/api/v1/teams/"
    );
    const doc_data = await response3.data.team;
    if (doc_data) {
      for (var i = 0; i < doc_data.length; i++) {
        slugMapDoc.push({ id: doc_data[i].id, slug: doc_data[i].slug });
      }
    }

    const response4 = await axios.get(
      "https://server.yugencare.com/api/v1/products/"
    );
    const prod_data = await response4.data.products;
    if (prod_data) {
      for (var i = 0; i < prod_data.length; i++) {
        slugMapProducts.push({ slug: prod_data[i].slug });
      }
    }

    const paramsConfig = {
      "/7-pillars/:slug": slugMap,
      "/research/:id": slugMapBlog,
      "/research/:slug/:id": slugMapBlogPages,
      "/professionals/:slug/:id": slugMapDoc,
      "/wellness-land/:slug": slugMapProducts,
    };

    var MySiteMap = new Sitemap(router)
      .applyParams(paramsConfig)
      .build("https://yugencare.com/");

    const NewDate = new Date();

    for (let i = 0; i < MySiteMap.sitemaps[0].urls.length; i++) {
      MySiteMap.sitemaps[0].urls[i].changefreq = "daily";
      MySiteMap.sitemaps[0].urls[i].priority = 0.8;
      MySiteMap.sitemaps[0].urls[i].lastmod = NewDate;
    }
    return MySiteMap.save("./sitemap.xml");
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
