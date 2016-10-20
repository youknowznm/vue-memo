/*
只提供工作、生活、学习3个类别
*/
const toReadableDate = (timeStamp) => {
  let dateObj = new Date(timeStamp);
  const toTwoDigits = (str) => {
    if (str.valueOf() < 10) {
      return '0' + str;
    }
    return str;
  }
  return `${toTwoDigits(dateObj.getMonth() + 1)}-${toTwoDigits(dateObj.getDate())}, ${toTwoDigits(dateObj.getHours())}:${toTwoDigits(dateObj.getMinutes())}`;
};

class Memo {
  constructor(obj) {
    // 1工作 2生活 3学习
    this.categoryId = obj.categoryId;
    // 20字符内的字符串
    this.title = obj.title;
    // 0文字 1涂鸦
    this.type = obj.type;
    // 类别为文字时，字符串；为涂鸦时，imageData
    this.content = obj.content;
    // 创建时的时间戳（#为了以 json 保存，转换为字符串）
    this.timeStamp = toReadableDate(Date.parse(new Date()));
    // 默认未完成
    this.isCompleted = false;
    // 修改是否完成（受涂鸦内容的影响）
    this.modificationDone = true;
  }
  // 取得260*260图片的 imageData
  getImageData (imageUrl) {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', 260);
    canvas.setAttribute('height', 260);
    let image = new Image();
    image.src = imageUrl;
    // 图片加载是异步操作。先修改标识为未完成，加载完改回去
    this.modificationDone = false;
    image.onload = () => {
      canvas.getContext('2d').drawImage(image, 0, 0);
      this.content = canvas.toDataURL();
      this.modificationDone = true;
    };
  }
}

class VueMemoStore {
  constructor () {
    this.memos = [];
  }
  loadFromLocalStorage () {
    this.memos = JSON.parse(localStorage.getItem('store')).memos;
  }
  saveToLocalStorage () {
    // imgData 加载完成后再进行保存
    let allModificationDoneFlag = setInterval(() => {
      if (!this.memos.some((item) => {
        return item.modificationDone === false;
      })) {
        clearInterval(allModificationDoneFlag);
        localStorage.setItem('store', JSON.stringify(this));
      }
    }, 10);
  }
  add (memo) {
    this.memos.push(memo);
  }
  remove (memo) {
    this.memos.splice(this.memos.indexOf(memo), 1);
  }
  update (memo, newMemo) {
    this.memos.splice(this.memos.indexOf(memo), 1, newMemo);
  }
  init () {

    let m1 = new Memo({
      categoryId: 3,
      title: '1. 样式引用',
      type: 0,
      content: `这个应用使用了[Bootstrap](https://www.getbootstrap.com)的导航栏样式和栅格系统，主体部分的背景来自[V2EX](https://www.v2ex.com)。`
    });
    m1.timeStamp = toReadableDate(new Date(Date.parse('Oct 8, 2016')));
    this.add(m1);

    let m2 = new Memo({
      categoryId: 3,
      title: '2. 原来vue 2.0不向下兼容',
      type: 0,
      content: `一开始就傻乎乎的对照着1.0优美的中文文档写，发现各种无法解决的问题，后来才发现2是不向下兼容的：\n\n a. 周期钩子命名改变\n\n b. 使用\`v-html\`特性代替三大括号的html文本插值\n\n c. 弃用\`filterBy\`、\`orderBy\`等过滤器，提倡使用\`computed\`对象\n\n d. \`$dispatch\`、\`$broadcast\`、\`events\`居然都废弃了…这时我忍不了了，果断改用1.0`
    });
    m2.timeStamp = toReadableDate(new Date(Date.parse('Oct 1, 2016')));
    this.add(m2);

    let m3 = new Memo({
      categoryId: 3,
      title: '3. vue的logo细看还挺不错的',
      type: 1,
    });
    m3.timeStamp = toReadableDate(new Date(Date.parse('Oct 6, 2016')));
    m3.getImageData('./src/images/vue-logo.png');
    this.add(m3);

    let m4 = new Memo({
      categoryId: 2,
      title: '4. 购物',
      type: 0,
      content: `* 蓝月亮袋装洗衣液\n\n * 乐事薯片飘香麻辣锅味\n\n * **Marlboro Double Burst** \n\nType-C 连接线`,
    });
    m4.timeStamp = toReadableDate(new Date(Date.parse('Oct 7, 2016')));
    this.add(m4);

    let m5 = new Memo({
      categoryId: 1,
      title: '6. Westworld - Quote',
      type: 0,
      content: `> By most mechanical and dirty hand,\n\n> I shall have such revenges on you both.\n\n> The things I will do,\n\n> what they are yet I know not,\n\n> but they will be the terrors of the earth.`,
    });
    m5.timeStamp = toReadableDate(new Date(Date.parse('Oct 4, 2016')));
    this.add(m5);

    let m6 = new Memo({
      categoryId: 2,
      title: '5. 凛冬的寒风快点出版啊！！',
      type: 1,
    });
    m6.timeStamp = toReadableDate(new Date(Date.parse('Oct 5, 2016')));
    m6.getImageData('./src/images/the-winds-of-winter.png');
    this.add(m6);

    let m7 = new Memo({
      categoryId: 1,
      title: '7. Khal Drogo - Quote',
      type: 0,
      content: `> **「至于卓戈之子雷戈，骑着世界的骏马，我也要送他一件礼物。我要送他那张他母亲的父亲坐过的铁椅子，我要送他七大王国。我，卓戈，卡奥，要做这件事。」他的音量渐高，举起拳头对天呼喊，「我要带着我的卡拉萨向西走到世界尽头，骑着木马横渡黑色咸水，做出古往今来其他卡奥都从来没有做过的事。我要杀死穿铁衣服的人，拆了他们的石头房子。我要强奸他们的女人，抓他们的小孩来做奴隶，把他们无用的神像带回维斯·多斯拉克，向圣母山行礼。我，拔尔勃之子卓戈在此发誓，在圣母山前发誓，以天上群星为证。」**`,
    });
    m7.timeStamp = toReadableDate(new Date(Date.parse('Oct 3, 2016')));
    this.add(m7);

    let m8 = new Memo({
      categoryId: 2,
      title: '8. 30 Seconds To Mars',
      type: 1,
    });
    m8.timeStamp = toReadableDate(new Date(Date.parse('Oct 2, 2016')));
    m8.getImageData('./src/images/30stm.png');
    this.add(m8);


    this.saveToLocalStorage();
  }
}

let store = new VueMemoStore();

if (localStorage.getItem('store') !== null) {
  store.loadFromLocalStorage();
} else {
  store.init();
}

let storeUtil = {
  store,
  Memo,
}

export default storeUtil;
