import React, { Component } from 'react';
import Manager from '../components/Dashboard/Manager';
import { connect } from 'react-redux';
import Technician from '../components/Dashboard/Technician';
import Admin from '../components/Dashboard/Admin';
import Normal from '../components/Dashboard/Normal';
import Procurement from './Dashboard/Procurement';

class Overview extends Component {
  render() {
    const { usertype } = this.props.authentication.user;
    // console.log(this.props.authentication);
    if (usertype === 'manager') {
      return <Manager />;
    } else if (usertype === 'team-member') {
      return <Admin />;
    } else if (usertype === 'procurement') {
      return <Procurement />;
    } else if (usertype === 'technician') {
      return <Technician />;
    } else if (usertype === 'user') {
      return <Normal />;
    } else {
      return <div />;
    }
  }
}

export default connect((state) => state, {})(Overview);
