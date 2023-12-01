export class Post{

    constructor(
        public title: string,
        public imgPath: string,
        public description: string,
        public author: string,
        public dateCreated: Date,
        public numberOfLikes: number,
        public comments: Comment[] = [],
        public userId?: string,
        public likedByUsers?: string[],
        public postId?: string
        ){

        }
}

export interface Comment {
    replies: Comment[];
    likedByUsers?: string[];
    likes: number;
    text: string;
    commentReplies: Comment[];
    userId?: string;
}

export interface User {
    id: number;
    name: string;
    username: string; // Add this line
    password: string;
  }