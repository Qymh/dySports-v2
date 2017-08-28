import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
    template:`
        <footer>
            <div class="joinUs">
                <div class="btn-join">
                    <i class="icon-bt-招商管理"></i>
                    <a href="#/agent#apply">我要申请招商代理</a>
                </div>
                <div class="tel">
                    <i class="icon-bt-"></i>
                    <img src="../../static/images/bt-dianhua.png">
                </div>
            </div>
            <div class="address">
                <div class="company">
                    动跃科技成都有限公司
                </div>
                <div class="add">
                    地址:四川成都高新区天府五街菁蓉国际广场
                </div>
            </div>
        </footer>
    `
})