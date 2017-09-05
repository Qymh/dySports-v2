<template>
    <div class="dySports">
        <!-- 大图展示 -->
        <div class="imgShowBox">
            <h1 class="title">
                每个孩子享受健康运动
            </h1>
            <p class="details">
                免安装 | 云储存 | 易操作 | 舒适的体验 | 丰富的功能
            </p>
            <a @click="toUse" href="javascript:void(0)">
                立即使用
            </a>     
        </div>

        <!-- 固定导航 -->
        <div class="fixNav" v-show="fixNavShow">
            <div class="relativeBox">
                <a href="#/" class="fixLogo" v-show="logoShow" @click="toUp">
                    <img src="static/images/logo2.png">
                </a>
                <nav>
                    <ul>
                        <li @click="scrollToSlide($event)"
                        :class="index==0?'focus':''" 
                        v-for="(nav,index) in fixNav"
                          >
                            {{nav}}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="slideBox">
            <div class="oneChunk"
              v-for="(title,index) in slideTitle">
                <left-slide :value="title.firstText" :index="index">
                    <div class="captionHome">
                        <span class="second">{{title.second}}</span>
                    </div>
                </left-slide>

                <right-slide :value="title.secondText" :index="index">
                    <div class="captionHome">
                        <span class="second">{{title.two}}</span>
                    </div>
                </right-slide>
            </div>
        </div>

        <div class="homeInformation">
            <div class="homeInformationBox">
                <div class="title">
                    <span class="first">动跃体育教学管理系统</span>
                    <span class="second">免费使用</span>
                </div>
                <div class="detail">
                    请填写下面的信息,提交后有专人与您联系
                </div>
                <form
                  @submit.prevent="homeSend"
                  name="homeInformation"
                  novalidate>
                    <p>
                        <label for="userName">
                            <span>*</span>
                            姓名
                        </label>
                        <input
                          placeholder="请输入您的姓名"
                          type="text"
                          id="userName"
                          name="user[name]"
                          v-validate="'required'">
                        <span v-show="errors.has('user[name]')
                          &&'fields.user[name] \
                          && fields.user[name].dirty'">姓名不能为空</span>
                    </p>          
                    <p>
                        <label for="userScholl">
                            <span>*</span>
                            学校
                            </label>
                        <input
                          placeholder="请输入您所在的学校名称"
                          type="text" id="userSchool"
                          name="user[School]"
                          v-validate="'required'">
                        <span v-show="errors.has('user[School]')
                          &&'fields.user[School] \
                          && fields.user[School].dirty'">学校名称不能为空</span>
                    </p>          
                    <p>
                        <label for="userAddress">
                            <span>*</span>
                            地址
                            </label>
                        <input
                          placeholder="请输入学校地址"
                          type="text" id="userAddress"
                          name="user[addRess]"
                          v-validate="'required'">
                        <span v-show="errors.has('user[addRess]')
                          &&'fields.user[addRess] \
                          && fields.user[addRess].dirty'">学校地址不能为空</span>
                    </p>          
                    <p>
                        <label for="userTel">
                            <span>*</span>
                            电话
                            </label>
                        <input
                          placeholder="请输入您的电话号码"
                          type="text"
                          id="userTel"
                          name="user[tel]"
                          v-validate="'required|numeric'">
                        <span v-show="errors.has('user[tel]')
                          &&'fields.user[tel] \
                          && fields.user[tel].dirty'">电话格式不正确</span>
                    </p>   
                    <p>
                        <label for="userMessage">
                            <pre style="display:inline-block"> </pre>
                             留言
                            </label>
                        <input placeholder="请输入您的留言" type="text" id="userMessage" name="user[message]">
                    </p>
                    <p>
                        <button type="submit">立即申请</button>    
                    </p>          
                </form>
            </div>
        </div>

        <div class="toUp"
          @click="toUp"
          v-show="toUpShow">
            <i class="icon-uniE903"></i>
        </div>
    </div>
