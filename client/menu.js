"use strict";

function gotoInnerUrl(innerUrl) {
    history.pushState(null, null, innerUrl);
    my.showPage();
}

function onclickUrl(event) {
    if (!event.ctrlKey) {
        gotoInnerUrl(this.href);
        event.preventDefault();
    }
}

function rescatar() {  
    var nroIpad = document.getElementById('ipadNbr').value;
    c.post({
        url: location.protocol + '//' + location.hostname + (location.port? ':' + location.port:'')+ '/local-rescuer/rescatar',
        data: {
            timestamp_dm: JSON.stringify(new Date().getTime()),
            local_storage: JSON.stringify(localStorage),
            nro_ipad: JSON.stringify(nroIpad),
            user_agent: navigator.userAgent
        }
    }).then(function (result) {
        console.log('transmitir');
    }).catch(function (err) {
        console.log(err);
    });

}

myOwn.wScreens.JSON=function(addrParams){
    main_layout.innerHTML="HOLA";
    var transmitirButton = html.button({id:'transmitir', class:'rel_button'}, "Transmitir").create();
    transmitirButton.onclick=rescatar;


    main_layout.appendChild(html.input({id:"ipadNbr", type:'text'}));
    main_layout.appendChild(transmitirButton);
}

myOwn.wScreens.pseudo_hdr = myOwn.wScreens.JSON;
