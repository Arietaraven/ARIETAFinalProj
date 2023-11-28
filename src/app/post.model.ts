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
        ){

        }
}

export interface Comment {
    replies: Comment[];
    likes: number;
    text: string;
    commentReplies: Comment[];
}

export interface User {
    id: number;
    name: string;
    username: string; // Add this line
    password: string;
  }