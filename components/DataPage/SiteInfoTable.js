import {
  Table,
  Input,
  Button,
  Icon,
  Card,
  Divider,
  Dropdown,
  Menu,
  Row,
  Popconfirm,
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { MoreVertical, Edit, Trash, PlusCircle } from "react-feather";
import AddData from "../Datas/SiteInfos/AddData";
import EditData from "../Datas/SiteInfos/EditData";
import { deleteSiteInfo } from "../../redux/actions";

class SiteInfoTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    // services: this.props.services.services,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type='search' style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => text,
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    // site_id
    // site_classification
    // atc_site_id
    // region
    // state
    // company
    // gen_capacity
    // maintenance_type
    // site_type
    // cluster
    // HVAC_Info
    // oil_filter
    // fuel_filter
    const columns = [
      {
        title: "Site Id",
        dataIndex: "site_id",
        key: "site_id",
        ...this.getColumnSearchProps("site_id"),
      },
      {
        title: "Site Classification",
        dataIndex: "site_classification",
        key: "site_classification",
        ...this.getColumnSearchProps("site_classification"),
      },
      {
        title: "ATC Site Id",
        dataIndex: "atc_site_id",
        key: "atc_site_id",
        ...this.getColumnSearchProps("atc_site_id"),
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
        ...this.getColumnSearchProps("region"),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        ...this.getColumnSearchProps("state"),
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
        ...this.getColumnSearchProps("company"),
      },
      {
        title: "Gen Capacity",
        dataIndex: "gen_capacity",
        key: "gen_capacity",
        ...this.getColumnSearchProps("gen_capacity"),
      },
      {
        title: "Site Type",
        dataIndex: "site_type",
        key: "site_type",
        ...this.getColumnSearchProps("site_type"),
      },
      {
        title: "Maintenance Type",
        dataIndex: "maintenance_type",
        key: "maintenance_type",
        ...this.getColumnSearchProps("maintenance_type"),
      },
      {
        title: "Cluster",
        dataIndex: "cluster",
        key: "cluster",
        ...this.getColumnSearchProps("cluster"),
      },
      {
        title: "HVAC Info",
        dataIndex: "HVAC_Info",
        key: "HVAC_Info",
        ...this.getColumnSearchProps("HVAC_Info"),
      },
      {
        title: "Oil Filter",
        dataIndex: "oil_filter",
        key: "oil_filter",
        ...this.getColumnSearchProps("oil_filter"),
      },
      {
        title: "Fuel Filter",
        dataIndex: "fuel_filter",
        key: "fuel_filter",
        ...this.getColumnSearchProps("fuel_filter"),
      },
      {
        title: "Action",
        key: "action",
        width: "10%",
        render: (text, record) => {
          // console.log(record);
          return (
            <Dropdown
              overlay={
                <Menu>
                  <EditData id={record._id} />
                  <Button
                    onClick={(e) => {
                      let onConfirm = confirm(
                        "Are you sure you want to delete this?"
                      );
                      if (onConfirm) {
                        this.props.deleteSiteInfo(record._id);
                      }
                    }}
                    block
                  >
                    Delete
                  </Button>
                </Menu>
              }
            >
              <MoreVertical size={20} strokeWidth={1} />
            </Dropdown>
          );
        },
      },
    ];
    let col = columns;
    if (this.props.authentication.user.usertype !== "manager") {
      col = columns.filter((dt) => dt.key !== "action");
    }
    return (
      <Card
        title='Site Info'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          this.props.authentication.user.usertype === "manager" && <AddData />
        }
      >
        <Table columns={col} dataSource={this.props.siteinfos.siteinfos} />
      </Card>
    );
  }
}

export default connect((state) => state, { deleteSiteInfo })(SiteInfoTable);
