export default class AttachedFile {

    public Item: string;
    public Type: number;
    public CreationDate: string;
    public IdMessageDiscution: string;

    constructor(data: any) {
        this.Item = data.Item;
        this.Type = data.Type;
        this.CreationDate = data.CreationDate;
        this.IdMessageDiscution = data.IdMessageDiscution;
    }
}