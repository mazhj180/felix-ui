<script setup lang='ts'>
import { onMounted, onUnmounted, ref, computed, reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-message-box.css';
import { tr } from 'element-plus/es/locales.mjs';
import Work from '@/components/common/Work.vue';
import useNavBg from '@/hooks/useNavBg';
import useScroll from '@/hooks/useScroll';
import { isWriterReq } from '@/api/api';
import emitter from '@/emitter';

const bg = useNavBg()

const { items } = useScroll()

const scrollContainer = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver | null = null;
    let scrollPosition = 0;
    let scrollWidth = 0;
    let animationFrameId: number | null = null;


    const startScrolling = () => {
        if (!scrollContainer.value) return;
        scrollWidth = scrollContainer.value.scrollWidth / 2;
        const speed = 1; // 设置滚动速度
        // console.log('width',scrollWidth)
        function scrollContent() {
            if (scrollContainer.value == null) {
                return
            }
            if (scrollPosition < scrollWidth) {
                scrollPosition += speed;
                scrollContainer.value.scrollLeft = scrollPosition;
                // console.log('pos',scrollPosition)
            } else {
                scrollPosition = 0; // 重置滚动位置
            }
            animationFrameId = requestAnimationFrame(scrollContent);
        }
        scrollContent();
    }

    const stopScrolling = () => {
        console.log('stop')
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    onMounted(() => {
        if (scrollContainer.value) {
            // console.log('111@',scrollContainer.value.scrollWidth ,scrollContainer.value.offsetWidth,scrollContainer.value.clientWidth)
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 元素出现在视图中，开始滚动
                        startScrolling();
                    } else {
                        // 元素不在视图中，停止滚动
                        stopScrolling();
                    }
                });
            });

            observer.observe(scrollContainer.value);
        }
    })

    onUnmounted(() => {
        if (observer && scrollContainer.value) {
            observer.unobserve(scrollContainer.value);
        }
        stopScrolling();
    });

let userStore = useUserStore()
let isLogined = computed(() => userStore.userInfo.userId)
const receiveMessage = async (e:MessageEvent) => {
  if (e.data.type === 'success'){
    userStore.setUserInfo(e.data.data)
  }
}

onMounted(() => {
  window.addEventListener("message",receiveMessage,false)
})

onUnmounted(() => {
  window.removeEventListener("message",receiveMessage)
})

const close = async () => {
   if (isLogined.value) {
        await userStore.setIsWriter(userStore.userInfo.userId as string)
        if (userStore.isWriter === 'true') {
            emitter.emit('getworks')
        }
   } 
}

const login = () => {
    ElMessageBox.alert(
    '<iframe class=" m-auto w-full" style="height: 80vh;" src="http://127.0.0.1:3000/auth/"></iframe>',
    {
      dangerouslyUseHTMLString: true,
      center: true,
      showConfirmButton: false,
      callback: close
    }
    ).then(() => {}).catch(() => {})
    // emitter.emit('toLogin',true) 
    
}

const toLogin = () => {
    login()
}


</script>

