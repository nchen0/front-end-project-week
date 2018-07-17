import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { deleteNote } from "../actions/action";

class ViewNote extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  specialToggle = event => {
    console.log(
      "singlenoteidis: ",
      this.props.singleNote.id
    );
    event.preventDefault();
    this.props.deleteNote(this.props.singleNote[0].id);
  };
  render() {
    return (
      <div>
        <Link exact to="/edit">
          Edit
        </Link>
        <div>
          <Button color="danger" onClick={this.toggle}>
            Delete
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalBody>
              Are you sure you want to delete this?
            </ModalBody>
            <ModalFooter>
              <Link exact to="/">
                <Button
                  onClick={this.specialToggle}
                  color="primary"
                >
                  Delete
                </Button>
              </Link>{" "}
              <Button
                color="secondary"
                onClick={this.toggle}
              >
                No
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <p>{this.props.singleNote[0].title}</p>
        <p>{this.props.singleNote[0].body}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleNote: state.singleNote
  };
};

export default connect(
  mapStateToProps,
  { deleteNote }
)(ViewNote);
