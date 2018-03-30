import React, { Component } from 'react';
import './home.css'
import Layout from '../../components/layout'
import Actions from './actions'

export default class Home extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.dispatch(Actions.test("Steve Jobs"));
  }
  render() {
    return (
      <Layout className="home">
        Welcome Home {this.props.test}
      </Layout>
    );
  }
}