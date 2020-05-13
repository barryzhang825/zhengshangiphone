<template>
  <div id="app">
    <Header></Header>
    <!-- <keep-alive>
    	<router-view></router-view>
    </keep-alive> -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/header.vue';
  import Footer from './components/footer.vue';
  export default {
    name: 'App',
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
      Header,
      Footer
    },
    computed: {

    },
    methods: {

    },
    watch: {}
  }
</script>

<style>
  @import "./common/reset.scss";
  #app {
    margin-top: 0.7em;
  }
  .el-message{
    min-width: 3em;
    top: 50% !important;
  }
  .el-message__icon{
    font-size: 0.36em;
  }
</style>
