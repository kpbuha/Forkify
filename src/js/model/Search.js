import axios from 'axios'
export default class Search{
    constructor(query)
    {
        this.query=query;
    }

    async GetResult()
    {
        const result=await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.result=result.data.recipes;
    }
}