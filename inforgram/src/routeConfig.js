import { Route, Redirect } from 'dva/router';
import BasicLayOut from './pages/LayOut/BasicLayOut'
import Home from './pages/Home/index';
import Cookies from 'js-cookie';

function HomeIndex(){
    return <div>HomeIndex</div>
}
function List(){
    return <div>
        <span style={{
            display: 'inline-block',
            width: '100px',
            height: '50px',
            background: 'pink',
            borderRadius: '10px',
            lineHeight: '50px',
            textAlign: 'center',
            color: '#fff'
        }} onClick={() => {
            alert('你点了按钮了')
        }}>按钮</span>
    </div>
}
function jsonParse(strObj){
    try{
        return JSON.parse(strObj);
    }catch(e){
       console.log(e);
       return {}
    }
}
// 相当于withRouter的用法
const ProvideRoute = ({component: Component, path, routes, ...rest}) => {
    const { login } = jsonParse(Cookies.get('userLogin')) || {};
    return <Route
            path={path}
            render = {props => {
                return true ? <Component {...props} routes={routes}/> : <Redirect to='/login' />
            }}
        />
}
export default ProvideRoute;

const routes = [
    {
        path: "/",
        component: BasicLayOut,
        routes: [
            {
                path: "/home",
                component: Home,
                routes: [
                    {
                        path: '/home/index',
                        component: HomeIndex
                    }
                ]
            },
            {
                path: '/list',
                component: List
            }
        ]
    }]

export { routes }