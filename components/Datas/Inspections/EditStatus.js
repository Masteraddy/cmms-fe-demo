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
import { changeInspectionStatus, getInspection } from '../../../redux/actions';
import { Edit, User } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
    status: ['pending', 'done', 'on-going', 'hold', 'park'],
  };

  showModal = (id) => {
    this.props.getInspection(id, (status) => {
      this.setState({ visible: true });
    });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: false, visible: false });
        Message.warning('Loading...');
        this.props.changeInspectionStatus(
          values,
          this.props.inspection.inspection._id,
          this.props.authentication.user,
          (status) => {
            if (status) this.setState({ visible: false });
          },
        );
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

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
    var { status, visible } = this.state;
    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;
    const { usertype } = this.props.authentication.user;
    var statuses = status;
    if (usertype === 'user') {
      statuses = status.filter((status) => status !== 'pending');
      statuses = statuses.filter((status) => status !== 'done');
      statuses = statuses.filter((status) => status !== 'on-going');
    }

    if (usertype === 'team-member') {
      statuses = status.filter((status) => status !== 'hold');
      statuses = statuses.filter((status) => status !== 'park');
    }

    const Option = Select.Option;

    // const prefixSelector = getFieldDecorator('prefix', {
    // 	initialValue: '+234',
    // })(
    // 	<Select style={{ width: 'auto' }}>
    // 		<Option value="+234">+234</Option>
    // 	</Select>,
    // );
    return (
      <div>
        {usertype !== 'user' && (
          <Button
            type='primary'
            block
            onClick={(e) => this.showModal(this.props.id)}
          >
            Change Status
          </Button>
        )}
        <Modal
          visible={visible}
          title='Change Status'
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
            <FormItem {...formItemLayout} label='Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter inspection name',
                  },
                ],
                initialValue: this.props.inspection.inspection.name,
              })(<Input placeholder='Inspection Name' disabled />)}
            </FormItem>

            <FormItem {...formItemLayout} label='Project Site'>
              {getFieldDecorator('project', {
                rules: [
                  {
                    required: true,
                    message: 'Please select project site!',
                  },
                ],
                initialValue: this.props.inspection.inspection.project,
              })(<Input placeholder='Project Site' disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Status'>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your inspection status!',
                  },
                ],
                initialValue: this.props.inspection.inspection.status,
              })(
                <Select style={{ width: '100%' }}>
                  {statuses.map((status) => (
                    <Option key={status} value={status}>
                      {status}
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
  changeInspectionStatus,
  getInspection,
})(Form.create()(EditData));
