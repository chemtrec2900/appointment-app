import React, { Component } from "react";
import { Link } from "@reach/router";
interface HomeState{

}
interface HomeProps{
  user?: null|string;
  path?: string;
}
export default class Home extends Component<HomeProps, HomeState>{
  render(){
    
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <div className="display-4 text-primary mt-3 mb-2">
              Meeting Log
            </div>
            <p className="lead">
              This simple app creates meetings, allows people to check in,
              and picks random users to award giveaways. It's a good example
              of a Single Page Application which includes connection to a
              database and routing. It's a practical way to learn{" "}
              <a href="https://reactjs.org/">React </a>
              with <a href="https://firebase.google.com">Firebase</a>.
            </p>
            {!this.props.user && (
              <>
                <Link
                  to="/register"
                  className="btn btn-outline-primary mr-2"
                >
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-primary mr-2">
                  Log In
                </Link>
              </>
            )}

            {this.props.user && (
              <>
                <Link to="/meetings" className="btn btn-primary">
                  Meetings
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}