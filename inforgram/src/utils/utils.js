import React from 'react';
import { message } from 'antd'

// 字符串去重复
export function uniqueStr(arr){
    return [new Set([...arr])];
}
// 数组对象根据id去重复
export function unique(data){
    let obj = {}
    data = data.reduce((item,next)=>{  //next是另外一个参数
        obj[next.name]?'':obj[next.name] = true && item.push(next)
        return item
    },[])
    return data
}
/**
 * @name   非空
 * @param  { state原数据, array过滤字段['type'], initial默认值 }
 */
export function getIn(state, array, initial){
    let obj = Object.assign({}, state);

    for (let i = 0; i < array.length; i++) {
      // when is undefined  return init immediately
      if (typeof obj !== 'object' || obj === null) {
        return initial;
      }
  
      const prop = array[i];
  
      obj = obj[prop];
    }
  
    if (obj === undefined || obj === null) {
      return initial;
    }
  
    return obj;
}
/**
 * @desc 一个对象通过操作序列来设置里面的值，做到自动添加值
 * @param {object} state - 需要获取的数据源
 * @param {array} array - 操作路径
 * @param {any} initial - 默认值，当没有内容的时候
 * @example <caption>Example usage of setIn.</caption>
 * // testcase
 * {%common%}
 * // setIn
 * {%setIn%}
 * @returns {any} expected - 返回操作完成后新的值
 */
export function setIn(state, array, value) {
    const setRecursively = function(state, array, value, index) {
      let clone = {},
        prop = array[index],
        newState;
  
      if (array.length > index) {
        // get cloned object
        if (Array.isArray(state)) {
          clone = state.slice(0);
        } else {
          clone = Object.assign({}, state);
        }
        // not exists, make new {}
        newState = state[prop] !== undefined ? state[prop] : {};
  
        clone[prop] = setRecursively(newState, array, value, index + 1);
  
        return clone;
      }
  
      return value;
    };
  
    return setRecursively(state, array, value, 0);
  }
// 将对象转成地址栏山的参数
/**
 * @author csc
 * @param {Object} obj 需要拼接的参数对象
 * @return {String}
 * */
export function objToQs(obj) {
  if(!obj && !Object.keys(obj).length) {
      return "";
  } else {
      var arr = [];
      for(var key in obj) {
          arr.push(key + "=" + obj[key]);
      }
      return arr.join("&");
  }
}
// 将地址栏上的参数转成对象
/**
 * @author csc
 * @param {String} url url地址栏
 * @return {Object}
 */
export function qsToObj(url) {
  var qs = url.split("?")[1];
  var arr = [];
  var res = {};
  if(!qs) {
      // return res;
  } else {
      arr = qs.split("&");
      for(var i = 0, len = arr.length; i < len; i++) {
          var key = arr[i].split("=")[0];
          var val = arr[i].split("=")[1];
          res[key] = decodeURIComponent(val);
      }
  }
  return res;
}
// 获取local
export function getlocal(str) {
  try{
      if(window){
          if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
              const local_message = JSON.parse(window.localStorage.getItem(str)) || {}
              return local_message;
          }
      }
  }catch(err){
      console.log(err,'err')
  }
}

//设置
export function setlocal(str,obj) {
  try{
      if(window){
          if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
              localStorage.setItem(str,JSON.stringify(obj))
          }
      }
  }catch(err){
      console.log(err,'err')
  }
}

//删除
export function removelocal(str) {
  try{
      if(window){
          if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
              localStorage.removeItem(str)
          }
      }
  }catch(err){
      console.log(err,'err')
  }
}
/**
 * @name  getTreeNode
 * @param {*} ids
 * @param {*} id
 * @param {*} parentId
 */
