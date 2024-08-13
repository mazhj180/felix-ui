import { type respBody, type book_vo } from "@/api/types";
import request from "@/request";
import { onMounted, reactive, ref } from "vue";

enum API {
    SEARCH = '/api/search/get-books/name'
}

export default function (){
    const historySeachRecords = reactive<string[]>([])
    const searchWords = ref<string | null>()
    const searchHits = reactive<book_vo[]>([])
    const isEmpty = ref<boolean>(false)

    const search = async () => {
        if (searchWords.value == null || searchWords.value === '') {
            return
        }
        let res = await request.get<any,respBody>(API.SEARCH+`?bookName=${searchWords.value}`)
        if (res.code == 200) {
            if(res.data.length == 0){
                isEmpty.value = true
            }
            searchHits.splice(0,searchHits.length)
            searchHits.push(...res.data)
            getHistory()
            if (!historySeachRecords.find(record => record == searchWords.value)){
                historySeachRecords.unshift(searchWords.value)
                setHistory(historySeachRecords)
            }
        }
    }

    const getHistory = () => {
        let histories = localStorage.getItem('histories')
        if(histories) {
            historySeachRecords.splice(0,historySeachRecords.length)
            historySeachRecords.push(...JSON.parse(histories))
        }
    }
    
    const setHistory = (records:string[]) => {
        localStorage.setItem('histories',JSON.stringify(records))
    }

    const clearHistories = () => {
        localStorage.removeItem('histories')
        historySeachRecords.splice(0,historySeachRecords.length)
    }

    const changeWords = (val:string) => {
        searchWords.value = val
        search()
    }

    onMounted(() => {
        getHistory()
    })

    return { searchWords, searchHits, historySeachRecords, setHistory, clearHistories, search, changeWords, isEmpty }
}