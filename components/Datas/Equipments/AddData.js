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
import { Edit } from 'react-feather';
import { connect } from 'react-redux';
import { addEquipment } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class AddData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => this.setState({ visible: true });

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        Message.loading('Loading...');
        this.props.addEquipment(values, (status) => {
          if (status) {
            this.setState({ visible: false });
          }
        });
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

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
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.ux;
    // const Option = Select.Option;

    // const prefixSelector = getFieldDecorator('prefix', {
    // 	initialValue: '+234',
    // })(
    // 	<Select style={{ width: 'auto' }}>
    // 		<Option value="+234">+234</Option>
    // 	</Select>,
    // );

    return (
      <div>
        <Button type='primary' onClick={this.showModal}>
          Add Equipment
        </Button>
        <Modal
          visible={visible}
          title='Add Equipment'
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
              })(<Input type='number' min='1' placeholder='Available' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addEquipment })(
  Form.create()(AddData),
);
// export default Form.create()(AddData1);
