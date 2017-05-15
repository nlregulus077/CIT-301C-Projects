import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from "../messages.model";

@Component({
  selector: 'cms-messages-edit',
  templateUrl: './messages-edit.component.html',
  styleUrls: ['./messages-edit.component.css']
})
export class MessagesEditComponent implements OnInit {

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Jeanina Lao';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subjectName = this.subjectInputRef.nativeElement.value;
    const messageText = this.msgTextInputRef.nativeElement.value;
    const senderName = this.currentSender;
    const newMessage = new Message(null, subjectName, messageText, senderName);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    const subjectName = null;
    const messageText = null;
    const senderName = this.currentSender;
    const blankMessage = new Message(null, subjectName, messageText, senderName);
    this.addMessageEvent.emit(blankMessage);
  }

}
