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
  Message,
  DatePicker,
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { MoreVertical, Edit, Trash, PlusCircle } from "react-feather";
import EditData from "../Datas/OutRequests/EditData";
import AddPrice from "../Datas/OutRequests/AddPrice";
import AssignMember from "../Datas/OutRequests/AssignMember";
import { deleteOutRequest, assignOutMember } from "../../redux/actions";
import CsvDownload from "react-json-to-csv";
import Rater from "../Rating/Rater";
import SetTimeSchedule from "../Datas/OutRequests/SetTimeSchedule";
import AddComment from "../Datas/OutRequests/AddComment";

const { WeekPicker, MonthPicker } = DatePicker;

class RequestTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    activeTab: "1",
    services: this.props.requests.outrequests,
    month: new Date().getMonth(),
    display: false,
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

  handleMonth = (e) => {
    if (e == null) return;
    const date = new Date(e._d);
    this.setState({ month: date.getMonth() });
  };

  acceptRequest = (record) => {
    const user = this.props.authentication.user;
    let data = {
      name: `${user.firstname} ${user.lastname}`,
      id: user._id,
      email: user.email,
    };
    Message.warning("Loading...").then(() =>
      this.props.assignOutMember(data, record._id, user)
    );
  };

  setActiveTab = (active) => {
    this.setState({ activeTab: active });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const { usertype } = this.props.authentication.user;

    const columns = [
      {
        title: "S/N",
        dataIndex: "serial",
        key: "serial",
        width: "30%",
        ...this.getColumnSearchProps("serial"),
      },
      {
        title: "Full Name",
        dataIndex: "fullname",
        key: "fullname",
        width: "30%",
        ...this.getColumnSearchProps("fullname"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "30%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: "30%",
        ...this.getColumnSearchProps("phone"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "30%",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Project Site",
        dataIndex: "property",
        key: "property",
        width: "20%",
        ...this.getColumnSearchProps("property"),
      },
      {
        title: "Apartment",
        dataIndex: "apartment",
        key: "apartment",
        width: "30%",
        ...this.getColumnSearchProps("apartment"),
      },
      {
        title: "Scheduled Time",
        dataIndex: "timescheduled",
        key: "timescheduled",
        width: "20%",
        ...this.getColumnSearchProps("timescheduled"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "Assigned",
        dataIndex: "assigned",
        key: "assigned",
        width: "10%",
        ...this.getColumnSearchProps("assigned"),
      },
      {
        title: "Actual Price",
        dataIndex: "actual",
        key: "actual",
        width: "10%",
        ...this.getColumnSearchProps("actual"),
      },
      {
        title: "Fixed Price",
        dataIndex: "fixed",
        key: "fixed",
        width: "10%",
        ...this.getColumnSearchProps("fixed"),
      },
      {
        title: "Profit Price",
        dataIndex: "profit",
        key: "profit",
        width: "10%",
        ...this.getColumnSearchProps("profit"),
      },
      {
        title: "Comments",
        dataIndex: "comment",
        key: "comment",
        width: "30%",
        ...this.getColumnSearchProps("comment"),
      },
      {
        title: "Action",
        key: "action",
        width: "5%",
        render: (text, record) => {
          //   console.log(record);
          return (
            <Dropdown
              overlay={
                <Menu>
                  <EditData id={record._id} />
                  {(usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && (
                    <AssignMember id={record._id} />
                  )}
                  <AddComment id={record._id} />
                  {usertype === "team-member" && (
                    <SetTimeSchedule id={record._id} />
                  )}
                  {(usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && <AddPrice id={record._id} />}
                  {usertype === "team-member" &&
                    record.assignedId === "Unassigned" && (
                      <Button onClick={() => this.acceptRequest(record)} block>
                        {" "}
                        Accept Work{" "}
                      </Button>
                    )}
                  {(usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && (
                    <Button
                      onClick={(e) => {
                        let onConfirm = confirm(
                          "Are you sure you want to delete this?"
                        );
                        if (onConfirm) {
                          this.props.deleteOutRequest(
                            record._id,
                            this.props.authentication.user
                          );
                        }
                      }}
                      block
                    >
                      Delete
                    </Button>
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

    var data = columns;
    // console.log(data);
    if (usertype !== "manager" && usertype !== "technician") {
      data = data.filter((cols) => cols.key !== "assigned");
      data = data.filter((cols) => cols.key !== "profit");
      data = data.filter((cols) => cols.key !== "actual");
      if (usertype !== "user") {
        data = data.filter((cols) => cols.key !== "fixed");
      }
      if (usertype !== "team-member") {
        // data = columns.filter((cols) => cols.key !== 'action');
        data = data.filter((cols) => cols.key !== "from");
        data = data.filter((cols) => cols.key !== "timescheduled");
        // console.log(data);
      }
      if (usertype === "user") {
        data = data.filter((cols) => cols.key !== "comment");
      }
    }

    var requests = this.props.requests.outrequests;
    requests.map((eq) => {
      let personal = "";
      let count = 0;
      eq.comments.map((comment) => {
        personal += comment.id
          ? `${++count}. ${comment.text} (${comment.id.email}), \n`
          : `${++count}. ${comment.text} (Deleted User), \n`;
        // console.log(comment);
        // if (user.id._id == this.props.authentication.user._id) {
        //   personal.push(user);
        // }
      });
      eq.comment = personal;
      return eq;
    });

    var request = requests.filter((dt) => {
      if (usertype === "team-member") {
        return dt.assignedId !== "Unassigned";
      }
      return dt;
    });

    var unassReq = requests.filter((dt) => dt.assignedId === "Unassigned");

    var pendingReq = request.filter((dt) => dt.status === "pending");
    var ongoingReq = request.filter((dt) => dt.status === "on-going");
    var holdReq = request.filter((dt) => dt.status === "hold");
    var parkReq = request.filter((dt) => dt.status === "park");
    var doneReq = request.filter((dt) => dt.status === "done");
    // console.log(pendingReq);

    const tobeprint = (reqs, num) => {
      var tempReqs = [];
      let newKey1 =
        "_id key timestart assignedId propertyId timecompleted picture by_id __v";
      let newKey2 = `_id key timestart assignedId propertyId timecompleted picture by_id actual ${
        usertype === "team-member" ? "fixed" : ""
      } profit __v`;

      let newkey = num === 1 ? newKey1 : newKey2;
      reqs.forEach((obj) => {
        var singleObj = Object.keys(obj).reduce((object, key) => {
          if (
            !newkey.includes(key) ||
            key === "assigned" ||
            key === "property"
          ) {
            object[key] = obj[key];
          }
          return object;
        }, {});
        tempReqs = [...tempReqs, singleObj];
      });
      return tempReqs;
    };

    let printing2 = tobeprint(requests, 1).filter(
      (dt) => new Date(dt.date).getMonth() === this.state.month
    );
    let printing1 = tobeprint(requests, 2).filter(
      (dt) => new Date(dt.date).getMonth() === this.state.month
    );

    return (
      <Card
        title='Work Order From Outside Lists'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          <div style={{ display: "flex" }}>
            <MonthPicker
              style={{ width: "8rem" }}
              onChange={this.handleMonth}
              placeholder='Select Month'
            />
            <CsvDownload
              data={
                usertype === "manager" ||
                usertype === "technician" ||
                usertype === "procurement"
                  ? printing2
                  : printing1
              }
              filename={`OutRequests-${
                this.props.authentication.user.firstname
              }-${new Date().toLocaleDateString()}.csv`}
              style={{
                padding: "4px",
                border: "none",
                borderRadius: "5px",
                background: "green",
                color: "#fff",
                cursor: "pointer",
                marginLeft: "2px",
              }}
            >
              Export Csv
            </CsvDownload>
          </div>
        }
      >
        <Menu
          onClick={(tab) => {
            if (this.state.activeTab !== tab.key) this.setActiveTab(tab.key);
          }}
          selectedKeys={[this.state.activeTab]}
          mode='horizontal'
          className='border-bottom-0'
        >
          {usertype === "team-member" && (
            <Menu.Item key='6'>Unassigned</Menu.Item>
          )}
          <Menu.Item key='1'>Pending</Menu.Item>
          <Menu.Item key='2'>Done</Menu.Item>
          <Menu.Item key='3'>Park</Menu.Item>
          <Menu.Item key='4'>Hold</Menu.Item>
          <Menu.Item key='5'>On-going</Menu.Item>
        </Menu>
        {this.state.activeTab === "6" && usertype === "team-member" && (
          <Table columns={data} dataSource={unassReq} />
        )}
        {this.state.activeTab === "1" && (
          <Table columns={data} dataSource={pendingReq} />
        )}
        {this.state.activeTab === "2" && (
          <Table columns={data} dataSource={doneReq} />
        )}
        {this.state.activeTab === "3" && (
          <Table columns={data} dataSource={parkReq} />
        )}
        {this.state.activeTab === "4" && (
          <Table columns={data} dataSource={holdReq} />
        )}
        {this.state.activeTab === "5" && (
          <Table columns={data} dataSource={ongoingReq} />
        )}
      </Card>
    );
  }
}

export default connect((state) => state, { deleteOutRequest, assignOutMember })(
  RequestTable
);
