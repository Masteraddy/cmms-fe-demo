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
import { MoreVertical, Edit, Trash, PlusCircle, Save } from "react-feather";
import AddData from "../Datas/Requests/AddData";
import EditData from "../Datas/Requests/EditData";
import AddPrice from "../Datas/Requests/AddPrice";
import AssignMember from "../Datas/Requests/AssignMember";
import { deleteRequest, assignMember } from "../../redux/actions";
import Rater from "../Rating/Rater";
import CsvDownload from "react-json-to-csv";
import SetTimeSchedule from "../Datas/Requests/SetTimeSchedule";
import AddComment from "../Datas/Requests/AddComment";
const { WeekPicker, MonthPicker } = DatePicker;

class RequestTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    activeTab: "1",
    month: new Date().getMonth(),
    services: this.props.requests.requests,
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

  acceptRequest = (record) => {
    const user = this.props.authentication.user;
    let data = {
      name: `${user.firstname} ${user.lastname}`,
      id: user._id,
      email: user.email,
    };

    this.props.assignMember(data, record._id, user);
  };

  handleMonth = (e) => {
    if (e == null) return;
    const date = new Date(e._d);
    this.setState({ month: date.getMonth() });
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
        title: "Project Site",
        dataIndex: "property",
        key: "property",
        width: "20%",
        ...this.getColumnSearchProps("property"),
      },
      {
        title: "From",
        dataIndex: "from",
        key: "from",
        width: "20%",
        ...this.getColumnSearchProps("from"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "20%",
        ...this.getColumnSearchProps("date"),
      },
      {
        title: "Lifetime",
        dataIndex: "lifetime",
        key: "lifetime",
        width: "20%",
        ...this.getColumnSearchProps("lifetime"),
      },
      {
        title: "Scheduled Time",
        dataIndex: "timescheduled",
        key: "timescheduled",
        width: "20%",
        ...this.getColumnSearchProps("timescheduled"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "20%",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   key: 'status',
      //   width: '10%',
      //   ...this.getColumnSearchProps('status'),
      // },
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
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        width: "30%",
        // ...this.getColumnSearchProps('rating'),
        render: (text, record) => <Rater rate={record.rating} data={record} />,
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
          // console.log(record);
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

                  {(usertype === "team-member" ||
                    usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && (
                    <SetTimeSchedule id={record._id} />
                  )}
                  {(usertype === "manager" ||
                    usertype === "technician" ||
                    usertype === "procurement") && <AddPrice id={record._id} />}
                  {usertype === "team-member" &&
                    record.assignedId === "Unassigned" && (
                      <Button onClick={() => this.acceptRequest(record)} block>
                        Accept Work
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
                          this.props.deleteRequest(
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
    if (
      (usertype !== "manager" && usertype !== "technician") ||
      usertype === "procurement"
    ) {
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
      }
      if (usertype === "user") {
        data = data.filter((cols) => cols.key !== "comment");
      }
    }
    var requests = this.props.requests.requests;
    requests.map((eq) => {
      let personal = "";
      let count = 0;
      // let user = [];
      eq.comments.map((comment) => {
        personal += comment.id
          ? `${++count}. ${comment.text} (${comment.id.email}), \n`
          : `${++count}. ${comment.text} (Deleted User), \n`;

        // if (user.id._id == this.props.authentication.user._id) {
        //   personal.push(user);
        // }
      });
      eq.comment = personal;
      return eq;
    });

    let request = requests.filter((dt) => {
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
        "_id key timestart timecompleted picture assignedId propertyId by_id __v";
      let newKey2 = `_id key timestart assignedId propertyId timecompleted picture by_id actual ${
        usertype === "team-member" ? "fixed" : ""
      } profit __v`;

      let newkey = num === 1 ? newKey1 : newKey2;
      reqs.forEach((obj) => {
        var singleObj = Object.keys(obj).reduce((object, key) => {
          if (!newkey.includes(key) || key === "property") {
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
        title='Work Order Lists'
        style={{ padding: "0 !important", overflow: "auto" }}
        extra={
          <div style={{ display: "flex" }}>
            <AddData />
            <MonthPicker
              style={{
                width: "8rem",
                marginLeft: "4px",
              }}
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
              filename={`Requests-${
                this.props.authentication.user.firstname
              }-${new Date().toLocaleDateString()}.csv`}
              style={{
                padding: "3px",
                border: "none",
                borderRadius: "5px",
                background: "green",
                color: "#fff",
                cursor: "pointer",
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

export default connect((state) => state, { deleteRequest, assignMember })(
  RequestTable
);
