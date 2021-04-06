import React, { Component } from "react";
import { connect } from "react-redux";
import FilterTable from "./DataPage/FilterTable";
import RegionInfoTable from "./DataPage/RegionInfoTable";
import SiteInfoTable from "./DataPage/SiteInfoTable";

class ATCDataPage extends Component {
  render() {
    const { usertype } = this.props.authentication.user;
    // console.log(usertype);
    return (
      <div>
        <div className='mb-4'>
          <FilterTable />
        </div>
        <div className='mb-4'>
          <RegionInfoTable />
        </div>
        <div className='mb-4'>
          <SiteInfoTable />
        </div>
      </div>
    );
  }
}

export default connect((state) => state, {})(ATCDataPage);
