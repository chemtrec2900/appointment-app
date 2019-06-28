import React, { Component } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "@reach/router";

interface NavigationState {}
interface NavigationProps {
  user?: null|string;
  logOutUser: (e:any)=>void;
}
export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  render() {
    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaUsers className="mr-1"/> Meeting Log
          </Link>
          <div className="navbar-nav ml-auto">
            {this.props.user && (
              <Link className="nav-item nav-link" to="/meetings">
                meetings
              </Link>
            )}
            {!this.props.user && (
              <>
                <Link className="nav-item nav-link" to="/login">
                  log in
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  register
                </Link>
              </>
            )}
            {this.props.user && 
              <Link className="nav-item nav-link" to="/login" onClick={e => this.props.logOutUser(e)}>
                log out
              </Link>
            }
          </div>
        </div>
      </nav>
    );
  }
}
