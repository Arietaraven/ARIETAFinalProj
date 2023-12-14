import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export interface Message {
  userEmail: string;
  otherUserEmail: string;
  message: string;
  read: boolean;
  participants: string;
  // other properties...
}


@Injectable()
export class ChatService {
  constructor(private afs: AngularFirestore) { }

  // getMessages(userEmail: string, otherUserEmail: string): Observable<any[]> {
  //   return this.db.list(`messages/${userEmail}/${otherUserEmail}`).valueChanges();
  // }
  // getMessages(userEmail: string, otherUserEmail: string) {
  //   // Encode the emails
  //   let encodedUserEmail = userEmail.replace(/\./g, ',');
  //   let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

  //   // Use the encoded emails in the Firebase path
  //   return this.afs.collection<Message>(`messages/${encodedUserEmail}/${encodedOtherUserEmail}`).valueChanges()
  // .pipe(
  //   map((messages: Message[]) => {
  //     // Decode the emails before returning the messages
  //     messages.forEach((message: Message) => {
  //       if (message.userEmail) {
  //         message.userEmail = message.userEmail.replace(/,/g, '.');
  //       }
  //       if (message.otherUserEmail) {
  //         message.otherUserEmail = message.otherUserEmail.replace(/,/g, '.');
  //       }
  //     });
  //     return messages;
  //   })
  // );
  // }

  // getMessages(userEmail: string, otherUserEmail: string) {
  //   if (!userEmail || !otherUserEmail) {
  //     throw new Error('Both userEmail and otherUserEmail must be provided');
  //   }
  
  //   // Encode the emails
  //   let encodedUserEmail = userEmail.replace(/\./g, ',');
  //   let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');
  
  //   // Use the encoded emails in the Firebase path
  //   return this.afs.collection<Message>(`messages/${encodedUserEmail}/${encodedOtherUserEmail}`).valueChanges()
  //   .pipe(
  //     map((messages: Message[]) => {
  //       // Decode the emails before returning the messages
  //       messages.forEach((message: Message) => {
  //         if (message.userEmail) {
  //           message.userEmail = message.userEmail.replace(/,/g, '.');
  //         }
  //         if (message.otherUserEmail) {
  //           message.otherUserEmail = message.otherUserEmail.replace(/,/g, '.');
  //         }
  //       });
  //       return messages;
  //     })
  //   );
  // }


