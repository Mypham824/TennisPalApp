export interface AppPosts {
    key: string;
    title: string;
    matchtype: string;
    matchmode: string; 
    bestof: number;
    location: string; 
    dateofmatch: number;
    description: string;
    datecreated: string;
    user: AppUser;
    comments: number; 
}


export interface PostComments {
    key?: string;
    post: string;
    text: string;
    user: AppUser;
    datecreated: string;
    votesUp: number;
    votesDown: number;
}

export interface UserInfo {

        email: string;
        password: string;
}

export interface AppUser {
    uid: string;
    username: string;
}

export interface ArraySort<T> {
    (item: T): boolean;
}

