import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: "hieu2233ckh@gmail.com",
      password: "000000",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnchangeUserName = (event) => {
    this.setState({
      usename: event.target.value,
    });
  };

  handleOnchangePassWord = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.usename, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        // userLoginSuccess(data.user);
        this.props.userLoginSuccess(data.user);
        console.log("Login success");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message });
        }
      }
    }
  };

  handleShowHidePassWord = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content">
              <div className="col-12 text-login">Login</div>
              <div className="col-12 form-group login-input">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your userName"
                  value={this.state.usename}
                  onChange={(event) => this.handleOnchangeUserName(event)}
                ></input>
              </div>
              <div className="col-12 form-group login-input">
                <label>Password</label>
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your passWord"
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangePassWord(event)}
                  ></input>
                  <span onClick={() => this.handleShowHidePassWord()}>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-12 forgot-password">
                <span>For got password ?</span>
              </div>
              <div className="col-12 text-center mt-3">
                <span className="text-other-login">Or login with</span>
              </div>
              <div className="col-12 social-login">
                <i className="fab fa-google-plus-g google"></i>
                <i className="fab fa-facebook-f facebook"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
