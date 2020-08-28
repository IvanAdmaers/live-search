window.addEventListener('DOMContentLoaded', ()=>{

const $ = s=>document.querySelector(s);

const searchInp = $('#search-input'),
      searchResult = $('.search__result ul'),
      cards = document.querySelectorAll('.card');

const dataArr = [];

cards.forEach((card, i)=>{
  card.setAttribute('data-number', i);
  const name = card.querySelector('.card__name').textContent.split('|')[0].trim().toLowerCase();
  dataArr.push({city: name, pos: i});
});

searchInp.addEventListener('input', ()=>{
  searchResult.style.height = '0';
  searchResult.textContent = '';

  const text = searchInp.value.trim().toLowerCase();

  if(text.length <= 1) return;

  const suggestList = dataArr.filter(item=>item.city.toLowerCase().startsWith(text));

  if(suggestList.length === 0) return;

  suggestList.forEach(item=>{
    /*const li = document.createElement('li');
    li.textContent = item.city;
    li.setAttribute('data-pos', item.pos);
    searchResult.insertAdjacentElement('beforeend', li);*/
    searchResult.insertAdjacentHTML('beforeend', `<li data-pos="${item.pos}">${item.city}</li>`);
    searchResult.style.height = '200px';
  });

});


searchResult.addEventListener('click', e=>{

  if(e.target.tagName === 'LI'){
    const name = e.target.textContent;
    searchResult.style.height = '0';
    searchInp.value = name.split(/\s+/).map(word=>word[0].toUpperCase() + word.substring(1)).join(' ');
    scrollTo(`[data-number="${e.target.dataset.pos}"]`, 'active');
  }


});

const scrollTo = (elementSelector, activeClass)=>{
  const elem = $(elementSelector);
  const pos = elem.getBoundingClientRect().top;
  window.scrollTo({top: pos - 230, left: 0, behavior: 'smooth'});
  elem.classList.add(activeClass);
  //if there is a transition in the block => elem.addEventListener('transitionend', ()=>elem.classList.remove(activeClass));
  setTimeout(()=>elem.classList.remove(activeClass), 1000);
};




});






