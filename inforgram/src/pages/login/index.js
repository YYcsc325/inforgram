import { connect } from 'dva';
import PageView from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中
const login = ( payload = {} ) => {
  return {
    type: 'LOGIN',
    url: '/inforgram/user',
    payload
  }
}
const mapStateToProps = (state, props) => {
  return {}
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    async login(value){
      dispatch(login({
        ...value,
        login: true
      }));
    }
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);