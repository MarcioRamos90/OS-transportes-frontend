import React, { Component } from "react";
import "bootstrap-css-only";

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
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
  }
  render() {
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
                  className="form-control"
                  size="20"
                  value={this.state.email}
                  onChange={this.onChange}
                />
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
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChange}
                  size="20"
                />
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

export default Login;
