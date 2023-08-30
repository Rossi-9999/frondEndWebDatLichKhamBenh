import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import ModalUser from "./ModalUser";
import ModelEditUser from "./ModalEditUser";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
      isOpenModalUser: false,
      isOpenEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");

    if (response && response.errCode === 0) {
      this.setState({ arrayUsers: response.users });
    }
  };

  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  toggleModalUser = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };

  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditUser: false,
        });
        this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleUserEditModalUser = async () => {
    this.setState({ isOpenEditUser: !this.state.isOpenEditUser });
  };
  render() {
    let arrayUsers = this.state.arrayUsers;
    return (
      <div className="users-component">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleModalUser}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenEditUser && (
          <ModelEditUser
            isOpen={this.state.isOpenEditUser}
            toggleFromParent={this.toggleUserEditModalUser}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new User
          </button>
        </div>
        <div className="users-table mt-4 mx-2">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {arrayUsers &&
                arrayUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
