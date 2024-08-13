import { deleteBook, listingBook, queryBooks, updateScore, updateSupport } from "@/api/api";
import debounce from "@/utils/debounce";
import type { UploadFile } from "element-plus";
import { computed, onMounted, reactive, ref, watch, type Ref } from "vue";

export interface book_vo {
    bookId: string;
    authorId: string;
    authorName: string;
    bookName: string;
    categories: string[];
    score: number;
    keywords: string;
    imgUrl: string;
    introduction: string;
    isbn: string;
    wordCount: number;
    supportCount: number;
    createTime: Date;
    updateTime: Date;
}

export default function () {
    let books = reactive<book_vo[]>([])
    let current = ref<number>(1)
    let pageSize = ref<number>(10)
    let bookName = ref<string | null>('')
    let appends = []
    const fileList :Ref<UploadFile[]> = ref([]);

    const handleChange = (file:UploadFile, fileList1:UploadFile[]) => {
        console.log(file, fileList1);
        fileList.value = fileList1
        console.log('@@@',fileList.value[0])
    }


    async function searchBook() {
        let res = await queryBooks(bookName.value, { pageNum: current.value, pageSize: pageSize.value })
        if (res.code == 200) {
            books.push(...res.data)
            appends = res.data
        }
    }

    const loading = ref(false)
    const noMore = computed(() => appends.length < 10)
    const disabled = computed(() => loading.value || noMore.value)

    function load(bookName:string) {
        loading.value = true
        setTimeout(() => {
            searchBook()
            current.value = current.value + 1
            loading.value = false
        }, 2000)
    }

    const handleDel = (bookId: string, idx: number) => {
        ElMessageBox.confirm(
            '危险操作是否继续?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                deleteBook(bookId)
                books.splice(idx,1)
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Delete canceled',
                })
            })
    }

    const scoring = async (bookId:string,score:number,idx:number) => {
        try {
            let res = await updateScore(bookId,score)
            if (res.code == 200){
                books[idx].score = score
            }
        } catch (error) {
            
        }
    }

    const support = async (bookId:string,support:number,idx:number) => {
        try {
            let res = await updateSupport(bookId,support)
            if (res.code == 200) {
                books[idx].supportCount = support
            }
        } catch (error) {
            
        }
    }

    const listing = async (workId:string) => {
        try {
            let formData = new FormData()
            if (fileList.value.length > 0 && fileList.value[0].raw) {
                formData.append('file',fileList.value[0].raw)
            }
            formData.append('workId',workId)
            
            let res = await listingBook(formData)
            if (res.code == 200) {
                ElMessage({
                    showClose: true,
                    message: '操作成功',
                    type: 'success'
                })
                return true
            } else {
                ElMessage({
                    showClose: true,
                    message: '操作失败',
                    type: 'error'
                })
                return false
            }
        } catch (error) {
            return false
        }
    }

    watch(bookName,(newVal) => {
        current.value = 1
        books.splice(0,books.length)
        debounce(searchBook,300)()
    })

    onMounted(() => {
        searchBook()
    })

    return { bookName, books,loading, noMore, disabled, searchBook, load, handleDel, scoring, support, handleChange, listing}
}