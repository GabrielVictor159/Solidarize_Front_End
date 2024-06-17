import AttachedFile from "./AttachedFile";

export default class MessageDiscution{
    public Id:string;
    public Message:string;
    public IdShipping: string;
    public IdUser: string;
    public CreationDate: string;
    public AttachedFiles: AttachedFile[] = [];

    constructor(data: any) {
        this.Id = data.Id;
        this.Message = data.Message;
        this.IdShipping = data.IdShipping;
        this.IdUser = data.IdUser;
        this.CreationDate = data.CreationDate;
        data.AttachedFiles.forEach((element:any) => {
            this.AttachedFiles.push(new AttachedFile(element));
        });
    }


} 