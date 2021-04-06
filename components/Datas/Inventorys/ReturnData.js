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
import { submitInventory } from '../../../redux/actions';
import React, { Component } from 'react';
import FormItem from 'antd/lib/form/FormItem';

class SelectData extends Component {
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
        this.props.submitInventory(values, this.props.id, (status) => {
          if (status) {
            this.setState({ visible: false });
            Message.success('Inventory submited successfully!');
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
        <Button block type='primary' onClick={this.showModal}>
          Return Inventory
        </Button>
        <Modal
          visible={visible}
          title='Select Inventory'
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
            <FormItem {...formItemLayout} label='Inventory To Return'>
              {getFieldDecorator('lendId', {
                rules: [
                  {
                    required: true,
                    message: 'Please select inventory to return',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} disabled={loading}>
                  {this.props.personal.map((prop) => (
                    <Option key={prop._id} value={prop._id}>
                      {`${prop.id.firstname} ${prop.id.lastname} (${prop.number})`}
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

export default connect((state) => state, { submitInventory })(
  Form.create()(SelectData),
);
