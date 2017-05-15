export class Message {
  public messageID: string;
  public subject: string;
  public msgText: string;
  public sender: string;



  constructor(messageID:string, subject:string, msgText:string, sender:string) {
    this.messageID = messageID;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;

  }
}
