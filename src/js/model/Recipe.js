import axios from "axios";
export default class Recipe{
    constructor(id)
    {
        this.id=id;
    }
    async GetRecipe(){
        const result=await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.image=result.data.recipe.image_url;
        this.ingredients=result.data.recipe.ingredients;
        this.publisher=result.data.recipe.publisher;
        this.title=result.data.recipe.title;
        this.url=result.data.recipe.source_url;
    }

    GetPrepTime()
    {
        this.time=Math.ceil(this.ingredients.length/3)*15;
    }

    GetServing()
    {
        this.serving=4;
    }

    ParseIngredients()
    {
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds','cans'];
        const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound','kg','gm'];

        const newIngredients=this.ingredients.map(el=>
            {
                let ingredient=el.toLowerCase();
                unitsLong.forEach((element,ind) => {
                   ingredient= ingredient.replace(element,unitShort[ind]);
                });
                ingredient=ingredient.replace(/ *\([^)]*\) */g,' ');

                const arrIng=ingredient.split(' ');
                const unitInd=arrIng.findIndex(ele=>unitShort.includes(ele));
                var objIng;
                if(unitInd>-1)
                {
                    const arrCount=arrIng.slice(0,unitInd);
                    let count;
                    if(arrCount.length===1)
                    {
                        count=eval(arrIng[0].replace('-','+'));
                    }
                    else{
                        count=eval(arrIng.slice(0,unitInd).join('+'));
                    }

                    objIng={
                        count,
                        unit:arrIng[unitInd],
                        ingredient:arrIng.slice(unitInd+1).join(' ')
                    }
                }
                else if(parseInt(arrIng[0],10))
                {
                    objIng={
                        count:parseInt(arrIng[0],10),
                        unit:'',
                        ingredient:arrIng.slice(1).join(' ')
                    }
                }
                else if(unitInd===-1)
                {
                    objIng={
                        count: 1,
                        unit:'',
                        ingredient
                    }
                }
                return objIng;
            });
            this.ingredients=newIngredients;
    }

    UpdateServings(type)
    {
        const newServings=type==='dec'?this.serving-1:this.serving+1;

        this.ingredients.forEach(ing=>{
            ing.count=ing.count*(newServings/this.serving);
        })

        this.serving=newServings;
    }
}