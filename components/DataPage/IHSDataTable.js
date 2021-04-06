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
import AddData from "../Datas/IHSDatas/AddData";
import EditData from "../Datas/IHSDatas/EditData";
import { deleteIHSData } from "../../redux/actions";

class IHSDataTable extends Component {
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
    // ihs_id
    // type
    // dg_solution
    // genset_maintenance
    // clusters
    // site_address
    // contacts
    // technician
    // dg1_capacity
    // dg2_capacity
    // oil_filter15_18
    // fuel_filter15_18
    // oil_filter27
    // fuel_filter163_eco
    // fuel_filter_eco
    // dc_oil_filter
    // dc_fuel_filter_pry
    // dc_fuel_filter_sec
    // oil_filter407
    // fuel_filter1117_eco
    // mikano_york_eng_pry_ff
    // mikano_york_eng_scdr_ff
    // mikano_york_eng_oil_fltr

    const columns = [
      {
        title: "Site Id",
        dataIndex: "site_id",
        key: "site_id",
        ...this.getColumnSearchProps("site_id"),
      },
      {
        title: "IHS Id",
        dataIndex: "ihs_id",
        key: "ihs_id",
        ...this.getColumnSearchProps("ihs_id"),
      },
      {
        title: "Type (BB, Hub etc.)",
        dataIndex: "type",
        key: "type",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "DG Solution",
        dataIndex: "dg_solution",
        key: "dg_solution",
        ...this.getColumnSearchProps("dg_solution"),
      },
      {
        title: "Genset Maintenance Life Cycle (250/500/1000)",
        dataIndex: "genset_maintenance",
        key: "genset_maintenance",
        ...this.getColumnSearchProps("genset_maintenance"),
      },
      {
        title: "Clusters",
        dataIndex: "clusters",
        key: "clusters",
        ...this.getColumnSearchProps("clusters"),
      },
      {
        title: "Site Address",
        dataIndex: "site_address",
        key: "site_address",
        ...this.getColumnSearchProps("site_address"),
      },
      {
        title: "Contacts",
        dataIndex: "contacts",
        key: "contacts",
        ...this.getColumnSearchProps("contacts"),
      },
      {
        title: "Technician",
        dataIndex: "technician",
        key: "technician",
        ...this.getColumnSearchProps("technician"),
      },
      {
        title: "DG 1 Capacity",
        dataIndex: "dg1_capacity",
        key: "dg1_capacity",
        ...this.getColumnSearchProps("dg1_capacity"),
      },
      {
        title: "DG 2 Capacity",
        dataIndex: "dg2_capacity",
        key: "dg2_capacity",
        ...this.getColumnSearchProps("dg2_capacity"),
      },
      {
        title: "Oil Filter (15/18kva)",
        dataIndex: "oil_filter15_18",
        key: "oil_filter15_18",
        ...this.getColumnSearchProps("oil_filter15_18"),
      },
      {
        title: "Fuel Filter (15/18kva)",
        dataIndex: "fuel_filter15_18",
        key: "fuel_filter15_18",
        ...this.getColumnSearchProps("fuel_filter15_18"),
      },
      {
        title: "Oil Filter (27kva)",
        dataIndex: "oil_filter27",
        key: "oil_filter27",
        ...this.getColumnSearchProps("oil_filter27"),
      },
      {
        title: "Fuel Filter (163 ECOPLUS)",
        dataIndex: "fuel_filter163_eco",
        key: "fuel_filter163_eco",
        ...this.getColumnSearchProps("fuel_filter163_eco"),
      },
      {
        title: "Fuel Filter (ECOPLUS)",
        dataIndex: "fuel_filter_eco",
        key: "fuel_filter_eco",
        ...this.getColumnSearchProps("fuel_filter_eco"),
      },
      {
        title: "DC Oil Filter",
        dataIndex: "dc_oil_filter",
        key: "dc_oil_filter",
        ...this.getColumnSearchProps("dc_oil_filter"),
      },
      {
        title: "DC Fuel Filter Pry",
        dataIndex: "dc_fuel_filter_pry",
        key: " dc_fuel_filter_pry",
        ...this.getColumnSearchProps("dc_fuel_filter_pry"),
      },
      {
        title: "DC Fuel Filter Sec",
        dataIndex: "dc_fuel_filter_sec",
        key: "dc_fuel_filter_sec",
        ...this.getColumnSearchProps("dc_fuel_filter_sec"),
      },
      {
        title: "Oil Filter (407 (80kva)",
        dataIndex: "oil_filter407",
        key: "oil_filter407",
        ...this.getColumnSearchProps("oil_filter407"),
      },
      {
        title: "Fuel Filter (1117/2) (ECOPLUS)",
        dataIndex: "fuel_filter1117_eco",
        key: "fuel_filter1117_eco",
        ...this.getColumnSearchProps("fuel_filter1117_eco"),
      },
      {
        title: "Mikano (York Engine) Pry F/F",
        dataIndex: "mikano_york_eng_pry_ff",
        key: "mikano_york_eng_pry_ff",
        ...this.getColumnSearchProps("mikano_york_eng_pry_ff"),
      },
      {
        title: "Mikano (York Engine) Sec F/F",
        dataIndex: "mikano_york_eng_scdr_ff",
        key: "mikano_york_eng_scdr_ff",
        ...this.getColumnSearchProps("mikano_york_eng_scdr_ff"),
      },
      {
        title: "Mikano (York Engine) Oil Filter",
        dataIndex: "mikano_york_eng_oil_fltr",
        key: "mikano_york_eng_oil_fltr",
        ...this.getColumnSearchProps("mikano_york_eng_oil_fltr"),
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
                        this.props.deleteIHSData(record._id);
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
        title='IHS Data Info'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          this.props.authentication.user.usertype === "manager" && <AddData />
        }
      >
        <Table columns={col} dataSource={this.props.ihsdatas.ihsdatas} />
      </Card>
    );
  }
}

export default connect((state) => state, { deleteIHSData })(IHSDataTable);
