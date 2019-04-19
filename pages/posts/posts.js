// pages/posts/posts.js
// 只能用相对路径
var postsData = require('../../data/posts-data.js')
Page({
  // 处理用户交互逻辑
  // 产生事件-》捕捉事件（回调函数（处理事件））
  /**
   * 页面的初始数据
   */
  data: {
    // 单向数据绑定，页面中的值不能  自动  改变js中的值
    date: 'Nov 20 2016',
    title: '正是虾肥蟹壮时'

  },

  /**
   * 1 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var posts_content = [{
    //   date: "Sep 18 2016",
    //   title: "正是虾肥蟹壮时",
    //   imgSrc: "/images/post/crab.png",
    //   avatar: "/images/avatar/1.png",
    //   content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，",
    //   reading: "112",
    //   collection: "96",
    // }, {
    //   title: "比利·林恩的中场故事",
    //   content: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
    //   imgSrc: "/images/post/bl.png",
    //   reading: 62,
    //   collection: 92,
    //   date: "Nov 20 2016",
    //   avatar: "/images/avatar/1.png",
    // }]
    // 给数组一个整体的名字，因为posts_content是一个数组，我们setData必须是一个对象，所以此处需要转化。如果posts_content是一个对象直接 this.setData(posts_content);
    // this.setData({
    //   posts_key:posts_content
    //   });
    // es6 简写
    this.setData({
      posts_content: postsData.postList
      // posts_content: postsData.local_database
    });
  },
  onPostTap:function(event){
    
    // dataset 所有自定义属性的集合 postid
    var postId = event.currentTarget.dataset.postid;
    console.log('postId:'+postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId,
  //   })
  // },
  onSwiperTap: function(event){
    // target指的是当前点击的组件 image， currentTarget 事件捕获的组件 swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }
})