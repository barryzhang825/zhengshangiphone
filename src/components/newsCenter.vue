<template>
  <div class="news">
    <div class="banner">
      <div class="banner-text">用专业的技术，为您提供最佳的解决方案</div>
    </div>
    <div class="case">
      <PaginationHeader :url="casUrl"  @selectIndex="selectAxiox"></PaginationHeader>
      <ul class="case-body">
        <li class="casei-item" v-for="(attr,$index) in caseList" :key="$index" @click="goNewsDetail(attr.title)">
          <div class="casei-img"><img :src="attr.url" alt="图片"></div>
          <div class="newsi">
            <div class="newsi-text">{{attr.title}}</div>
            <div class="newsi-time"><span class="el-icon-time"></span>{{attr.newsTime}}</div>
            <div class="newsi-lead">{{attr.lead}}</div>
          </div>
        </li>
      </ul>
      <div class="look-more">
        <div class="lookm-text" @click="getMore">加载更多>></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .case >>>.case-list{
    width: 110%;
  }
  .banner{
    width: 100%;
    height: 2.68em;
    background-image: url("../../static/images/news_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banner-text{
    font-size: 0.34em;
    line-height: 1em;
    letter-spacing: 2px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0px 3px 5px rgba(51, 51, 51, 0.5);
  }
  .case{
    margin:0.3em 0.3em 0.6em 0.3em;
  }
  .case-body{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.5em;
  }
  .casei-item{
    margin-bottom: 0.3em;
    box-shadow: 0px 0px 20px 0px rgba(203, 203, 203, 0.54);
    border-radius: 0.2em;
    overflow: hidden;
    cursor: pointer;
  }
  .casei-text{
    font-size: 0.24em;
    line-height: 1em;
    color: #333;
    padding-top: 1.25em;
  }
  .caseii-half{
    width: 2.8em;
    height: 2.8em;
  }
  .casei-img{
    width: 100%;
    height: 3em;
    overflow: hidden;
  }
  .casei-img img{
    width: 100%;
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
  .newsi{
    margin: 0.3em;
    overflow: hidden;
    text-align: left;
  }
  .newsi-text{
    font-size: 0.24em;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .newsi-time{
    color: #999;
    font-size: 0.2em;
    margin:14px 0 10px 0;
  }
  .newsi-time span{
    display: inline-block;
    font-size: 1.5em;
    vertical-align: middle;
    margin-right: 7px;
  }
  .newsi-lead{
    font-size: 0.2em;
    color: #666;
    line-height: 2em;

    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  /* Chrome, Safari, Opera */
  @-webkit-keyframes fadeIn {
    100% {-webkit-transform: scale(1.1);}
  }
  @keyframes fadeIn {
    100% {transform: scale(1.1);}
  }
</style>
<script type='ecmascript-6'>
  import PaginationHeader from './paginationHeader';

	export default {
    props:{
    },
    data () {
      return {
        caseList:[{}],
        caseIndex:0,
        casUrl:"/official-website/newsPageDetail/getNewsGroupName",
        totalPages:1,  //默认总页数为1
        currentNav:"公司新闻", //默认当前类别
        selectItemPage:1  ,//默认选中页面
        pageNumber:6,  //默认每页显示条数
        count:1  //点击次数
      };
    },
    created(){

    },
    mounted (){
      var _this=this;
      _this.$get('/official-website/newsPageDetail/getNewsPageDetail',{}).then(data=>{
        var seller=JSON.stringify(data);
        //console.log('结果:'+seller);
        _this.caseList=data.list;
        _this.totalPages=data.pages;
        _this.$nextTick(()=>{
          _this.$ami('.banner-text',100,'center','0%',0.1,true);
          _this.$ami('.case-body',500,'bottom','10%',1,true);
        });
      })
    },
    components: {
      PaginationHeader
    },
    computed: {

    },
    methods: {
      _caseSelect(event){
        var _this=this;
        _this.caseIndex=event;
      },
      selectAxiox(index){
        //console.log(index);
        var _this=this;
        _this.currentNav=index;
        var dataObject={
          pageNum:1,
          newsGroupName:_this.currentNav,
          pageSize:_this.pageNumber
        }
        _this.$get('/official-website/newsPageDetail/getNewsPageDetail',dataObject).then(data=>{
          var seller=JSON.stringify(data);
          //console.log('结果:'+seller);
          _this.caseList=data.list;
          _this.totalPages=data.pages;
          _this.$nextTick(()=>{
            _this.$ami('.case-body',500,'bottom','10%',1,true);
          });
        })
      },
      goNewsDetail(event){
        //console.log(event);
        //this.$router.push({path: ''/order/index''});
        //this.$router.push({name:'/customerCaseDetail',params:{title:event}});
        this.$router.push({path:'/newsCenterDetail',query:{title:event}});

        //this.$route.query.name和this.$route.params.name。
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

        _this.$get('/official-website/newsPageDetail/getNewsPageDetail',dataObject).then(data=>{
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
