import './index.less';
import React from 'react';
import classNames from 'classnames';

class SwiperComponent extends React.Component{
  render(){
    const { title, swiperArr, activeSpan, imgUrl } = this.props;
      return (
        <div className={'swiperContainer'}>
            <div className={'swiperContent'}>
              <img src={imgUrl} alt=""/>
            </div>
            <div className={'swiperFooter'}>
              <div style={{marginTop: '20px',marginBottom: '5px'}}>{title}</div>
              {
                swiperArr.map(item => <span 
                  className={classNames('checkGroup', {
                    'active': activeSpan === item.id
                  })} 
                  onClick={() => {this.props.activeClick(item)}}
                  ></span>)
              } 
            </div> 
        </div>
      )
  }
}

export default SwiperComponent;