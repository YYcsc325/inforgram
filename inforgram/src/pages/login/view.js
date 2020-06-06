import React, { Component } from 'react'
import LeftComponent from './Components/leftComponent';
import RightComponent from './Components/RightComponent';
import Spins from '../../components/Spin/index'
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    
    render() {
        const { loginLoading } = this.props;
        return (
            <div className='signup-form-container'>
                <Spins spinning={loginLoading}/>
                <LeftComponent />
                <RightComponent {...this.props}/>
            </div>
        )
    }
}


export default Index