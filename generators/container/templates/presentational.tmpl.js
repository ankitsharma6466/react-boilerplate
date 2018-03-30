module.exports = ({ name, pascalCasedName }) => {
  return (
`import React, { Component } from 'react';
import Layout from '../../components/layout'
import Actions from './actions'

class ${pascalCasedName} extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(Actions.test("Steve Jobs"));
  }

  render () {
    return (
      <Layout className="${name}">
        Welcome ${pascalCasedName} {this.props.test}
      </Layout>
    );
  }
}

export default ${pascalCasedName};`
)};
