import uniqid from 'uniqid';
export default class List{
    constructor()
    {
        this.items=[];
    }
    
    AddItem(count,unit,ingredient)
    {
        const item={
            id:uniqid(),
            count,unit,ingredient
        }
        this.items.push(item);
    }

    DeleteItem(id)
    {
        const index=this.items.findIndex((ele)=>ele.id===id);
        this.items.splice(index,1);
    }

    UpdateCount(id,newCount)
    {
        this.items.find((ele)=>ele.id===id).count=newCount;
    }
}