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
} from "antd";
import { Edit } from "react-feather";
import { connect } from "react-redux";
import { addFilter } from "../../../redux/actions";
import React, { Component } from "react";
import FormItem from "antd/lib/form/FormItem";

class AddData1 extends Component {
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
        // setTimeout(() => {
        // 	this.setState({ loading: false, visible: false });
        // }, 3000);
        Message.warning("Loading...").then(() =>
          this.props.addFilter(values, (status) => {
            if (status) {
              this.setState({ visible: false });
            }
          })
        );
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { visible } = this.state;
    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;
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
          Add Filter
        </Button>
        <Modal
          visible={visible}
          title='Add Filter'
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
            <FormItem {...formItemLayout} label='KVA'>
              {getFieldDecorator("kva", {
                rules: [
                  {
                    required: true,
                    message: "Enter KVA",
                  },
                ],
              })(<Input placeholder='Enter KVA' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='Oil Filter'>
              {getFieldDecorator("oil_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Filter",
                  },
                ],
              })(<Input placeholder='Oil Filter' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fuel Filter'>
              {getFieldDecorator("fuel_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter",
                  },
                ],
              })(<Input placeholder='Fuel Filter' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Oil Required'>
              {getFieldDecorator("oil_required", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Required",
                  },
                ],
              })(<Input placeholder='Oil Required' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Air Filter'>
              {getFieldDecorator("air_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter Air Filter",
                  },
                ],
              })(<Input placeholder='Air Filter' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addFilter })(
  Form.create()(AddData1)
);
// export default Form.create()(AddData1);
