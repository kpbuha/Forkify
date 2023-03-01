import Recipe from './model/Recipe';
import Search from './model/Search'
import List from './model/List';
import { clearLoader, elements,renderLoader } from './view/base';
import * as searchView from './view/searchView'
import * as recipeView from './view/recipeView'
import * as ListView from './view/listView'
import * as LikeView from './view/likeView'
import Likes from './model/Likes';

const state={}

const ControlSearch=async ()=>{
  const query=searchView.getInput();
  if(query)
  {
    clearLoader();
    state.search=new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchResult);
    await state.search.GetResult();
    clearLoader();
    searchView.renderResult(state.search.result);
  }
}

const ControlRecipe=async()=>{
  const id=window.location.hash.replace('#','');
  if(id)
  {
    recipeView.clearRecipe();
    clearLoader();
    renderLoader(elements.recipe);

    if(state.search){searchView.highlightSelected(id);}

    state.recipe=new Recipe(id);
    await state.recipe.GetRecipe();
    state.recipe.GetPrepTime();
    state.recipe.GetServing();
    state.recipe.ParseIngredients();

    clearLoader();
    if(state.like){
      recipeView.renderRecipe(state.recipe,state.like.isLiked(id));
    }
    else
    {
      recipeView.renderRecipe(state.recipe,false);
    }
  }
}

const controlLikes=async()=>
{
  const id=state.recipe.id;
  if(!state.like){state.like=new Likes();}
  if(!state.like.isLiked(id))
  {
    const newLike=state.like.addItem(id,state.recipe.title,state.recipe.publisher,state.recipe.image);
    LikeView.renderLike(newLike);
    LikeView.toggleLikeBtn(true);
  }
  else{
    state.like.deleteItem(id);
    LikeView.toggleLikeBtn(false);
    LikeView.deleteLike(id);
  }
  LikeView.toggleLikeMenu(state.like.totalLike());
}

const controlList=()=>{
  if(!state.list)state.list=new List();

  state.recipe.ingredients.forEach((el,i)=>{
    state.list.AddItem(el.count,el.unit,el.ingredient);
    ListView.renderItem(state.list.items[i]);
  });

}

elements.searchForm.addEventListener('submit',e=>{
  e.preventDefault();
  ControlSearch();
});

elements.resPage.addEventListener('click',(event)=>
{
    const btn=event.target.closest('.btn-inline');
    if(btn)
    {
      const goToPage=parseInt(btn.dataset.goto,10);
      searchView.clearResult();
      searchView.renderResult(state.search.result,goToPage);
    }
});

['hashchange','load'].forEach((ele)=>window.addEventListener(`${ele}`,ControlRecipe));

elements.recipe.addEventListener('click',e=>{
  if(e.target.matches('.btn-decrease,.btn-decrease *'))
  {
    if(state.recipe.serving>1){
    state.recipe.UpdateServings('dec');
    recipeView.updateServingIng(state.recipe);
    }
  }
  else if(e.target.matches('.btn-increase,.btn-increase *'))
  {
    state.recipe.UpdateServings('inc');
    recipeView.updateServingIng(state.recipe);
  }else if(e.target.matches('.recipe__btn-add,.recipe__btn--add *'))
  {
    controlList();
  }
  else if(e.target.matches('.recipe__love,.recipe__love *'))
  {
    controlLikes();
  }
});

elements.shopList.addEventListener('click',e=>{
  const id=e.target.closest('.shopping__item').dataset.itemid;
  if(e.target.matches('.shopping__delete, .shopping__delete *'))
  {
    state.list.DeleteItem(id);
    ListView.DeleteItem(id);
  }
  else if(e.target.matches('.shopping__count-value'))
  {
    var val=parseFloat(e.target.value,10);
    if(val<0)
    {
      e.target.value=0;
      val=0;
    }
    state.list.UpdateCount(id,val);
  }
})

// window.addEventListener('load',()=>{
//   state.likes=new Likes();
//   state.likes.readStorage();
//   LikeView.toggleLikeMenu(state.like.totalLike());
//   state.likes.Likes.forEach(like=>LikeView.renderLike(like));
// })
