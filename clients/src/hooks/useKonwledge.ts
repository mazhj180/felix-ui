import type { book_vo, respBody } from '@/api/types';
import request from '@/request';
import { onMounted, reactive } from 'vue';

enum API {
    GET_KONLEDGE_DATA = '/api/book/get-book/education'
}

export default function () {
    
    const knowledgeData = reactive<book_vo[]>([])

    const getKonledgeData = async () => {
        let res = await request.get<any,respBody>(API.GET_KONLEDGE_DATA)
        if (res.code == 200) {
            knowledgeData.push(...res.data)
        }
    }

    onMounted(() => {
        getKonledgeData()
    })

    return {knowledgeData}
    
}