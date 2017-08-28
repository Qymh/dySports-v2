import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
    props:['date'],
    template:`
        <div class="one">
            <div class="text">
                {{date.msg}}
            </div>
            <div class="time">
                {{date.time}}
            </div>
        </div>
    `
})