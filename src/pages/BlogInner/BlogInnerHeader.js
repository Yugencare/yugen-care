import React from "react";

function BlogInnerHeader({ blog_title, updatedAt }) {
  return (
    <div className="BlogInnerHeader position-relative">
      <p>{updatedAt}</p>
      <h2>{blog_title}</h2>
    </div>
  );
}
export default BlogInnerHeader;
