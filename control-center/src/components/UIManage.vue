<script setup lang='ts'>
import CreatorUI from './CreatorUI.vue';


</script>

<template>
    <div class="flex ">
        <div class=" flex  flex-col w-2/3">
            <!-- <div class=" flex px-5">
                <router-link to="/client-ui" class="text-gray-600 whitespace-nowrap px-2 py-2 cursor-pointer"
                    active-class="active">客户端</router-link>
                <router-link to="/creator-ui" class="text-gray-600 whitespace-nowrap px-2 py-2 cursor-pointer"
                    active-class="active">创作中心</router-link>
            </div> -->
            <CreatorUI />
        </div>
        <div class=" flex flex-1">
            <div class="device iphone-x ">
                <!--    外部轮廓    -->
                <div class="frame">
                    <div class="content bg-white">
                        <div class=" flex justify-center items-center iframe ">
                            <div class=""></div>
                            <iframe class="iframe" src="http://127.0.0.1:10001/" width="314px" height="650px"></iframe>
                        </div>
                    </div>
                </div>

                <!--    天线    -->
                <div class="stripe"></div>

                <!--    听筒孔    -->
                <div class="header">
                    <div class="sensors"></div>
                </div>

                <!--    按键    -->
                <div class="btns"></div>
                <div class="power"></div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.active {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    font-weight: 600;
    transform: scale(1.20);
    -ms-transform: rotate(0.97);
    /* IE 9 */
    -moz-transform: rotate(0.97);
    /* Firefox */
    -webkit-transform: rotate(0.97);
    /* Safari 和 Chrome */
    -o-transform: rotate(0.97);
    /* Opera */
}



.iframe {
    border-radius: 32px;
}

/** iphone */
.device *,
.device *::before,
.device *::after {
    box-sizing: border-box;
    display: block;
}

.device {
    margin: 20px 100px;
    position: fixed;
    float: right;
    top: 50%;
    /* 垂直方向上的中心位置 */
    right: 0;
    /* 紧贴视窗右侧 */
    transform: translateY(-50%);
    /* 垂直居中调整 */
    width: 314px;
    /* 或你的具体宽度 */
    height: 650px;
    /* 或你的具体高度 */

    z-index: 100;
}

.device .frame {
    z-index: 1;
}

.iphone-x {
    height: 694px;
    width: 358px;
}

.iphone-x .frame {
    background: #222;
    border-radius: 54px;
    box-shadow: inset 0 0 0 2px #606467, inset 0 0 0 6px #e2e3e4;
    height: 694px;
    padding: 22px;
    width: 358px;
}

.iphone-x .content {
    background-color: #fff;
    background-position: center center;
    background-size: cover;
    border-radius: 32px;
    height: 650px;
    position: relative;
    width: 314px;
}

.iphone-x .stripe::after,
.iphone-x .stripe::before {
    border: solid rgba(51, 51, 51, .25);
    border-width: 0 6px;
    content: "";
    height: 5px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 9;
}

.iphone-x .stripe::after {
    top: 68px;
}

.iphone-x .stripe::before {
    bottom: 68px;
}

.iphone-x .header {
    background: #222;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    height: 24px;
    left: 50%;
    margin-left: -82px;
    position: absolute;
    top: 22px;
    width: 164px;
    z-index: 199;
}

.iphone-x .header::after,
.iphone-x .header::before {
    content: "";
    height: 6px;
    position: absolute;
    top: 0;
    width: 6px;
}

.iphone-x .header::after {
    background: radial-gradient(circle at bottom left, transparent 0, transparent 75%, #222 75%, #222 100%);
    left: -6px;
}

.iphone-x .header::before {
    background: radial-gradient(circle at bottom right, transparent 0, transparent 75%, #222 75%, #222 100%);
    right: -6px;
}

.iphone-x .sensors::after,
.iphone-x .sensors::before {
    content: "";
    position: absolute;
}

.iphone-x .sensors::after {
    background: #444;
    border-radius: 2.5px;
    height: 5px;
    left: 50%;
    margin-left: -20px;
    top: 4px;
    width: 40px;
}

.iphone-x .sensors::before {
    background: #444;
    border-radius: 50%;
    height: 11px;
    left: 50%;
    margin-left: 30px;
    top: 1px;
    width: 11px;
}

.iphone-x .btns {
    background: #606467;
    height: 26px;
    left: -2px;
    position: absolute;
    top: 92px;
    width: 3px;
}

.iphone-x .btns::after,
.iphone-x .btns::before {
    background: #606467;
    content: "";
    height: 50px;
    left: 0;
    position: absolute;
    width: 3px;
}

.iphone-x .btns::after {
    top: 48px;
}

.iphone-x .btns::before {
    top: 112px;
}

.iphone-x .power {
    background: #606467;
    height: 80px;
    position: absolute;
    right: -2px;
    top: 160px;
    width: 3px;
}
</style>