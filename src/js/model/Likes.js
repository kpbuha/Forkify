export default class Likes{
    constructor()
    {
        this.Likes=[];
    }

    addItem(id,title,author,img)
    {
        const obj={id,title,author,img};
        this.Likes.push(obj);
        //this.persistData();
        return obj;
    }

    deleteItem(id)
    {
        var index=this.Likes.findIndex((ele)=>ele.id===id);
        this.Likes.splice(index,1);
        //this.persistData();
    }

    isLiked(id)
    {
        return this.Likes.findIndex((ele)=>ele.id===id)!==-1;
    }

    totalLike()
    {
        return this.Likes.length;
    }

    // persistData()
    // {
    //     localStorage.setItem('likes',JSON.stringify(this.Likes));
    // }

    // readStorage()
    // {
    //     const storage=JSON.parse(localStorage.getItem('likes'));
    //     if(storage)this.Likes=storage;
    // }
}