import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Select,
  Input,
  Message,
  Row,
  Rate,
  Radio,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Eye, Mail, Triangle, User } from 'react-feather';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { addCs } from '../redux/actions';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

class Cs extends Component {
  state = {
    fullname: '',
    email: '',
    phonenumber: '',
    ticket: '',
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
            <h5 className='mb-0 mt-3'>End-users Feedback Form</h5>
          </div>

          <Form
            layout='vertical'
            onSubmit={(e) => {
              e.preventDefault();
              form.validateFields((err, values) => {
                // console.log(values);
                if (!err) {
                  Message.loading('Loading...');
                  this.props.addCs(values, this.props.authentication.user);
                }
              });
            }}
          >
            <FormItem label='Full Name'>
              {getFieldDecorator('fullname', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your name',
                  },
                ],
              })(<Input placeholder='Full Name' />)}
            </FormItem>
            <FormItem label='Email'>
              {form.getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Mail
                      size={16}
                      strokeWidth={1}
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  type='email'
                  placeholder='Email'
                />,
              )}
            </FormItem>
            <FormItem label='Phone Number'>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your phone number',
                  },
                ],
              })(<Input type='phone' placeholder='Phone Number' />)}
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
                <Select style={{ width: '100%' }}>
                  {this.props.properties.propert.map((data) => (
                    <Option key={data._id} value={data._id}>
                      {data.property} - {data.location} by {data.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem label='Ticket'>
              {getFieldDecorator('ticket', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the ticket number',
                  },
                ],
              })(<Input placeholder='Ticket Name/ID' />)}
            </FormItem>

            <h3 className='mb-0 mt-3'>RATE OUR SERVICES</h3>

            <FormItem label={'Quality of Work'}>
              {getFieldDecorator('quality', {
                rules: [
                  {
                    required: true,
                    message: 'Please rate our work quality',
                  },
                ],
              })(<Rate />)}
            </FormItem>
            <FormItem label='Appearance'>
              {getFieldDecorator('appearance', {
                rules: [
                  {
                    required: true,
                    message: 'Please rate our appearance',
                  },
                ],
              })(<Rate />)}
            </FormItem>
            <FormItem label='Timing'>
              {getFieldDecorator('timing', {
                rules: [
                  {
                    required: true,
                    message: 'Please rate our work timing',
                  },
                ],
              })(<Rate />)}
            </FormItem>
            <FormItem label='Proffessionalism'>
              {getFieldDecorator('professionalism', {
                rules: [
                  {
                    required: true,
                    message: 'Please rate our professionalism',
                  },
                ],
              })(<Rate />)}
            </FormItem>
            <FormItem label='Can This Ticket be Closed'>
              {getFieldDecorator('ticketclose', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value='true'>Yes</Radio>
                  <Radio value='false'>No</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem label={'Comment'}>
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                  },
                ],
              })(
                <TextArea
                  prefix={
                    <User
                      size={16}
                      strokeWidth={1}
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  // onChange={this.handleChange}
                  placeholder='Comment'
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
            A product of Sostein &copy;ODBS Technology 2020
          </div>
        </Content>
      </Row>
    );
  }
}

export default connect((state) => state, {
  addCs,
})(Form.create()(Cs));
