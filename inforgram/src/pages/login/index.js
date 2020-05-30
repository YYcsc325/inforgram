import { connect } from 'dva';
import PageView from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中
const login = ( payload = {} ) => {
  return {
    type: 'admintes/fetchList',
    payload,
    key: 'user',
    entity: 'inforgram',
  }
}
// const logins = (payload = {}) => {
//   return {
//     type: 'admintes/submitForm',
//     payload,
//     action: 'user',
//     entity: 'inforgram'
//   }
// }
const mapStateToProps = (state, props) => {
  return {}
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    async login(value){
      const { email, passWord } = value;
      return dispatch(login({
        email,
        passWord
      }));
    }
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);