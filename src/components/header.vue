<template>
	<div class="header-box">
    <div class="main">
      <div class="main-left" @click="goHome">
        <img src="../../static/images/LOGO_iphone.png" alt="公司logo">
      </div>
      <div class="main-right" @click="navFun">
        <img src="../../static/images/header_nav.png" alt="nav">
      </div>
    </div>
    <div class="nav-box" v-show="open">
      <ul class="nav">
        <router-link v-for="(item,index) in navList" :key="index" class="nav-text" tag="li" :to="{name:item.url}">
          <div class="text" @click="closeNav">{{item.text}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
    },
    data () {
      return {
        open:false,
        navList:[
          {
            text:'首页',
            url:'Home'
          },
          {
            text:'业务领域',
            url:'BusinessArea'
          },
          {
            text:'客户案例',
            url:'CustomerCase'
          },
          {
            text:'新闻中心',
            url:'NewsCenter'
          },
          {
            text:'关于我们',
            url:'AboutUs'
          },
          {
            text:'联系我们',
            url:'ContactUs'
          }
        ]
      };
    },
    created(){

    },
    mounted (){


    },
    components: {
      //Footer
    },
    computed: {

    },
    methods: {
      goHome(){
        this.$router.push('/home');
      },
      navFun(){
        this.open=true;
      },
      closeNav(){
        this.open=false;
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 10;
  }
  .main{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0.18em 0.3em;
    .main-left img{
      width: 1.46em;
      height: 0.34em;
    }
    .main-right img{
      width: 0.26em;
      height: 0.22em;
    }
    .main-left img,.main-right img{
      display: flex;
      justify-content: flex-start;
    }
  }
  .nav-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    .nav{
      padding-top: 0.7em;
      .nav-text{
        background-color: #fff;
        border-top: 0.01em solid #f2f2f2;
      }
      .nav-text .text{
        text-align: center;
        font-size: 0.24em;
        line-height:3.67em;
      }
    }
  }
</style>
