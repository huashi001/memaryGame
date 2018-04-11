//打乱0到n
function shuffleZeroToN(n) {
  let result = [];
  let r = null;
  while (result.length !== n + 1) {
    let flag = true;
    r = Math.floor((n + 1) * Math.random());
    for (let i = 0; i < result.length; i++) {
      if (result[i] == r) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(r);
    }
  }
  return result;
}
//打乱数组(可以有重复元素)
function shuffle(arr) {
  let len = arr.length;
  let res = [];
  let result = shuffleZeroToN(len - 1);
  for (let i = 0; i < len; i++) {
    res[i] = arr[result[i]];
  }
  return res;
}
const cover = document.getElementById("cover");
const oChoose = document.getElementById("choose");
const oReset = document.getElementById("reset");
const oLevel = document.getElementById("level");
const aA = oReset.getElementsByTagName("a");
const aIn = oChoose.getElementsByTagName("input");
const aImg = cover.getElementsByTagName("img");
let gameLevel = 1;
let sSrc = "";
let index; //防止同一图片二次点击
let clickTime = 0; //点击次数
let arr = []; //保存1——16
for (let i = 0; i < 16; i++) {
  arr[i] = i + 1;
}
//添加场景
function addScene(level) {
  //添加Dom节点
  for (let i = 0; i < 3 + level; i++) {
    let oDiv = document.createElement("div"); //4行
    for (let j = 0; j < 4; j++) {
      let oDiv2 = document.createElement("div");
      oDiv2.className = "every";
      let oImg = document.createElement("img");
      oDiv2.appendChild(oImg);
      oDiv.appendChild(oDiv2);
    }
    cover.appendChild(oDiv);
  }
}
//添加遮罩层事件
function addCoverEvent() {
  const aImg = cover.getElementsByTagName("img");
  //检测是否成功
  function checkSuccess() {
    for (let j = 0; j < aImg.length; j++) {
      if (aImg[j].flag == true) {
        return false;
      }
    }
    return true;
  }
  //给每个图片加事件
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].onclick = function () {
      if (oRule.style.display == 'block') {
        return;
      }
      clickTime++;
      if (aImg[i].flag == false || index === i) {
        return;
      }
      index = i;
      aImg[i].src = `./image/${aPhotoPosition[i]}.jpg`;
      aImg[i].flag = true; //图片是否可以变化
      setTimeout(function () {
        if (!sSrc) {
          sSrc = aImg[i].src;
        } else {
          if (sSrc === aImg[i].src) {
            for (let j = 0; j < aImg.length; j++) {
              if (aImg[j].src === sSrc) {
                aImg[j].src = `./image/yes.jpg`;
                aImg[j].flag = false; //不可变化
              }
            }
            sSrc = "";
            if (checkSuccess()) {
              if (confirm(`成功！共点击${clickTime}次,再来一次？`)) {
                init(gameLevel);
              }
            }
          } else {
            sSrc = aImg[i].src;
            for (let j = 0; j < aImg.length; j++) {
              if (aImg[j].flag) {
                aImg[j].src = `./image/0.jpg`;
              }
            }
            aImg[i].src = `./image/${aPhotoPosition[i]}.jpg`;
          }
        }
      }, 50);
    };
  }
}
//重置
function init(level) {
  sSrc = "";
  index = null;
  i = 0;
  clickTime = 0;
  let photoNumber = 8 + (level - 1) * 2;
  let arr1 = shuffle(arr).splice(0, photoNumber); //随机取photoNumber张图片
  aPhotoPosition = shuffle(arr1.concat(arr1)); //打乱photoNumber*2张图片位置
  arr1 = null;
  for (let i = 0; i < 4 * (level + 3); i++) {
    aImg[i].src = `./image/0.jpg`;
    aImg[i].flag = true;
  }
}
//初始化
addScene(gameLevel);
init(gameLevel);
addCoverEvent();

//重置
aA[0].onclick = function () {
  init(gameLevel);
};
//查看规则
let oRule = document.getElementById("rule");
aA[1].onclick = function () {
  oRule.style.display = "block";
  cover.style.opacity = 0.3;
  oLevel.style.display = 'none';
  //关闭规则
  let aClose = oRule.getElementsByTagName("a");
  aClose[0].onclick = function () {
    oRule.style.display = 'none';
    oLevel.style.display = 'flex';
    cover.style.opacity = 1;
    aClose = null;
  };
};
//关卡设置
oSpan = document.getElementById("sp1");
//上一关
aIn[0].onclick = function () {
  if (gameLevel == 1) {
    if (confirm(`当前已经是第一关,是否继续？`)) {
      init(1);
    }
  } else {
    gameLevel--;
    oSpan.innerHTML = `当前第${gameLevel}关`;
    cover.innerHTML = "";
    addScene(gameLevel);
    init(gameLevel);
    addCoverEvent();
  }
};
//下一关
aIn[1].onclick = function () {
  oSpan = document.getElementById("sp1");
  if (gameLevel == 5) {
    if (confirm(`当前已经是最后一关,是否继续？`)) {
      init(5);
    }
  } else {
    gameLevel++;
    oSpan.innerHTML = `当前第${gameLevel}关`;
    cover.innerHTML = "";
    addScene(gameLevel);
    init(gameLevel);
    addCoverEvent();
  }
};
