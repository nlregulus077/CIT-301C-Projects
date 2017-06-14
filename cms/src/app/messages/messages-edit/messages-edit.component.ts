import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from '../messages.model';
import {MessageService} from '../message.service';
import {ContactService} from "../../contacts/contact.service";
import {Contact} from "../../contacts/contact.model";

@Component({
  selector: 'cms-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  currentSender: string = 'Jeanina Lao';
  senderID: Contact = null;
  senderName: Contact = null;



  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit() {
    this.senderID = this.contactService.getContact('7');
  }

  onSendMessage() {
    const subjectName = this.subjectInputRef.nativeElement.value;
    const messageText = this.msgTextInputRef.nativeElement.value;
    const sendID = this.senderID.id;
    const newMessage = new Message(null, subjectName, messageText, sendID);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = null;
    this.msgTextInputRef.nativeElement.value = null;

  }

}
