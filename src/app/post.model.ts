export class Post{
    constructor(
        public title: string,
        public imgPath: string,
        public description: string,
        public author: string,
        public dateCreated: Date,
        public numberOfLikes: number,
        public comments: Comment[] = []
        ){
        }
}

export interface Comment {
    replies: Comment[];
    likes: number;
    text: string;
    commentReplies: Comment[];
}
  