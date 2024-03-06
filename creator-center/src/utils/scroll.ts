import { onMounted, onBeforeUnmount, onUnmounted, ref, computed, reactive } from 'vue';

const scrollContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let scrollPosition = 0;
let scrollWidth = 0;
let animationFrameId: number | null = null;


const startScrolling = () => {
    if (!scrollContainer.value) return;
    scrollWidth = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
    const speed = 1; // 设置滚动速度
    console.log('width',scrollWidth)
    function scrollContent() {
        if (scrollPosition < scrollWidth && scrollContainer.value != null) {
            scrollPosition += speed;
            scrollContainer.value.scrollLeft = scrollPosition;
        } else {
            scrollPosition = 0; // 重置滚动位置
        }
        animationFrameId = requestAnimationFrame(scrollContent);
        console.log('animationFrameId',animationFrameId)
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