<template>
    <!-- nav-->
    <div class=" flex items-center  w-full h-16 px-32 navbar " :style="{ backgroundColor: bg }">
        <img src="../../assets/img.png" class=" h-8 w-14">
        <div class=" flex-1">
            <img class=" h-6" src="../../assets/head-1.png">
        </div>
        <div v-if="!isLogined"  class=" flex justify-between">
            <div class=" flex items-center text-sm px-1"> | </div>
            <img @click="toLogin()" class=" h-6" src="../../assets/head-3.png"> 
        </div>
    </div>
    <!-- absolute img -->
    <div class=" w-full ">
        <img class=" top-0 w-full " style="height:600px;" src="../../assets/homepage-3.png">
        <img class=" absolute top-56 right-4 z-10" src="../../assets/font-1.png">
        <img class=" absolute top-28 right-48 z-10" src="../../assets/font-2.png">
    </div>
    <!-- plan info -->
    <div class="  flex items-center justify-center w-full h-24 px-32 bg-gray-50">
        <div class=" flex w-1/3 p-4">
            <div class="  flex-1">创作者计划</div>
            <div class="flex justify-center w-1/3 "> > </div>
        </div>
        <div class=" flex w-1/3 p-4">
            <div class=" flex-1">版权保障计划</div>
            <div class="flex justify-center w-1/3"> > </div>
        </div>
        <div class=" flex w-1/3 p-4">
            <div class=" flex-1">收益保障计划</div>
            <div class="flex  justify-center w-1/3"> > </div>
        </div>
    </div>
    <!-- user info -->
    <div v-if="!isLogined" class=" flex items-center justify-center h-28  mx-32 my-10 border-b">
        <div class=" flex items-center justify-center h-16 w-16 px-6 rounded-full bg-gray-100">
            <font-awesome-icon class=" text-4xl text-white text-center" :icon="['fas', 'user-tie']" />
        </div>
        <div class="flex flex-col flex-1 justify-center px-4 ">
            <div class=" text-xl">请登录</div>
            <div class=" text-sm text-gray-500">欢迎成为Felix创作者</div>
        </div>
        <div class=" flex items-center justify-end w-1/3">
            <button @click="login()" class=" w-1/3 px-2 whitespace-nowrap">立即登录 </button>
        </div>
    </div>
    <div v-if="isLogined && userStore.isWriter === 'true'" class=" flex mx-32 my-20">
        <div class=" flex flex-col ">
            <el-avatar class=" shadow-2xl" :size="300" src="https://placehold.co/100x140" />
            <div class=" text-4xl text-black pt-5">{{userStore.userInfo.nickName}}</div>
            <div class=" text-xl text-gray-500 pb-5 italic">{{userStore.userInfo.userId}}</div>
            <div  class=" text-box">d诗曰：
 
 绛帻鸡人报晓筹，尚衣方进翠云裘。
  
 九天阊阖开宫殿，万国衣冠拜冕旒。
  
 日色才临仙掌动，香烟欲傍衮龙浮。
  
 朝罢须裁五色诏，佩声归到凤池头。
  
 话说大宋仁宗天子在位，嘉祐三年三月三日五更三点，天子驾坐紫宸殿，受百官朝贺。但见：
  
 祥云迷凤阁，瑞气罩龙楼。含烟御柳拂旌旗，带露宫花迎剑戟。天香影里，玉簪珠履聚丹墀；仙乐声中，绣袄锦衣扶御驾。珍珠帘卷，黄金殿上现金舆；凤羽扇开，白玉阶前停宝辇。隐隐净鞭三下响，层层文武两班齐。
  
 当有殿头官喝道：“有事出班早奏，无事卷帘退朝。”只见班部丛中，宰相赵哲、参政文彦博出班奏曰：“目今京师瘟疫盛行，民不聊生，伤损军民甚多。伏望陛下释罪宽恩，省刑薄税，以禳天灾，救济万民。”天子听奏，急敕翰林院随即草诏：一面降赦天下罪囚，应有民间税赋悉皆赦免；一面命在京宫观寺院，修设好事禳灾。不料其年瘟疫转盛，仁宗天子闻知，龙体不安。复会百官，众皆计议。向那班部中，有一大臣越班启奏。天子看时，乃是参知政事范仲淹。拜罢起居，奏曰：“目今天灾盛行，军民涂炭，日夕不能聊生，人遭缧绁之厄。以臣愚意，要禳此灾，可宣嗣汉天师星夜临朝，就京师禁院修设三千六百分罗天大醮，奏闻上帝，可以禳保民间瘟疫。”仁宗天子准奏。急令翰林学士草诏一道，天子御笔亲书，并降御香一炷，钦差内外提点殿前太尉洪信为天使，前往江西信州龙虎山，宣请嗣汉天师张真人星夜临朝，祈禳瘟疫。就金殿上焚起御香，亲将丹诏付与洪太尉为使，即便登程前去。
  
 洪信领了圣敕，辞别天子，不敢久停。从人背了诏书，金盒盛了御香，带了数十人，上了铺马，一行部从，离了东京，取路径投信州贵溪县来。于路上但见：
  
 遥山叠翠，远水澄清。奇花绽锦绣铺林，嫩柳舞金丝拂地。风和日暖，时过野店山村；路直沙平，夜宿邮亭驿馆。罗衣荡漾红尘内，骏马驱驰紫陌中。
  
 且说太尉洪信赍擎御书丹诏，一行人从上了路途，不止一日，来到江西信州。大小官员出郭迎接，随即差人报知龙虎山上清宫住持道众，准备接诏。次日，众位官同送太尉到于龙虎山下。只见上清宫许多道众，鸣钟击鼓，香花灯烛，幢幡宝盖，一派仙乐，都下山来迎接丹诏，直至上清宫前下马。太尉看那宫殿时，端的是好座上清宫。但见：
  
 青松屈曲，翠柏阴森。门悬敕额金书，户列灵符玉篆。虚皇坛畔，依稀垂柳名花；炼药炉边，掩映苍松老桧。左壁厢天丁力士，参随着太乙真君；右势下玉女金童，簇捧定紫微大帝。披发仗剑，北方真武踏龟蛇；靸履顶冠，南极老人伏龙虎。前排二十八宿星君，后列三十二帝天子。阶砌下流水潺湲，墙院后好山环绕。鹤生丹顶，龟长绿毛。树梢头献果苍猿，莎草内衔芝白鹿。三清殿上，击金钟道士步虚；四圣堂前，敲玉磬真人礼斗。献香台砌，彩霞光射碧琉璃；召将瑶坛，赤日影摇红玛瑙。早来门外祥云现，疑是天师送老君。
  
 当下上至住持真人，下及道童侍从，前迎后引，接至三清殿上，请将诏书，居中供养着。洪太尉便问监宫真人道：“天师今在何处？”住持真人向前禀道：“好教太尉得知：这代祖师号曰‘虚靖天师’，性好清高，倦于迎送，自向龙虎山顶，结一茅庵，修真养性。因此不住本宫。”太尉道：“目今天子宣诏，如何得见？”真人答道：“容禀：诏敕权供在殿上，贫道等亦不敢开读。且请太尉到方丈献茶，再烦计议。”当时将丹诏供养在三清殿上，与众官都到方丈。太尉居中坐下，执事人等献茶，就进斋供，水陆俱备。斋罢，太尉再问真人道：“既然天师在山顶庵中，何不着人请将下来相见，开宣丹诏？”真人禀道：“太尉，这代祖师虽在山顶，其实道行非常，能驾雾兴云，踪迹不定，未尝下山。贫道等如常亦难得见，怎生教人请得下来！”太尉道：“似此如何得见！目今京师瘟疫盛行，今上天子特遣下官为使，赍捧御书丹诏，亲奉龙香，来请天师，要做三千六百分罗天大醮，以禳天灾，救济万民。似此怎生奈何？”真人禀道：“朝廷天子要救万民，只除是太尉办一点志诚心，斋戒沐浴，更换布衣，休带从人，自背诏书，焚烧御香，步行上山礼拜，叩请天师，方许得见。如若心不志诚，空走一遭，亦难得见。”太尉听说便道：“俺从京师食素到此，如何心不志诚。既然恁地，依着你说，明日绝早上山。”当晚各自权歇。
  
 次日五更时分，众道士起来，备下香汤，请太尉起来，香汤沐浴，换了一身新鲜布衣，脚下穿上麻鞋草履，吃了素斋，取过丹诏，用黄罗包袱背在脊梁上，手里提着银手炉，降降地烧着御香。许多道众人等，送到后山，指与路径。真人又禀道：“太尉要救万民，休生退悔之心，只顾志诚上去。”太尉别了众人，口诵天尊宝号，纵步上山来。将至半山，望见大顶直侵霄汉，果然好座大山。正是：
  
 根盘地角，顶接天心。远观磨断乱云痕，近看平吞明月魄。高低不等谓之山，侧石通道谓之岫，孤岭崎岖谓之路，上面极平谓之顶，头圆下壮谓之峦，藏虎藏豹谓之穴，隐风隐云谓之岩，高人隐居谓之洞，有境有界谓之府，樵人出没谓之径，能通车马谓之道，流水有声谓之涧，古渡源头谓之溪，岩崖滴水谓之泉。左壁为掩，右壁为映。出的是云，纳的是雾。锥尖象小，崎峻似峭，悬空似险，削儠如平。千峰竞秀，万壑争流。瀑布斜飞，藤萝倒挂。虎啸时风生谷口，猿啼时月坠山腰。恰似青黛染成千块玉，碧纱笼罩万堆烟。
  
 这洪太尉独自一个，行了一回，盘坡转径，揽葛攀藤。约莫走过了数个山头，三二里多路，看看脚酸腿软，正走不动，口里不说，肚里踌躇，心中想道：“我是朝廷贵官，在京师时重裀而卧，列鼎而食，尚兀自倦怠；何曾穿草鞋，走这般山路！知他天师在那里，却教下官受这般苦！”又行不到三五十步，掇着肩气喘。只见山凹里起一阵风，风过处，向那松树背后奔雷也似吼一声，扑地跳出一个吊睛白额锦毛大虫来。洪太尉吃了一惊，叫声：“阿呀！”扑地望后便倒。偷眼看那大虫时，但见：
  
 毛披一带黄金色，爪露银钩十八只。
  
 睛如闪电尾如鞭，口似血盆牙似戟。
  
 伸腰展臂势狰狞，摆尾摇头声霹雳。
  
 山中狐兔尽潜藏，涧下獐麀皆敛迹。
  
 那大虫望着洪太尉，左盘右旋，咆哮了一回，托地望后山坡下跳了去。洪太尉倒在树根底下，唬的三十六个牙齿捉对儿厮打，那心头一似十五个吊桶，七上八落的响，浑身却如重风麻木，两腿一似斗败公鸡，口里连声叫苦。大虫去了一盏茶时，方才爬将起来，再收拾地上香炉，还把龙香烧着，再上山来，务要寻见天师。又行过三五十步，口里叹了数口气，怨道：“皇帝御限，差俺来这里，教我受这场惊恐。”说犹未了，只觉得那里又一阵风，吹得毒气直冲将来。太尉定睛看时，山边竹藤里簌簌地响，抢出一条吊桶大小、雪花也似蛇来。太尉见了，又吃一惊，撇了手炉，叫一声：“我今番死也！”望后便倒在盘砣石边。微闪开眼来看那蛇时，但见：
  
 昂首惊飙起，掣目电光生。动荡则折峡倒冈，呼吸则吹云吐雾。鳞甲乱分千片玉，尾梢斜卷一堆银。
  
 那条大蛇径抢到盘砣石边，朝着洪太尉盘做一堆，两只眼迸出金光，张开巨口，吐出舌头，喷那毒气在洪太尉脸上。惊得太尉三魂荡荡，七魄悠悠。那蛇看了洪太尉一回，望山下一溜，却早不见了。太尉方才爬得起来，说道：“惭愧！惊杀下官！”看身上时，寒粟子比馉饳儿大小。口里骂那道士：“叵耐无礼，戏弄下官，教俺受这般惊恐！若山上寻不见天师，下去和他别有话说。”再拿了银提炉，整顿身上诏敕并衣服巾帻，却待再要上山去。
  
 正欲移步，只听得松树背后隐隐地笛声吹响，渐渐近来。太尉定睛看时，只见那一个道童，倒骑着一头黄牛，横吹着一管铁笛，转出山凹来。太尉看那道童时，但见：
  
 头绾两枚丫髻，身穿一领青衣，腰间绦结草来编，脚下芒鞋麻间隔。明眸皓齿，飘飘并不染尘埃；绿鬓朱颜，耿耿全然无俗态。
  
 昔日吕洞宾有首牧童诗道得好：
  
 草铺横野六七里，笛弄晚风三四声。
  
 归来饱饭黄昏后，不脱蓑衣卧月明。
  
 只见那个道童，笑吟吟地骑着黄牛，横吹着那管铁笛，正过山来。洪太尉见了，便唤那个道童：“你从那里来？认得我么？”道童不睬，只顾吹笛。太尉连问数声，道童呵呵大笑，拿着铁笛，指着洪太尉说道：“你来此间，莫非要见天师么？”太尉大惊，便道：“你是牧童，如何得知？”道童笑说：“我早间在草庵中伏侍天师，听得天师说道：朝中今上仁宗天子差个洪太尉赍擎丹诏御香，到来山中，宣我往东京做三千六百分罗天大醮，祈禳天下瘟疫。我如今乘鹤驾云去也。’这早晚想是去了，不在庵中。你休上去，山内毒虫猛兽极多，恐伤害了你性命。”太尉再问道：“你不要说谎？”道童笑了一声，也不回应，又吹着铁笛转过山坡去了。太尉寻思道：“这小的如何尽知此事？想是天师分付他，已定是了。”欲待再上山去，方才惊唬的苦，争些儿送了性命，不如下山去罢。
  
 太尉拿着提炉，再寻旧路，奔下山来。众道士接着，请至方丈坐下。真人便问太尉道：“曾见天师么？”太尉说道：“我是朝廷中贵官，如何教俺走得山路，吃了这般辛苦，争些儿送了性命！为头上至半山里，跳出一只吊睛白额大虫，惊得下官魂魄都没了。又行不过一个山嘴，竹藤里抢出一条雪花大蛇来，盘做一堆，拦住去路。若不是俺福分大，如何得性命回京。尽是你这道众戏弄下官！”真人复道：“贫道等怎敢轻慢大臣？这是祖师试探太尉之心。本山虽有蛇虎，并不伤人。”太尉又道：“我正走不动，方欲再上山坡，只见松树傍边转出一个道童，骑着一头黄牛，吹着管铁笛，正过山来。我便问他：‘那里来？识得俺么？’他道：‘已都知了。’说天师分付，早晨乘鹤驾云望东京去了。下官因此回来。”真人道：“太尉可惜错过，这个牧童正是天师。”太尉道：“他既是天师，如何这等猥獕？”真人答道：“这代天师非同小可，虽然年幼，其实道行非常。他是额外之人，四方显化，极是灵验。世人皆称为道通祖师。”洪太尉道：“我直如此有眼不识真师，当面错过！”真人道：“太尉但请放心，既然祖师法旨道是去了，比及太尉回京之日，这场醮事祖师已都完了。”太尉见说，方才放心。真人一面教安排筵宴，管待太尉；请将丹诏收藏于御书匣内放了，留在上清宫中，龙香就三清殿上烧了。当日方丈内大排斋供，设宴饮酌。至晚席罢，止宿到晓。
  
 次日早膳已后，真人道众并提点执事人等请太尉游山。太尉大喜。许多人从跟随着，步行出方丈，前面两个道童引路，行至宫前宫后，看玩许多景致。三清殿上，富贵不可尽言。左廊下，九天殿、紫微殿、北极殿；右廊下，太乙殿、三官殿、驱邪殿。诸宫看遍，行到右廊后一所去处。洪太尉看时，另外一所殿宇：一遭都是捣椒红泥墙；正面两扇朱红槅子；门上使着肐膊大锁锁着，交叉上面贴着十数道封皮，封皮上又是重重叠叠使着朱印；檐前一面硃红漆金字牌额，上书四个金字，写道：“伏魔之殿”。太尉指着门道：“此殿是甚么去处？”真人答道：“此乃是前代老祖天师锁镇魔王之殿。”太尉又问道：“如何上面重重叠叠贴着许多封皮？”真人答道：“此是祖老大唐洞玄国师封锁魔王在此。但是经传一代天师，亲手便添一道封皮，使其子子孙孙不敢妄开。走了魔君，非常利害。今经八九代祖师，誓不敢开。锁用铜汁灌铸，谁知里面的事。小道自来住持本宫三十馀年，也只听闻。”洪太尉听了，心中惊怪，想道：“我且试看魔王一看。”便对真人说道：“你且开门来，我看魔王甚么模样。”真人告道：“太尉，此殿决不敢开。先祖天师叮咛告戒：今后诸人不许擅开。”太尉笑道：“胡说！你等要妄生怪事，煽惑百姓良民，故意安排这等去处，假称锁镇魔王，显耀你们道术。我读一鉴之书，何曾见锁魔之法。神鬼之道，处隔幽冥，我不信有魔王在内。快疾与我打开，我看魔王如何。”真人三回五次禀说：“此殿开不得，恐惹利害，有伤于人。”太尉大怒，指着道众说道：“你等不开与我看，回到朝廷，先奏你们众道士阻当宣诏，违别圣旨，不令我见天师的罪犯；后奏你等私设此殿，假称锁镇魔王，煽惑军民百姓。把你都追了度牒，刺配远恶军州受苦。”真人等惧怕太尉权势，只得唤几个火工道人来，先把封皮揭了，将铁锤打开大锁。众人把门推开，看里面时，黑洞洞地，但见：
  
 昏昏默默，查查冥冥。数百年不见太阳光，亿万载难瞻明月影。不分南北，怎辨东西。黑烟霭霭扑人寒，冷气阴阴侵体颤。人迹不到之处，妖精往来之乡。闪开双目有如盲，伸出两手不见掌。常如三十夜，却似五更时。
  
 众人一齐都到殿内，黑暗暗不见一物。太尉教从人取十数个火把点着，将来打一照时，四边并无别物，只中央一个石碑，约高五六尺，下面石龟趺坐，太半陷在泥里。照那碑碣上时，前面都是龙章凤篆，天书符箓，人皆不识。照那碑后时，却有回个真字大书，凿着“遇洪而开”。却不是一来天罡星合当出世，二来宋朝必显忠良，三来凑巧遇着洪信，岂不是天数！洪太尉看了这四个字，大喜，便对真人说道：“你等阻当我，却怎地数百年前已注我姓字在此？‘遇洪而开’，分明是教我开看，却何妨！我想这个魔王，都只在石碑底下。汝等从人与我多唤几个火工人等，将锄头铁锹来掘开。”真人慌忙谏道：“太尉，不可掘动！恐有利害，伤犯于人，不当稳便。”太尉大怒，喝道：“你等道众，省得甚么！碑上分明凿着遇我教开，你如何阻当！快与我唤人来开。”真人又三回五次禀道：“恐有不好。”太尉那里肯听。只得聚集众人，先把石碑放倒，一齐并力掘那石龟，半日方才掘得起。又掘下去，约有三四尺深，见一片大青石板，可方丈围。洪太尉叫再掘起来。真人又苦禀道：“不可掘动！”太尉那里肯听。众人只得把石板一齐扛起，看时，石板底下却是一个万丈深浅地穴。只见穴内刮剌剌一声响亮，那响非同小可，恰似：
  
 天摧地塌，岳撼山崩。钱塘江上，潮头浪拥出海门来；泰华山头，巨灵神一劈山峰碎。共工奋怒，去盔撞倒了不周山；力士施威，飞锤击碎了始皇辇。一风撼折千竿竹，十万军中半夜雷。
  
 那一声响亮过处，只见一道黑气，从穴里滚将起来，掀塌了半个殿角。那道黑气直冲上半天里，空中散作百十道金光，望四面八方去了。众人吃了一惊，发声喊，都走了，撇下锄头铁锹，尽从殿内奔将出来，推倒攧翻无数。惊得洪太尉目睁痴呆，罔知所措，面色如土。奔到廊下，只见真人向前叫苦不迭。太尉问道：“走了的却是甚么妖魔？”
  
 那真人言不过数句，话不过一席，说出这个缘由。有分教：
  
 一朝皇帝，夜眠不稳，昼食忘餐。直使宛子城中藏猛虎，蓼儿洼内聚飞龙。
  
 毕竟龙虎山真人说出甚言语来，且听下回分解。asdadasdsdaaaaaassssxxxxxxxxxssssssdadasdasdasdadaxxsdasdasdasdadadaaadasdsbbcajbdjab</div>
        </div>
        <div class=" flex-1 ml-20 shadow-2xl h-96 overflow-auto pb-2">
            <Work/>
        </div>
    </div>
    <!-- 最新上架 -->
    <div class=" my-20 px-32">
        <img class=" m-auto w-36" src="../../assets/font-8.png">
        <table class=" w-full latest-item-list">
            <thead class="" style=" color: rgba(0,0,0,.4);">
                <tr>
                    <td class=" latest-item">书名</td>
                    <td class=" latest-item">作者</td>
                    <td class=" latest-item">章节数</td>
                    <td class=" latest-item">字数</td>
                    <td class=" latest-item">上架时间</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class=" latest-item" >我在精神病院斩学神</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻aadadasaa</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- notice -->
    <div class=" flex w-full px-32 py-6 bg">
        <img class="h-36" src="../../assets/font-3.png">
        <div class=" flex  px-16 py-8 scroll-container no-scrollbar space-x-4">
            <div class=" flex flex-1 overflow-x-auto no-scrollbar " ref="scrollContainer">
                <!-- <div class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"></div> -->
                <img v-for="(item, id) in items" :key="id" class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"
                    :src="item.content" ref="scrollContent" />
                <img v-for="(item, id) in items" :key="id + 10" class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"
                    :src="item.content" />
            </div>
        </div>
    </div>

    <div class=" flex items-center justify-center mt-16">
        <img src="../../assets/font-4.png">
    </div>

    <!-- 字里行间 -->
    <div class=" relative  mt-6 word-line ">
        <img class=" absolute top-0 " src="../../assets/gray.png">
        <img class=" word-line-first" src="../../assets/orange.png">
        <img class=" word-line-middle " src="../../assets/gray.png">
        <img class="word-line-final" src="../../assets/sign-final.png">
        <div class=" flex w-full  items-center   word-line-font-1">
            <img class=" h-48" src="../../assets/font-5.png">
            <img class="  h-80 max-w-56  shadow-2xl ml-10" src="http://127.0.0.1:9000/greate-works/ce57dd2860fe35275985a16aa2378711~tplv-resize_225_0.jpeg">
        </div>
        <div class=" flex w-full items-center word-line-font-2">
            <img class=" h-80 mx-28 shadow-2xl" src="http://127.0.0.1:9000/greate-works/1922b7d9fe214b01790cfa7f4ce482fa.jpeg">
            <img class=" h-48 w-full " src="../../assets/font-6.png">
        </div>
        <div class=" flex w-full items-center word-line-font-3">
            <img class=" h-80 mx-28 shadow-2xl" src="http://127.0.0.1:9000/greate-works/3a43868bd240290f19cb72daa06f25e0~tplv-resize_225_0.jpeg">
            <img class=" h-80 flex-1" src="../../assets/font-7.png">
        </div>
    </div>
    <div>

    </div>
