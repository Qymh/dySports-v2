<template>
    <div class="expert">
        <div class="imgShowExpert">
            <img src="/static/images/zhuanjiatuandui.jpg">
            <div class="text">
                <div class="first">
                    欢迎来到动跃健康
                </div>
                <div class="second">
                    致力于青少年健康产业-为青少年成长保驾护航
                </div>
            </div>
        </div>
        <div class="captionExpert">
            专家团队
        </div>
        <div class="steam">
            <div class="persen"
              v-for="expert in experts">
                <span class="icon">
                    <i class="icon-用户"></i>
                </span>
                <div class="name">
                    {{expert.name}}
                </div>
                <div class="introduce">
                    {{expert.introduce}}
                </div>
            </div>
            <div class="line">

            </div>
        </div>
        <div class="contact">
            <div class="contactBox">
                <div class="title">
                    联系我们
                </div>
                <img src="../../static/images/us.png" class="information">
                <div class="erweima">
                    <div class="chunk">
                        <img src="../../static/images/erweima.jpg">
                        <span>动跃健康</span>
                    </div>
                    <div class="chunk">
                        <img src="../../static/images/erweima2.jpg">
                        <span>动跃体育</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default({
        data () {
            return {
                experts:[
                    {name:'毛俐亚',introduce:'成都体育学院教授，硕士生导师，国家省部级重点课题负责人，省部级创新团队带头人，四川省体育健身促进会会长。'},
                    {name:'高 扬',introduce:'成都体育学院三级教授，硕士与博士研究生导师，教务处处长。'},
                    {name:'胡惠芳',introduce:'体育人文社会学专业体育理论硕士，讲师。'},
                    {name:'廖远朋',introduce:'博士，副教授，硕士生导师，成都体育学院运动与健康学院院长。'},
                    {name:'杨成波',introduce:'北京体育大学博士、乒乓球国际级蓝牌裁判，曾担任世界乒乓球锦标赛裁判员、全国体育院校乒乓球比赛裁判长。'},
                    {name:'张乾伟',introduce:'成都体育学院足球教研室书记、副主任、硕士生导师，足球国家级裁判、C级教练员、全国校园足球讲师。'},
                    {name:'牟晓君',introduce:'成都体育学院田径教研室副主任，国家一级裁判员。'},
                    {name:'王世伟',introduce:'博士、讲师、排球国家级裁判、现代五项国际级裁判。'},
                    {name:'张智祥',introduce:'讲师，体操方面于2017年1月获国家发明专利。'},
                    {name:'罗小兵',introduce:'硕士研究生，运动医学科主任，成都医学会运动医学分会学术秘书、委员。'},
                    {name:'罗安元',introduce:'硕士研究生，讲师。'}
                ]
            }
        },
        mounted () {
            var $steam=$('.steam')
            var $line=$('.line')
            var height=$steam.height()
            var $lis=$('.nav').find('li')
            var absurl=window.location.hash
            var $topNav=$('.topNav')
            $('.line').height(height)
            $lis.removeClass('focus')
            $topNav.css({
                position:'fixed'
            })
            switch(absurl){
                case '#/':
                    $lis.eq(0).addClass('focus')
                    break;
                case '#/agent':
                    $lis.eq(1).addClass('focus')
                    break;
                case '#/expert':
                    $lis.eq(2).addClass('focus')
                    break;
            }
        },
        beforeRouteEnter: (to, from, next) => {
            var li=$('.nav ul li')
            var path=to.path
            li.removeClass('focus')
            if(path=="/expert"){
                li.eq(2).addClass('focus')
            }
            document.body.scrollTop=0
            document.documentElement.scrollTop=0
            document.scrollTop=0
            $('body').css({
                overflowX:'scroll',
                overflowY:'scroll'
            })
            next()
        }
    })
</script>

<style lang="scss">
    @import '../style/base/reset';
    @import '../style/scss/expert';
</style>

