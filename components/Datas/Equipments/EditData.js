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
  editEquipment,
  getEquipment,
  locationOpenAndClose2,
} from '../../../redux/actions';
import { Edit } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getEquipment(id, (status) => {
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
          this.props.editEquipment(
            values,
            this.props.equipment.equipment._id,
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
          Edit Equipment
        </Button>
        <Modal
          visible={visible}
          title='Edit Equipment'
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
                    message: 'Please enter equipment name',
                  },
                ],
                initialValue: this.props.equipment.equipment.name,
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
                initialValue: this.props.equipment.equipment.available,
              })(<Input type='number' min='1' placeholder='Available' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { editEquipment, getEquipment })(
  Form.create()(EditData),
);
