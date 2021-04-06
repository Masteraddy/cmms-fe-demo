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
import {
  editUser,
  getEditUser,
  editUserLocation,
} from '../../../redux/actions';
import FormItem from 'antd/lib/form/FormItem';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
    isdisabled: true,
    status: ['pending', 'done', 'active'],
    changelocation: this.props.foruser.edit.location,
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
          this.props.editUserLocation(
            values.location,
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
    this.props.editUserLocation(e, this.props.foruser.edit._id, (status) => {
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
        <Button type='primary' onClick={(e) => this.showModal(this.props.id)}>
          Change Teams Location
        </Button>
        <Modal
          visible={this.state.visible}
          title='Change Teams Location'
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
            {this.props.foruser.edit.location && (
              <h2>
                Working Area: {this.props.foruser.edit.location.area} at{' '}
                {this.props.foruser.edit.location.state}
              </h2>
            )}
            <FormItem {...formItemLayout} label='Team Location'>
              {getFieldDecorator('location', {
                rules: [
                  {
                    // required: true,
                    message: 'Please select a location',
                  },
                ],
                // initialValue: this.props.foruser.edit.location._id,
                // setFieldsValue: this.state.changelocation,
              })(
                <Select style={{ width: '100%' }}>
                  {this.props.locations.locations.map((location) => (
                    <Option key={location._id} value={location._id}>
                      {location.area} at {location.state}
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
  editUserLocation,
})(Form.create()(EditData));
