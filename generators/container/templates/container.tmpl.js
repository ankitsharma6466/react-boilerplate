

module.exports = ({ name, pascalCasedName }) => {
  return (
`import { connect } from 'react-redux';
import ${pascalCasedName} from './${name}';

const mapStateToProps = (state) => {
  return {
    test: state.${name}.test,
    testData: state.${name}.testData
  }
};

export default connect(mapStateToProps)(${pascalCasedName});`
)};
