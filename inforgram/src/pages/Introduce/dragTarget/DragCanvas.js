import React, { Component } from 'react';

class DragCanvas extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let ctxs = document.getElementById('myCanvas');
        let ctx = this.canvasRef;
        // ctx.getContext('2d');
        console.log(ctxs, 'ctxs');
        console.log(ctx, 'ctx')
        this.ctx = ctx;

    }
    componentWillReceiveProps(nextProp) {
        const { allPosition } = nextProp;
        const { ctx } = this;
        ctx.getContext('2d');
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();
    }
    render() {
        return (
            <canvas id={'myCanvas'} ref={(refs) => this.canvasRef = refs}></canvas>
        )
    }
}
export default DragCanvas