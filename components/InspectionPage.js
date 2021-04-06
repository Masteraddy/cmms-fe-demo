import React, { Component } from 'react';
import { Button, Checkbox, Form, Select, Input, Message, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ImageUploader from '../lib/uploading';
import { Eye, Mail, Triangle, User } from 'react-feather';
import { inProgress, notInProgress, addInspection } from '../redux/actions';
import { connect } from 'react-redux';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

class InspectionPage extends Component {
  state = {
    picture: '',
    property: '',
    from: '',
    loading: false,
  };

  uploadRemove = (data) => {
    // console.log(data);
    this.setState({ picture: data.picture, loading: data.uploading });
  };

  handleChange = (e) => {
    let property = this.props.properties.propert.find((data) => data._id === e);
    this.setState({
      property: `${property.property} - ${property.location} by ${property.name}`,
      from: property.ownId,
    });
  };

  uploadResponse = (data) => {
    // console.log(data);
    this.setState({ picture: data.picture, loading: data.uploading });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    const Option = Select.Option;
    return (
      <Row
        type='flex'
        align='middle'
        justify='center'
        className='px-3 bg-white mh-page'
        style={{ minHeight: '100vh' }}
      >
        <Content>
          <div className='text-center mb-5'>
            <Link href='/'>
              <a className='brand mr-0'>
                {/* <Triangle size={32} strokeWidth={1} /> */}
                <img
                  src='/images/logo.png'
                  alt='green facilities ltd'
                  style={{ height: '8rem', margin: '1rem' }}
                />
              </a>
            </Link>
            <h5 className='mb-0 mt-3'>Daily Inspection Form</h5>
          </div>

          <Form
            layout='vertical'
            onSubmit={(e) => {
              e.preventDefault();
              form.validateFields((err, values) => {
                values.picture = this.state.picture;
                values.property = this.state.property;
                values.from = this.state.from;
                if (!err) {
                  this.props.inProgress();
                  Message.loading('Loading...').then(() =>
                    this.props.addInspection(
                      values
                    ),
                  );
                }
              });
            }}
          >
            <FormItem label='Name'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ],
              })(<Input placeholder='Name' type='text' />)}
            </FormItem>
            <FormItem label='Email'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your email !',
                  },
                ],
              })(<Input type='email' placeholder='Email' />)}
            </FormItem>
            <FormItem label='Location'>
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the Location !',
                  },
                ],
              })(<Input type='text' placeholder='Location' />)}
            </FormItem>
            <FormItem label='Project Site'>
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
            <FormItem label='Building'>
              {getFieldDecorator('building', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter building !',
                  },
                ],
              })(<Input type='text' placeholder='Building' />)}
            </FormItem>
            <FormItem label='Floor'>
              {getFieldDecorator('floor', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter floor !',
                  },
                ],
              })(<Input type='text' placeholder='Floor' />)}
            </FormItem>
            <FormItem label='Wing'>
              {getFieldDecorator('wing', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Wing !',
                  },
                ],
              })(<Input type='text' placeholder='Wing' />)}
            </FormItem>
            <FormItem label='Room'>
              {getFieldDecorator('room', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Room !',
                  },
                ],
              })(<Input type='text' placeholder='Room' />)}
            </FormItem>
            <FormItem label='Category'>
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
            <FormItem label='Observation'>
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
            <FormItem label='Work Category'>
              {getFieldDecorator('workcategory', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input work category',
                  },
                ],
              })(<Input placeholder='Work Category' type='text' />)}
            </FormItem>
            <FormItem label='Solution'>
              {getFieldDecorator('solution', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your proposed Solution',
                  },
                ],
              })(<Input placeholder='Proposed Solution' type='text' />)}
            </FormItem>
            <FormItem label='Action by'>
              {getFieldDecorator('actionby', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Action',
                  },
                ],
              })(<Input placeholder='Action by' type='text' />)}
            </FormItem>
            <FormItem label='Cost'>
              {getFieldDecorator('estimatecost', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter Estimate Cost',
                  },
                ],
              })(<Input placeholder='Estimate cost' type='number' />)}
            </FormItem>
            <FormItem label='Dimension'>
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
            <FormItem>
              <Button
                loading={
                  this.props.ux.loading || this.state.loading ? true : false
                }
                type='primary'
                htmlType='submit'
                block
                className='mt-3'
              >
                Submit
              </Button>
            </FormItem>
          </Form>
          <div
            className='mt-5 mb-2'
            style={{
              textAlign: 'center',
              textTransform: 'capitalize',
              fontSize: '12px',
            }}
          >
            A product of Sostein
            &copy;ODBS Technology 2020
          </div>
        </Content>
      </Row>
    );
  }
}

export default connect((state) => state, {
  notInProgress,
  inProgress,
  addInspection,
})(Form.create()(InspectionPage));
