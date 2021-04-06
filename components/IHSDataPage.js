import React, { Component } from "react";
import { connect } from "react-redux";
import IHSDataTable from "./DataPage/IHSDataTable";

class IHSDataPage extends Component {
  render() {
    const { usertype } = this.props.authentication.user;
    // console.log(usertype);
    return (
      <div>
        <div className='mb-4'>
          <IHSDataTable />
        </div>
      </div>
    );
  }
}

export default connect((state) => state, {})(IHSDataPage);
