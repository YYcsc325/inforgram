import { connect } from 'dva';
import PageView from './view'
const mapStateToProps = (state, props) => {
  return {
    daa: 'dasd'
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);