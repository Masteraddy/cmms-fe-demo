import { Modal, Button, Form, Input, Divider, Message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRequestComment, getRequest } from '../../../redux/actions';
import { Edit, User } from 'react-feather';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

class AddComment extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = (id) => {
    this.props.getRequest(id);
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { validateFields } = this.props.form;
    // this.setState({ loading: true });
    validateFields((err, values) => {
      if (!err) {
        Message.loading('Loading...');
        this.props.addRequestComment(
          values,
          this.props.requests.request._id,
          this.props.authentication.user,
          (status) => {
            if (status) {
              this.setState({ visible: false });
            }
          },
        );
      }
    });
  };

  handleCancel = () => this.setState({ visible: false });

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

    const { loading } = this.props.ux;
    const { getFieldDecorator } = this.props.form;
    const { usertype } = this.props.authentication.user;
    return (
      <div>
        {(usertype === 'manager' ||
          usertype === 'procurement' ||
          usertype === 'team-member' ||
          usertype === 'technician') && (
          <Button
            type='primary'
            block
            onClick={(e) => this.showModal(this.props.id)}
          >
            Add Comment
          </Button>
        )}
        <Modal
          visible={this.state.visible}
          title='Add Comment'
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
            <FormItem label={'Comment'}>
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    message: 'Please comment the request in short sentence!',
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
                  placeholder='Comments'
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => state, {
  addRequestComment,
  getRequest,
})(Form.create()(AddComment));
