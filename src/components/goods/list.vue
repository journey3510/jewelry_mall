<template>
  <div class="goods-container">
    <div class="goods-title">
      <div class="after" />
      {{ title }}
    </div>
    <div v-if="type=='navImg'" class="nav-img">
      <van-swipe
        :autoplay="3000"
      >
        <van-swipe-item
          class="swipe-item"
        >
          <div v-for="(item,index) in list" :key="index" class="item">
            <img :src="item" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-list
      v-model="vantLoading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      :offset="1"
      @load="onLoad"
    >
      <div id="list-content" class="goods-list">
        <van-cell v-for="(item,index) in goodsList" :key="index" class="goods-item" @click="tapDetail(item.guid)">
          <van-skeleton title avatar :row="2" :loading="loading">
            <div class="goods-img">
              <img :src="item.item_img" alt="">
            </div>
            <div class="goods-info">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="small-title">
                {{ item.name }}
              </div>
              <div class="info">
                <div class="price"><span>￥</span><span>{{ item.price }}</span></div>
                <div class="cart-icon">
                  <img :src="addcatrImg" alt="">
                </div>
              </div>
            </div>
          </van-skeleton>
        </van-cell>
      </div>
    </van-list>
    <!-- {{ type }} -->
  </div>
</template>

<script>
import { goodsListApi, goodsSearch } from '../../api/goods'

export default {
  name: 'Goods',
  props: ['type', 'title', 'optionId', 'category', 'search'],
  data() {
    return {
      pageSize: 6,
      pageNum: 1,
      vantLoading: false,
      loading: true,
      list: [],
      goodsList: [],
      finished: false,
      addcatrImg: require('../../assets/images/addcatr.png'),
      word: this.search
    }
  },
  watch: {
    search: {
      handler(n, o) {
        this.word = n
        this.goodsList = []
        this.title = '搜索结果'
        this.searchList()
      },
      deep: true // 深度监听父组件传过来对象变化
    }
  },
  created() {
    if (this.type === 'goods') {
      if (this.title === undefined) {
        // this.title = '全部'
      }
      this.getGoodsList()
    }
    if (this.type === 'search') {
      this.searchList()
    }
  },
  mounted() {
    const winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.minHeight = (winHeight - 140) + 'px' // 调整上拉加载框高度
  },
  methods: {
    getGoodsList() {
      const { pageSize, pageNum, optionId, category } = this
      const params = {
        pageSize,
        pageNum,
        optionId,
        category
      }
      goodsListApi(params).then(res => {
        if (res.code === 200) {
          this.vantLoading = false
          const goodsList = this.goodsList || []
          this.goodsList = [...goodsList, ...res.data]
          this.loading = false
          // 表示没有下一页了
          if (res.data.length < pageSize) {
            this.finished = true
          }
        }
      })
    },
    searchList() {
      const { pageSize, pageNum, word } = this
      const params = {
        pageSize,
        pageNum,
        'name': word
      }
      goodsSearch(params).then(res => {
        console.log('res: ', res)
        if (res.code === 200) {
          this.vantLoading = false
          const goodsList = this.goodsList || []
          this.goodsList = [...goodsList, ...res.data]
          this.loading = false
          // 表示没有下一页了
          if (res.data.length < pageSize) {
            this.finished = true
          }
        }
      })
    },
    onLoad() {
      this.pageNum++
      this.getGoodsList()
    },
    tapDetail(id) {
      this.$router.push({
        name: 'detail',
        params: { id }
      })
    }
  }
}

</script>
<style lang="less" scope>
    .goods-title{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 13px;
        box-sizing: border-box;
        width:132px;
        font-size:16px;
        font-weight:500;
        color:rgba(151,118,80,1);
        .after{
            width: 3px;
            height:11px;
            background:linear-gradient(0deg,rgba(255,212,145,1),rgba(212,157,70,1));
            border-radius:2px;
            margin-right:13px;
        }
    }
    .swipe-item{
        padding:0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        flex-wrap:wrap;
        .item{
            width: 111px;
            height:111px;
            margin-right:9px;
            margin-bottom:9px;
            &:nth-child(3n+0){
                margin-right: 0;
            }
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
    .goods-list{
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
         flex-wrap: wrap;
    }

    .goods-item{
        width: 170px;
        height: 240px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(135,135,135,0.16);
        border-radius:3px;
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 0 !important;
        line-height:18px  !important;
        .goods-img{
            width:170px;
            height: 170px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .goods-info{
            flex: 1;
            padding: 0 10px;
            .title{
                white-space: nowrap;
                text-overflow: ellipsis;
                /*overflow: hidden;*/
                word-break: break-all;
                font-size:15px;
                font-weight:500;
                color:rgba(51,51,51,1);
                margin: 8px 0 5px 0;
            }
            .small-title{
                font-size:12px;
                font-weight:500;
                color:rgba(120,120,120,1);
            }
            .info{
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #E55050;
                .price{
                    span:nth-child(2){
                        font-size:18px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(229,80,80,1);
                    }
                }
                .cart-icon{
                    width:23px;
                    height: 23px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
        }
    }
    .van-list__loading{
        width: 100%;
        // height: 50px;
    }
    .van-list__finished-text{
          width: 100%;
          display: block;
          text-align:center;
    }
</style>

