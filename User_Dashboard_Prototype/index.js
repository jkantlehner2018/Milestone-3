//sidebar
const menuItems = document.querySelectorAll('.menu-item');

//messages
const messagesNotification = document.querySelector('#messages-notification');

const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch1 = document.querySelector('#message-search');

//Feeds 
const bmessages = document.querySelector('.feeds');
const bmessage = bmessages.querySelectorAll('.feed');
const bmessageSearch1 = document.querySelector('#searchBody');


//Theme
const theme = document.querySelector('#theme');
const themeMedel = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');




//=============Sidebar==================================
//Remove the class "active" from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

//Add the class "active" to the current menu item
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notification-popup').style.display = 'none';
        }else{
            document.querySelector('.notification-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

//================Messages==========================
//search messages
const searchMessage = () => {
    const val = messageSearch1.value.toLowerCase();
    console.log(val);
    message.forEach(chat => {
       let name = chat.querySelector('h5').textContent.toLowerCase();
       if(name.indexOf(val) != -1){
        chat.style.display = 'flex';
         }else{
        chat.style.display = 'none';
        }      
    })
}


//search chat
messageSearch1.addEventListener('keyup', searchMessage);


//================Feed Search==========================
//search messages
const bsearchMessage = () => {
    const val2 = bmessageSearch1.value.toLowerCase();
    console.log(val2);
    bmessage.forEach(chat2 => {
       let name2 = chat2.querySelector('h3').textContent.toLowerCase();
      // let name2 = chat2.classList.querySelector('head').toLowerCase();
       if(name2.indexOf(val2) != -1){
        chat2.style.display = 'flex';
         }else{
        chat2.style.display = 'none';
        }      
    })
}


//search chat
bmessageSearch1.addEventListener('keyup', bsearchMessage);



//Highlight the message box 
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

//Themes Customization
const openThemeModal = () => {
    themeMedel.style.display = 'grid';

}

const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        themeMedel.style.display = 'none';
    }
}

//close theme modal
themeMedel.addEventListener('click', closeThemeModal);


theme.addEventListener('click', openThemeModal);



//================Font Size==========================
//remove the class "active" from all span or font size selection
const removeSizeSelector = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => {  
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')){
            fontSize = '10px';
            root.style.setProperty(' --sticky-top-left', '5.4rem');
            root.style.setProperty(' --sticky-top-right', '5.4rem');
        }else if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty(' --sticky-top-left', '5.4rem');
            root.style.setProperty(' --sticky-top-right', '-7rem');
        }else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty(' --sticky-top-left', '-2rem');
            root.style.setProperty(' --sticky-top-right', '-17rem');
        }else if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty(' --sticky-top-left', '-5rem');
            root.style.setProperty(' --sticky-top-right', '-25rem');
        }else if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty(' --sticky-top-left', '-12rem');
            root.style.setProperty(' --sticky-top-right', '-35rem');
        }
    
        document.querySelector('html').style.fontSize = fontSize;
    })
    
})

//================Color Palette==========================

//remove the class "active" from color selection
const removeColorSelector = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })

}


colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        removeColorSelector();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//================Background Color==========================
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//change the background color
const changeBackgroundColor = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    Bg1.classList.add('active');
    
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customizes changes from local storage
   window.location.reload();
});


Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    Bg2.classList.add('active');
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBackgroundColor();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    Bg3.classList.add('active');
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBackgroundColor();
});