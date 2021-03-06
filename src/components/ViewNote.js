import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteNote, fetchSingleNote } from "../actions/action";

const URL = `${process.env.REACT_APP_API}/notes/`;

class ViewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      input: "",
      todos: ""
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    let id = window.location.pathname.split("/");
    id = id[2];
    this.props.fetchSingleNote(URL, id);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  deleteNote = event => {
    event.preventDefault();
    this.props.deleteNote(this.props.singleNote.id);
    this.props.history.push("/");
  };
  inputTodo = event => {
    this.setState({ input: event.target.value });
  };
  submitTodo = event => {
    event.preventDefault();
    let newInput = this.state.input.slice();
    this.setState({
      todos: newInput,
      input: ""
    });
  };
  render() {
    console.log("this.props.singleNote.tags is: ", this.props.singleNote.tags);
    return (
      <div className="singleNote">
        <div className="singleNoteButtons">
          <Link to="/edit">Edit</Link>
          <div className="delete-button" onClick={this.toggle}>
            Delete
          </div>
        </div>

        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalBody>Are you sure you want to delete this?</ModalBody>
            <ModalFooter>
              <Button onClick={this.deleteNote} color="primary">
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        {this.props.fetching ? (
          <div>Fetching note...</div>
        ) : (
          <div className="singleNoteBody">
            <h3>{this.props.singleNote.title}</h3>
            <p>{this.props.singleNote.textBody}</p>

            {this.props.singleNote.tags.length > 0 ? (
              <div className="tags">
                Tags:{" "}
                {this.props.singleNote.tags.map(tag => {
                  return (
                    <p key={Math.random()} className="tag">
                      *{tag.title}
                    </p>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleNote: state.singleNote,
    notes: state,
    fetching: state.fetching
  };
};

export default connect(
  mapStateToProps,
  { deleteNote, fetchSingleNote }
)(ViewNote);
