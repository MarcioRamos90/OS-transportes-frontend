import React, { Component } from "react";
import "bootstrap-css-only";

import "./style.css";

class Login extends Component {
  render() {
    return (
      <main id="main" className="">
        <section className="login">
          <div className="container">
            <form className="">
              <h2 className="text-center">Entre com seus dados</h2>
              <div className="form-group input">
                <label for="user_login">Usuario</label>
                <input
                  type="text"
                  name="log"
                  id="user_login"
                  className="form-control"
                  size="20"
                />
              </div>
              <div className="form-group input">
                <label for="user_pass">Senha</label>
                <a
                  className="form-sublink"
                  href="https://themes.getbootstrap.com/my-account/lost-password/"
                >
                  Esqueceu a senha?
                </a>
                <input
                  type="password"
                  name="pwd"
                  id="user_pass"
                  className="form-control"
                  value=""
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
