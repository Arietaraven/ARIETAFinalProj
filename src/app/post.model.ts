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
    userImageUrl?: string;
}

export interface User {
    id: number;
    name: string;
    username: string; // Add this line
    password: string;
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  }


export class FirebaseNotification {
    id: string;
    postId: string;
    userId: string;
    uid: string; // Add this line
    message: string;
    read: boolean;
    date: Date;
  
    constructor(id: string, postId: string, userId: string, uid: string, message: string, read: boolean, date: Date) {
      this.id = id;
      this.postId = postId;
      this.userId = userId;
      this.uid = uid; // Add this line
      this.message = message;
      this.read = read;
      this.date = date;
    }
  }