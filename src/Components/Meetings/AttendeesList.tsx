import React, { Component } from "react";
import { GoTrashcan, GoStar, GoMail } from "react-icons/go";
import firebase from "../../Firebase";

interface AttendeesListProps {
  path?: string;
  attendees: any[];
  userId?: string;
  meetingId?: string;
  adminUser?: string | null;
}
interface AttendeesListState {}

export default class AttendeesList extends Component<
  AttendeesListProps,
  AttendeesListState
> {
  constructor(props: any) {
    super(props);

    this.deleteAttendee = this.deleteAttendee.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }
  componentDidMount() {}
  deleteAttendee(e: any, attendee: string, meeting?: string) {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}`);
    ref.remove();
  }
  toggleStar(e: any, attendee: string, star: any, meeting?: string) {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}/star`);
    console.log(star);
    if (star === undefined) {
      ref.set(true);
    } else {
      ref.set(!star);
    }
  }

  render() {
    const admin = this.props.adminUser === this.props.userId;
    const attendees = this.props.attendees;
    const myAttendees = attendees.map(item => {
      return (
        <div
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1 mx-auto"
          key={item.attendeeId}
        >
          <div className="card ">
            <div
              className={
                "card-body px-3 py-2 d-flex align-items-center " +
                (admin ? "" : "justify-content-center")
              }
            >
              {admin && (
                <div className="btn-group pr-2">
                  <button
                    className={
                      "btn btn-sm " +
                      (item.star ? "btn-info" : "btn-outline-secondary")
                    }
                    title="Give user a star"
                    onClick={e =>
                      this.toggleStar(
                        e,
                        item.attendeeId,
                        item.star,
                        this.props.meetingId
                      )
                    }
                  >
                    <GoStar />
                  </button>
                  <a
                    href={`mailto:${item.attedeeEmail}`}
                    className="btn btn-sm btn-outline-secondary"
                    title="Mail Attendee"
                  >
                    <GoMail />
                  </a>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Delete Attendee"
                    onClick={e =>
                      this.deleteAttendee(
                        e,
                        item.attendeeId,
                        this.props.meetingId
                      )
                    }
                  >
                    <GoTrashcan />
                  </button>
                </div>
              )}
              <div>{item.attendeeName}</div>
            </div>
          </div>
        </div>
      );
    });
    return <div className="row justify-conent-center">{myAttendees}</div>;
  }
}
