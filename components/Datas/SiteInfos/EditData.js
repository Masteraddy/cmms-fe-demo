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
import React, { Component } from "react";
import { connect } from "react-redux";
import { editSiteInfo, getSiteInfo } from "../../../redux/actions";
import { Edit } from "react-feather";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getSiteInfo(id);
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: false, visible: false });
        Message.warning("Loading...").then(() =>
          this.props.editSiteInfo(
            values,
            this.props.siteinfos.siteinfo._id,
            (status) => {
              if (status) {
                this.setState({ visible: false });
              }
            }
          )
        );
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

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
    const { visible } = this.state;
    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;

    // site_id
    // site_classification
    // atc_site_id
    // region
    // state
    // company
    // gen_capacity
    // maintenance_type
    // site_type
    // cluster
    // HVAC_Info
    // oil_filter
    // fuel_filter

    return (
      <div>
        <Button type='primary' onClick={(e) => this.showModal(this.props.id)}>
          Edit SiteInfo
        </Button>
        <Modal
          visible={visible}
          title='Edit SiteInfo'
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
                initialValue: this.props.siteinfos.siteinfo.site_id,
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
                initialValue: this.props.siteinfos.siteinfo.site_classification,
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
                initialValue: this.props.siteinfos.siteinfo.atc_site_id,
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
                initialValue: this.props.siteinfos.siteinfo.region,
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
                initialValue: this.props.siteinfos.siteinfo.state,
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
                initialValue: this.props.siteinfos.siteinfo.company,
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
                initialValue: this.props.siteinfos.siteinfo.gen_capacity,
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
                initialValue: this.props.siteinfos.siteinfo.maintenance_type,
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
                initialValue: this.props.siteinfos.siteinfo.site_type,
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
                initialValue: this.props.siteinfos.siteinfo.cluster,
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
                initialValue: this.props.siteinfos.siteinfo.HVAC_Info,
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
                initialValue: this.props.siteinfos.siteinfo.oil_filter,
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
                initialValue: this.props.siteinfos.siteinfo.fuel_filter,
              })(<Input placeholder='Enter Fuel Filter' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { editSiteInfo, getSiteInfo })(
  Form.create()(EditData)
);
