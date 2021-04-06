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
import { addIHSData } from "../../../redux/actions";
import React, { Component } from "react";
import FormItem from "antd/lib/form/FormItem";

class AddIHSData extends Component {
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
          this.props.addIHSData(values, (status) => {
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

    // site_id
    // ihs_id
    // type
    // dg_solution
    // genset_maintenance
    // clusters
    // site_address
    // contacts
    // technician
    // dg1_capacity
    // dg2_capacity
    // oil_filter15_18
    // fuel_filter15_18
    // oil_filter27
    // fuel_filter163_eco
    // fuel_filter_eco
    // dc_oil_filter
    // dc_fuel_filter_pry
    // dc_fuel_filter_sec
    // oil_filter407
    // fuel_filter1117_eco
    // mikano_york_eng_pry_ff
    // mikano_york_eng_scdr_ff
    // mikano_york_eng_oil_fltr

    return (
      <div>
        <Button type='primary' onClick={this.showModal}>
          Add IHS Data
        </Button>
        <Modal
          visible={visible}
          title='Add IHS Data'
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
            <FormItem {...formItemLayout} label='IHS Id'>
              {getFieldDecorator("ihs_id", {
                rules: [
                  {
                    required: true,
                    message: "Enter IHS Id",
                  },
                ],
              })(<Input placeholder='Enter IHS Id' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Type (BB, Hub etc.)'>
              {getFieldDecorator("type", {
                rules: [
                  {
                    required: true,
                    message: "Enter Type (BB, Hub etc.)",
                  },
                ],
              })(<Input placeholder='Enter Type (BB, Hub etc.)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DG Solution'>
              {getFieldDecorator("dg_solution", {
                rules: [
                  {
                    required: true,
                    message: "Enter DG Solution",
                  },
                ],
              })(<Input placeholder='Enter DG Solution' />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='Genset Maintenance Life Cycle (250/500/1000)'
            >
              {getFieldDecorator("genset_maintenance", {
                rules: [
                  {
                    required: true,
                    message:
                      "Enter Genset Maintenance Life Cycle (250/500/1000)",
                  },
                ],
              })(
                <Input placeholder='Enter Genset Maintenance Life Cycle (250/500/1000)' />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='Clusters'>
              {getFieldDecorator("clusters", {
                rules: [
                  {
                    required: true,
                    message: "Enter Clusters",
                  },
                ],
              })(<Input placeholder='Enter Clusters' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Site Address'>
              {getFieldDecorator("site_address", {
                rules: [
                  {
                    required: true,
                    message: "Enter Site Address",
                  },
                ],
              })(<Input placeholder='Enter Site Address' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Contacts'>
              {getFieldDecorator("contacts", {
                rules: [
                  {
                    required: true,
                    message: "Enter Contacts",
                  },
                ],
              })(<Input placeholder='Enter Contacts' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Technician'>
              {getFieldDecorator("technician", {
                rules: [
                  {
                    required: true,
                    message: "Enter Technician",
                  },
                ],
              })(<Input placeholder='Enter Technician' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DG 1 Capacity'>
              {getFieldDecorator("dg1_capacity", {
                rules: [
                  {
                    required: true,
                    message: "Enter DG 1 Capacity",
                  },
                ],
              })(<Input placeholder='Enter DG 1 Capacity' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DG 2 Capacity'>
              {getFieldDecorator("dg2_capacity", {
                rules: [
                  {
                    required: true,
                    message: "Enter DG 2 Capacity",
                  },
                ],
              })(<Input placeholder='Enter DG 2 Capacity' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Oil Filter (15/18kva)'>
              {getFieldDecorator("oil_filter15_18", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Filter (15/18kva)",
                  },
                ],
              })(<Input placeholder='Enter Oil Filter (15/18kva)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fuel Filter (15/18kva)'>
              {getFieldDecorator("fuel_filter15_18", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter (15/18kva)",
                  },
                ],
              })(<Input placeholder='Enter Fuel Filter (15/18kva)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Oil Filter (27kva)'>
              {getFieldDecorator("oil_filter27", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Filter (27kva)",
                  },
                ],
              })(<Input placeholder='Enter Oil Filter (27kva)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fuel Filter (163 ECOPLUS)'>
              {getFieldDecorator("fuel_filter163_eco", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter (163 ECOPLUS)",
                  },
                ],
              })(<Input placeholder='Enter Fuel Filter (163 ECOPLUS)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Fuel Filter (ECOPLUS)'>
              {getFieldDecorator("fuel_filter_eco", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter (ECOPLUS)",
                  },
                ],
              })(<Input placeholder='Enter Fuel Filter (ECOPLUS)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DC Oil Filter'>
              {getFieldDecorator("dc_oil_filter", {
                rules: [
                  {
                    required: true,
                    message: "Enter DC Oil Filter",
                  },
                ],
              })(<Input placeholder='Enter DC Oil Filter' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DC Fuel Filter Pry'>
              {getFieldDecorator("dc_fuel_filter_pry", {
                rules: [
                  {
                    required: true,
                    message: "Enter DC Fuel Filter Pry",
                  },
                ],
              })(<Input placeholder='Enter DC Fuel Filter Pry' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='DC Fuel Filter Sec'>
              {getFieldDecorator("dc_fuel_filter_sec", {
                rules: [
                  {
                    required: true,
                    message: "Enter DC Fuel Filter Sec",
                  },
                ],
              })(<Input placeholder='Enter DC Fuel Filter Sec' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Oil Filter (407 (80kva)'>
              {getFieldDecorator("oil_filter407", {
                rules: [
                  {
                    required: true,
                    message: "Enter Oil Filter (407 (80kva)",
                  },
                ],
              })(<Input placeholder='Enter Oil Filter (407 (80kva)' />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='Fuel Filter (1117/2) (ECOPLUS)'
            >
              {getFieldDecorator("fuel_filter1117_eco", {
                rules: [
                  {
                    required: true,
                    message: "Enter Fuel Filter (1117/2) (ECOPLUS)",
                  },
                ],
              })(<Input placeholder='Enter Fuel Filter (1117/2) (ECOPLUS)' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Mikano (York Engine) Pry F/F'>
              {getFieldDecorator("mikano_york_eng_pry_ff", {
                rules: [
                  {
                    required: true,
                    message: "Enter Mikano (York Engine) Pry F/F",
                  },
                ],
              })(<Input placeholder='Enter Mikano (York Engine) Pry F/F' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Mikano (York Engine) Sec F/F'>
              {getFieldDecorator("mikano_york_eng_scdr_ff", {
                rules: [
                  {
                    required: true,
                    message: "Enter Mikano (York Engine) Sec F/F",
                  },
                ],
              })(<Input placeholder='Enter Mikano (York Engine) Sec F/F' />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='Mikano (York Engine) Oil Filter'
            >
              {getFieldDecorator("mikano_york_eng_oil_fltr", {
                rules: [
                  {
                    required: true,
                    message: "Enter Mikano (York Engine) Oil Filter",
                  },
                ],
              })(<Input placeholder='Enter Mikano (York Engine) Oil Filter' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addIHSData })(
  Form.create()(AddIHSData)
);
// export default Form.create()(AddIHSData);
