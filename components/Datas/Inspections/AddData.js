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
// import { Edit, User } from 'react-feather';
import { connect } from 'react-redux';
import { addInspection } from '../../../redux/actions';
import React, { Component } from 'react';
import ImageUploader from '../../../lib/uploading';
import TextArea from 'antd/lib/input/TextArea';
import FormItem from 'antd/lib/form/FormItem';

class AddData extends Component {
  state = {
    loading: false,
    visible: false,
    picture: '',
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
        values.picture = this.state.picture;
        values.property = this.state.property;
        values.from = this.state.from;
        // console.log(values);
        Message.warning('loading...');
        this.props.addInspection(values, (status) => {
          if (status) {
            this.setState({ visible: false });
          }
        });
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

  uploadRemove = (data) => {
    // console.log(data);
    this.setState({ picture: data.picture });
  };

  uploadResponse = (data) => {
    // console.log(data);
    this.setState({ picture: data.picture });
  };

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
          Add Inspection
        </Button>
        <Modal
          visible={visible}
          title='Daily Inspection'
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
            <FormItem {...formItemLayout} label='Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ],
              })(<Input placeholder='Name' type='text' />)}
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
            <FormItem {...formItemLayout} label='Location'>
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the Location !',
                  },
                ],
              })(<Input type='text' placeholder='Location' />)}
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
            <FormItem {...formItemLayout} label='Building'>
              {getFieldDecorator('building', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter building !',
                  },
                ],
              })(<Input type='text' placeholder='Building' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Floor'>
              {getFieldDecorator('floor', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter floor !',
                  },
                ],
              })(<Input type='text' placeholder='Floor' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Wing'>
              {getFieldDecorator('wing', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Wing !',
                  },
                ],
              })(<Input type='text' placeholder='Wing' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Room'>
              {getFieldDecorator('room', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Room !',
                  },
                ],
              })(<Input type='text' placeholder='Room' />)}
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
            <FormItem {...formItemLayout} label='Observation'>
              {getFieldDecorator('observation', {
                rules: [
                  {
                    required: true,
                    message:
                      'Please enter your Observation/Problem Description',
                  },
                ],
              })(
                <Input
                  placeholder='Obsevation/Problem Description'
                  type='text'
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='Work Category'>
              {getFieldDecorator('workcategory', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input work category',
                  },
                ],
              })(<Input placeholder='Work Category' type='text' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Solution'>
              {getFieldDecorator('solution', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your proposed Solution',
                  },
                ],
              })(<Input placeholder='Proposed Solution' type='text' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Action by'>
              {getFieldDecorator('actionby', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Action',
                  },
                ],
              })(<Input placeholder='Action by' type='text' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Cost'>
              {getFieldDecorator('estimatecost', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Estimate Cost',
                  },
                ],
              })(<Input placeholder='Estimate cost' type='number' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='Dimension'>
              {getFieldDecorator('dimension', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Approximate Dimension',
                  },
                ],
              })(<Input placeholder='Approximate Dimension' type='text' />)}
            </FormItem>
            <FormItem label='Picture'>
              {getFieldDecorator('picture', {
                rules: [
                  {
                    required: false,
                    message: 'Please Upload Picture!',
                  },
                ],
              })(
                <ImageUploader
                  uploadResponse={this.uploadResponse}
                  uploadRemove={this.uploadRemove}
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, { addInspection })(
  Form.create()(AddData),
);
// export default Form.create()(AddData1);
