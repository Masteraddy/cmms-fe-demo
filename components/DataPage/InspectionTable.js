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
  DatePicker,
} from 'antd';
import React, { Component } from 'react';
import CsvDownload from 'react-json-to-csv';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import EditStatus from '../Datas/Inspections/EditStatus';
import { deleteInspection } from '../../redux/actions';
import SetTimeSchedule from '../Datas/Inspections/SetTimeSchedule';
const { WeekPicker, MonthPicker } = DatePicker;

class InspectionTable extends Component {
  state = {
    searchText: '',
    activeTab: '1',
    searchedColumn: '',
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
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
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

  setActiveTab = (active) => {
    this.setState({ activeTab: active });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const usertype = this.props.authentication.user.usertype;

    const columns = [
      {
        title: 'S/N',
        dataIndex: 'serial',
        key: 'serial',
        width: '30%',
        ...this.getColumnSearchProps('serial'),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '30%',
        ...this.getColumnSearchProps('date'),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: '30%',
        ...this.getColumnSearchProps('location'),
      },
      {
        title: 'Project Site',
        dataIndex: 'project',
        key: 'project',
        width: '20%',
        ...this.getColumnSearchProps('project'),
      },
      {
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: '30%',
        ...this.getColumnSearchProps('building'),
      },
      {
        title: 'Floor',
        dataIndex: 'floor',
        key: 'floor',
        width: '30%',
        ...this.getColumnSearchProps('floor'),
      },
      {
        title: 'Wing',
        dataIndex: 'wing',
        key: 'wing',
        width: '30%',
        ...this.getColumnSearchProps('wing'),
      },
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
        width: '30%',
        ...this.getColumnSearchProps('room'),
      },
      {
        title: 'Category',
        dataIndex: 'categoryname',
        key: 'categoryname',
        width: '20%',
        ...this.getColumnSearchProps('categoryname'),
      },
      {
        title: 'Observation/Problem Description',
        dataIndex: 'observation',
        key: 'observation',
        width: '30%',
        ...this.getColumnSearchProps('observation'),
      },
      {
        title: 'Work Category',
        dataIndex: 'workcategory',
        key: 'workcategory',
        width: '20%',
        ...this.getColumnSearchProps('workcategory'),
      },
      {
        title: 'Proposed Solution',
        dataIndex: 'solution',
        key: 'solution',
        width: '30%',
        ...this.getColumnSearchProps('solution'),
      },
      {
        title: 'Action By',
        dataIndex: 'actionby',
        key: 'actionby',
        width: '30%',
        ...this.getColumnSearchProps('actionby'),
      },
      {
        title: 'Estimated Cost',
        dataIndex: 'estimatecost',
        key: 'estimatecost',
        width: '20%',
        ...this.getColumnSearchProps('estimatecost'),
      },
      {
        title: 'Approximate Dimension',
        dataIndex: 'dimension',
        key: 'dimension',
        width: '30%',
        ...this.getColumnSearchProps('dimension'),
      },
      {
        title: 'Scheduled Time',
        dataIndex: 'timeschedule',
        key: 'timeschedule',
        width: '20%',
        ...this.getColumnSearchProps('timeschedule'),
      },
      // {
      //   title: 'Picture',
      //   dataIndex: 'picture',
      //   key: 'picture',
      //   width: '30%',
      //   ...this.getColumnSearchProps('picture'),
      // },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
        render: (text, record) => {
          // console.log(record);
          // let returnActive = false;
          // if (record.personal.length > 0) {
          //   returnActive = true;
          // }
          return (
            <Dropdown
              overlay={
                <Menu>
                  {/* {returnActive && (
                    <ReturnData id={record._id} personal={record.personal} />
                  )} */}
                  {(usertype === 'manager' ||
                    usertype === 'technician' ||
                    usertype === 'procurement' ||
                    usertype === 'team-member') && (
                    <React.Fragment>
                      <SetTimeSchedule id={record._id} />
                      <EditStatus id={record._id} />
                      <Button
                        onClick={(e) => {
                          let onConfirm = confirm(
                            'Are you sure you want to delete this?',
                          );
                          if (onConfirm) {
                            this.props.deleteInspection(record._id);
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

    let inspections = this.props.inspection.inspections;
    inspections.map((eq) => {
      // let personal = [];
      // let users = '';
      // eq.request.map((user) => {
      //   users += `${user.id.email} (${user.number}), `;
      //   if (user.id._id == this.props.authentication.user._id) {
      //     personal.push(user);
      //   }
      // });
      // eq.personal = personal;
      // eq.current_users = users;
      return eq;
    });

    var pendingIns = inspections.filter((dt) => dt.status === 'pending');
    var ongoingIns = inspections.filter((dt) => dt.status === 'on-going');
    var holdIns = inspections.filter((dt) => dt.status === 'hold');
    var parkIns = inspections.filter((dt) => dt.status === 'park');
    var doneIns = inspections.filter((dt) => dt.status === 'done');

    return (
      <Card
        title='Inspections'
        style={{ padding: '0 !important', overflow: 'auto' }}
        extra={
          <div style={{ display: 'flex' }}>
            {/*{(usertype === 'manager' ||
              usertype === 'technician' ||
              usertype === 'procurement' ||
              usertype === 'team-member') && <AddData />} */}
            <MonthPicker
              style={{
                width: '8rem',
                marginLeft: '4px',
              }}
              onChange={this.handleMonth}
              placeholder='Select Month'
            />
            <CsvDownload
              data={
                usertype === 'manager' ||
                usertype === 'technician' ||
                usertype === 'procurement' ||
                usertype === 'team-member'
                  ? inspections
                  : ''
              }
              filename={`Inspections-${
                this.props.authentication.user.firstname
              }-${new Date().toLocaleDateString()}.csv`}
              style={{
                padding: '3px',
                border: 'none',
                borderRadius: '5px',
                background: 'green',
                color: '#fff',
                cursor: 'pointer',
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
          <Menu.Item key='1'>Pending</Menu.Item>
          <Menu.Item key='2'>Done</Menu.Item>
          <Menu.Item key='3'>Park</Menu.Item>
          <Menu.Item key='4'>Hold</Menu.Item>
          <Menu.Item key='5'>On-going</Menu.Item>
        </Menu>
        {/* <Table columns={columns} dataSource={inspections} /> */}
        {this.state.activeTab === '1' && (
          <Table columns={columns} dataSource={pendingIns} />
        )}
        {this.state.activeTab === '2' && (
          <Table columns={columns} dataSource={doneIns} />
        )}
        {this.state.activeTab === '3' && (
          <Table columns={columns} dataSource={parkIns} />
        )}
        {this.state.activeTab === '4' && (
          <Table columns={columns} dataSource={holdIns} />
        )}
        {this.state.activeTab === '5' && (
          <Table columns={columns} dataSource={ongoingIns} />
        )}
      </Card>
    );
  }
}

export default connect((state) => state, { deleteInspection })(InspectionTable);
