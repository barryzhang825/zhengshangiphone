<template>
  <div class="about">
    <div class="home-plate">
      <div class="home-title">关于我们</div>
      <div class="home-text">ABOUT US</div>
    </div>
    <div class="about-main">
      <div class="about-img"><img :src="aboutUsImg" alt="关于我们"></div>
      <div class="about-text" v-html="aboutUsText"></div>
    </div>
  </div>
</template>

<style scoped>
  .home-plate{
    font-size: 0.36em;
    line-height: 1em;
    text-align: center;
  }
  .home-title{
    color: #333;
    margin-bottom: 0.58333em;
  }
  .home-text{
    color: #ccc;
  }
  .about{
    margin:0.6em 0.3em 0 0.3em;
  }
  .about-main{
    margin: 0.55em 0 0.5em 0;
  }
  .about-text{
    margin: 0.32em 0 0 0.38em;
  }
  .about-text >>>p{
    font-size: 0.24em;
    line-height: 1.6667em;
    color: #1a1a1a;
    text-align: left;
    text-indent:2em;
    margin-bottom: 2.34em;
  }

  .about-text p:last-child{
    margin-bottom:0;
  }
  .about-img{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .about-img img{
    width: 100%;
    height: auto;
  }
</style>
<script type='ecmascript-6'>
  //import {scrollRevealFun} from './../common/common.js'

	export default {
    props:{
    },
    data () {
      return {
        aboutUsImg:"",
        aboutUsText:""
      };
    },
    created(){

    },
    mounted (){
      var _this=this;
      //关于我们
      _this.$get('/index/getAboutUs',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        _this.aboutUsImg=data.url;
        _this.aboutUsText=data.text;
        /* _this.$nextTick(()=>{
          _this.$ami(".about-img",0,'center','0',0.2,true);
          _this.$ami(".about-text",0,'right','30%',1,true);
        }); */
      }).catch(function (error) {
      		console.log(error);
      });
    },
    components: {

    },
    computed: {

    },
    methods: {

    },
    watch: {}
	}
</script>
