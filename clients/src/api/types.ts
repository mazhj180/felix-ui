export interface respBody {
    code:number,
    message:string,
    data:any
}

export interface loginInfo{
    userId:string,
    password:string
}

export interface category{
    id:number,
    categoryId:string,
    name:string
}

export interface categories {
    code:number;
    message:string;
    data:category[]
}

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

export interface rank_vo {
    bookId: string
    authorName: string,
    bookName: string,
    imgUrl: string,
    supportCount: number,
    score: number,
    hot: number
}

export interface rankings {
    hot:rank_vo[];
    like:rank_vo[];
    score:rank_vo[];
}

export interface ranking_resp {
    code:number;
    message:string;
    data:rank_vo[];
}

export enum rank_type {
    HOT = 'hot',
    LIKE = 'like',
    SCORE = 'score'
}

export interface books_resp {
    code:number,
    message:string,
    data:book_vo[]
}


