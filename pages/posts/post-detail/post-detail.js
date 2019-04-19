// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var collected;
    // 接收传参
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
      // posts_content: postsData.local_database
    });
    // 设置同步缓存 永久有效 缓存的上限最大不能超过10M
    // wx.setStorageSync('key', {
    //   game:"风暴英雄",
    //   developer:"暴雪"
    // });
    // wx.setStorageSync('key1', {
    //   game:'lol',
    //   developer:'拳头'
    // })

    // 假设一下数据结构为收藏与否的状态
    // var postsCollected = {
    //   0:"true",
    //   2:'false',
    //   3:'true'
    //   ...
    // }
    // 是否被收藏
    var postsCollected = wx.getStorageSync('posts_Collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        // 要保证postsCollected 和 postCollected 同时存在
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic : true
      })
    }
    this.setAudioMonitor();

  },
  setAudioMonitor: function() {
    var that = this
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })
  },
  onCollectionTap: function(event) {
    // var game = wx.getStorageSync('key');
    // console.log(game);
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showModal(postsCollected, postCollected);
  },
  showToast: function(postsCollected, postCollected) {
    // 更新文章是否被收藏的缓存值
    wx.setStorageSync('posts_Collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
     wx.showToast({
      title: postCollected ? '收藏成功' : ' 取消成功',
      icon: 'success',
      duration: 1000
    })
  },
  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    if (!isPlayingMusic) {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    }
  },
  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '是否收藏该文章？' : '取消收藏该文章？',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confrimColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          // 更新文章是否被收藏的缓存值
          wx.setStorageSync('posts_Collected', postsCollected);
          that.showToast(postsCollected, postCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  onShareTap: function(event) {
    // wx.removeStorageSync('key');
    // 清除所有缓存
    // wx.clearStorageSync();
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // res.cancel 用户是否点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + "现在无法实现分享功能",
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})