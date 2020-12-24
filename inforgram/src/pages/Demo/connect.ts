import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    initialValue: 'input1'
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    handleValue(values){
        console.log(values)
    }
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
);