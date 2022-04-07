import React from "react";
import BlogContent from "./BlogContent";
import Doctors from "./Doctors";

function BlogPageAdapter({ template, slug }) {
  if (template === "Blog Doctors") {
    return <Doctors slug={slug} />;
  } else if (template === "Blog Content") {
    return <BlogContent slug={slug} />;
  } else {
    return (
      <div>
        <h2>404 Blog Not Found</h2>
      </div>
    );
  }
}
export default BlogPageAdapter;
