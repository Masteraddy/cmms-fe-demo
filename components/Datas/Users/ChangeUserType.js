import {
  Modal,
  Button,
  Form,
  Input,
  Divider,
  Select,
  Menu,
  Row,
  Message,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, getEditUser, editUserType } from '../../../redux/actions';
import FormItem from 'antd/lib/form/FormItem';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
    isdisabled: true,
    status: ['pending', 'done', 'active'],
    changetype: this.props.foruser.edit.usertype,
    usertype: [
      { type: 'user', name: 'User' },
      { type: 'team-member', name: 'Team Member' },
      { type: 'procurement', name: 'Procurement Officer' },
      { type: 'technician', name: 'Head Technician' },
      { type: 'manager', name: 'Manager' },
    ],
  };

  showModal = (id) => {
    this.props.getEditUser(id);
    this.setState({ visible: true });
  };

  makeEnabled = () => {
    this.setState({ isdisabled: !this.state.isdisabled });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: false, visible: false });
        Message.warning('Loading...').then(() => {
          this.props.editUserType(
            values.usertype,
            this.props.foruser.edit._id,
            (status) => {
              if (status) {
                this.setState({ visible: false });
              }
            },
          );
        });
      }
    });
  };

  handleUsertype = (e) => {
    this.props.editUserType(e, this.props.foruser.edit._id, (status) => {
      if (status) {
        this.setState({ changetype: e });
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

  componentDidMount() {
    const { usertype } = this.props.authentication.user;
    let status = this.state.status;
    if (usertype === 'user' || usertype === 'team-member') {
      status.filter((status) => status == 'pending');
    }
    this.setState({ status });
  }

  render() {
    // console.log(this.props);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // const tailFormItemLayout = {
    // 	wrapperCol: {
    // 		xs: {
    // 			span: 24,
    // 			offset: 0,
    // 		},
    // 		sm: {
    // 			span: 16,
    // 			offset: 8,
    // 		},
    // 	},
    // };

    var { status } = this.state;
    const { loading, useropen2 } = this.props.ux;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { usertype } = this.props.authentication.user;

    const Option = Select.Option;
    return (
      <div>
        <Button
          type='primary'
          block
          onClick={(e) => this.showModal(this.props.id)}
        >
          Change Users Type
        </Button>
        <Modal
          visible={this.state.visible}
          title='Change User Type'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <Form>
            <h2>Usertype: {this.props.foruser.edit.usertype}</h2>
            <FormItem {...formItemLayout} label='Type'>
              {getFieldDecorator('usertype', {
                rules: [
                  {
                    // required: true,
                    message: 'Please select a User type!',
                  },
                ],
                initialValue: this.props.foruser.edit.usertype,
                setFieldsValue: this.state.changetype,
              })(
                <Select style={{ width: '100%' }}>
                  {this.state.usertype.map((user) => (
                    <Option key={user.type} value={user.type}>
                      {user.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, {
  editUser,
  getEditUser,
  editUserType,
})(Form.create()(EditData));
