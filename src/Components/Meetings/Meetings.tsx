import React, { Component } from "react";
import MeetingList from "./MeetingList";

interface MeetingsState {
  meetingName: string;
}
interface MeetingsProps {
  user?: null|string;
  path?: string;
  addMeeting: (meeting: string) => void;
  meetings: any[];
  userId: null|string;
}
export default class Meetings extends Component<MeetingsProps, MeetingsState> {

  constructor(props: MeetingsProps) {
    super(props);
    this.state = {
     meetingName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue } as MeetingsState);
  }
  handleSubmit(e: any) {    
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({meetingName: ''});
  }


  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.handleSubmit}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="meetingName"
                      placeholder="Meeting name"
                      aria-describedby="buttonAdd"
                      value={this.state.meetingName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 round-0">
              {this.props.meetings &&
                (this.props.meetings.length ? (
                  <div className="card-body py-2">
                    <h4 className="card-title font-weight-light m-0">
                      Your Meetings
                    </h4>
                  </div>
                ) : null)}
              {this.props.meetings && (
                <div className="list-group list-group-flush">
                  <MeetingList meetings={this.props.meetings} userId={this.props.userId}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
