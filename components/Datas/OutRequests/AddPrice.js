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
import { addPriceOutRequest, getOutRequest } from '../../../redux/actions';
import { Edit, User } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getOutRequest(id);
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        Message.loading('Loading...');
        this.props.addPriceOutRequest(
          values,
          this.props.requests.outrequest._id,
          this.props.authentication.user,
          (status) => {
            if (status) {
              this.setState({ visible: false });
            }
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

    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;
    const { usertype } = this.props.authentication.user;
    return (
      <div>
        {(usertype === 'manager' || usertype === 'technician') && (
          <Button
            type='primary'
            block
            onClick={(e) => this.showModal(this.props.id)}
          >
            Edit WorkOrder Price
          </Button>
        )}
        <Modal
          visible={this.state.visible}
          title='Add / Edit Order Price'
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
            <FormItem {...formItemLayout} label='Actual Price'>
              {getFieldDecorator('actual', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter actual price!',
                  },
                ],
                initialValue: this.props.requests.outrequest.actual,
              })(<Input placeholder='Actual Price' type='number' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fixed Price'>
              {getFieldDecorator('fixed', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter fixed price!',
                  },
                ],
                initialValue: this.props.requests.outrequest.fixed,
              })(<Input placeholder='Fixed Price' type='number' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, {
  addPriceOutRequest,
  getOutRequest,
})(Form.create()(EditData));
