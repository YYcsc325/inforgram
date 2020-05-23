import React, { Component } from 'react'
import './index.less';
import LeftComponent from './Components/leftComponent';
import RightComponent from './Components/RightComponent'

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