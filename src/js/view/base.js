export const elements= {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList:document.querySelector('.results__list'),
    searchResult:document.querySelector('.results'),
    resPage:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shopList:document.querySelector('.shopping__list'),
    likeBtn:document.querySelector('.likes__list')
};

export const elementString={
    loader:'loader'
}

export const renderLoader=parent=>{
    const loader=`
        <div class="${elementString.loader}">
        <svg>
        <use href="img/icons.svg#icon-cw"></use>
        </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader=()=>{
    const loader=document.querySelector(`.${elementString.loader}`);
    if(loader)
    {
        loader.parentElement.removeChild(loader);
    }
}