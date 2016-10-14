

/*
只提供生活、工作、学习3个类别
*/

class Memo {
  constructor(obj) {
    // 0工作 1生活 2学习
    this.categoryId = obj.categoryId;
    // 20字符内的字符串
    this.title = obj.title;
    // 0文字 1涂鸦
    this.type = obj.type;
    // 类别为文字时，字符串；为涂鸦时，imageData
    this.content = obj.content;
    // 创建时的时间戳
    this.timeStamp = new Date();
    // 默认未完成
    this.isCompleted = false;
  }
  edit (updatedMemo) {
    // 应只修改【是否完成】、【标题】、【类别】、【内容】
    for (attributeName in updatedMemo) {
      this[attributeName] = updatedMemo[attributeName];
    }
  }
  // 取得260*260图片的 imageData
  getImageData (imageUrl) {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', 260);
    canvas.setAttribute('height', 260);
    let image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.getContext('2d').drawImage(image, 0, 0);
      this.content = canvas.toDataURL();
    };
  }
}

class VueMemoStorage {
  constructor () {
    this.memos = [];
  }
  add (memo) {
    this.memos.push(memo);
  }
  remove (memo) {
    this.memos.splice(this.memos.indexOf(memo), 1);
  }
  init () {
    this.add(new Memo({
      categoryId: 0,
      title: 'vue-memo样式更新',
      type: 0,
      content: `给vue-memo的一些按钮添加持续0.2秒、ease-in-out的transition，mouseover时触发`,
    }));
    let memoVL = new Memo({
      categoryId: 2,
      title: 'vue的logo咋越看越漂亮呢',
      type: 1,
    });
    memoVL.getImageData('/src/images/vue-logo.png');
    this.add(memoVL);
    this.add(new Memo({
      categoryId: 1,
      title: '买点东西',
      type: 0,
      content: `蓝月亮袋装洗衣液 乐事薯片飘香麻辣锅味 Marlboro Double Burst`,
    }));
    this.add(new Memo({
      categoryId: 1,
      title: 'Westworld Quote',
      type: 0,
      content: `'By most mechanical and dirty hand
      I shall have such revenges on you both
      The things I will do
      What they are, yet I know not
      But they will be the terrors of the earth'`,
    }));
    let memoWOW = new Memo({
      categoryId: 2,
      title: '凛冬的寒风快点出版啊',
      type: 1,
    });
    memoWOW.getImageData('/src/images/the-winds-of-winter.png');
    this.add(memoWOW);
    this.add(new Memo({
      categoryId: 1,
      title: '意义',
      type: 0,
      content: `「至于卓戈之子雷戈，骑着世界的骏马，我也要送他一件礼物。我要送他那张他母亲的父亲坐过的铁椅子，我要送他七大王国。我，卓戈，卡奥，要做这件事。」他的音量渐高，举起拳头对天呼喊，「我要带着我的卡拉萨向西走到世界尽头，骑着木马横渡黑色咸水，做出古往今来其他卡奥都从来没有做过的事。我要杀死穿铁衣服的人，拆了他们的石头房子。我要强奸他们的女人，抓他们的小孩来做奴隶，把他们无用的神像带回维斯·多斯拉克，向圣母山行礼。我，拔尔勃之子卓戈在此发誓，在圣母山前发誓，以天上群星为证。`,
    }));
  }
}

let store;
if (localStorage.vueMemoStore !== undefined) {
  store = localStorage.vueMemoStore;
} else {
  store = new VueMemoStorage();
  store.init();
}

let a = (JSON.stringify(store));
console.log(JSON.parse(a));

export default store;
