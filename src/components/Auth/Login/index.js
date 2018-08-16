import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

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
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <h2 className="text-center">Entre com seus dados</h2>
              <div className="form-group input">
                <label htmlFor="user_login">Usuario</label>
                <input
                  type="text"
                  name="email"
                  id="user_login"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  size="20"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group input">
                <label htmlFor="user_pass">Senha</label>
                <a
                  className="form-sublink"
                  href="https://themes.getbootstrap.com/my-account/lost-password/"
                >
                  Esqueceu a senha?
                </a>
                <input
                  type="password"
                  name="password"
                  id="user_pass"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  value={this.state.password}
                  onChange={this.onChange}
                  size="20"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group button-group">
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
