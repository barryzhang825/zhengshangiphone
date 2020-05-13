<template>
	<div class="home">
    <div class="banner">
      <el-carousel trigger="click" height="3.13em" :loop="true">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img class="banner-item" :src="item.url" :alt="item.id">
          <div class="banner-text">{{item.text}}</div>
          <div class="banner-btn" v-show="index==0" @click="goContactUs">立即咨询</div>
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="banner-btn">立即咨询</div> -->
    </div>
    <div class="service">
      <div class="home-plate">
        <div class="home-title">我们的服务</div>
        <div class="home-text">OUR SERVICES</div>
      </div>
      <ul class="service-main">
        <li class="service-item" v-for="(item,index) in serviceList" :key="index">
          <div class="service-img"><img :src="item.url" alt="项目图片"></div>
          <div class="service-title">{{item.title}}</div>
          <div class="service-text">{{item.text}}</div>
        </li>
      </ul>
    </div>
    <div class="case">
      <div class="home-plate">
        <div class="home-title">客户案例</div>
        <div class="home-text">CUSTOMER CASE</div>
      </div>
      <div class="case-box">
        <ul class="case-list">
          <li class="caselist-item" :class="{active:caseIndex==index}" v-for="(item,index) in caseList" :key="index" @click="_caseSelect(index,item.groupName)">{{item.groupName}}</li>
        </ul>
      </div>
      <ul class="case-body">
         <li class="casei-item" v-for="(attr,$index) in caseList[0].caseGroup" :key="$index" @click="goCaseDetail(caseIndex,attr.title)">
           <div class="casei-img" :style="'background-image: url('+attr.url+')'"></div>
           <div class="casei-text">{{attr.title}}</div>
         </li>
       </ul>
      <div class="case-btn" @click="goCase"><span>查看更多<i class="el-icon-d-arrow-right"></i></span></div>
    </div>
    <div class="project-progress">
      <div class="project-title">项目服务流程</div>
      <div class="project-title">PROJECT SERVICE PROCESS</div>
    </div>
    <div class="advantage">
      <div class="home-plate">
        <div class="home-title">我们的优势</div>
        <div class="home-text">OUR ADVANTAGES</div>
      </div>
      <div class="advantage-main">
        <ul class="advantage-main-ul">
        	<li class="adm-item" v-for="(item,index) in advantageList" :key="index">
            <div class="admi-img">
              <img :src="item.url" alt="">
            </div>
            <div class="admi-text">{{item.title}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="news">
      <div class="home-plate">
        <div class="home-title">新闻中心</div>
        <div class="home-text">NEWS</div>
      </div>
      <div class="mews-main">
        <ul class="news-right">
        	<li class="news-item" v-for="(item,index) in newsList" :key="index" @click="gonewsDetailItem(item.title)">
            <div class="newsitem-title">{{item.title}}</div>
            <div class="newsitem-text">{{item.lead}}</div>
            <img class="newsitem-icon" src="../../static/images/news_icon.png" alt="点击查看">
          </li>
        </ul>
      </div>
    </div>
    <div class="partner">
      <div class="home-plate">
        <div class="home-title">合作伙伴</div>
        <div class="home-text">PARTNER</div>
      </div>
      <ul class="partner-main">
      	<li class="partner-item" v-for="(item,index) in partnerList" :key="index"><img :src="item.url" alt="合作伙伴"></li>
      </ul>
    </div>
    <AboutUsDetail></AboutUsDetail>
  </div>
</template>

<script>
  import AboutUsDetail from './aboutUsdetail.vue'
  export default {
    props:{
    },
    data () {
      return {
        bannerList:[],
        serviceList:[],
        advantageList:[],
        newImg:"",
        newTitle:"",
        newLead:"",
        newsList:[],
        partnerList:[],
        full:"full",
        caseList:[{
          caseGroup:[{}]
        }],
        caseIndex:0,
        casUrl:"/official-website/index/getCustomerCase"
      }
    },
    created(){

    },
    mounted (){
      var _this=this;

      //轮播图
      _this.$get('/official-website/index/getSlideshow',{}).then(data=>{
        var seller=JSON.stringify(data);
        //console.log('结果111:'+seller);
        var arrList = data;
        function compare(property){
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          }
        }
        _this.bannerList=arrList.sort(compare('sort'));
        /* _this.$nextTick(()=>{
          //轮播图特效
          _this.$ami('.banner-btn',0,'left','100%',0.9,true);
          _this.$ami('.banner-text',0,'top','100%',0.3,true);
        }); */
      })
      //客户案例
      _this.$get('/official-website/index/getCustomerCase',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        _this.caseList=data;
        //_this.caseList[0].caseGroup.length=10;
        /* _this.$nextTick(()=>{
          $(".case-list li").each(function(index,el){
            //console.log(index,el);
            _this.$ami(el,index*300,'top','100%',1,true);
          });
          _this.$ami('.case-body',500,'bottom','10%',1,true);
          _this.$ami('.case-btn',0,'left','30%',0.1,true);
        }); */
      }).catch(function (error) {
      	console.log(error);
      });
      //我们的服务
      _this.$get('/official-website/index/getOurService',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        _this.serviceList=data;
        _this.serviceList.splice(2,1);
        /* _this.$nextTick(()=>{
          //我们的服务
          _this.$ami('.service-item:nth-child(1)',0,'bottom','80%',0.9,true);
          _this.$ami('.service-item:nth-child(2)',300,'bottom','80%',0.9,true);
          _this.$ami('.service-item:nth-child(3)',600,'bottom','80%',0.9,true);
          _this.$ami('.service-item:nth-child(4)',900,'bottom','80%',0.9,true);
        }); */
      }).catch(function (error) {
      		console.log(error);
      });
      //我们的优势
      _this.$get('/official-website/index/getOurAdvantages',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        _this.advantageList=data;
        _this.$nextTick(()=>{
        $(".adm-item").each(function(index,el){
          //console.log(index,el);
          if(index<5){
            _this.$ami(el,100,'bottom','30%',1,true);
          }
          if(5<index<10){
            _this.$ami(el,500,'bottom','30%',1,true);
          }
        });
        });
      }).catch(function (error) {
      		console.log(error);
      });
      //新闻中心
      _this.$get('/official-website/index/getNews',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        //_this.advantageList=data.data;
        _this.newImg=data.url;
        _this.newTitle=data.title;
        _this.newLead=data.lead;
        _this.newsList=data.rightNews;
        _this.$nextTick(()=>{
          _this.$ami(".news-left",300,'left','20%',1,true);
          $(".news-item").each(function(index,el){
              _this.$ami(el,index*300,'right','10%',1,true);
          });
        });
      }).catch(function (error) {
      		console.log(error);
      });
      //合作伙伴
      _this.$get('/official-website/index/getPartner',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        _this.partnerList=data;
        _this.$nextTick(()=>{
          $(".partner-item").each(function(index,el){
            //console.log(index,el);
            if(index<5){
              _this.$ami(el,100,'bottom','100%',1,true);
            }
            if(5<index<10){
              _this.$ami(el,300,'bottom','100%',1,true);
            }
          });
        });
      }).catch(function (error) {
      		console.log(error);
      });


    },
    components: {
      AboutUsDetail
    },
    computed: {

    },
    methods: {
      goContactUs(){
        this.$router.push('/contactUs');
      },
      _caseSelect(event,name){
        var _this=this;
        _this.caseIndex=event;
        //console.log(event,name);
        if(event==0){
          location.reload();
        }else{
          this.$router.push({path:'/customerCase',query:{index:event,title:name}});
        }
      },
      goNewsDetail(event){
        this.$router.push({path:'/newsCenterDetail',query:{title:event}});
      },
      gonewsDetailItem(event){
        this.$router.push({path:'/newsCenterDetail',query:{title:event}});
      },
      goCaseDetail(index,titleStr){
        var _this=this;
        var name=_this.caseList[index].groupName;
        //console.log(name,titleStr);
        _this.$router.push({
          path:'/customerCaseDetail',
          query:{
            title:titleStr,
            caseGroupName:name,
          },
        });
      },
      goCase(){
        this.$router.push('/customerCase');
      }
    },
    watch: {}
  }
