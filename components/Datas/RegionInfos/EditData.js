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
import { editRegionInfo, getRegionInfo } from "../../../redux/actions";
import { Edit } from "react-feather";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

class EditData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getRegionInfo(id);
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: false, visible: false });
        Message.warning("Loading...").then(() =>
          this.props.editRegionInfo(
            values,
            this.props.regioninfos.regioninfo._id,
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
        <Button type='primary' onClick={(e) => this.showModal(this.props.id)}>
          Edit RegionInfo
        </Button>
        <Modal
          visible={visible}
          title='Edit RegionInfo'
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
                initialValue: this.props.regioninfos.regioninfo.site_id,
              })(<Input placeholder='Enter Site Id' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Region'>
              {getFieldDecorator("region", {
                rules: [
                  {
                    required: true,
                    message: "Enter Region",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.region,
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
                initialValue: this.props.regioninfos.regioninfo.state,
              })(<Input placeholder='Enter State' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Site Name'>
              {getFieldDecorator("site_name", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Name",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.site_name,
              })(<Input placeholder='Enter Site Name' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Cluster'>
              {getFieldDecorator("cluster", {
                rules: [
                  {
                    required: true,
                    message: "Enter Cluster",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.cluster,
              })(<Input placeholder='Enter Cluster' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Site Classification'>
              {getFieldDecorator("site_classification", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Classification",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo
                  .site_classification,
              })(<Input placeholder='Enter Site Classification' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Mech Engr'>
              {getFieldDecorator("mech_engr", {
                rules: [
                  {
                    required: true,
                    message: "Enter Mech Engr",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.mech_engr,
              })(<Input placeholder='Enter Mech Engr' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Elect Engr'>
              {getFieldDecorator("elect_engr", {
                rules: [
                  {
                    required: true,
                    message: "Enter Elect Engr",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.elect_engr,
              })(<Input placeholder='Enter Elect Engr' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Driver'>
              {getFieldDecorator("driver", {
                rules: [
                  {
                    required: true,
                    message: "Enter Driver",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.driver,
              })(<Input placeholder='Enter Driver' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='AC Technicial'>
              {getFieldDecorator("ac_technicial", {
                rules: [
                  {
                    required: true,
                    message: "Enter AC Technicial",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.ac_technicial,
              })(<Input placeholder='Enter AC Technicial' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Project Manager'>
              {getFieldDecorator("project_manager", {
                rules: [
                  {
                    required: true,
                    message: "Enter Project Manager",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.project_manager,
              })(<Input placeholder='Enter Project Manager' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Project Manager Contact'>
              {getFieldDecorator("pm_contact", {
                rules: [
                  {
                    required: true,
                    message: "Enter Project Manager Contact",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.pm_contact,
              })(<Input placeholder='Enter Project Manager Contact' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Cluster Teamlead'>
              {getFieldDecorator("cluster_teamlead", {
                rules: [
                  {
                    required: true,
                    message: "Enter Cluster Teamlead",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo
                  .cluster_teamlead,
              })(<Input placeholder='Enter Cluster Teamlead' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='OPS Manager'>
              {getFieldDecorator("ops_manager", {
                rules: [
                  {
                    required: true,
                    message: "Enter OPS Manager",
                  },
                ],
                initialValue: this.props.regioninfos.regioninfo.ops_manager,
              })(<Input placeholder='Enter OPS Manager' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { editRegionInfo, getRegionInfo })(
  Form.create()(EditData)
);