</template>
<script>
    // 左偏移幻灯
    import leftSlide
    from '../components/home/leftSlide'

    // 右偏移幻灯
    import rightSlide
    from '../components/home/rightSlide'

    // jq
    import $ from 'jquery'

    // vue验证器
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';

    // 引入中文验证
    import zh_CN from 'vee-validate/dist/locale/zh_CN'
    import { Validator } from 'vee-validate';

    Validator.addLocale(zh_CN);

    Vue.use(VeeValidate,{
        locale: 'zh_CN'
    })

    // vue-resource
    import VueResource from 'vue-resource'

    // alert
    import Alert from '../components/alert'

    Vue.use(VueResource)

    // 滑动定时器
    var outerDate=new Date().getTime()

    export default({
        data () {
            return {
                fixNav:[
                    '健康档案','素质分析','家庭作业',
                    '锻炼记录','日常任务','运动视频',
                    '教学素材','风险防范'
                ],
                alert:'',
                logoShow:false,
                toUpShow:false,
                fixNavShow:false,
                slideHeight:0,
                fixNavOffsetTop:0,
                showErweima:false,
                slideTitle:[
                    {
                        first:'学生',
                        second:'健康档案',
                        third:'STUDENT HEALTH FILE',
                        firstText:[
                            {title:'雷达图表',
                            msg:`直观表达学生身体素质及运动健康素质`},
                            {title:'健康提醒',
                            msg:`家长可对孩子状况做提醒,教师在备课时心中有数,降低运动风险`
                            },
                            {title:'成长档案',
                            msg:`记录孩子的健康成长档案`}
                        ],
                        one:'学生',
                        two:'素质分析',
                        three:'ANALYSIS OF STUDENT QUALITY',
                        secondText:[
                            {title:'统计跟踪',
                            msg:`根据学生各种指标,并持续跟踪身体发展趋势`},
                            {title:'监管报告',
                            msg:`可切换个人展示、班级、全校展示,已满足不同层级需求的监管及报告`
                            },
                        ]
                    },
                    {
                        first:'学生',
                        second:'家庭作业',
                        third:'STUDENT HOMEWOK',
                        firstText:[
                            {title:'匹配体质',
                            msg:`系统根据教师授课内容及班级学生水平,自动匹配适宜学生成长的家庭作业`},
                            {title:'个性化',
                            msg:`家庭作业一键即可生成,适宜学生成长的家庭作业`
                            },
                        ],
                        one:'学生',
                        two:'锻炼记录',
                        three:'STUDENT EXERCISE RECORD',
                        secondText:[
                            {title:'成长记录',
                            msg:`存在微信公众号,对孩子每天的家庭作业进行辅导及记录
                            `},
                            {title:'锻炼效果',
                            msg:`对锻炼效果进行评估统计`
                            },
                        ]
                    },
                    {
                        first:'教师',
                        second:'日常任务',
                        third:'TEACHER DALIY EDUCATION',
                        firstText:[
                            {title:'教学管理',
                            msg:`教学计划,单元计划,计划进度,满足教师不同需求的日常办公
                            `},
                            {title:'智能课程',
                            msg:`授课内容管理,排课管理,算法匹配教学内容
                            `
                            },
                            {title:'教学分析与评价',
                            msg:`评价权重设置,教师评价,学生评价,评价维护,学生成绩查询分析,教师教学成果比较,班级间比较,各汇总表
                            `
                            }
                        ],
                        one:'运动',
                        two:'运动视频',
                        three:'SPORT VIDEO LIBRARY',
                        secondText:[
                            {title:'自动匹配视频',
                            msg:`教师每节课的教案中,自动匹配需要授课的动作视频
                            `},
                            {title:'语音讲解',
                            msg:`语音讲解视频,满足教师备课前备课,课中演示,课后家庭作业等场景应用
                            `
                            },
                            {title:'图文说明',
                            msg:`视频图文说明,满足教师课前备课,课中演示,课后家庭作业等场景应用
                            `
                            },
                        ]
                    },
                    {
                        first:'教师',
                        second:'教学素材',
                        third:'TEACHER TEACHING MATERTAL',
                        firstText:[
                            {title:'教学教案',
                            msg:`由成都体育学院教授组织编撰,涵盖了各水平阶段的具体教学教案
                            `},
                            {title:'组织形式图示',
                            msg:`每节课的教案中,根据教案内容匹配适用的组织形式参考图
                            `
                            },
                            {title:'动作视频',
                            msg:`在教案中,涵盖了每节课所需的教学视频,供教师参考及授课演示
                            `
                            },
                        ],
                        one:'运动',
                        two:'风险防范',
                        three:'SPORT RISK PREVENTION',
                        secondText:[
                            {title:'心率曲线',
                            msg:`教师每节课的教案中,根据教案内容,显示本课堂的心率变化
                            `},
                            {title:'授课强度',
                            msg:`提升训练强度,注意事项,为教师授课提供参考支撑
                            `
                            },
                            {title:'预防措施',
                            msg:`预防措施,为教师授课提供参考支撑
                            `
                            }
                        ]
                    }
                ]
            }
        },
        mounted () {
            // 滚动事件
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll',this.scroll,false);
            }

            // 滚动事件
            window.onmousewheel=document.onmousewheel=this.scroll;//IE/Opera/Chrome

            // 获取固定导航的top
            var $fixNav=$('.fixNav')
            var fixNavHeight=Number.parseInt(
                $fixNav.offset().top
            )
            this.fixNavOffsetTop=fixNavHeight

            var $left=$('.slideLeftBox')
            var $right=$('.slideRightBox')
            var $topNav=$('.topNav')
            
            $topNav.css({
                position:'relative'
            })

            // 页面视口高度
            var baseHeight=document.documentElement.clientHeight
            ||document.body.clientHeight
            
            // 设置一屏为视口高度
            $('.slideLeftBox,.slideRightBox').css({
                height:baseHeight
            })

            // 图片加顶部导航设置为视口高度
            var topNavHeight=$('.topNav').height()

            $('.imgShowBox').css({
                height:baseHeight,
                marginTop:-topNavHeight
            })

            $('.homeInformation').css({
                height:baseHeight
            })

            this.Alert=Alert
            
            // 去除尾部
            $('footer').remove()

            // 改变导航样式
            $('.nav a').css({
                color:'#fff'
            })

            $('.topNav').css({
                backgroundColor:''
            })

            $('.weixin span').css({
                color:'#fff'
            })

            $('.logo img').attr('src','static/images/logo3.png')
        },
        components:{
            leftSlide:leftSlide,
            rightSlide:rightSlide
        },
        methods: {
            // 滚动到各个栏目
            scrollToSlide(e){
                var resume=$('#app')
                var index=$(e.target).index()+1
                var baseHeight=document.documentElement.clientHeight||
                document.body.clientHeight
                var $sib=$(e.target).siblings().removeClass('focus')
                setTimeout(()=>{
                    $(e.target).addClass('focus')
                })
                resume.animate({
                    top:-index*baseHeight
                })
            },
            // 返回顶部
            toUp(){
                $('#app').animate({
                    top:0
                },200)

                var that=this

                setTimeout(()=>{
                    // 固定导航栏
                    that.fixNavShow=false
                    // logo
                    that.logoShow=false
                    // 返回最顶部
                    that.toUpShow=false
                })
            },
            // 查看详情
            toUse(){
                var baseHeight=document.documentElement.clientHeight||
                document.body.clientHeight
                var $lis=$('.fixNav').find('li')
                $lis.removeClass('focus')

                // 固定导航栏
                this.fixNavShow=true
                // logo
                this.logoShow=true
                // 返回最顶部
                this.toUpShow=true

                $('#app').animate({
                    top:-baseHeight*9
                })
            },
            // 表单提交
            homeSend($event){
                this.$validator.validateAll().then(result=>{
                    if(result){
                        var postResource=
                        this.$resource('http://123.56.14.80:7777/homeInformation')
                        
                        var name=$('#userName').val() // 名字
                        var school=$('#userSchool').val() // 学校
                        var address=$('#userAddress').val() // 地址
                        var tel=$('#userTel').val() // 电话
                        var msg=$('#userMessage').val() // 留言

                        var user={
                            userName:name,
                            schoolName:school,
                            address:address,
                            mobile:tel,
                            content:msg||'暂无留言'
                        }

                        var Alert=this.Alert.Alert
                        Alert.loading('show')

                        postResource.save(user).then(res=>{
                        },res=>{
                            Alert.loading('')
                            Alert.result('请求失败 请重试')
                        })

                        setTimeout(function() {
                            $('#userName').val('')
                            $('#userSchool').val('')
                            $('#userAddress').val('')
                            $('#userTel').val('')
                            $('#userMessage').val('')
                            Alert.loading('')
                        }, 1000);
                    }else{
                        return 
                    }
                })


            },
            // 屏幕滚动
            scroll(e){
                var innerDate=new Date().getTime();
                var e=e||window.event
                var date=e.wheelDelta||e.detail
                var resume=$('#app')
                var baseHeight=document.documentElement.clientHeight||
                document.body.clientHeight
                var top=parseInt(resume.css('top'))
                var limit=baseHeight*9
                var $fixNav=$('.fixNav') // 固定导航
                var $lis=$fixNav.find('li') // 固定导航的栏目
                var fixNavHeight=Math.ceil($fixNav.height()) // 固定导航的高度
                var that=this
                if(innerDate-outerDate>1000){
                    // 控制滚动滑屏
                    function wheelEvent(){
                        if(e.wheelDelta){
                            if(e.wheelDelta<0&&top>-limit){
                                resume.animate({
                                    top:'-='+baseHeight+'px'
                                },1000)
                            }else if(e.wheelDelta>0&&top<0){
                                resume.animate({
                                    top:'+='+baseHeight+'px'
                                },1000)
                            }
                        }else if(e.detail){
                            if(e.detail>0&&top>-limit){
                                resume.animate({
                                    top:'-='+baseHeight+'px'
                                },1000)
                            }else if(e.detail<0&&top<0){
                                resume.animate({
                                    top:'+='+baseHeight+'px'
                                },1000)
                            }
                        }
                    }

                    // 滑屏变化的元素
                    function eleState(){
                        // 浏览器兼容
                        if(e.wheelDelta){
                            if(e.wheelDelta<0){
                                if(top==0){
                                    // 固定导航栏
                                    that.fixNavShow=true
                                    // logo
                                    that.logoShow=true
                                    // 返回最顶部
                                    that.toUpShow=true
                                }
                            }else{
                                if(top==-baseHeight){
                                    // 固定导航栏
                                    that.fixNavShow=false
                                    // logo
                                    that.logoShow=false
                                    // 返回最顶部
                                    that.toUpShow=false
                                }
                            }
                        }else if(e.detail){
                            if(e.detail>0){
                                if(top==0){
                                    // 固定导航栏
                                    that.fixNavShow=true
                                    // logo
                                    that.logoShow=true
                                    // 返回最顶部
                                    that.toUpShow=true
                                }
                            }else{
                                if(top==-baseHeight){
                                    // 固定导航栏
                                    that.fixNavShow=false
                                    // logo
                                    that.logoShow=false
                                    // 返回最顶部
                                    that.toUpShow=false
                                }
                            }
                        }
                    }

                    // 固定导航focus变化
                    function fixNavState(){
                        if(e.wheelDelta){
                            if(e.wheelDelta<0){
                                var index=Math.abs(top/baseHeight)
                                if(index>=0){
                                    $lis.removeClass('focus')
                                    setTimeout(()=>{
                                        $lis.eq(index).addClass('focus')
                                    })
                                }
                            }else{
                                var index=Math.abs(top/baseHeight)-2
                                if(index>=0){
                                    $lis.removeClass('focus')
                                   setTimeout(()=>{
                                        $lis.eq(index).addClass('focus')
                                    })
                                }
                            }
                        }else if(e.detail){
                            if(e.detail>0){
                                var index=Math.abs(top/baseHeight)
                                if(index>=0){
                                    $lis.removeClass('focus')
                                    setTimeout(()=>{
                                        $lis.eq(index).addClass('focus')
                                    })
                                }
                            }else{
                                var index=Math.abs(top/baseHeight)-2
                                if(index>=0){
                                    $lis.removeClass('focus')
                                    setTimeout(()=>{
                                        $lis.eq(index).addClass('focus')
                                    })
                                }
                            }
                        }
                    }

                    // 计时器
                    outerDate=innerDate

                    wheelEvent()
                    setTimeout(()=>{
                        eleState()
                    },800)
                    fixNavState()
                }
                e.preventDefault()
            }
        },
        beforeRouteEnter: (to, from, next) => {
            var li=$('.nav ul li')
            var path=to.path
            li.removeClass('focus')
            if(path=="/"){
                li.eq(0).addClass('focus')
            }
            document.body.scrollTop=0
            document.documentElement.scrollTop=0
            document.scrollTop=0
            $('body').css({
                overflow:'hidden'
            })

            next()
        },
        beforeDestroy () {
            // 滚动事件
            if(document.addEventListener){
                document.removeEventListener('DOMMouseScroll',this.scroll);
            }

            // 滚动事件
            window.onmousewheel=document.onmousewheel=null;//IE/Opera/Chrome

            $('body').css({
                overflowX:'scroll',
                overflowY:'scroll'
            })
        }
    })
</script>

<style lang="scss">
    @import '../style/base/reset';
    @import '../style/scss/home'; 
</style>

