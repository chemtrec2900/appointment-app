import React, { Component } from "react";
import FormError from "../FormError/FormError";
import firebase from "../../Firebase";
import { navigate } from "@reach/router";

interface LoginState { 
  email: string;
  password: string; 
  errorMessage?: string;  
}
interface LoginProps {
  user?: null|string;
  path?: string;
}
export default class Login extends Component<LoginProps, LoginState> {

  constructor(props: LoginProps) {
    super(props);
    this.state = {
     email: '', 
     password: '',      
     errorMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue } as LoginState);
  }
  handleSubmit(e: any) {
    var registrationInfo = {    
      email: this.state.email, 
      password: this.state.password
    }
    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(
      registrationInfo.email, 
      registrationInfo.password
      ).then(() => {
        navigate('/meetings')
      })
      .catch(error =>{
        if(error.message){
          this.setState({errorMessage: error.message});
        }else{
          this.setState({errorMessage: ''});
        }
      })
  }


  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Log in</h3>
                  {this.state.errorMessage ? (
                    <FormError theMessage={this.state.errorMessage} />
                  ) : (
                    ""
                  )}
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="form-group">
                    <input
                      required
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
