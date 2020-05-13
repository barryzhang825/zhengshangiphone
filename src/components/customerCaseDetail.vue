<template>
  <div class="customer">
    <div class="custom-banner">
      <div class="cusban-phone"><img src="../../static/images/customer_phone.png" alt=""></div>
      <div class="cusban-title">
        <div class="cusbant-text">以用户体验为中心</div>
        <div class="cusbant-text">打造有价值的产品</div>
      </div>
    </div>
    <div class="ccd-main">
      <div class="ccdmr-top">
        <div class="ccdmr-title">{{title}}</div>
        <div class="ccdm-text text">{{type}}</div>
        <div class="ccdm-text desc">{{desc}}</div>
      </div>
      <div class="ccdmr-img"><img :src="image" alt=""></div>
      <div class="ccdm-right">
        <div class="ccdm-btn" @click="goCase()"><span>返回列表页</span></div>
        <div class="ccdm-like">猜你喜欢<br /><span>YOU MAY ALSO LIKE</span></div>
        <div class="ccdmlk-box">
          <ul class="ccdmlk-ul">
            <li class="ccdm-item" v-for="(item,index) in cusdetailList" :key="index" @click="goCaseDetail(item.caseName,item.groupName)">
              <div class="ccdmi-img"><img :src="item.url" alt=""></div>
              <div class="ccdmi-text">{{item.caseName}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .custom-banner{
    width: 100%;
    height: 2.7em;
    background-image: url("../../static/images/customer_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
  }
  .cusban-phone{
    margin:0.3em 0 0 0em;
  }
  .cusban-phone img{
    width: 4em;
    height: 2.22em;
  }
  .cusban-title{
    margin:0.8em 0.3em 0 0;
  }
  .cusbant-text{
    font-size: 0.34em;
    line-height: 1em;
    color: #ffffff;
    text-shadow: 0px 3px 5px rgba(51, 51, 51, 0.5);
    text-align: right;
  }
  .cusbant-text:first-child{
    padding-bottom: 0.3em;
  }

  .ccd-main{
    margin:0.5em 0.3em 0.6em 0.3em;
  }
  .ccdm-left{
    margin-right: 0.4em;
    width: 8em;
  }
  .ccdm-left img{
    width: 100%;
  }
  .ccdm-right{

  }
  .ccdmr-img img{
    width: 100%;
  }
  .ccdmr-top{


  }
  .ccdmr-title{
    font-size: 0.28em;
    line-height: 1em;
    color: #333;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  .ccdm-text{
    font-size: 0.22em;
    line-height: 1.86em;
    color: #808080;
  }
  .ccdm-text.text{
    margin-bottom: 0.3em;
  }
  .ccdm-btn{
    height: 0.88em;
    background-color: #f5ce30;
    border-radius: 0.44em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin:0.5em 0 0.7em 0;
  }
  .ccdm-btn:hover{
    box-shadow: 0 0.1em 0.2em #999;
  }
  .ccdm-btn span{
    font-size: 0.28em;
    color: #fff;
  }
  .ccdm-like{
    font-size: 0.36em;
    color: #333;
    text-align: center;
  }
  .ccdm-like span{
    color: #cccccc;
    display: inline-block;
    padding-top: 0.6em;
  }
  .ccdm-like{
    margin-bottom: 1.67em;
  }
  .ccdm-item{
    margin-right: 0.18em;
  }
  .ccdmi-text{
    font-size: 0.26em;
    color: #333;
    text-align: center;
  }
  .ccdmi-img{
    width: 2.8em;
    height: 2.8em;
    margin:0 auto 0.3em auto;
    overflow: hidden;
  }
  .ccdmi-img img{
    width: 100%;
  }
  .ccdmlk-box{
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .ccdmlk-ul{
    width: 133%;
    padding-bottom: 0.1em;
    display: flex;
    justify-content: flex-start;
  }
</style>
<script type='ecmascript-6'>
	import Header from './header';
  //import CustomerCaseDetail from './customerCaseDetail.vue';

	export default {
    props:{
    },
    data () {
      return {
        partValue:2,
        caseImg:"../../static/images/customer_detail.png",
        cusdetailList:[],
        image:"",
        title:"",
        type:"",
        desc:""
      };
    },
    created(){

    },
    mounted (){
      var _this=this;
      _this.$ami('.cusban-phone img',0,'left','10%',0.5,true);
      _this.$ami('.cusban-title',0,'right','10%',0.5,true);
      var titleStr={
        caseName:_this.$route.query.title,
        caseGroupName:_this.$route.query.caseGroupName
      };
      //console.log(titleStr);
      _this.$get('/official-website/customerCase/customerCasepageDetail',titleStr).then(data=>{
        var seller=JSON.stringify(data);
        //console.log('结果111:'+seller);
        _this.title = data.caseName;
        _this.type=data.groupName;
        _this.desc=data.detail;
        _this.image=data.url;
        _this.cusdetailList=data.guessYouLike;

        _this.$nextTick(()=>{
          _this.$ami('.ccdmr-title',0,'right','30%',0.5,true);
          _this.$ami('.text',300,'right','30%',0.9,true);
          _this.$ami('.desc',600,'right','30%',0.9,true);
          _this.$ami('.ccdm-btn',900,'right','30%',0.9,true);
          _this.$ami('.ccdm-item img',0,'center','0%',0.3,true);
        });

      });
      //location.reload();
    },
    components: {
      Header,
      //CustomerCaseDetail
    },
    computed: {

    },
    methods: {
      goCase(){
        var _this=this;
        _this.$router.push('/customerCase');
      },
      goCaseDetail(ag,name){
        //console.log(name)
        var _this=this;
        _this.$router.push({
          path:'/customerCaseDetail',
          query:{
            title:ag,
            caseGroupName:name,
          },
        });
        location.reload();
      }
    },
    watch: {}
	}
</script>