</template>

<style scoped>
.navbar {
    position: fixed;
    z-index: 1000;
    top: 0;
    transition: background-color 0.5s ease;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
}

.word-line {
    height: 1850px;
}

.word-line-first {
    position: absolute;
    top: 450px;
}

.word-line-middle {
    position: absolute;
    top: 950px;
}

.word-line-final {
    position: absolute;
    top: 1480px
}

.word-line-font-1 {
    position: absolute;
    top: 150px;
}

.word-line-font-2 {
    position: absolute;
    top: 600px;
}

.word-line-font-3 {
    position: absolute;
    top: 1100px;
}

.bg {
    background: url(../../assets/gw-bg.jpg);
    background-size: cover;
    background-position: center;
}
.latest-item{
    display: table-cell;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-align: left;
    padding: 17px 84px 15px 42px;
    max-width: 290px;
    border-bottom: 1px solid rgba(0,0,0,.04);
    box-sizing: content-box;
}

.latest-item-list {
    font-size: 16px;
    line-height: 20px;
    margin-top: 40px;
    width: 100%;
    border-spacing: 0;
}

.text-box {
    width: 300px; /* 定义盒子宽度 */
    overflow-wrap: break-word; /* 允许在单词内部断行 */
    white-space: normal; /* 文本自动换行 */
    
    /* 以下是实现溢出显示...的关键CSS */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5; /* 限制在3行内 */
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>