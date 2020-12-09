export function isFunc(fn){
    if(typeof fn === 'function') return true;
    return false;
}
export function processingObj(item = {}, todo, injectProps){
    const newItem = {...item};
    for( const key in item ){
      if(isFunc(item[key]) && Object.prototype.hasOwnProperty.call(item, key)){
        if(todo === 'calling'){
          newItem[key] = item[key].call(null, injectProps)
        }else if(todo === 'bindding'){
          newItem[key] = item[key].bind(null, injectProps)
        }else{
          newItem[key] = item[key];
        }
      }
    }
    return newItem;
  }