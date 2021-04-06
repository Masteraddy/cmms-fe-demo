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
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MoreVertical, Edit, Trash, PlusCircle } from 'react-feather';
import AddData from '../Datas/Equipments/AddData';
import EditData from '../Datas/Equipments/EditData';
import { deleteEquipment } from '../../redux/actions';
import SelectData from '../Datas/Equipments/SelectData';
import ReturnData from '../Datas/Equipments/ReturnData';

class EquipmentTable extends Component {
  state = {
    searchText: '',
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
          style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}>
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const usertype = this.props.authentication.user.usertype;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        width: '20%',
        ...this.getColumnSearchProps('available'),
      },
      {
        title: 'Current Users',
        dataIndex: 'current_users',
        key: 'current_users',
        width: '40%',
        ...this.getColumnSearchProps('current_users'),
      },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
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
                  {(usertype === 'manager' ||
                    usertype === 'technician' ||
                    usertype === 'procurement') && (
                    <React.Fragment>
                      <EditData id={record._id} />
                      <Button
                        onClick={(e) => {
                          let onConfirm = confirm(
                            'Are you sure you want to delete this?',
                          );
                          if (onConfirm) this.props.deleteEquipment(record._id);
                        }}
                        block>
                        Delete
                      </Button>
                    </React.Fragment>
                  )}
                </Menu>
              }>
              <MoreVertical size={20} strokeWidth={1} />
            </Dropdown>
          );
        },
      },
    ];

    let equipments = this.props.equipment.equipments;
    equipments.map((eq) => {
      let personal = [];
      let users = '';
      eq.users.map((user) => {
        users += `${user.id.email} (${user.number}), `;
        if (user.id._id == this.props.authentication.user._id) {
          personal.push(user);
        }
      });
      eq.personal = personal;
      eq.current_users = users;
      return eq;
    });

    return (
      <Card
        title='Equipments'
        style={{ padding: '0 !important', overflow: 'auto' }}
        extra={
          <div style={{ display: 'flex' }}>
            {(usertype === 'team-member' ||
              usertype === 'technician' ||
              usertype === 'procurement') && <SelectData />}
            <span style={{ width: '5px' }}> </span>
            {(usertype === 'manager' ||
              usertype === 'technician' ||
              usertype === 'procurement') && <AddData />}
          </div>
        }>
        <Table columns={columns} dataSource={equipments} />
      </Card>
    );
  }
}

export default connect((state) => state, { deleteEquipment })(EquipmentTable);
