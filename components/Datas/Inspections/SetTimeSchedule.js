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
  Upload,
  Icon,
  DatePicker,
} from 'antd';
import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { scheduleInsTime, getInspection } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

const { Dragger } = Upload;

class AddData1 extends Component {
  state = {
    loading: false,
    visible: false,
    timescheduled: this.props.inspection.inspection.timescheduled,
  };

  showModal = (id) => {
    this.props.getInspection(id, (status) => {
      this.setState({ visible: !this.state.visible });
      // console.log(status);
    });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        let timescheduled = new Date(values.timescheduled._d);
        let data = { timescheduled };
        Message.warning('Loading...').then(() =>
          this.props.scheduleInsTime(
            data,
            this.props.inspection.inspection._id,
            this.props.authentication.user,
          ),
        );
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

  handleChange = (e) => {
    // console.log(e.target.value);
    // let user = this.props.foruser.users.find((data) => data._id === e);
    // this.setState({ assigned: `${user.firstname} ${user.lastname}` });
  };

  render() {
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
    const { visible } = this.state;
    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;
    // console.log(loading);
    return (
      <div>
        <Button
          type='primary'
          block
          onClick={(e) => this.showModal(this.props.id)}
        >
          Set Time Schedule
        </Button>
        <Modal
          visible={visible}
          title='Set Time Schedule'
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
          {this.props.inspection.inspection && (
            <p>
              Old Scheduled Time:{' '}
              {this.props.inspection.inspection.timeschedule}
            </p>
          )}
          <Form>
            <FormItem {...formItemLayout} label='Select Time & Date'>
              {getFieldDecorator('timescheduled', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a Date!',
                  },
                ],
              })(<DatePicker showTime format='YYYY-MM-DD HH:mm' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, {
  scheduleInsTime,
  getInspection,
})(Form.create()(AddData1));
// export default Form.create()(AddData1);
