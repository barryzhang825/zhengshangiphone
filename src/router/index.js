import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import AboutUs from '@/components/aboutUs'
import BusinessArea from '@/components/businessArea'
import CustomerCase from '@/components/customerCase'
import CustomerCaseDetail from '@/components/customerCaseDetail'
import NewsCenter from '@/components/newsCenter'
import NewsCenterDetail from '@/components/newsCenterDetail'
import ContactUs from '@/components/contactUs'
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect:"/Home"},   //重定向（默认首页）
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/businessArea',
      name: 'BusinessArea',
      component: BusinessArea
    },
    {
      path: '/customerCase',
      name: 'CustomerCase',
      component: CustomerCase
    },
    {
      path: '/customerCaseDetail',
      name: 'CustomerCaseDetail',
      component: CustomerCaseDetail
    },
    {
      path: '/newsCenter',
      name: 'NewsCenter',
      component: NewsCenter
    },
    {
      path: '/newsCenterDetail',
      name: 'NewsCenterDetail',
      component: NewsCenterDetail
    },
    {
      path: '/contactUs',
      name: 'ContactUs',
      component: ContactUs
    }
  ]
})
