import { elements } from './base';
export const getInput=()=>{
   return elements.searchInput.value;
}

export const clearInput=()=>{
    elements.searchInput.value='';
}

export const highlightSelected=id=>{
    const resultArr=document.querySelectorAll('.results__link');
    resultArr.forEach(el=>el.classList.remove('results__link--active'));
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

export const limitRecipeName=(name,limit=17)=>
{
    const newTitle=[];
    if(name.length>limit)
    {
        name.split(' ').reduce((acc,curr)=>
        {
            if(acc+curr.length<=limit)
            {
                newTitle.push(curr);
            }
            return acc+curr.length;
        },0);

        return `${newTitle.join(' ')} ...`;
    }
    return name;
}

const renderRecipe=recipe=>{
    const markup=`
    <li>
                    <a class="results__link results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url
                            }" alt="Test">
                        </figure>
                        <div class="${recipe.title}">
                            <h4 class="results__name">${limitRecipeName(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
}

const makePage=(page,type)=>{
    var markup=`<button class="btn-inline results__btn--${type==='next'?'next':'prev'}" data-goto=${page}>
    <span>Page ${page}</span>    
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='next'?'right':'left'}"></use>
    </svg>
    </button>`;
    return markup;
}

const clearPageBtn=()=>
{
    elements.resPage.innerHTML='';
}

const renderButton=(page,totalRecipes,limit=10)=>
{
    var totalPages=Math.ceil(totalRecipes/limit);
    var pages;
    if(page===1 && totalPages>1)
    {
        pages=makePage(page+1,'next');
    }
    else if(page>1 && page!==totalPages)
    {
        pages=`${makePage(page+1,'next')} ${makePage(page-1,'prev')}`;
    }
    else if(page===totalPages && totalPages>1){
        pages=makePage(page-1,'prev');
    }

    elements.resPage.insertAdjacentHTML('beforeend',pages);
}

export const renderResult=(recipes,page=1,limit=10)=>{
    var start=(page-1)*limit;
    var end=page*limit;
    clearPageBtn();
    recipes.slice(start,end).forEach(renderRecipe);
    renderButton(page,recipes.length)
}

export const clearResult=()=>{
    elements.searchResultList.innerHTML='';
}