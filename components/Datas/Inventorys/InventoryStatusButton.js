import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { statusInventory } from '../../../redux/actions';

class InventoryStatusButton extends Component {
  state = {
    loading: false,
  };

  changeStatus = (status, id, lendId) => {
    let dt = { status, lendId };
    this.setState({ loading: true });
    this.props.statusInventory(dt, id, (st) => {
      if (st) {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <Button
        style={{
          padding: '2px',
          color: 'white',
          background: this.props.data.split('/')[1].includes('unapproved')
            ? 'red'
            : 'green',
        }}
        loading={this.state.loading}
        onClick={(e) =>
          this.changeStatus(
            this.props.data.split('/')[1],
            this.props.record._id,
            this.props.data.split('/')[2],
          )
        }
      >
        {this.props.data.split('/')[1]}
      </Button>
    );
  }
}

export default connect((state) => state, { statusInventory })(
  InventoryStatusButton,
);