</script>

<style scoped lang="scss">
  .banner-item{
    width: 100%;
    height: 3.13em;
  }
  .banner >>>.el-carousel__button{
    width: 15px;
    height: 3px;
    background-color: #fff;
    border-radius: 3px;
    opacity: 1;
  }
  .banner >>>.el-carousel__indicator.is-active button{
    background-color: #f5ce30;
  }
  .banner{
    position: relative;
  }
  .banner-btn{
    position: absolute;
    bottom: 5em;
    left: 8.5em;
    font-size: 0.2em;
    color: #fff;
    letter-spacing: 2px;
    z-index: 100;
    width: 8em;
    height: 2.667em;
    line-height: 2.667em;
    text-align: center;
    border-radius: 1.3em;
    border: solid 1px #ffffff;
    cursor: pointer;
  }
  .banner-text{
    position: absolute;
    left: 38px;
    top: 50px;
    font-size: 0.28em;
    line-height: 1em;
    letter-spacing: 2px;
    color: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 20, 47, 0.54);
  }
  .home-plate{
    font-size: 0.36em;
    line-height: 1em;
    text-align: center;
    padding-bottom: 0.3em;
  }
  .home-title{
    color: #333;
    margin-bottom: 0.58333em;
  }
  .home-text{
    color: #ccc;
  }
  .service{
    padding:0.6em 0 0 0;
  }
  .service-main{
    padding: 0.6em 0.3em 0 0.3em;
    overflow: hidden;
  }
  .service-item{
    width: 3.3em;
    height: 4em;
    padding: 0 0 0.3em 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 0.3em 0px rgba(204, 204, 204, 0.54);
    border-radius: 10px;
    margin: 0 0.3em 0.3em 0;
    text-align: center;
    float: left;
  }
  .service-item:nth-child(2n){
    margin-right: 0;
  }
  .service-img img{
    width: 1.6em;
    height: 1.6em;
    margin: 0.3em 0.85em 0.2em 0.85em;
  }
  .service-title{
    font-size: 0.3em;
    color: #000000;
    line-height: 1em;
  }
  .service-text{
    font-size: 0.24em;
    color: #666666;
    line-height: 1.5em;
    text-align: left;
    letter-spacing: 1px;
    padding: 1.5em 1.5em 0 1.5em;

    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .case{
    padding:0.3em 0.2em 0.6em 0.2em;
  }
  .case-box{
    width: 100%;
    overflow-x: scroll;
    margin-top: 0.3em;
  }
  .case-box::-webkit-scrollbar {
    display: none;
  }
  .case-list{
    width: 134%;
    height: 0.66em;
    margin:0em 0em 0em 0em;
  }
  .caselist-item{
    font-size: 0.24em;
    color: #292c33;
    line-height: 2.5em;
    cursor: pointer;
    float: left;
    margin-right: 3.333em;
  }
  .caselist-item:last-child{
    margin-right:0;
  }
  .caselist-item.active{
    padding:0 1.3em;
    background-color: #f5ce30;
    color: #fff;
    border-radius: 1.26em;
    margin-right: 2.17em;
  }
  .case-body{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
  }
  .casei-item{
    margin:0.4em 0 0 0;
    width: 3.36em;

    overflow: hidden;
  }
  .casei-item:nth-child(3n){
    /*margin-right: 0;*/
  }
  .casei-item:hover .casei-img{
    transform: scale(1.1);
  }
  .casei-text{
    font-size: 0.24em;
    line-height: 1em;
    color: #333;
    margin-top: 0.5em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .casei-img{
    width: 100%;
    height: 3.36em;
    /*height: 2.08em;*/
    /*margin-bottom: 0.4em;*/
    position: relative;
    border-radius: 0.1em;
    overflow: hidden;

    background-size: cover;
    background-position: center center;
  }
  .casei-img img{
    width: 100%;
    height: 100%;
  }
  .case-btn span{
    display: block;
    font-size: 0.24em;
    color: #185ee0;
    line-height: 3.3334em;
    border:0.083333em solid #185ee0;
    border-radius: 2em;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
  }

  .project-progress{
    width: 100%;
    height: 8.05em;
    background-image: url("../../static/images/background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .project-title{
    text-align: center;
    font-size: 0.36em;
    line-height: 1em;
    letter-spacing: 2px;
    color: #ffffff;
  }
  .project-title:first-child{
    padding:1.39em 0 0.5556em 0;
  }
  .advantage{
    padding:0.6em 0 0 0;
  }
  .advantage-main-ul{
    overflow: hidden;
    padding:0.55em 0.3em 0 0.3em;
  }
  .adm-item{
    float: left;
    width: 3.3em;
    height: 4em;
    background-color: #ffffff;
    box-shadow: 0px 0px 0.5em 0px rgba(214, 214, 214, 0.54);
    border-radius: 0.1em;
    margin: 0 0.3em 0.3em 0;
  }
  .adm-item:nth-child(2n){
    margin-right: 0;
  }
  .adm-item img{
      width: 56%;
      height: auto;
      max-height: 70%;
    }
  .admi-img{
    height:3em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .admi-text{
    font-size: 0.28em;
    line-height: 1em;
    color: #333333;
    text-align: center;
  }
  .news{
    margin:0.3em 0 0 0;
  }
  .mews-main{
    margin:0.6em 0.3em 0 0.3em;
  }
  .news-img{
    width: 4em;
    height: 3.12em;
    overflow: hidden;
  }
  .news-img img{
    width: 100%;
    height: 100%;
  }
  .news-left:hover img{
    animation: fadeIn 1s linear;
  }
  .news-title{
    font-size: 0.24em;
    color: #333;
    margin:0.8em 1.54em 0.834em 1.54em;
    line-height: 1em;
  }
  .news-text{
    font-size: 0.14em;
    color: #333;
    margin:0 2.628em 2em 2.628em;
    line-height: 1.7143em;
  }
  .news-title,.news-text{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
  }
  .news-left{
    box-shadow: 0px 0px 0.2em 0px #cccccc;
    border-radius: 0.2em;
    width: 4em;
    cursor: pointer;
  }
  .newsitem-title{
    font-size: 0.24em;
    color: #333;
  }
  .newsitem-text{
    font-size: 0.16em;
    color: #333;
  }
  .news-item{
    padding:0 0.9em 0.24em 0.3em;
    background-color: #ffffff;
    box-shadow: 0px 0px 0.2em 0px #cccccc;
    border-radius: 0.1em;
    position: relative;
    margin-bottom: 0.3em;
    cursor: pointer;
  }
  .news-item:last-child{
    margin-bottom: 0;
  }
  .news-item:hover{
    box-shadow: 0 0 0.3em #185EE0;
  }
  .newsitem-title{
    font-size: 0.24em;
    color: #333;
    line-height: 1em;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    position: static;
    text-align: left;
    padding: 1em 0;
  }
  .newsitem-text{
    font-size: 0.2em;
    line-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
  }
  .newsitem-icon{
    width: 0.36em;
    height: 0.36em;
    position: absolute;
    right: 0.3em;
    top: 0.5em;
    cursor: pointer;
  }
  .partner{
    margin:0.63em 0.3em 0 0.3em;
  }
  .partner-main{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.6em;
  }
  .partner-item{
    width: 3.3em;
    height: 1.4em;
    box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.75);
    margin:0 0.3em 0.25em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .partner-item:nth-child(2n){
    margin-right: 0
  }
  .partner-item img{
    max-width: 60%;
    max-height: 80%;
  }
  .about{
    margin:0.2em 3.6em 0 3.6em;
  }
  .about-main{
    display: flex;
    justify-content: space-between;
    margin: 0.55em 0 0.46em 0;
  }
  .about-text{
    margin: 0.25em 0 0 0.38em;
  }
  .about-text >>>p{
    font-size: 0.18em;
    line-height: 2.22em;
    color: #1a1a1a;
    text-align: left;
    text-indent:2em;
    margin-bottom: 2.34em;
  }

  .about-text p:last-child{
    margin-bottom:0;
  }

  .project-title{
    text-align: center;
    font-size: 0.36em;
    line-height: 1em;
    letter-spacing: 2px;
    color: #ffffff;
  }
  .project-title:first-child{
    padding:1.39em 0 0.5556em 0;
  }
  .project-main{
    margin: 0.64em 3.6em 0 3.6em;
    display: flex;
    justify-content: flex-start;
  }
  .project-item img{
    width:1.76em;
    height: auto;
    margin-left: -0.2em;
  }
  .project-item:first-child img{
    margin-left: -0.16em;
  }
  .project-icon img{
    width:0.73em;
    height: 0.56em;
    margin: 1.3em 0 0 -0.2em;
  }
  .project-item.pimg1{
    margin: 0.98em 0 0 0;
  }
  .project-item.pimg2{
    margin: 1.26em 0 0 0;
  }
  .project-item.pimg3{
    margin:1.05em 0 0 0;
  }
  /* Chrome, Safari, Opera */
  @-webkit-keyframes advantagemove {
    100% {-webkit-transform: rotateY(360deg);}
  }
  @keyframes advantagemove {
    100% {transform: rotateY(360deg);}
  }
  /* Chrome, Safari, Opera */
  @-webkit-keyframes fadeIn {
    100% {-webkit-transform: scale(1.2);}
  }
  @keyframes fadeIn {
    100% {transform: scale(1.2);}
  }

</style>
