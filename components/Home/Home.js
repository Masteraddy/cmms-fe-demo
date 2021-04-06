import React, { Component } from 'react';
import { Card, Dropdown, Menu, Row } from 'antd';
import { Activity, Link, Home } from 'react-feather';
import Router from 'next/router';
import Linky from 'next/link';

export default class HomePage extends Component {
  componentDidMount() {
    Router.push('/dashboard');
  }
  render() {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <img
          src='/images/logo.png'
          style={{ height: '30vh', maxWidth: '80vw' }}
          alt='servo'
        />
      </div>
    );
  }
}
