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
import { addSiteInfo } from "../../../redux/actions";
import React, { Component } from "react";
import FormItem from "antd/lib/form/FormItem";

class AddSiteInfo extends Component {
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
          this.props.addSiteInfo(values, (status) => {
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

    return (
      <div>
        <Button type='primary' onClick={this.showModal}>
          Add Site Info
        </Button>
        <Modal
          visible={visible}
          title='Add Site Info'
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
            <FormItem {...formItemLayout} label='Site Id'>
              {getFieldDecorator("site_id", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Id",
                  },
                ],
              })(<Input placeholder='Enter Site Id' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Site Classification'>
              {getFieldDecorator("site_classification", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Classification",
                  },
                ],
              })(<Input placeholder='Enter Site Classification' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='ATC Site Id'>
              {getFieldDecorator("atc_site_id", {
                rules: [
                  {
                    required: true,
                    message: "Enter ATC Site Id",
                  },
                ],
              })(<Input placeholder='Enter ATC Site Id' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Region'>
              {getFieldDecorator("region", {
                rules: [
                  {
                    required: true,
                    message: "Enter Region",
                  },
                ],
              })(<Input placeholder='Enter Region' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='State'>
              {getFieldDecorator("state", {
                rules: [
                  {
                    required: true,
                    message: "Enter State",
                  },
                ],
              })(<Input placeholder='Enter State' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Company'>
              {getFieldDecorator("company", {
                rules: [
                  {
                    required: true,
                    message: "Enter Company",
                  },
                ],
              })(<Input placeholder='Enter Company' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Gen Capacity'>
              {getFieldDecorator("gen_capacity", {
                rules: [
                  {
                    required: true,
                    message: "Enter Gen Capacity",
                  },
                ],
              })(<Input placeholder='Enter Gen Capacity' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Maintenance Type'>
              {getFieldDecorator("maintenance_type", {
                rules: [
                  {
                    required: true,
                    message: "Enter Maintenance Type",
                  },
                ],
              })(<Input placeholder='Enter Maintenance Type' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Site Type'>
              {getFieldDecorator("site_type", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Type",
                  },
                ],
              })(<Input placeholder='Enter Site Type' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Cluster'>
              {getFieldDecorator("cluster", {
                rules: [
                  {
                    required: true,
                    message: "Enter Cluster",
                  },
                ],
              })(<Input placeholder='Enter Cluster' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='HVAC Info'>
              {getFieldDecorator("HVAC_Info", {
                rules: [
                  {
                    required: true,
                    message: "Enter HVAC Info",
                  },
                ],
              })(<Input placeholder='Enter HVAC Info' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Oil Filter'>
              {getFieldDecorator("oil_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Filter",
                  },
                ],
              })(<Input placeholder='Enter Oil Filter' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fuel Filter'>
              {getFieldDecorator("fuel_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter",
                  },
                ],
              })(<Input placeholder='Enter Fuel Filter' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addSiteInfo })(
  Form.create()(AddSiteInfo)
);
// export default Form.create()(AddSiteInfo);
