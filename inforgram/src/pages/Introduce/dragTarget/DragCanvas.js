import React, { Component } from 'react';

class DragCanvas extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let ctx = this.canvasRef.getContext('2d');
        this.ctx = ctx;
    }
    componentWillReceiveProps(nextProp) {
        const { allPosition = {}, clickId } = nextProp;
        const { ctx } = this;

        // 正在拖拽的目标元素坐标
        let targetObj = allPosition[clickId] || {}

        // 所有拖拽元素的坐标
        let allArray = Object.values(allPosition);

        // 所有x坐标的数值
        let mapX = {};

        // 所有y坐标的数值
        let mapY = {};

        allArray.map(item => {
            const { left, top, right, bottom, id } = item;
            if (id !== clickId) {
                if (mapX[left]) {
                    mapX[left].push(id)
                } else if (mapX[right]) {
                    mapX[right].push(id)
                } else {
                    mapX[left] = [id];
                    mapX[right] = [id];
                }
            }
        })

        // 拖拽元素的左边对齐了
        if (mapX[targetObj.left] || mapX[targetObj.right]) {
            ctx.moveTo(targetObj.left + 1, targetObj.top - 20 + 1)
            ctx.lineTo(targetObj.left + 1, targetObj.bottom + 20 + 1);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255,0,0,0.5)';
            ctx.stroke();
        }else{
            ctx.clearRect(0,0,1200,600);
        }
    }
    render() {
        return (
            <canvas id={'myCanvas'} ref={(refs) => this.canvasRef = refs} width={1200} height={600}></canvas>
        )
    }
}
export default DragCanvas