import { wordLineReq } from "@/api/control";
import type { book_vo, respBody } from "@/api/types";
import request from "@/request";
import { onMounted, reactive } from "vue";

interface wordLineItem {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
    contents?:wordLineContent
}

export interface wordLineContent {
    word:string;
    image?:string;
    name:string;
    bookId?:string;
    info:string
}


enum API {
    GET_STUDY_CORNER_DATA='/api/book/get-book/classics'
}

export default function () {
    const wordLines = reactive<wordLineItem[]>([])
    const studyCornerData = reactive<book_vo[]>([])

    const getWordLines = async () => {
        let res = await wordLineReq()
        if (res.code === 200) {
            wordLines.push(...res.data)
            for (const i in wordLines) {
                wordLines[i].contents = JSON.parse(wordLines[i].content)
            }
        }
    }

    const getStudyCorner = async () => {
        let res = await request.get<any,respBody>(API.GET_STUDY_CORNER_DATA)
        if (res.code == 200) {
            studyCornerData.push(...res.data)
        }
    }

    onMounted(() => {
        getWordLines()
        getStudyCorner()
    })

    return { wordLines, studyCornerData }
}