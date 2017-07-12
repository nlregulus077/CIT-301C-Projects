export class Document {
  public id: string;
  public name: string;
  public url: string;
  public description: string;
  public children: Document[];

  constructor(id: string, name: string, url: string, description: string, children:Document[]){
    this.id = id;
    this.name = name;
    this.url = url;
    this.description = description;
    this.children = children;
  }
}