export function getTreeNode(adTradeList, ids = [], id, parentId) {
    adTradeList.forEach(item => {
      if (item.key === id && item.level === '1') {
        ids.push(item.title);
      }
      if (item.key === id && item.level === '2') {
        ids.push(parentId);
        ids.push(item.title);
      }
      if (item.children && item.children.length) {
        getTreeNode(item.children, ids, id, item.title);
      }
    });
    return ids;
}
export function copyRangeText(){
    try{
        const range = document.createRange();
        range.selectNode(document.getElementById('id1'));
        const selection = window.getSelection();
        debugger;
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        // alert('复制成功')
    }catch(e){
        alert('你复制个蛋');
    }
    
}
export function copyInput(){    
    let obj = document.getElementById('input1');
    obj.select();
    try{   
        if(document.execCommand("Copy","false",null)){
        //如果复制成功
        alert("复制成功！");  
        }else{
        //如果复制失败
        alert("复制失败！");
        }
    }catch(e){    
      alert("您的浏览器不支持此复制功能，请选中相应内容并使用Ctrl+C进行复制!");    
    }    
 } 
 export function CopyContent(props) {
    const createRef = React.createRef();
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span ref={createRef}>{props.content}</span>
        <a
          href="###"
          onClick={() => {
            const text = createRef.current.innerText;
            var oInput = document.createElement('input');
            oInput.value = text;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand('Copy'); // 执行浏览器复制命令
            oInput.remove();
            message.info('复制成功');
          }}
        >
          复制
        </a>
      </div>
    );
  };
/**
 * @title 函数去抖
 * @params func  wait  options
 */
export function debounce(func,wait,options) {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timeId,
        lastCallTime

    //初始化参数
    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;
    
    //基本的类型判断和处理
    if(typeof func != 'function'){
        throw new TypeError('传个函数进来')
    }

    wait = +wait || 0;

    function invokeFunc(time){
        const args = lastArgs;
        const thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg,args)
        return result
    }
    /**
     * @title 等待
     * @param {*} time 
     */
    function leadingEdge(time){
        lastInvokeTime = time;
        //为trailingedge 触发函数调用设定定时器
        timeId = setTimeout(timerExpired,wait);
        //leading == true  执行函数
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait (time) {
        //距离上一次debounce函数调用时间
        const tiemSinceLastCall = time -lastCallTime   
        //距离上次函数执行的时间
        const timeSinceLastInvoke = time - lastInvokeTime;
        //用wait减去timesincelastcall 计算出下次trailing
        const timeWaiting = wait - tiemSinceLastCall;


        //判断情况   有maxing：比较出下次maxing和下一次trailing的最小值  作为下次函数要执行的时间
        //          无maxing   在下一次trailing时执行  timerExpired
        return maxing ? Math.min(timeWaiting,maxWait-timeSinceLastInvoke) : timeWaiting
    }


    /**
     * @title 根据时间判断 
     * @params time
     */
    function shouldInvoke (time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        //几种满足条件的情况

        return (lastCallTime === undefined                 //首次
            || (timeSinceLastCall >= wait)                 //距离上次被调用已经超过wait
            || (timeSinceLastCall < 0)                     //系统时间倒退
            || (maxing && timeSinceLastInvoke >= maxWait)) //超过最大等待时间
    }

    function timerExpired () {
        const time = Date.now()

        //在trailing edge 且时间符合条件时 ，调用trailingEdge函数，否则重启定时器
        if(shouldInvoke(time)){
            return trailingEdge(time)
        }
        //重启定时器，保证下一次时延末尾触发
        timeId = setTimeout(timerExpired,remainingWait(time))
    }

    function trailingEdge (time) {
        timeId = undefined;

        //有lastargs才执行，意味着  只有func被debounce过一次以后  会在trailingedge执行

        if(trailing && lastArgs){
            return invokeFunc(time)
        }
        // 每次trailing 都会清除 lastargs 和 lastthis 目的时避免最后一次函数被执行了两次
        // 举个例子：最后一次函数执行时，可能恰巧时前一次的trailing edge  函数被调用  而这个函数又需要在自己时延的trailing edge 触发  导致触发多次
        lastArgs = lastThis = undefined;
        return result;
    }
    
    function cancel () {}
    function flush () {}
    function pending () {}

    function debounced (...args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time) //是否满足时间条件

        lastArgs = args
        lastThis = this;
        lastCallTime = time;  //函数被调用的时间

        if(isInvoking){
            if(timeId == undefined){          // 无timerid有两种情况  1: 首次调用  2: trailingedge执行过函数
                return leadingEdge(lastCallTime)
            }
            if(maxing){
                timeId = setTimeout(timerExpired,wait)
                return invokeFunc(lastCallTime);
            }
        }
        //负责一种case  trailing为true的情况下，在前一个wait的trailingedge  已经执行了函数
        //而这次函数被调用时  shouldInvoke 不满足条件  因此设置定时器  在本次的trailing 保证函数被执行
        if(timeId === undefined){
            timeId = setTimeout(timerExpired,wait)
        }
        return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    debounce.pending = pending
    return debounced

}