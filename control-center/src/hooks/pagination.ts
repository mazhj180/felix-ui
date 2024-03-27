import { useUserStore } from '@/store/user';
import { onMounted, reactive } from "vue"

export default function() {

    let userStore = useUserStore()

    const pageInfo = reactive({
        current: 1,
        size: 8,
        total:0
    })

    const handleCurrentChange = (current:any) => {
        pageInfo.current = current
        console.log('@@@@',current)
        userStore.setUsers(null,pageInfo.current,pageInfo.size)
    }

    const search = (userId:string|null) => {
        userStore.setUsers(userId,pageInfo.current,pageInfo.size)
    }

    onMounted(async () => {
        userStore.setUsers(null,pageInfo.current,pageInfo.size)
    })

    return { pageInfo, search, handleCurrentChange}

}