import React, { Component, Fragment } from 'react';
import { Chart } from '@antv/g2';

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
];

class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        const { id } = this.props;
        const chart = new Chart({
            container: `c${id}`, // 指定图表容器 ID
            width: 600, // 指定图表宽度
            height: 300, // 指定图表高度
        });
   
        chart.data(data);

        // Step 3: 创建图形语法，绘制柱状图
        chart.interval().position('genre*sold');

        // Step 4: 渲染图表
        chart.render();
    }
    render() {
        const { id } = this.props;
        return (
            <div id={`c${id}`} style={{padding: '10px'}}>

            </div>
        )
    }
}

export default LineChart