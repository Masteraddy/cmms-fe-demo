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
import AddData from "../Datas/RegionInfos/AddData";
import EditData from "../Datas/RegionInfos/EditData";
import { deleteRegionInfo } from "../../redux/actions";

class RegionInfoTable extends Component {
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
    const columns = [
      {
        title: "Site Id",
        dataIndex: "site_id",
        key: "site_id",
        ...this.getColumnSearchProps("site_id"),
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
        title: "Site Name",
        dataIndex: "site_name",
        key: "site_name",
        ...this.getColumnSearchProps("site_name"),
      },
      {
        title: "Cluster",
        dataIndex: "cluster",
        key: "cluster",
        ...this.getColumnSearchProps("cluster"),
      },
      {
        title: "Site Classification",
        dataIndex: "site_classification",
        key: "site_classification",
        ...this.getColumnSearchProps("site_classification"),
      },
      {
        title: "Mech Engr",
        dataIndex: "mech_engr",
        key: "mech_engr",
        ...this.getColumnSearchProps("mech_engr"),
      },
      {
        title: "Elect Engr",
        dataIndex: "elect_engr",
        key: "elect_engr",
        ...this.getColumnSearchProps("elect_engr"),
      },
      {
        title: "Driver",
        dataIndex: "driver",
        key: "driver",
        ...this.getColumnSearchProps("driver"),
      },
      {
        title: "AC Technicial",
        dataIndex: "ac_technicial",
        key: "ac_technicial",
        ...this.getColumnSearchProps("ac_technicial"),
      },
      {
        title: "Project Manager",
        dataIndex: "project_manager",
        key: "project_manager",
        ...this.getColumnSearchProps("project_manager"),
      },
      {
        title: "Project Manager Contact",
        dataIndex: "pm_contact",
        key: "pm_contact",
        ...this.getColumnSearchProps("pm_contact"),
      },
      {
        title: "Cluster Teamlead",
        dataIndex: "cluster_teamlead",
        key: "cluster_teamlead",
        ...this.getColumnSearchProps("cluster_teamlead"),
      },
      {
        title: "OPS Manager",
        dataIndex: "ops_manager",
        key: "ops_manager",
        ...this.getColumnSearchProps("ops_manager"),
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
                        this.props.deleteRegionInfo(record._id);
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
        title='Region Info'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          this.props.authentication.user.usertype === "manager" && <AddData />
        }
      >
        <Table columns={col} dataSource={this.props.regioninfos.regioninfos} />
      </Card>
    );
  }
}

export default connect((state) => state, { deleteRegionInfo })(RegionInfoTable);
