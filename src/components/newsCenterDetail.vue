<template>
	<div class="news">
		<Header :currentN="partValue"></Header>
		<div class="banner">
			<div class="banner-text">用专业的技术，为您提供最佳的解决方案</div>
		</div>
    <!-- <div><p><span style="font-weight:700;font-size:16px;color:#191919;font-family:&quot;background-color:#FFFFFF;">“我们需要从渠道角色，营销目标，社区媒体等多个维度，重新认识社区营销。”</span></p></div> -->
		<div class="news-deatil" v-html="newsContent"></div>
	</div>
</template>

<style scoped>
  .banner{
    width: 100%;
    height: 4.2em;
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
    color: #ffffff;
    text-shadow: 0px 3px 5px rgba(51, 51, 51, 0.5);
  }
  /deep/ .news-deatil img{
    width: 100%;
  }
  .news-deatil{
    padding:0.5em 0.3em 0.6em 0.3em;
    overflow: hidden;
  }
  .news-deatil >>>h1 {
    font-size: 0.24em;
  }
  .news-deatil >>>h2 {
    font-size: 0.22em;
  }
  .news-deatil >>>h3 {
    font-size: 0.18em;
  }
  .news-deatil >>>h4 {
    font-size: 0.16em;
  }
  .news-deatil >>>h5 {
    font-size: 0.12em;
  }
  .news-deatil >>>h6 {
    font-size: 0.1em;
  }
  .news-deatil >>>p,.news-deatil >>>div,.news-deatil >>>span,.news-deatil >>>a,.news-deatil >>>ul,.news-deatil >>>li{
    font-size: 0.12em;
  }
  /* .news-deatil >>>p{
    text-indent: 2em;
  } */
</style>
<script >
	import pagination from './pagination.vue'
	import Header from './header';
  import axios from 'axios'

	export default {
    props:{
    },
    data () {
      return {
        partValue:3,
        newsContent:""
      };
    },
    created(){

    },
    mounted (){
      var _this=this;
      _this.$ami('.banner-text',0,'center','0%',0.1,true);
      //console.log(_this.$route.query.title);
      var titleStr={title:_this.$route.query.title};
      _this.$get('/official-website/newsPageDetail/getNewsText',titleStr).then(data=>{
        var seller=JSON.stringify(data);
        //console.log('结果:'+seller);
        _this.newsContent=data;
      })
    },
    components: {
      Header,
      pagination
    },
    computed: {

    },
    methods: {

    },
    watch: {}
	}
</script>
