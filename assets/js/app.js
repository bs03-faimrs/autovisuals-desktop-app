// Define UI variables
const navList = document.querySelector('#nav-tab')
const videoContainerList = document.querySelector('.videoContainer__list')  
const videoContainerCard = document.querySelector('.videoContainer__card')
const newFolderItem = document.querySelector('#newFolderItem')
const folderForm = document.querySelector('.projectContainer__contentLeft__form')
const folderFormInput = document.querySelector('#folderFormInput')
const projectFolderList = document.querySelector('.projectFolder__list')

loadEventListeners()

function loadEventListeners () {
    navList.addEventListener('click', onTabClick)
    document.addEventListener('DOMContentLoaded', getVideos)
    document.addEventListener('DOMContentLoaded', getFolders)
    videoContainerCard.addEventListener('click', addVideo)
    newFolderItem.addEventListener('click', newFolder)
    folderForm.addEventListener('submit', folderSubmitHandler)
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
  

function getVideos() {
    let videos
    if(localStorage.getItem('videos') === null){
        videos = []
    } else {
        videos = JSON.parse(localStorage.getItem('videos'))
    }

    videos.forEach(function (video) {
        const li = document.createElement('li')
        li.className = 'videoContainer__list__item'
        li.innerHTML = '<div class="card" style="width: 10em; height: 10em; margin-right: 1.5em;"></div>'
        videoContainerList.appendChild(li)
    })
}

function addVideo (e) {
    const li = document.createElement('li')
    li.className = 'videoContainer__list__item'
    li.innerHTML = '<div class="card" style="width: 10em; height: 10em; margin-right: 1.5em;"></div>'
    videoContainerList.appendChild(li)

    storeVideoInLocalStorage(li)
    videoContainerCard.setAttribute('data-dismiss', 'modal')
   
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
