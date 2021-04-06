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
import { editInventory, getInventory } from '../../../redux/actions';
import { Edit, User } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getInventory(id, (status) => {
      this.setState({ visible: true });
    });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: false, visible: false });
        Message.loading('Loading...').then(() =>
          this.props.editInventory(
            values,
            this.props.inventory.inventory._id,
            (status) => {
              if (status) {
                this.setState({ visible: false });
              }
            },
          ),
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

    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.ux;

    return (
      <div>
        <Button
          type='primary'
          block
          onClick={(e) => this.showModal(this.props.id)}
        >
          Edit Inventory
        </Button>
        <Modal
          visible={visible}
          title='Edit Inventory'
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
                    message: 'Please enter inventory name',
                  },
                ],
                initialValue: this.props.inventory.inventory.name,
              })(<Input placeholder='Name' type='text' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='Available'>
              {getFieldDecorator('available', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter available number!',
                  },
                ],
                initialValue: this.props.inventory.inventory.available,
              })(<Input type='number' min='1' placeholder='Available' />)}
            </FormItem>
            <FormItem label={'Desciption'}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'Please Describe in short sentence!',
                    whitespace: true,
                  },
                ],
                initialValue: this.props.inventory.inventory.description,
              })(
                <TextArea
                  prefix={
                    <User
                      size={16}
                      strokeWidth={1}
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  // onChange={this.handleChange}
                  placeholder='Description'
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { editInventory, getInventory })(
  Form.create()(EditData),
);
