import { marketStepMap, planStepMap, groupStepMap, creativeStepMap } from './const';

// 组合容器
const fnCombination = (x) => ({
  map: (f) => fnCombination(f(x)),
  fold: (f) => f(x),
  inspect: () => `fnCombination(${x})`,
});

/**
 * @name 侧边栏（营销目标）的step获取
 * @param { sceneCode, stepList }
 */
function marketStepBySceneCode(stepList = [], sceneCode) {
  const marketStepConfig = marketStepMap(sceneCode);
  return stepList.concat(marketStepConfig);
}
/**
 * @name 侧边栏（计划部分）的step获取
 * @param { sceneCode, stepList }
 */
function planStepBySceneCode(stepList = [], sceneCode) {
  const planStepConfig = planStepMap(sceneCode);
  return stepList.concat(planStepConfig);
}
/**
 * @name 侧边栏（单元部分）的step获取
 * @param { sceneCode, stepList }
 */
function groupStepBySceneCode(stepList = [], sceneCode) {
  const groupStepConfig = groupStepMap(sceneCode);
  return stepList.concat(groupStepConfig);
}
/**
 * @name 侧边栏（创意部分）的step获取
 * @param { sceneCode, stepList }
 */
function creativeStepBySceneCode(stepList = [], sceneCode) {
  const creativeStepConfig = creativeStepMap(sceneCode);
  return stepList.concat(creativeStepConfig);
}

export function getStepListBysceneCode(sceneCode) {
  return function (list = []) {
    return fnCombination(list)
      .map((data) => marketStepBySceneCode(data, sceneCode)) // 获取营销目标
      .map((data) => planStepBySceneCode(data, sceneCode)) // 获取计划
      .map((data) => groupStepBySceneCode(data, sceneCode)) // 获取单元
      .map((data) => creativeStepBySceneCode(data, sceneCode)) // 获取创意
      .fold((stepList) => stepList);
  };
}