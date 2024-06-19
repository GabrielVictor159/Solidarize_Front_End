import ValidateItensItem from "./ValidateItensItem";

export default class ValidateItens{
    constructor(items:ValidateItensItem[])
    {
        this.Items=items;
    }
    public Items: ValidateItensItem[];

    public AddItem(item:ValidateItensItem){
        var resultItem = this.Items.findIndex(e=>e.Name===item.Name);
        if(resultItem===-1){
            this.Items.push(item);
        }
        else{
            this.Items[resultItem]=item;
        }
    }
  }