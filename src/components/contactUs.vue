<template>
   <div class="contact">
    <div class="banner" @click="textFun">
    	<div class="banner-text contant-text">您只需要有想法，剩下的交给我们</div>
    </div>
    <div class="map" id="map"></div>
    <div class="contact-form">
      <img class="ccf-img" src="../../static/images/concat_bg1.png" alt="">
      <form class="cmxform" id="signupForm">
        <div class="confom-main">
          <div class="confomm-left">
            <div class="confomml-name"><input id="name" name="name" v-model="name" type="text" placeholder="请输入姓名"></div>
            <div class="confomml-name"><input id="phone" name="phone" v-model="phone" type="text" placeholder="请输入手机号码"></div>
          </div>
          <div class="confomm-right"><textarea id="desc" name="desc" v-model="desc" rows="3" type="textarea" placeholder="请输入简单需求（如网站建设、APP开发、软件开发、小程序开发等）"></textarea></div>
        </div>
        <div class="confom-btn"><button type="submit" @click.stop="contactGet">免费获取项目方案和报价</button></div>
      </form>

    </div>
  </div>
</template>
<style scoped>
  .banner{
    width: 100%;
    height: 2.7em;
    background-image: url("../../static/images/concat_bg.png");
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
  .map{
    margin:4.2em 2.2em 0 2.2em;
    height: 30em;
    font-size: 0.14em;
  }
  .contact >>>.map>div{
    width: 100%;
    height: 30em;
  }
  .contact-form{
    margin:1em 0.3em 1.42em 0.3em;
    padding: 0 0.3em;
    position: relative;
    padding:1em 1em 0.36em 1em;
    box-shadow: 0px 0px 20px 0px rgba(203, 203, 203, 0.54);
    border-radius: 20px 10px 10px 10px;
  }
  .ccf-img{
    width: 3.2em;
    height: 0.8em;
    position: absolute;
    top: -0.42em;
    left: calc(50% - 1.6em);
  }
  .confom-main{

  }
  .confomml-name,.confomm-right{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .confomml-name input,.confomm-right textarea{
    width: 100%;
    font-size: 0.22em;
    border: solid 1px #e5e5e5;
    padding:1em;
  }
  .confomml-name input{
    line-height: 1em;
  }
  .confomml-name{
    margin-bottom: 0.2em;
  }
  .confomm-right textarea{
    line-height: 30px;
  }
  .confom-btn{
    text-align: center;
    margin: 0.4em 0 0.04em 0;
    display: flex;
    justify-content: flex-start;
  }
  .confom-btn button{
    width: 100%;
    font-size: 14px;
    line-height: 44px;
    color: #fff;
    border: none;
    outline: none;
    background-color: #f5ce30;
    border-radius: 30px;
    cursor: pointer;
  }
  .confomml-name,.confomm-right{
    position: relative;
  }
  .confomml-name >>>label.error,.confomm-right >>>label.error{
    font-size: 12px;
    color: #f00;
    position: absolute;
    right: 0;
    bottom: 10px;
    z-index: 10;
  }
</style>

<script type='ecmascript-6'>
  import { Message, Loading } from 'element-ui'
  import axios from 'axios'
	export default {
    props:{
    },
    data () {
      return {
        name: '',
        phone: '',
        desc: ''
      };

    },
    created(){

    },
    mounted (){
      var _this=this;
      _this.$nextTick(()=>{
        _this.$ami('.contant-text',0,'center','0',0.1,true);
        _this.$ami('.map',0,'center','0',0.1,true);
        _this.$ami('.contact-form',0,'center','0',0.1,true);

      });
      //创建和初始化地图函数：
      function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMapOverlay();//向地图添加覆盖物
      }
      function createMap(){
        map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(113.774275,34.777003),19);
      }
      function setMapEvent(){
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom()
      }
      function addClickHandler(target,window){
        //PC端
        /* target.addEventListener("click",function(){
          target.openInfoWindow(window);
        }); */
        //移动端
        var xArr = [];//存放横坐标
        var yArr = [];//存放纵坐标
        target.addEventListener("tap", function(e){
            //手指触摸屏幕的时候清空两个数组
            xArr.length = 0;
            yArr.length = 0;
        });

        target.addEventListener("touchmove",function(e){
            //如果滑动了屏幕，xArr和yArr将各存入两个坐标值，即始末坐标值
            xArr.push(e.targetTouches[0].pageX);
            yArr.push(e.targetTouches[0].pageY);
        });

        target.addEventListener('touchend',function(e){
            var far;
            var flag = true;
            //计算平移距离，区分滑动事件和点击事件
            if((xArr.length > 1) && (yArr.length > 1)){
                far = (Math.abs(xArr[0]-xArr[1]))^2 + (Math.abs(yArr[0]-yArr[1]))^2;
                if(far > 0){
                    flag = false;
                }
            }
            if(xArr.length==0&&yArr.length == 0){
              target.openInfoWindow(window);
            }
        });

      }
      function addMapOverlay(){
        var markers = [
          {content:"郑州市郑东新区金水东路绿地新都会6号楼1522",title:"河南正尚网络科技有限公司",imageOffset: {width:-46,height:-21},position:{lat:34.776862,lng:113.774518}}
        ];
        for(var index = 0; index < markers.length; index++ ){
          var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
          var marker = new BMap.Marker(point,{icon:new BMap.Icon("https://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
            imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
          })});
          var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
          var opts = {
            width: 200,
            title: markers[index].title,
            enableMessage: false
          };
          var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
          //marker.setLabel(label);
          addClickHandler(marker,infoWindow);
          map.addOverlay(marker);
        };
      }

      //向地图添加控件
      function addMapControl(){
        var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
        map.addControl(scaleControl);
        var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(navControl);
        var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false});
        map.addControl(overviewControl);
      }
      var map;
      initMap();
    },
    components: {
    },
    computed: {
      dataArr(){
        var _this=this;
        var data={
          name:_this.name,
          phoneNumber:_this.phone,
          need:_this.desc
        };

        return data;
      }
    },
    methods: {
      textFun(){
        axios({
          method:'post',
          url:'https://www.zhengshangwl.com/contactUs/projectNeed',
          data:{
            name:"haha",
            phoneNumber:"15038305394",
            need:"2222",
          },
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        }).then((res)=>{
            console.log(res);
        }).catch(function (error) {
            console.log(error);
        });
      },
      contactGet(){
        var _this=this;
        var dataStr=_this.dataArr;
        jQuery.validator.addMethod("isMobile", function(value, element) {
            var length = value.length;
            var mobile = /^1[34578]\d{9}$/;   ///^1(3|4|5|7|8)\d{9}$/
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写您的手机号码");
        $("#signupForm").validate({
            rules: {
              name: "required",
              phone:{
                required: true,
                minlength: 11,
                maxlength:11,
                digits:true,
                number:true,
                isMobile : true
              },
              desc:"required",
            },
            messages: {
              name: "不能为空！",
              phone:{
                required: "不能为空！",
                minlength: "必须11位数字",
                maxlength:"必须11位数字",
                digits:"必须是数字"    ,
                number:"请输入有效数字",
                isMobile : "手机号格式错误"
              },
              desc: "不能为空！",
            },
            submitHandler:function(form) {
              var _this=this;
              //console.log(dataStr);
              axios({
                method:'post',
                url:'https://www.zhengshangwl.com/contactUs/projectNeed',
                data:dataStr,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj){
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  }
                  return str.join("&");
                }
              }).then((res)=>{
                //console.log(res);
                Message({
                  message: '提交成功！',
                  type: 'success',
                  duration:1500,
                  onClose(){
                    location.reload();
                  }
                });
              }).catch(function (error) {
                //console.log(error);
                Message.error('出错！');
              });
            }
        });
      }
    },
    watch: {
    }
	}
</script>