 // Modify the getMessages method
 getMessages(userEmail: string, otherUserEmail: string) {
  if (!userEmail || !otherUserEmail) {
    throw new Error('Both userEmail and otherUserEmail must be provided');
  }

  // Encode the emails
  let encodedUserEmail = userEmail.replace(/\./g, ',');
  let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

  // Use a combination of the encoded emails as the document ID
  let chatId1 = `${encodedUserEmail}_${encodedOtherUserEmail}`;
  let chatId2 = `${encodedOtherUserEmail}_${encodedUserEmail}`;

  // Use the chatId in the Firestore path
  let messages1 = this.afs.collection<Message>(`chats/${chatId1}/messages`).valueChanges();
  let messages2 = this.afs.collection<Message>(`chats/${chatId2}/messages`).valueChanges();

  // Combine the messages from both chatIds
  return combineLatest([messages1, messages2]).pipe(
    map(([messages1, messages2]) => {
      let combinedMessages = [...messages1, ...messages2];
      // Decode the emails before returning the messages
      combinedMessages.forEach((message: Message) => {
        if (message.userEmail) {
          message.userEmail = message.userEmail.replace(/,/g, '.');
        }
        if (message.otherUserEmail) {
          message.otherUserEmail = message.otherUserEmail.replace(/,/g, '.');
        }
      });
      return combinedMessages;
    })
  );
}


//   sendMessage(message: string, userEmail: string, otherUserEmail: string): void {
//     this.db.list(`messages/${userEmail}/${otherUserEmail}`).push({ message, userEmail });
//     this.db.list(`messages/${otherUserEmail}/${userEmail}`).push({ message, userEmail });
//   }
// }
// sendMessage(message: string, userEmail: string, otherUserEmail: string): void {
//   // Encode the emails
//   let encodedUserEmail = userEmail.replace(/\./g, ',');
//   let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

//   // Use the encoded emails in the Firebase path
//   this.db.list(`messages/${encodedUserEmail}/${encodedOtherUserEmail}`).push({ message, userEmail });
//   this.db.list(`messages/${encodedOtherUserEmail}/${encodedUserEmail}`).push({ message, userEmail });
// }
// sendMessage(message: string, userEmail: string, otherUserEmail: string): void {
//   // Encode the emails
//   let encodedUserEmail = userEmail.replace(/\./g, ',');
//   let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

//   // Use the encoded emails in the Firestore path
//   let path = `messages/${encodedUserEmail}/${encodedOtherUserEmail}`;
//   let messageCollection: AngularFirestoreCollection<Message> = this.afs.collection(path);
//   messageCollection.add({ message, userEmail, otherUserEmail: encodedOtherUserEmail });

//   path = `messages/${encodedOtherUserEmail}/${encodedUserEmail}`;
//   messageCollection = this.afs.collection(path);
//   messageCollection.add({ message, userEmail, otherUserEmail: encodedUserEmail });
// }

// Modify the sendMessage method
// sendMessage(message: string, userEmail: string, otherUserEmail: string): void {
//   // Encode the emails
//   let encodedUserEmail = userEmail.replace(/\./g, ',');
//   let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

//   // Use a combination of the encoded emails as the document ID
//   let chatId = `${encodedUserEmail}_${encodedOtherUserEmail}`;

//   // Use the chatId in the Firestore path
//   let path = `chats/${chatId}/messages`;
//   let messageCollection: AngularFirestoreCollection<Message> = this.afs.collection(path);
//   messageCollection.add({ message, userEmail, otherUserEmail: encodedOtherUserEmail });

// }
sendMessage(message: string, userEmail: string, otherUserEmail: string): void {
  // Check the emails
  if (!userEmail.includes('@') || !otherUserEmail.includes('@')) {
    throw new Error('Both userEmail and otherUserEmail must be valid emails');
  }
  // Encode the emails
  let encodedUserEmail = userEmail.replace(/\./g, ',');
  let encodedOtherUserEmail = otherUserEmail.replace(/\./g, ',');

  // Use a combination of the encoded emails as the document ID
  let chatId = `${encodedUserEmail}_${encodedOtherUserEmail}`;

  // Use the chatId in the Firestore path
  let path = `chats/${chatId}/messages`;
  let messageCollection: AngularFirestoreCollection<Message> = this.afs.collection(path);
  messageCollection.add({ message, userEmail, otherUserEmail: encodedOtherUserEmail, read: false, participants: [encodedUserEmail, encodedOtherUserEmail].sort().join(':') });
}

// Add a new method to get the list of chats for a user
// getChats(userEmail: string) {
//   if (!userEmail) {
//     throw new Error('userEmail must be provided');
//   }

//   // Encode the email
//   let encodedUserEmail = userEmail.replace(/\./g, ',');

//   // Use the encoded email in the Firestore path
//   return this.afs.collection('chats', ref => ref.where('participants', 'array-contains', encodedUserEmail)).valueChanges().pipe(
//     tap(chats => {
//       console.log('Data received in getChats:', chats);
//     })
//   );
// }
// getChats(userEmail: string): Observable<any[]> {
//   if (!userEmail) {
//     throw new Error('userEmail must be provided');
//   }

//   // Encode the email
//   let encodedUserEmail = userEmail.replace(/\./g, ',');

//   // Use the encoded email in the Firestore path
//   return this.afs.collection('chats', ref => ref.where('participants', 'array-contains', encodedUserEmail)).get().pipe(
//     switchMap(chats => {
//       // Fetch the messages from each chat
//       let messagesObservables = chats.docs.map(chat => {
//         return this.afs.collection('chats').doc(chat.id).collection('messages').valueChanges();
//       });
//       return combineLatest(messagesObservables);
//     }),
//     tap(chats => {
//       console.log('Data received in getChats:', chats);
//     })
//   );
// }
// getChats(userEmail: string): Observable<any[]> {
//   if (!userEmail) {
//     throw new Error('userEmail must be provided');
//   }

//   // Encode the email
//   let encodedUserEmail = userEmail.replace(/\./g, ',');

//   // Use the encoded email in the Firestore path
//   return this.afs.collection('chats', ref => ref.where('participants', 'array-contains', encodedUserEmail)).get().pipe(
//     switchMap(chats => {
//       // Fetch the messages from each chat
//       let messagesObservables = chats.docs.map(chat => {
//         return this.afs.collection('chats').doc(chat.id).collection('messages').valueChanges();
//       });
//       return combineLatest(messagesObservables).pipe(
//         map(messages => ({chats, messages}))
//       );
//     }),
//     map(({chats, messages}) => {
//       // For each chat, count the number of unread messages
//       return messages.map((messages, index) => {
//         let unreadCount = messages.map(doc => doc['data']() as Message).filter(message => !message.read).length;
//         return { ...(chats.docs[index].data() || {}), unreadCount };
//       });
//     }),
//     tap(chats => {
//       console.log('Data received in getChats:', chats);
//     })
//   );
// }
getChats(userEmail: string): Observable<any[]> {
  if (!userEmail) {
    throw new Error('userEmail must be provided');
  }

  // Encode the email
  let encodedUserEmail = userEmail.replace(/\./g, ',');

  // Use the encoded email in the Firestore path
  return this.afs.collection('chats', ref => ref.where('participants', 'array-contains', encodedUserEmail)).get().pipe(
    switchMap(chats => {
      // Fetch the messages from each chat
      let messagesObservables = chats.docs.map(chat => {
        return this.afs.collection('chats').doc(chat.id).collection('messages').valueChanges();
      });
      return combineLatest(messagesObservables).pipe(
        map(messages => ({chats, messages}))
      );
    }),
    map(({chats, messages}) => {
      // For each chat, count the number of unread messages and include the messages
      return messages.map((messages, index) => {
        let unreadCount = messages.filter(message => !message['read']).length;
        return { ...(chats.docs[index].data() || {}), unreadCount, messages };
      });
    }),
    tap(chats => {
      console.log('Data received in getChats:', chats);
    })
  );
}
// Add a new method to mark all messages in a chat as read
markAllMessagesAsRead(chatId: string): void {
  let messageCollection: AngularFirestoreCollection<Message> = this.afs.collection(`chats/${chatId}/messages`);
  messageCollection.get().subscribe(snapshot => {
    snapshot.docs.forEach(doc => {
      doc.ref.update({ read: true });
    });
  });
}
getUnreadNotifications(userEmail: string): Observable<Message[]> {
  // Encode the email
  let encodedUserEmail = userEmail.replace(/\./g, ',');

  // First, fetch the chats that the current user is a participant in
  return this.afs.collection('chats', ref => ref.where('participants', 'array-contains', encodedUserEmail)).get().pipe(
    switchMap(chats => {
      // Then, for each chat, fetch the unread messages
      let unreadMessagesObservables = chats.docs.map(chat => {
        return this.afs.collection('chats').doc(chat.id).collection<Message>('messages', ref => ref.where('read', '==', false)).valueChanges();
      });
      return combineLatest(unreadMessagesObservables);
    }),
    map(chatsUnreadMessages => {
      // Flatten the array of arrays into a single array of messages
      return ([] as Message[]).concat(...chatsUnreadMessages);
    })
  );
}

}