import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Ordem de Serviço</h1>
                <p className="lead">Gonçalves transportes</p>
                <Link to="/login" className="btn btn-lg btn-light">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
