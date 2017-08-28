import Vue from 'vue'
import $ from 'jquery'

export default Vue.extend({
    props:['index','value'],
    data () {
        return {
            test:this.index,
            imgTest:this.index
        }
    },
    computed: {
      imgIndex(){
          var innner=Number.parseInt(this.imgTest)*2+1
          return Number.parseInt(this.imgTest)*2+1
      }
    },
    template:`
        <div class="slideLeftBox">
            <div class="relativeBox">
                <div class="description">
                    <slot></slot>
                    <div class="category"
                        v-for="cate in value">
                        <div class="title">
                            {{cate.title}}
                        </div>
                        <div class="msg">
                            {{cate.msg}}
                        </div>
                    </div>
                </div>
                <div class="imgBox">
                    <img :src="'../static/images/'+this.imgIndex+'.png'">
                </div>
            </div>
        </div>
    `
})