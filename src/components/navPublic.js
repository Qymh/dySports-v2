import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
    template:`
    <div class="topNav">
        <a href="#/" class="logo">
            <img src="static/images/logo2.png">
        </a>
        <nav class="nav">
            <ul>
                <li :class="index==0?'focus':''"
                v-for="(nav,index) in topNav">
                    <router-link :to="nav.path">
                        {{nav.msg}}
                    </router-link>
                </li>
            </ul>  
        </nav>
        <transition name="weixin"
          enter-active-class="animated swing">
            <div v-show="weixinStatus" class="weixin"
            @mouseover="showErweima"
            @mouseout="hideErweima"
            >
                <span>微信公众号</span>
            </div>
        </transition>
        <div
            
            class="weixinBox"
            @mouseover="showErweima"
            @mouseout="hideErweima"
        >
            <div class="contactBox">
                <img src="../../static/images/us.png" class="information">
                <div class="erweima">
                    <div class="chunk">
                        <img src="../../static/images/erweima.jpg">
                        <span>动跃健康</span>
                    </div>
                    <div class="chunk">
                        <img src="../../static/images/erweima.jpg">
                        <span>动跃体育</span>
                    </div>
                </div>
            </div>
        </div>
        <a target="_blank" href="http://web.jiankangtiyu.com/index/systemIndex.do" class="login">
            登录
        </a>
    </div>
    `,
    data () {
        return {
            topNav:[
                {msg:'产品介绍',path:'/'},
                {msg:'招商代理',path:'/agent'},
                {msg:'专家团队',path:'/expert'}
            ],
            weixinStatus:false
        }
    },
    mounted () {
        var that=this
      setTimeout(function(){
        that.weixinStatus=true
      },500)  
    },
    methods: {
        showErweima(){
            var $weixinBox=$('.weixinBox')
            $weixinBox.stop().show().animate({
                opacity:1
            })
        },
        hideErweima(){
            var $weixinBox=$('.weixinBox')
            $weixinBox.stop().hide().animate({
                opacity:0
            })
        }
    }
})