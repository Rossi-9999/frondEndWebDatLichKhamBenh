import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hasd-password",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = event.target.value;
    this.setState({
      ...coppyState,
    });
  };

  checkValidateInput = () => {
    let arrayInput = ["email", "password", "firstName", "lastName", "address"];
    let isValid = true;
    for (let i = 0; i < arrayInput.length; i++) {
      if (!this.state[arrayInput[i]]) {
        alert("Missing parameter: " + arrayInput[i]);
        isValid = false;
        break;
      }
    }
    return true;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
                disabled
                style={{ backgroundColor: "#ccc9c5" }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
                disabled
                value={this.state.password}
                style={{ backgroundColor: "#ccc9c5" }}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
