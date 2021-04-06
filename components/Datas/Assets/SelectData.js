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
import { selectAsset } from '../../../redux/actions';
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
        console.log(values);
        Message.loading('Loading...');
        this.props.selectAsset(values, values.need, (status) => {
          if (status) {
            //     this.setState({ visible: false });
            Message.success('Asset selected successfully!');
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
        <Button type='primary' onClick={this.showModal}>
          Select Asset
        </Button>
        <Modal
          visible={visible}
          title='Select Asset'
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
              onClick={this.handleOk}>
              Submit
            </Button>,
          ]}>
          <Form>
            <FormItem {...formItemLayout} label='Asset Needed'>
              {getFieldDecorator('need', {
                rules: [
                  {
                    required: true,
                    message: 'Please select needed Asset',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} disabled={loading} multiple>
                  {this.props.asset.assets.map((prop) => (
                    <Option key={prop._id} value={prop._id}>
                      {`${prop.name} (${prop.available})`}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='Amount Needed'>
              {getFieldDecorator('number', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter amount needed!',
                  },
                ],
              })(<Input type='number' min='1' placeholder='Number' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { selectAsset })(
  Form.create()(SelectData),
);
