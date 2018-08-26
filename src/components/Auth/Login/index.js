import React, { Component } from "react";
import { connect } from "react-redux";

import TextFieldGroup from "../../common/TextFieldGroup";
import { loginUser } from "../../../actions/authActions";

import "./style.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/menu");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/menu");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const loginUserData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginUserData);
  }
  render() {
    const { errors } = this.state;
    return (
      <main id="main" className="">
        <section className="login">
          <h1 className="text-center">Login</h1>
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <h3 className="text-center">Entre com seus dados</h3>
              <div className="form-group input">
                <label htmlFor="user_login">Email</label>
                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  name="email"
                  onChange={this.onChange}
                  error={errors.email}
                />
                <label htmlFor="user_login">Senha</label>
                <TextFieldGroup
                  type="password"
                  placeholder="Senha"
                  value={this.state.password}
                  name="password"
                  onChange={this.onChange}
                  error={errors.password}
                />{" "}
                <button className="btn btn-brand btn-block mb-4 btn-primary">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
