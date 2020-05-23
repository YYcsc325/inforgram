import React from 'react';
import { Tabs } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SwiperComponent from './SwiperComponent';
import { renderData, swiperArr } from './data';
import classNames from 'classnames';
import './index.less'
const { TabPane } = Tabs;

class SlidingTabsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeSpan: swiperArr[0].id,
        imgUrl: swiperArr[0].imgUrl
    };
  }
  nextClick = () => {
    const { activeSpan } = this.state;
    let index = swiperArr.findIndex(item => item.id === activeSpan);
    if(swiperArr.length - index === 1){
      this.setState({
        activeSpan: swiperArr[0].id,
        imgUrl: swiperArr[0].imgUrl
      })
    }else{
      this.setState({
        activeSpan: swiperArr[index + 1].id,
        imgUrl: swiperArr[index + 1].imgUrl
      })
    }
  }
  preClick = () => {
    const { activeSpan } = this.state;
    let index = swiperArr.findIndex(item => item.id === activeSpan);
    if(index === 0){
      let len = swiperArr[swiperArr.length - 1];
      this.setState({
        activeSpan: len.id,
        imgUrl: len.imgUrl
      })
    }else{
      this.setState({
        activeSpan: swiperArr[index - 1].id,
        imgUrl: swiperArr[index - 1].imgUrl
      })
    }
  }
  activeClick = (item) => {
      this.setState({
        activeSpan: item.id,
        imgUrl: item.imgUrl
      })
  }
  render() {
    const { mode = 'top' } = this.props;
    const { activeSpan, imgUrl } = this.state;
    return (
      <div className={'container'}>
        <div>包含以下场景，以下为场景预览</div>
        <div className={'tabsBar'}>
          <Tabs 
            defaultActiveKey="1"
            tabPosition={mode} 
            style={{ height: '100%' }} 
            tabBarStyle={{backgroundColor: 'white'}} 
            size="small"
            onChange={(props) => {
                this.setState({
                    activeSpan: swiperArr[0].id,
                    imgUrl: swiperArr[0].imgUrl
                })
            }}
          >
            {(renderData || []).map(item => (
              <TabPane tab={(<span style={{fontSize: '12px'}}>{item.title}</span>)} key={item.id} style={{padding: '29px 45px 10px 45px'}}>
                <SwiperComponent 
                   title={item.title}
                   swiperArr={swiperArr}
                   activeSpan={activeSpan}
                   imgUrl={imgUrl}
                   activeClick={this.activeClick}
                />
              </TabPane>
            ))}
          </Tabs>
          <span className={classNames('arrow', 'leftArrow')} onClick={() => {
              this.preClick()
          }}><LeftOutlined /></span>
          <span className={classNames('arrow', 'rightArrow')} onClick={() => {
              this.nextClick()
          }}><RightOutlined /></span>
        </div> 
      </div>
    );
  }
}
export default SlidingTabsDemo