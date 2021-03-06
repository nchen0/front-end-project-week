import React from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { submitNewNote } from "../actions/action";
import { connect } from "react-redux";

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      tags: ""
    };
  }
  inputNewNote = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitNewNote = event => {
    console.log("tags: ", this.state.tags);
    event.preventDefault();
    if (this.state.title && this.state.body) {
      let newComment = {
        title: this.state.title,
        textBody: this.state.body,
        tags: [this.state.tags]
      };
      this.props.submitNewNote(newComment);
    } else {
      return;
    }
  };
  render() {
    return (
      <div className="createNote">
        <h4>Create New Note: </h4>
        <Form>
          <FormGroup>
            <Input
              onChange={this.inputNewNote}
              type="text"
              name="title"
              className="createNoteTitle"
              placeholder="Note Title"
            />
            <textarea
              onChange={this.inputNewNote}
              type="text"
              name="body"
              className="createNoteComment"
              placeholder="Note Content"
            />
            <Input
              type="text"
              name="tags"
              placeholder="Note Tags"
              className="createNoteTitle"
              onChange={this.inputNewNote}
            />
          </FormGroup>
          <Button onClick={this.submitNewNote}>Save</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { submitNewNote }
)(Create);
