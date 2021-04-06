import React, { Component } from "react";
import RequestTable from "./DataPage/RequestTable";
import OutRequestTable from "./DataPage/OutRequestTable";
import ServiceTable from "./DataPage/ServiceTable";
import LocationTable from "./DataPage/OurlocationTable";
import PropertyTable from "./DataPage/PropertyTable";
import UserTable from "./DataPage/UserTable";
import EquipmentTable from "./DataPage/EquipmentTable";
import InventoryTable from "./DataPage/InventoryTable";
import InspectionTable from "./DataPage/InspectionTable";
import AssetTable from "./DataPage/AssetTable";
import CsTable from "./DataPage/CsTable";
import PpmTable from "./DataPage/PpmTable";
import { connect } from "react-redux";
// import FilterTable from "./DataPage/FilterTable";
// import RegionInfoTable from "./DataPage/RegionInfoTable";
// import SiteInfoTable from "./DataPage/SiteInfoTable";

class Data extends Component {
  render() {
    const { usertype } = this.props.authentication.user;
    // console.log(usertype);
    return (
      <div>
        <div className='mb-4'>
          <RequestTable />
        </div>
        {/* <div className='mb-4'>
          <OutRequestTable />
        </div> */}
        {/* <div className='mb-4'>
          <FilterTable />
        </div>
        <div className='mb-4'>
          <RegionInfoTable />
        </div>
        <div className='mb-4'>
          <SiteInfoTable />
        </div> */}
        <div className='mb-4'>
          <ServiceTable />
        </div>
        <div className='mb-4'>
          <PropertyTable />
        </div>
        <div className='mb-4'>
          <LocationTable />
        </div>
        <div className='mb-4'>
          <EquipmentTable />
        </div>
        <div className='mb-4'>
          <InspectionTable />
        </div>
        <div className='mb-4'>
          <PpmTable />
        </div>
        <div className='mb-4'>
          <InventoryTable />
        </div>
        <div className='mb-4'>
          <AssetTable />
        </div>

        {usertype === "manager" && (
          <React.Fragment>
            <div className='mb-4'>
              <CsTable />
            </div>
            <div className='mb-4'>
              <UserTable />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default connect((state) => state, {})(Data);
