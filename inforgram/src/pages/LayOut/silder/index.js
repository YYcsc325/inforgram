import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuData from './mock';
import { getTreeNode } from '../../../utils/utils'
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

function findDefaultOpenKey(menuData, pathName){
    let defaultOpenKeys = [];
    let defaultSelectKeys = []
    function getOpenKeys(arr, name){
        arr.forEach(item => {
            if(item.url === name){
                defaultSelectKeys = [item.key]
                defaultOpenKeys = [item.key.split('-')[0]]
            }else{
                if(item.children && item.children.length > 0){
                    getOpenKeys(item.children, name)
                }
            }
        });
    }
    getOpenKeys(menuData, pathName)
    return {
        defaultOpenKeys,
        defaultSelectKeys
    }
}

@connect(
    state => {
        return {
        }
    },
    // dispatch => {
    //   return {}
    // }
)
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: [],
            selectedKeys: []
        }
    }

    rootSubmenuKeys = ['01', '02', '03']

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    checked = ( item ) => {
        console.log(item, 'item')
        let res = getTreeNode(MenuData, [], item.key);
        this.setState({
            selectedKeys: item.keyPath,
            openKeys: [item.key.split('-')[0]]
        })
    }
    showMenu = ( obj ) => {
        const { key, icon, title} = obj;
        return (
            <SubMenu
                key={key}
                title={
                <span>
                    <Icon type={icon} />
                    {title}
                </span>
                }
            >
                {
                    obj.children.map(item => (<Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item>))
                }
            </SubMenu>
        )
    }
    componentDidMount() {
        const { location = {} } = this.props;
        const { pathname } = location; 
        const { defaultOpenKeys, defaultSelectKeys } = findDefaultOpenKey(MenuData, pathname);
        this.setState({
            selectedKeys: defaultSelectKeys,
            openKeys: defaultOpenKeys
        })
    }
    render() {
        const { openKeys = [], selectedKeys = [] } = this.state;
        console.log(selectedKeys, openKeys, 'selectedKeys')
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  theme='dark'
                  defaultOpenKeys={['01']}
                  style={{ height: '100%', borderRight: 0 }}
                  onSelect={this.checked}
                  onOpenChange={this.onOpenChange}
                  openKeys={openKeys}
                  selectedKeys={selectedKeys}
                >
                    {
                        MenuData.map(item => this.showMenu(item))
                    }
                </Menu>
            </Sider>
        )
    }
}

export default Index