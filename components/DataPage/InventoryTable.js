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
import AddData from "../Datas/Inventorys/AddData";
import EditData from "../Datas/Inventorys/EditData";
import SelectData from "../Datas/Inventorys/SelectData";
import ReturnData from "../Datas/Inventorys/ReturnData";
import InventoryStButton from "../Datas/Inventorys/InventoryStatusButton";
import { deleteInventory, statusInventory } from "../../redux/actions";

class InventoryTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    activeTab: 1,
    loading: false,
  };

  changeStatus = (status, id, lendId) => {
    // let stat = 'unapproved'
    // if (status == 'unapproved') {
    //   stat = 'approved';
    // } else {
    //   stat = 'unapproved';
    // }
    let dt = { status, lendId };
    this.setState({ loading: true });
    this.props.statusInventory(dt, id, (st) => {
      if (st) {
        this.setState({ loading: false });
      }
    });
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

  getColumnSearchPropsTxt = (dataIndex) => ({
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
    render: (text, record) =>
      text.map((dt) => (
        <React.Fragment key={dt}>
          {dt.split("/")[0]}
          <InventoryStButton record={record} data={dt} />
        </React.Fragment>
      )),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  setActiveTab = (active) => {
    this.setState({ activeTab: active });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const usertype = this.props.authentication.user.usertype;

    const columns = [
      {
        title: "S/N",
        dataIndex: "serial",
        key: "serial",
        width: "30%",
        ...this.getColumnSearchProps("serial"),
      },
      {
        title: "Material Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Quantities Available",
        dataIndex: "all",
        key: "all",
        width: "20%",
        ...this.getColumnSearchProps("all"),
      },
      {
        title: "Quantities Used",
        dataIndex: "used",
        key: "used",
        width: "20%",
        ...this.getColumnSearchProps("used"),
      },
      {
        title: "Total Available",
        dataIndex: "available",
        key: "available",
        width: "20%",
        ...this.getColumnSearchProps("available"),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Current Users",
        dataIndex: "current_users",
        key: "current_users",
        width: "40%",
        ...this.getColumnSearchPropsTxt("current_users"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "40%",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "Action",
        key: "action",
        width: "10%",
        render: (text, record) => {
          // console.log(record);
          let returnActive = false;
          if (record.personal.length > 0) {
            returnActive = true;
          }
          return (
            <Dropdown
              overlay={
                <Menu>
                  {returnActive && (
                    <ReturnData id={record._id} personal={record.personal} />
                  )}
                  {(usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && (
                    <React.Fragment>
                      <EditData id={record._id} />
                      <Button
                        onClick={(e) => {
                          let onConfirm = confirm(
                            "Are you sure you want to delete this?"
                          );
                          if (onConfirm) {
                            this.props.deleteInventory(record._id);
                          }
                        }}
                        block
                      >
                        Delete
                      </Button>
                    </React.Fragment>
                  )}
                </Menu>
              }
            >
              <MoreVertical size={20} strokeWidth={1} />
            </Dropdown>
          );
        },
      },
    ];

    let inventorys = this.props.inventory.inventorys;
    inventorys.map((eq) => {
      let personal = [];
      let users = [];
      eq.request.map((user) => {
        let rslt = user.id
          ? `${user.id.email} (${user.number})/ ${user.status} /${user._id}`
          : `Deleted User! (${user.number})/ ${user.status} /${user._id}`;

        users.push(rslt);

        if (user.id && user.id._id == this.props.authentication.user._id) {
          personal.push(user);
        }
        // console.log(user);
      });
      eq.personal = personal;
      eq.current_users = users;
      return eq;
    });

    // let unapproved = inventorys.filter((value) => value.status == 'unapproved');

    // let approved = inventorys.filter((value) => value.status == 'approved');

    // let available = inventorys.filter((value) => value.status == 'available');

    let theCols = columns;

    if (usertype !== "team-member") {
      theCols = theCols.filter((value) => value.key !== "status");
    }
    // console.log(inventorys);
    return (
      <Card
        title='Inventories'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          <div style={{ display: "flex" }}>
            {(usertype === "team-member" ||
              usertype === "procurement" ||
              usertype === "technician") && <SelectData />}
            <span style={{ width: "5px" }}> </span>
            {(usertype === "manager" ||
              usertype === "technician" ||
              usertype === "procurement") && <AddData />}
          </div>
        }
      >
        {/* {usertype !== 'team-member' && (
          <Menu
            onClick={(tab) => {
              if (this.state.activeTab !== tab.key) this.setActiveTab(tab.key);
            }}
            selectedKeys={[this.state.activeTab]}
            mode='horizontal'
            className='border-bottom-0'
          >
            <Menu.Item key='1'>UnApproved</Menu.Item>
            <Menu.Item key='2'>Approved</Menu.Item>
            <Menu.Item key='3'>Available</Menu.Item>
            <Menu.Item key='4'>All</Menu.Item>
          </Menu>
        )} */}
        {/* {this.state.activeTab === '1' && (
          <Table columns={theCols} dataSource={unapproved} />
        )}
        {this.state.activeTab === '2' && (
          <Table columns={theCols} dataSource={approved} />
        )}
        {this.state.activeTab === '3' && (
          <Table columns={theCols} dataSource={available} />
        )}
        {this.state.activeTab === '4' && (
          <Table columns={theCols} dataSource={inventorys} />
        )}
        {usertype === 'team-member' && (
          <Table columns={theCols} dataSource={inventorys} />
        )} */}
        <Table columns={theCols} dataSource={inventorys} />
      </Card>
    );
  }
}

export default connect((state) => state, { deleteInventory, statusInventory })(
  InventoryTable
);
