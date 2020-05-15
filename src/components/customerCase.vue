<template>
  <div class="customer">
    <Header :currentN="partValue"></Header>
    <div class="custom-banner">
      <div class="cusban-phone"><img src="../../static/images/customer_phone.png" alt=""></div>
      <div class="cusban-title">
        <div class="cusbant-text">以用户体验为中心</div>
        <div class="cusbant-text">打造有价值的产品</div>
      </div>
    </div>
    <div class="case">
      <PaginationHeader :url="casUrl" :current="currentIndex" @selectIndex="selectAxiox"></PaginationHeader>
      <ul class="case-body">
        <li class="casei-item" v-for="(attr,$index) in caseList" :key="$index" @click="goCaseDetail(attr.caseName)">
          <div class="casei-img"><img :src="attr.url" alt="图片"></div>
          <div class="casei-text">{{attr.caseName}}</div>
        </li>
      </ul>
    </div>
    <div class="look-more">
      <div class="lookm-text" @click="getMore">加载更多>></div>
    </div>
  </div>
</template>

<script>
  import PaginationHeader from './paginationHeader';
  import Pagination from './pagination';

  export default {
    props:{
    },
    data () {
      return {
        partValue:2,
        caseList:[],
        caseIndex:0,
        casUrl:"/customerCase/getCustomerCaseGroupName",
        totalPages:1,  //默认总页数为1
        currentNav:"APP开发", //默认当前类别
        selectItemPage:1  ,//默认选中页面
        pageNumber:8,  //默认每页显示条数
        currentIndex:0,
        count:1  //点击次数
      };
    },
    created(){

    },
    beforeMount(){

    },
    mounted (){
      var _this=this;
      //console.log(Number(_this.$route.query.index),_this.$route.query.title);
      if(_this.$route.query.title){
        _this.currentNav=_this.$route.query.title;
        _this.currentIndex=Number(_this.$route.query.index);
        var dataObject={
          pageNum:1,
          caseGroupName:_this.currentNav,
          pageSize:_this.pageNumber
        }

      }else{
        var dataObject={

        }
      }

      _this.$get('/customerCase/getCustomerCaseByPage',dataObject).then(data=>{
        var seller=JSON.stringify(data);
        //console.log('结果:'+seller);
        _this.caseList=data.list;
        _this.totalPages=data.pages;
        //console.log(_this.totalPages);
        _this.$nextTick(()=>{
          _this.$ami('.cusban-phone',0,'left','30%',0.5,true);
          _this.$ami('.cusban-title',0,'right','30%',0.5,true);
          _this.$ami('.case-body',500,'bottom','10%',1,true);
        });
      })
    },
    components: {
      PaginationHeader,
      Pagination
    },
    computed: {

    },
    methods: {
      selectAxiox(index){
        //console.log(index);
        var _this=this;
        _this.currentNav=index;
        _this.count=1;
        var dataObject={
          pageNum:1,
          caseGroupName:_this.currentNav,
          pageSize:_this.pageNumber
        }
        _this.$get('/customerCase/getCustomerCaseByPage',dataObject).then(data=>{
          var seller=JSON.stringify(data);
          //console.log('结果:'+seller);
          _this.caseList=data.list;
          _this.totalPages=data.pages;
          _this.$nextTick(()=>{
            _this.$ami('.case-body',500,'bottom','10%',1,true);
          });
        })
      },
      pageAxios(page){
        //console.log(page);
        var _this=this;
        _this.selectItemPage=page;
        var dataObject={
          pageNum:_this.selectItemPage,
          caseGroupName:_this.currentNav,
          pageSize:_this.pageNumber
        }
        //console.log(dataObject);
        _this.$get('/customerCase/getCustomerCaseByPage',dataObject).then(data=>{
          var seller=JSON.stringify(data);
          //console.log('结果:'+seller);
          _this.caseList=data.list;
          _this.totalPages=data.pages;
        })
      },
      goCaseDetail(ag){
        var _this=this;
        _this.$router.push({
          path:'/customerCaseDetail',
          query:{
            title:ag,
            caseGroupName:_this.currentNav,
          },
        });
      },
      getMore(){
        var _this=this;
        _this.count++;
        //console.log(_this.count);
        if(_this.count>_this.totalPages){
          _this.$message({
            message: '加载完成！',
            type: 'error',
            duration:1500
          });
          return
        }
        var arrList=_this.caseList;
        if(_this.$route.query.title){
          _this.currentNav=_this.$route.query.title;
          _this.currentIndex=Number(_this.$route.query.index);
          var dataObject={
            pageNum:_this.count,
            caseGroupName:_this.currentNav,
            pageSize:_this.pageNumber
          }

        }else{
          var dataObject={
            pageNum:_this.count
          }
        }

        _this.$get('/customerCase/getCustomerCaseByPage',dataObject).then(data=>{
          var seller=JSON.stringify(data);
          //console.log('结果:'+seller);
          var countList=data.list;  //当前数组
          _this.caseList=arrList.concat(countList);
          //console.log(_this.caseList);
          /* _this.$nextTick(()=>{
            _this.$ami('.cusban-phone',0,'left','30%',0.5,true);
            _this.$ami('.cusban-title',0,'right','30%',0.5,true);
            _this.$ami('.case-body',500,'bottom','10%',1,true);
          }); */
        })
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  .case{
    margin:0.3em 0.3em 0 0.3em;
    overflow: hidden;
  }
  .case-body{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
  }
  .casei-item{
    margin:0em 0.18em 0.5em 0;
    cursor: pointer;
    width: 3.36em;
    overflow: hidden;
  }
  .casei-item:nth-child(2n){
    margin-right: 0;
  }
  .casei-item:hover .casei-img{
    animation: fadeIn 1s linear;
  }
  .casei-text{
    font-size: 0.24em;
    line-height: 1em;
    color: #333;
    padding-top: 1.25em;
    text-align: center;
  }
  .casei-img{
    width: 3.36em;
    height: 3.36em;
    overflow: hidden;
  }
  .casei-img img{
    width: 100%;
    height: 100%;
  }
  /* Chrome, Safari, Opera */
  @-webkit-keyframes fadeIn {
    100% {-webkit-transform: scale(1.1);}
  }
  @keyframes fadeIn {
    100% {transform: scale(1.1);}
  }
  .look-more{
    margin:0.1em 0.3em 0.6em 0.3em;
    border: 0.01em solid #185ee0;
    border-radius: 0.4em;
    height: 0.8em;
  }
  .lookm-text{
    color: #185ee0;
    font-size: 0.24em;
    line-height: 3.33em;
    text-align: center;
  }
</style>
