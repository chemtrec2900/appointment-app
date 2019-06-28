import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from './Firebase';
//import './App.css';

import Home from "./Components/Home/Home";
import Welcome from "./Components/Welcome/Welcome";
import Navigation from "./Components/Navigation/Navigation";
import Login from "./Components/Login/Login";
import Meetings from "./Components/Meetings/Meetings";
import CheckIn from "./Components/Meetings/CheckIn";
import Attendees from "./Components/Meetings/Attendees";
import Register from "./Components/Register/Register";


interface AppState{
  user: null|string;
  fbUser:null|firebase.User;
  userID: null|string;
  meetings: {meetingID: string|any, meetingName: string|any}[];
  meetingLength: number;
}
export default class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: '',
      fbUser: null,
      userID: null,
      meetings: [],
      meetingLength: 0
    }
  }

  componentDidMount() {
    // const ref = firebase.database().ref('user');
    // ref.on('value', snapshot =>{
    //   let FBUser = snapshot.val();
    //   console.log(FBUser);
    //   this.setState({user: FBUser});
    // })
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          fbUser: FBUser, 
          user: FBUser.displayName,
          userID: FBUser.uid
        });
        
        const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid);
        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];
          for(let item in meetings){
            meetingsList.push({
              meetingID: item, 
              meetingName: meetings[item].meetingName
            })
          }
          this.setState({
            meetings:meetingsList, 
            meetingLength: meetingsList.length 
          });
          console.log(meetingsList)
        })

      }else{
        this.setState({
          fbUser: null,
          user: null,
          userID: null
        });
      }
    })

  }
  registerUser = (user: string) => {
    console.log('User Registered');
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        FBUser.updateProfile({
          displayName: user
        }).then(() =>{
          this.setState({
            fbUser: FBUser, 
            user: FBUser.displayName, 
            userID: FBUser.uid
          });
          navigate('/meetings');
        })
      }
    })
  }

  logOutUser = (e: any) => {
    e.preventDefault();
    this.setState({
      fbUser: null,
      user: null,
      userID: null
    });
    firebase.auth().signOut()
      .then(() =>{
        navigate('/login');
      });
  }
  addMeetings = (meeting: string) => {
    const ref = firebase
      .database()
      .ref(`meetings/${this.state.userID}`);
    ref.push({meetingName: meeting});
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser}/>
        {this.state.user && <Welcome user={this.state.user} logOutUser={this.logOutUser}/>}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" user={this.state.user} />
          <Meetings 
            path="/meetings" 
            user={this.state.user} 
            addMeeting={this.addMeetings}
            meetings={this.state.meetings}
            userId={this.state.userID}
            />
          <Register path="/register" registerUser={this.registerUser}/>
          <CheckIn path="/checkin/:userId/:meetingId" />
          <Attendees path="/attendees/:userId/:meetingId" adminUser={this.state.userID} />
        </Router>
      </div>
    );
  }
}
