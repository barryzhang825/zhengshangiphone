<template>
	<div class="footer-box">
    <!-- <div class="map-img">
      <img src="../../static/images/map.png" alt="公司地址">
    </div> -->
    <div class="info-text">
      QQ邮箱 ：943870975@qq.com <br />
      联系电话：15238699705<br />
      办公地址：郑州市郑东新区金水东路绿地新都会6号楼1521/1522
    </div>
    <div class="info-text">
      COPYRIGHT 2020 河南正尚网络科技有限公司版权所有<br />
      <span class="go-info" @click="goYuFun">ALL RIGHTS RESERVED 豫ICP备20012527号-1</span>
     </div>
  </div>
</template>

<script>
  export default {
    props:{
    },
    data () {
      return {

      };
    },
    created(){

    },
    mounted (){


    },
    components: {

    },
    computed: {

    },
    methods: {
      goYuFun(){
        //window.location.href='http://www.miit.gov.cn/';  //当前窗口
        window.open('http://www.miit.gov.cn/'); //新窗口
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .footer-box{
    width: 100%;
    background-color: #333;
    padding: 0.5em 0 0 0;
  }
  .map-img{
    padding: 0.6em 0.82em 0.5em 0.82em;
  }
  .map-img img{
    width:100%;
    height: 5em;
  }
  .information{
    padding-top: 0.36em;
  }
  .info-text{
    font-size: 0.22em;
    line-height: 1.4em;
    color: #cccccc;
    text-align: left;
    padding-left: 1.36em;
  }
  .info-text:last-child{
    padding:3.182em 0 2.73em 1.36em;
  }
</style>
