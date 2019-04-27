import React, { useState } from "react";
import CMS from "netlify-cms";
import ReactTags from "react-tag-autocomplete";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProductsPreview from "./cms-preview-templates/products";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";

// Example of creating a custom color widget
class ColorControl extends React.Component {
  render() {
    return (
      <input
        style={{ height: "80px" }}
        type="color"
        value={this.props.value}
        onInput={e => this.props.onChange(e.target.value)}
      />
    );
  }
}

const TagsControl = ({ value = [], onChange }) => {
  const [tags, setTags] = useState(value);
  const handleDelete = i => {
    const tags = tags.slice(0);
    tags.splice(i, 1);
    setTags(tags);
    onChange(tags);
  };

  const handleAddition = tag => {
    const tags = [].concat(tags, tag);
    setTags(tags);
    onChange(tags);
  };
  return (
    <ReactTags
      tags={tags}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
    />
  );
};

CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerWidget("color", ColorControl);
CMS.registerWidget("tags", TagsControl);
