import React, { Component } from "react";
import { Link } from "@reach/router";

interface WelcomeState {}
interface WelcomeProps {
  user?: string;
  logOutUser: (e:any)=>void;
}
export default class Welcome extends Component<WelcomeProps, WelcomeState> {
  render() {
    return (
      <div className="text-center mt-4">
        <span className="text-secondary font-weight-bold pl-1">
          Welcome {this.props.user}
        </span>, {' '}
        <Link
          to="/login"
          className="font-weight-bold text-primary pl-1"
          onClick={e => this.props.logOutUser(e)}
        >log out</Link>
      </div>
    );
  }
}
