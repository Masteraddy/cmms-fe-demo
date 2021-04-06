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
  DatePicker,
} from 'antd';
// import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { addPpm } from '../../../redux/actions';
import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import FormItem from 'antd/lib/form/FormItem';

class AddData extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => this.setState({ visible: true });

  handleChange = (e) => {
    let property = this.props.properties.properties.find(
      (data) => data._id === e,
    );
    this.setState({
      property: `${property.property} - ${property.location}`,
      from: property.ownId,
    });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        Message.loading('Loading...');
        values.property = this.state.property;
        values.from = this.state.from;
        // console.log(values);
        Message.warning('loading...');
        this.props.addPpm(values, (status) => {
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
          Add Ppm
        </Button>
        <Modal
          visible={visible}
          title='Preventive Planned Maintainance'
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
            <FormItem {...formItemLayout} label='PPM Name'>
              {getFieldDecorator('ppmname', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter PPM name',
                  },
                ],
              })(<Input placeholder='PPM Name' type='text' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Email'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your email !',
                  },
                ],
              })(<Input type='email' placeholder='Email' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Project Site'>
              {getFieldDecorator('projectsite', {
                rules: [
                  {
                    required: true,
                    message: 'Please select project site!',
                  },
                ],
              })(
                <Select style={{ width: '100%' }} onChange={this.handleChange}>
                  {this.props.properties.properties.map((data) => (
                    <Option key={data._id} value={data._id}>
                      {data.property} - {data.location} by {data.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='Category'>
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a service type!',
                  },
                ],
              })(
                <Select style={{ width: '100%' }}>
                  {this.props.services.services.map((service) => (
                    <Option key={service._id} value={service._id}>
                      {service.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='Start Date'>
              {getFieldDecorator('startdate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a date !',
                  },
                ],
              })(<DatePicker showTime format='YYYY-MM-DD HH:mm' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Next Date'>
              {getFieldDecorator('nextdate', {
                rules: [
                  {
                    required: true,
                    message: 'Please select a date !',
                  },
                ],
              })(<DatePicker showTime format='YYYY-MM-DD HH:mm' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Comment'>
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your Observation/Description',
                  },
                ],
              })(<Input placeholder='Observation/Description' type='text' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addPpm })(Form.create()(AddData));
// export default Form.create()(AddData1);
