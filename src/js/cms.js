import React from "react";
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


class TagsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [].concat((props.value || [])),
    };
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.props.onChange(tags);
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.props.onChange(tags);
  }

  render() {
    return (
      <ReactTags
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        allowNew={true}
      />
    );
  }
}



CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerWidget("color", ColorControl);
CMS.registerWidget("tags", TagsControl);
