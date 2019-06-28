import React, { Component } from "react";

interface FormErrorState {}
interface FormErrorProps {
  theMessage: string;
}
export default class FormError extends Component<FormErrorProps, FormErrorState> {
  render() {
    return (
      <div className="col-12 alert alert-danger px-3">
        {this.props.theMessage}
      </div>
    );
  }
}
