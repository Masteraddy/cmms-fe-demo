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
  Rate,
  DatePicker,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import CsvDownload from 'react-json-to-csv';
import Rater from '../Rating/Rater';

const { WeekPicker, MonthPicker } = DatePicker;
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class CsTable extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    activeTab: '1',
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
    this.setState({ searchText: '' });
  };

  render() {
    const { usertype } = this.props.authentication.user;

    const columns = [
      {
        title: 'S/N',
        dataIndex: 'serial',
        key: 'serial',
        width: '30%',
        ...this.getColumnSearchProps('serial'),
      },
      {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname',
        width: '30%',
        ...this.getColumnSearchProps('fullname'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '30%',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Project Site',
        dataIndex: 'project',
        key: 'project',
        width: '20%',
        ...this.getColumnSearchProps('project'),
      },
      {
        title: 'Ticket No',
        dataIndex: 'ticket',
        key: 'ticket',
        width: '30%',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Quality of Work',
        dataIndex: 'quality',
        key: 'quality',
        width: '30%',
        // ...this.getColumnSearchProps('rating'),
        render: (text, record) => (
          <Rate disabled tooltips={desc} defaultValue={text} />
        ),
      },
      {
        title: 'Appearance',
        dataIndex: 'appearance',
        key: 'appearance',
        width: '30%',
        // ...this.getColumnSearchProps('rating'),
        render: (text, record) => (
          <Rate disabled tooltips={desc} defaultValue={text} />
        ),
      },
      {
        title: 'Timing',
        dataIndex: 'timing',
        key: 'timing',
        width: '30%',
        // ...this.getColumnSearchProps('rating'),
        render: (text, record) => (
          <Rate disabled tooltips={desc} defaultValue={text} />
        ),
      },
      {
        title: 'Professionalism',
        dataIndex: 'professionalism',
        key: 'professionalism',
        width: '30%',
        // ...this.getColumnSearchProps('rating'),
        render: (text, record) => (
          <Rate disabled tooltips={desc} defaultValue={text} />
        ),
      },
      {
        title: 'Ticket Close',
        dataIndex: 'ticketclose',
        key: 'ticketclose',
        width: '10%',
        render: (text, record) => <span>{text ? 'Yes' : 'No'}</span>,
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        width: '30%',
        ...this.getColumnSearchProps('comment'),
      },
    ];

    return (
      <Card
        title='End User Report Lists'
        style={{ padding: '0 !important', overflow: 'auto' }}
        extra={
          <div style={{ display: 'flex' }}>
            <MonthPicker
              style={{ width: '8rem' }}
              onChange={this.handleMonth}
              placeholder='Select Month'
            />
            {/* <CsvDownload
              data={usertype === 'manager' ? printing2 : printing1}
              filename={`Cs-${
                this.props.authentication.user.firstname
              }-${new Date().toLocaleDateString()}.csv`}
              style={{
                padding: '4px',
                border: 'none',
                borderRadius: '5px',
                background: 'green',
                color: '#fff',
                cursor: 'pointer',
                marginLeft: '2px',
              }}>
              Export Csv
            </CsvDownload> */}
          </div>
        }
      >
        <Table columns={columns} dataSource={this.props.cs.css} />
      </Card>
    );
  }
}

export default connect((state) => state, {})(CsTable);
