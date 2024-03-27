<script setup lang='ts'>

</script>

<template>

    <div class="device iphone-x ">
        <!--    外部轮廓    -->
        <div class="frame">
            <div class="content bg-white">
                <div class=" flex justify-center items-center">
                    <iframe src="http://127.0.0.1:3000/auth/" width="314px" height="650px"></iframe>
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
</template>

<style scoped>

.device *,
.device *::before,
.device *::after {
    box-sizing: border-box;
    display: block;
}

.device {
    margin: 0px 100px;
    position: relative;
    float: right;
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