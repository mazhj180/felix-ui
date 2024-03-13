import { ref,onMounted,onBeforeUnmount,computed } from "vue";

export default function () {
    let scrollY = ref(0)
    const handleScroll = () => {
        scrollY.value = window.scrollY;
    };
    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    let bg = computed(() => {
        if (scrollY.value > window.innerHeight * 0.75) {
            return 'white'
        }
        if (scrollY.value > window.innerHeight * 0.75 - 64) {
            let opacity = Math.min(1, scrollY.value / window.innerHeight)
            return `rgba(255,255,255,${opacity})`
        }
        return 'transparent'
    })
    return bg
}