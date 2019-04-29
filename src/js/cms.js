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
      // Convert Immutable List to plain array
      tags: [].concat(
        props.value ? props.value.toJS().map(it => ({ name: it })) : []
      )
    };
  }

  update(tags) {
    this.props.onChange(tags.map(it => it.name));
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.update(tags);
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.update(tags);
  }

  render() {
    return (
      <React.Fragment>
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          allowNew={true}
        />
        <style jsx global>{`
          .react-tags {
            position: relative;
            padding: 6px 0 0 6px;
            border: 1px solid #d1d1d1;
            border-radius: 1px;

            /* shared font styles */
            font-size: 1em;
            line-height: 1.2;

            /* clicking anywhere will focus the input */
            cursor: text;
          }

          .react-tags.is-focused {
            border-color: #b1b1b1;
          }

          .react-tags__selected {
            display: inline;
          }

          .react-tags__selected-tag {
            display: inline-block;
            box-sizing: border-box;
            margin: 0 6px 6px 0;
            padding: 6px 8px;
            border: 1px solid #d1d1d1;
            border-radius: 2px;
            background: #f1f1f1;

            /* match the font styles */
            font-size: inherit;
            line-height: inherit;
          }

          .react-tags__selected-tag:after {
            content: "\\2715";
            color: #aaa;
            margin-left: 8px;
          }

          .react-tags__selected-tag:hover,
          .react-tags__selected-tag:focus {
            border-color: #b1b1b1;
          }

          .react-tags__search {
            display: inline-block;

            /* match tag layout */
            padding: 7px 2px;
            margin-bottom: 6px;

            /* prevent autoresize overflowing the container */
            max-width: 100%;
          }

          @media screen and (min-width: 30em) {
            .react-tags__search {
              /* this will become the offsetParent for suggestions */
              position: relative;
            }
          }

          .react-tags__search input {
            /* prevent autoresize overflowing the container */
            max-width: 100%;

            /* remove styles and layout from this element */
            margin: 0;
            padding: 0;
            border: 0;
            outline: none;

            /* match the font styles */
            font-size: inherit;
            line-height: inherit;
          }

          .react-tags__search input::-ms-clear {
            display: none;
          }

          .react-tags__suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
          }

          @media screen and (min-width: 30em) {
            .react-tags__suggestions {
              width: 240px;
            }
          }

          .react-tags__suggestions ul {
            margin: 4px -1px;
            padding: 0;
            list-style: none;
            background: white;
            border: 1px solid #d1d1d1;
            border-radius: 2px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          .react-tags__suggestions li {
            border-bottom: 1px solid #ddd;
            padding: 6px 8px;
          }

          .react-tags__suggestions li mark {
            text-decoration: underline;
            background: none;
            font-weight: 600;
          }

          .react-tags__suggestions li:hover {
            cursor: pointer;
            background: #eee;
          }

          .react-tags__suggestions li.is-active {
            background: #b7cfe0;
          }

          .react-tags__suggestions li.is-disabled {
            opacity: 0.5;
            cursor: auto;
          }
        `}</style>
      </React.Fragment>
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
