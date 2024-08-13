import {  querySlideshows } from "@/api/control";
import { onMounted, reactive, ref } from "vue";


interface slideshow {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
}

export default function() {

    let slideshows = reactive<slideshow[]>([])

    onMounted( async () => {
        
        let res = await querySlideshows()
        if (res.code == 200) {
            slideshows.push(...res.data)
        }
    })



    return {slideshows}
    
} 