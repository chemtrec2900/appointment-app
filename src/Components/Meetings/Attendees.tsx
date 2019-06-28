import React, { Component } from "react";
import firebase from "../../Firebase";
import { navigate } from "@reach/router";

import AttendeesList from "./AttendeesList";
import { FaUndo } from "react-icons/fa";

interface AttendeesProps {
  userId?: string;
  meetingId?: string;
  path?: string;
  adminUser?: string | null;
}
interface AttendeesState {
  displayAttendees: any[]; 
  searchQuery: string;
}

export default class Attendees extends Component<AttendeesProps, AttendeesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      displayAttendees: [],
      searchQuery: ''
    };   
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const ref = firebase
        .database()
        .ref(`meetings/${this.props.userId}/${this.props.meetingId}/attendees`);
    ref.on('value', snapshot =>{
      let attendees = snapshot.val();
      let attendeesList = [];
      for(let item in attendees){
        attendeesList.push({
          attendeeId: item,
          attendeeName: attendees[item].attendeeName,
          attedeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
        this.setState({displayAttendees: attendeesList});
      }
    })
  }

  handleChange(e: any) {
    console.log(e);
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue } as AttendeesState);
  }
  resetSearch = (e:any) =>{e.preventDefault(); this.setState({searchQuery: ''});}

  render() {
    const dataFilter = (item:any) => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info"
                      title="Reset Search"
                      onClick={this.resetSearch}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          userId={this.props.userId}
          meetingId={this.props.meetingId}
          adminUser={this.props.adminUser}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}
