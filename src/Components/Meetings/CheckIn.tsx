import React, { Component } from "react";
import firebase from "../../Firebase";
import { navigate } from "@reach/router";

interface CheckInProps{
  userId?: string;
  meetingId?: string;
  path?: string;
}
interface CheckInState{
  displayName: string;
  email: string;
}

export default class CheckIn extends Component<CheckInProps,CheckInState>{

  constructor(props: any) {
    super(props);
    this.state = {
      displayName: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue } as CheckInState);
  }
  handleSubmit(e: any) {    
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userId}/${this.props.meetingId}/attendees`);
    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email,
      star: false
    });
    navigate(`/attendees/${this.props.userId}/${this.props.meetingId}`);
  }

  render(){
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Check in</h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Name"
                      value={this.state.displayName}
                      onChange={this.handleChange}
                    />
                  </section>
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
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Check in
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
