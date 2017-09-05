<template>
    <div class="dyAgent">
        <div class="imgShowAgent">
            <img src="/static/images/zhaoshangdaili.jpg">
            <h1 class="title">
                欢迎具有教育行业资源的朋友加入
            </h1>
            <h1 class="details">
                义务教育学校24.29万所,在校生1.40亿人
            </h1>
            <a @click="toAgent" href="javascript:void(0)">
                申请代理
            </a>
        </div>
        <div class="prospect">
            <div class="prospectBox">
                <div class="title">
                    <span>市场前景</span>
                </div>
                <div class="date">
                    <div class="line"></div>
                    <div class="dateBox">
                        <div
                            v-for="(date,index) in dates"
                            :class="[index%2==1?'top':'bottom','item'+index]">
                            <date-component
                            :date="date"
                            ></date-component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="industry">
            <div class="industryBox">
                <div class="caption">
                    <span>行业</span>
                    <span>现状</span>
                </div>
                <div class="listBox">
                    <div class="list" v-for="now in nows">
                        <div class="title">
                            {{now.title}}
                        </div>
                        <div class="text">
                            {{now.msg}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="apply" class="agentInformation">
            <div class="agentInformationBox">
                <div class="title">
                    <span class="first">申请</span>
                    <span class="second">代理</span>
                </div>
                <div class="detail">
                    请填写下面的信息,提交后有专人与您联系
                </div>
                <form @submit.prevent="agentSend" name="agentInformation" novalidate>
                    <p>
                        <label for="userName">
                            <span>*</span>
                            您的姓名
                        </label>
                        <input
                          placeholder="请输入您的姓名"
                          type="text"
                          id="userName"
                          name="user[name]"
                          v-validate="'required'">
                        <span v-show="errors.has('user[name]')">
                            姓名不能为空
                        </span>
                    </p>          
                    <p>
                        <label for="userTel">
                            <span>*</span>
                            手机号码
                            </label>
                        <input
                          placeholder="请输入您的手机号码"
                          type="text"
                          id="userTel"
                          name="user[Tel]"
                          v-validate="'required|numeric'">
                        <span v-show="errors.has('user[Tel]')">
                            电话格式不正确
                        </span>
                    </p>          
                    <p>
                        <label for="userCompany">
                            <span>*</span>
                            单位名称
                            </label>
                        <input
                          placeholder="请输入单位名称"
                          type="text"
                          id="userCompany"
                          name="user[company]"
                          v-validate="'required'">
                        <span v-show="errors.has('user[company]')">
                            单位名称不能为空
                        </span>
                    </p>          
                    <p>
                        <label for="userEmail">
                            <span>*</span>
                            邮箱地址
                            </label>
                        <input
                          placeholder="请输入邮箱地址"
                          type="text"
                          id="userEmail"
                          name="user[email]"
                          v-validate="'required|email'">
                        <span v-show="errors.has('user[email]')">
                            邮箱格式不正确
                        </span>
                    </p>
                    <p class="special">
                        <label for="userAdd">
                            <span>*</span>
                            目标区域                    
                        </label>
                        <select class="first"
                          id="userProvince"
                          v-model="userProvince"
                          name="user[province]"
                          >
                            <option
                              v-for="first in province"
                              :value="first.code"
                              :text="first.text"
                              v-validate="'required'">
                                {{first.text}}    
                            </option>  
                        </select>
                        <select class="second"
                          v-model="userCity"
                          id="userCity"
                          name="user[city]"
                          >
                            <option
                              v-for="second in cities[userProvince]"
                              v-validate="'required'">
                                {{second.text}}
                            </option>
                        </select>
                        <span v-show="errors.has('user[province]')"></span>  
                    </p>          
                    <p>
                        <label for="userMessage">
                            <pre style="display:inline-block"> </pre>
                            留言建议
                            </label>
                        <input placeholder="请输入您的留言" type="text" id="userMessage" name="user[message]">
                    </p>
                    <p>
                        <button type="submit">立即申请</button>    
                    </p>          
                </form>
            </div>
        </div>
  </div>
</template>

<script>
    // 时间表组件
    import dateComponent
    from '../components/agent/dateComponent'

    // 省市数据
    import cities
    from '../components/city'

    import $
    from 'jquery'

    // alert
    import Alert from '../components/alert'

    export default({
        data () {
            return {
                // 时间表数据
                dates:[
                    {time:'2014',msg:'4月: 国家体育总局副局长冯建中在2014年全国青少年体育工作会议上要求抓好青少年体育为建设体育强国做贡献'},
                    {time:'2015',msg:'9月: 新华网发文全国首次“政府购买+互联网+青少年体质健康测试赛”模式在京顺利展开'},
                    {time:'2016',msg:'2月: 新华每日电讯发文把青少年健康提升为国家战略《教育部2016年工作要点》“深化学校改革、强化体育课和课外锻炼的实施意见，提升学生健康素养和体质健康水平”'},
                    {time:'2016',msg:'5月: 国务院办公厅印发《关于强化学校体育促进学生身心健康全面发展的意见》，就推动学校体育改革发展和强化学校体育工作作出全面部署'},
                    {time:'2016',msg:'6月: 国家体育总局青少司关于印发"2016年全国亲少年科学健身普及活动方案"的通知'},
                    {time:'2016',msg:'9月: 教育部印发《关于进一步推进高中阶段学校考试招生制度改革的指导意见》,首次在全国范围内提出体育成为中考必考项目的要求'},
                    {time:'2017',msg:'4月: 国务院教育督导委员会办公室印发《中小学校体育工作督导评估办法》通知，将中小学校体育督导评估结果作为干部考核、学校问责和实行奖惩的重要依据'}
                ],
                // 行业现状数据
                nows:[ 
                    {title:'体质下滑',msg:'根据《中国青少年体育发展报告》数据显示，中国青少年的身体素质在整体上依然处于下降趋势'},
                    {title:'政策支持',msg:'2016年体育新增为中考必考项，各省中考体育分数相比往年提高40％～60%'},
                    {title:'资源稀缺',msg:'体育教师在职培训以集中短期培训班为主，缺乏专项技能教学培训，同时现阶段体育教案大多为手写，资源共享程度低'},
                    {title:'市场空白',msg:'国内现阶段教育平台大都以文化课为主，垂直针对于体育教学的产品存在大量市场空白'}
                ],
                alert:'',
                dateShow:false,
                userProvince:'',
                userCity:'',
                province:cities.province,
                cities:cities.city
            }
        },
        mounted () {
            var absurl=window.location.hash
            var $lis=$('.nav').find('li')
            var $topNav=$('.topNav')
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
            var height=$('.anget')
            var url=window.location.hash
            if(url=='#/agent#apply'){
                var $agentInformation=$('.agentInformation')
                var $topNav=$('.topNav')
                var height1=Number.parseInt($topNav.height())
                var height2=Number.parseInt($agentInformation.offset().top)

                $('body').animate({
                    scrollTop:height2-height1
                },200)

                $('html').animate({
                    scrollTop:height2-height1*2
                },200)

                var li=$('.nav ul li')
                li.removeClass('focus')
                li.eq(1).addClass('focus')
            }

            this.Alert=Alert

            // 改变导航样式
            $('.nav a').css({
                color:'#000'
            })

            $('.topNav').css({
                backgroundColor:'#fff'
            })

            $('.weixin span').css({
                color:'#000'
            })

            $('.logo img').attr('src','static/images/logo2.png')
            /*
            var that=this
            setTimeout(function(){
                that.dateShow=true
            },1000)
            */
        },
        components: {
            dateComponent:dateComponent
        },
        /*methods: {
            dateEnter(el){
                var inner=$(el).index()
                $(el).delay(800*inner).animate({
                    height:'1.4rem',
                    opacity:1
                },500)
            }  
        },*/
        methods: {
            toAgent(){
                var $agentInformation=$('.agentInformation')
                var $topNav=$('.topNav')
                var height1=Number.parseInt($topNav.height())
                var height2=Number.parseInt($agentInformation.offset().top)

                $('body').animate({
                    scrollTop:height2-height1
                },200)

                $('html').animate({
                    scrollTop:height2-height1*2
                },200)
            },
            agentSend(){
                this.$validator.validateAll().then(result=>{
                    if(result){
                        var postResource=
                        this.$resource('http://123.56.14.80:7777/agentInformation')
                        
                        var name=$('#userName').val() // 名字
                        var tel=$('#userTel').val() // 电话
                        var company=$('#userCompany').val() // 单位名称
                        var email=$('#userEmail').val() // 邮箱
                        var province=$('#userProvince').val() // 省
                        var city=$('#userCity').val() // 市
                        var msg=$('#userMessage').val() // 留言

                        var provinces = [
                            {"code":"000000","text":"请选择"},
                            {"code":"110000","text":"北京"},
                            {"code":"120000","text":"天津"},
                            {"code":"130000","text":"河北"},
                            {"code":"140000","text":"山西"},
                            {"code":"150000","text":"内蒙古"},
                            {"code":"210000","text":"辽宁"},
                            {"code":"220000","text":"吉林"},
                            {"code":"230000","text":"黑龙江"},
                            {"code":"310000","text":"上海"},
                            {"code":"320000","text":"江苏"},
                            {"code":"330000","text":"浙江"},
                            {"code":"340000","text":"安徽"},
                            {"code":"350000","text":"福建"},
                            {"code":"360000","text":"江西"},
                            {"code":"370000","text":"山东"},
                            {"code":"410000","text":"河南"},
                            {"code":"420000","text":"湖北"},
                            {"code":"430000","text":"湖南"},
                            {"code":"440000","text":"广东"},
                            {"code":"450000","text":"广西"},
                            {"code":"460000","text":"海南"},
                            {"code":"500000","text":"重庆"},
                            {"code":"510000","text":"四川"},
                            {"code":"520000","text":"贵州"},
                            {"code":"530000","text":"云南"},
                            {"code":"540000","text":"西藏"},
                            {"code":"610000","text":"陕西"},
                            {"code":"620000","text":"甘肃"},
                            {"code":"630000","text":"青海"},
                            {"code":"640000","text":"宁夏"},
                            {"code":"650000","text":"新疆"}]

                        provinces.forEach(function(item){
                            if(item.code==province){
                                province=item.text
                            }
                        })

                        var user={
                            userName:name,
                            mobile:tel,
                            company:company,
                            email:email,
                            province:province,
                            city:city,
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
                            $('#userTel').val('')
                            $('#userCompany').val('')
                            $('#userEmail').val('')
                            $('#userProvince').val('')
                            $('#userCity').val('')
                            $('#userMessage').val('')
                            Alert.loading('')
                        }, 1000);
                    }else{
                        return 
                    }
                })
            }  
        },
        beforeRouteEnter: (to, from, next) => {
            var li=$('.nav ul li')
            var path=to.path
            li.removeClass('focus')
            if(path=="agent"){
                li.eq(1).addClass('focus')
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
    @import '../style/scss/agent';
</style>

