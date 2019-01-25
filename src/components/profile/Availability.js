import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import TakeMoney from "../stripe/TakeMoney";
import styled from "styled-components";
import moment from 'moment'
const AvailableTimes = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
`;
const Time = styled.div`
  line-height: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  button {
      font-size: 17px;
  }
`;


const goBack = {
  fontSize: "12px",
  color: "black",
  cursor: "pointer",
  position: "absolute",
  left: "3%"
};
const required = {
  fontSize: "10px",
  marginTop: "2%"
};


class date extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: [],
      month: '',
      dayNames: [],
      dates:[]
    };
  }
  componentDidMount = () => {
    let dateArray = []
    let date = this.props.calendar.map((day) => {
       dateArray.push(moment(day.date).format('MM-DD'))
    })
    console.log(dateArray)
    let dayOfweek = moment()._locale._weekdays
    let month = moment().format('MMMM')
    this.setState({dates: date, dayNames: dayOfweek, month: month})
  }
  availability = () => {
    let dates = this.props.calendar;
    let time = [];
    for (let i in dates) {
      let date = moment(dates[i].date).format('MM-DD')
      console.log(date)
      time.push(
        <Time key={i}>
          <ul>
            <li id="day-name">{date}</li>
            <li id="time">{dates[i].time}</li>
          </ul>
          <TakeMoney
            stylist_name={this.props.stylist_name}
            business_id={dates[i].business_id}
            calendar_id={dates[i].id}
            service_id={this.props.service_id}
            month_name={this.state.month}
            day={dates[i].date}
            appointment_time={dates[i].time}
            full_name={this.props.user.full_name}
          />
        </Time>
      );
    }
    return time;
  };

  render() {
    console.log(this.props)
    return (
      <>
        <span onClick={this.props.goBack} style={goBack}>{`< Go Back `}</span>
        <span className="current-month">December</span>

        <AvailableTimes>{this.availability()}</AvailableTimes>
        <span style={required}>
          CLIENTS REQUIRED TO PROVIDE CREDIT CARD TO BOOK
        </span>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    stylist_name: state.stylist_name
  };
};
export default connect(mapStateToProps)(date);
