import React, { Component, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

interface EditorState {
  editorHtml: string;
}

class Editor extends Component<{}, EditorState> {
  reactQuillRef: React.RefObject<ReactQuill>;

  constructor(props: {}) {
    super(props);
    this.state = { editorHtml: "" };
    this.handleChange = this.handleChange.bind(this);
    this.reactQuillRef = React.createRef();
  }

  handleChange(html: string) {
    this.setState({ editorHtml: html });
    
  }

  handleSubmit = () => {
    const editor = this.reactQuillRef.current?.getEditor();
    this.setState({
      editorHtml: editor ? editor.root.innerHTML : ""
    });
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  render() {
    return (
      <>
        <ReactQuill
          ref={this.reactQuillRef}
          value={this.state.editorHtml}
          onChange={this.handleChange}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          style={{ minHeight: "25vh" }}
        />
      </>
    );
  }
}

export default Editor;
