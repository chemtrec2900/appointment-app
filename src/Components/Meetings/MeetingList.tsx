import React, { Component } from "react";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import firebase from "../../Firebase";
import { navigate } from "@reach/router";
import { FaLink } from "react-icons/fa";

interface MeetingsListProps {
  meetings: { meetingID: string | any; meetingName: string | any }[];
  userId: null | string;
}

export default class MeetingList extends Component<MeetingsListProps, {}> {
  constructor(props: MeetingsListProps) {
    super(props);
    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting(e: any, meetingID: string) {
    e.preventDefault();
    if (this.props.userId) {
      var uid = this.props.userId.toString();
      const ref = firebase.database().ref(`meetings/${uid}/${meetingID}`);
      ref.remove();
    }
  }

  render() {
    const myMeetings = this.props.meetings.map(item => {
      return (
        <div className="list-group-item d-flex" key={item.meetingID}>
          <section
            className="btn-group aligh-self-center"
            role="group"
            area-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Meeting"
              onClick={e => this.deleteMeeting(e, item.meetingID)}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              onClick={() => navigate(`/checkin/${this.props.userId}/${item.meetingID}`)}
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={() => navigate(`/attendees/${this.props.userId}/${item.meetingID}`)}
            >
              <GoListUnordered />
            </button>
          </section>

          <section className="pl-3 text-left aligh-self-center">
            {item.meetingName}
          </section>
        </div>
      );
    });
    return <div>{myMeetings}</div>;
  }
}
