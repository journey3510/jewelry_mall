<template>
  <div class="goods-Banner" />
</template>

<script>

export default {
  name: 'Banner',
  props: {
    data: Object,
    title: {
      type: String,
      default: '标题'
    },
    type: {
      type: String,
      default: 'navImg'
    },
    optionId: {

    }
  },
  data() {
    return {

    }
  },
  created: function() {

  },
  mounted() {
  },
  methods: {
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
        height: 255px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(135,135,135,0.16);
        border-radius:3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 0 !important;
        line-height:18px !important;
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
        height: 50px;
    }
    .van-list__finished-text{
          width: 100%;
          display: block;
          text-align:center;
    }
</style>

