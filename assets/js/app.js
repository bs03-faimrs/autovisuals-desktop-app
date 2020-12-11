// Define UI variables
const navList = document.querySelector('#nav-tab')
const videoContainerList = document.querySelector('.videoContainer__list')  
const videoContainerCard = document.querySelector('.videoContainer__card')
const newFolderItem = document.querySelector('#newFolderItem')
const folderForm = document.querySelector('.projectContainer__contentLeft__form')
const folderFormInput = document.querySelector('#folderFormInput')
const projectFolderList = document.querySelector('.projectFolder__list')
const modalCardList = document.querySelector('.modalCard__list')
const videoFormTitle = document.querySelector('#title')
const videoTableBody = document.querySelectorAll('.videoTableBody')


loadEventListeners()

function loadEventListeners () {
    document.addEventListener('DOMContentLoaded', getVideos)
    document.addEventListener('DOMContentLoaded', getFolders)
    document.addEventListener('DOMContentLoaded', getStyles)
    document.addEventListener('DOMContentLoaded', getTitle)
    videoContainerList.addEventListener('click', onVideoClick)
    navList.addEventListener('click', onTabClick)
    modalCardList.addEventListener('click', onCardClick)
    videoContainerCard.addEventListener('click', addVideo)
    newFolderItem.addEventListener('click', newFolder)
    folderForm.addEventListener('submit', folderSubmitHandler)
    videoFormTitle.addEventListener('keyup', videoTitle)
}

function onTabClick (e) {
    let activeTabs = document.querySelectorAll('.active');
  
    // deactivate existing active tab and panel 
    activeTabs.forEach(function(tab) {
      tab.className = tab.className.replace('active', '');
    });
  
    // activate new tab and panel
    e.target.parentElement.className += ' active';
    document.getElementById(e.target.href.split('#')[1]).className += ' active';
}

function onCardClick (e) {
    let activeCards = document.querySelectorAll('.modalCard')
    
    activeCards.forEach( function (card) {
        card.className = card.className.replace('modalActive', '')
    })

    e.target.className += ' modalActive'
    
    storeStyleIdInLocalStorage(e.target.id)
}

function storeStyleIdInLocalStorage (style) {

    localStorage.setItem('styleId', JSON.stringify(style))
}

function getStyles() {
    style = "Whiteboard"
    if(localStorage.getItem('styleId') === null){
        localStorage.setItem('styleId', JSON.stringify(style))
    } else {
        styles = JSON.parse(localStorage.getItem('styleId'))
    }

}

function getTitle() {
    let titles
    if(localStorage.getItem('videoTitle') === null){
        titles = []
    } else {
        titles = localStorage.getItem('videoTitle')
    }
}


function onVideoClick (e) {
    let activeCards = document.querySelectorAll('.videoCard')
    activeCards.forEach( function (card) {
        card.className = card.className.replace('videoActive', '')
    })

    e.target.parentElement.parentElement.className += ' videoActive'
}
  
function videoTitle (e) {
    storeVideoTitleInLocalStorage(e.target.value)
}

function storeVideoTitleInLocalStorage (videoTitle){
    localStorage.setItem('videoTitle', videoTitle)
}

function getVideos() {
    let videos
    if(localStorage.getItem('videos') === null){
        videos = []
    } else {
        videos = JSON.parse(localStorage.getItem('videos'))
    }

    videos.forEach(function (video) {
        const li = document.createElement('li')
        const cardDiv = document.createElement('div')
        const cardBodyDiv = document.createElement('div')
        
        li.className = 'videoContainer__list__item'
        cardDiv.className = 'card videoCard'
        cardBodyDiv.className = 'card-body text-center mt-5'
        cardBodyDiv.innerHTML = '<p>Sample Video</p>'
        cardDiv.appendChild(cardBodyDiv)
        li.appendChild(cardDiv)
        videoContainerList.appendChild(li)
    })
}

function addVideo (e) {
    if(videoFormTitle.value === ''){
        alert("Provide a title")

        // const tr = document.createElement('tr')
        // videoTableBody[0].appendChild(document.createElement('tr'))
        // console.log(videoTableBody[0])
    } else {
        const li = document.createElement('li')
        const cardDiv = document.createElement('div')
        const cardBodyDiv = document.createElement('div')

        li.className = 'videoContainer__list__item'
        cardDiv.className = 'card videoCard'
        cardBodyDiv.className = 'card-body text-center mt-5'
        cardBodyDiv.innerHTML = '<p>Sample Video</p>'
        cardDiv.appendChild(cardBodyDiv)
        li.appendChild(cardDiv)
        videoContainerList.appendChild(li)

        storeVideoInLocalStorage(li)
        videoContainerCard.setAttribute('data-dismiss', 'modal')
    }
   
}

function storeVideoInLocalStorage(videListItem) {
    if (localStorage.getItem('videos') === null){
        videos = []
    } else {
        videos = JSON.parse(localStorage.getItem('videos'))
    }

    videos.push(videListItem)
    localStorage.setItem('videos', JSON.stringify(videos) )
}

function getFolders () {
    let folders
    if(localStorage.getItem('folders') === null){
        folders = []
    } else {
        folders = JSON.parse(localStorage.getItem('folders'))
    }

    folders.forEach(function (folder) {
        const li = document.createElement('li')
        li.className = 'projectFolder__list__item ml-3'
        li.innerHTML = "<i class='fa fa-folder mr-2'></i>"
        li.appendChild(document.createTextNode(folder))
        projectFolderList.appendChild(li)
    })
}

function newFolder (e) {
    folderForm.style.display = 'block'
}

function folderSubmitHandler (e) {
    e.preventDefault()
    if(folderFormInput.value === ''){
        alert('Please provide a valid name')
    }else {
        const li = document.createElement('li')
        li.className = 'projectFolder__list__item ml-3'
        li.innerHTML = "<i class='fa fa-folder mr-2'></i>"
        li.appendChild(document.createTextNode(folderFormInput.value))
        projectFolderList.appendChild(li)

        storeFolderInLocalStorage(folderFormInput.value)

        folderForm.style.display = 'none'
        folderFormInput.value = ''
    };
}

function storeFolderInLocalStorage (folder) {
    let folders
    if (localStorage.getItem('folders') === null){
        folders = []
    } else {
        folders = JSON.parse(localStorage.getItem('folders'))
    }

    folders.push(folder)
    localStorage.setItem('folders', JSON.stringify(folders) )
}
