import {EventEmitter, Injectable} from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Contact} from "../contacts/contact.model";
import {ContactService} from "../contacts/contact.service";

@Injectable()
export class MessageService {

  messageChangeEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message [] = [];
  maxMessageId: number = 0;
  senderID: Contact = null;

  constructor(private http: Http, private contactService: ContactService) {
    this.initMessages();
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id)
        return message;
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    message.id = String(this.maxMessageId);
    this.messages.push(message);
    this.storeMessages();
  }

  initMessages() {
    this.http.get('https://cms-project-777d2.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const messages: Message[] = response.json();
          return messages;
        }
      )
      .subscribe(
        (messagesReturned: Message[]) => {
          this.messages = messagesReturned;
          this.maxMessageId = this.getMaxId();
          this.messageListChangedEvent.next(this.messages.slice());
          this.senderID = this.contactService.getContact("7")
        }
      );
  }

  storeMessages() {
    let newMessage = JSON.stringify(this.messages);
    this.http.put('https://cms-project-777d2.firebaseio.com/messages.json', newMessage)
      .subscribe(
        (response: Response) => {
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }

}
