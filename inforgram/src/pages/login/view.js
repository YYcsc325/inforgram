import React, { Component } from 'react'
import LeftComponent from './Components/leftComponent';
import RightComponent from './Components/RightComponent'
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
        return (
            <div className='signup-form-container'>
                <LeftComponent />
                <RightComponent {...this.props}/>
            </div>
        )
    }
}


export default Index