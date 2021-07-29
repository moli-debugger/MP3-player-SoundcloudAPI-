//client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
//Seach box
let searchbox=document.querySelector('.js-submit').addEventListener('click',function(){
  let input =document.querySelector('.js-search').value
  let remove=document.querySelector('.js-search-results')
  remove.innerHTML=''
  SoundCloudAPI.int(input)
})
function enter(){
 let input=document.querySelector('.js-search').addEventListener('keyup',function(e){
   if(e.which==13){
    let inputValue=document.querySelector('.js-search').value
    console.log(inputValue)
     let remove=document.querySelector('.js-search-results')
     remove.innerHTML=''
     SoundCloudAPI.int(inputValue)
   }
 })
}
enter()
let SoundCloudAPI={}
SoundCloudAPI.int=function(input){
SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
  console.log()
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: input, genres: 'Rock'
  }).then(function(tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks)
  });
}

SoundCloudAPI.int()

SoundCloudAPI.renderTracks=function(tracks){
  tracks.forEach(element => {
    let card=document.createElement('div')
    card.classList.add('card')
  
    //image
    let image=document.createElement('div')
    image.classList.add('image')
    let image_img=document.createElement('img')
    image_img.classList.add('image_img')
    image_img.src=element.artwork_url || 'https://lorempixel.com/100/100/city/'
    image.appendChild(image_img)
  
    //content
    let content=document.createElement('div')
    content.classList.add('content')
  
    let header =document.createElement('div')
    header.classList.add('header')
    header.innerHTML='<a href='+element.permalink_url+'>'+element.title+'</a>'
  
    //button
    let button=document.createElement('div')
    button.classList.add('ui','button','attatched', 'button','js-button')
    
    let icon= document.createElement('i')
    icon.classList.add('add','icon')
  
    let buttonText = document.createElement('span')
    buttonText.innerHTML='Add to playlist'
  buttonText.addEventListener('click',function(){
    SoundCloudAPI.embed(element.permalink_url)
  })
    //apppend
    content.appendChild(header)
    button.appendChild(icon)
    button.appendChild(buttonText)
  
  card.appendChild(image)
  card.appendChild(content)
  card.appendChild(button)
    let searchResult = document.querySelector('.js-search-results')
    searchResult.appendChild(card)
  
  });
 
}



//add to playlist
SoundCloudAPI.embed=function(permalink_url){

SC.oEmbed(permalink_url, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
  let sidebar=document.querySelector('.js-playlist')
  let box=document.createElement('div')
  box.innerHTML=embed.html
  sidebar.insertBefore(box,sidebar.firstChild)
  localStorage.setItem('key',sidebar.innerHTML)
});
}

var playlist=localStorage.getItem('key')
let sidebar =document.querySelector('.js-playlist')
sidebar.innerHTML=playlist

let clearBtn=document.querySelector('.js-clear').addEventListener('click',function(){
  localStorage.clear()
})

let clearBtn=document.querySelector('.js-clear').addEventListener('click',function(){
  localStorage.clear()
  sidebar.innerHTML=''
})
