export class Document {
  public documentID: number;
  public docName: string;
  public docDescription: string;
  public docURL: string;
  public docChildren: any;

  constructor(documentID: number, docName: string, docDescription: string, docURL: string, docChildren:any){
    this.documentID = documentID;
    this.docName = docName;
    this.docDescription = docDescription;
    this.docURL = docURL;
    this.docChildren = docChildren;
  }
}
