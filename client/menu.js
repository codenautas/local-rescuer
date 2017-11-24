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
    AjaxBestPromise.post({
        url: location.protocol + '//' + location.hostname + (location.port? ':' + location.port:'')+ '/local-rescuer/rescatar',
        data: {
            timestamp_dm: JSON.stringify(new Date().getTime()),
            local_storage: JSON.stringify(localStorage),
            nro_ipad: JSON.stringify(nroIpad),
            user_agent: navigator.userAgent
        }
    }).then(function (result) {
        document.getElementById('messageHolder').innerText='guardado';
        document.getElementById('ipadNbr').value='';
    }).catch(function (err) {
        document.getElementById('messageHolder').innerText=err.message;
    });

}

myOwn.wScreens.JSON=function(addrParams){
    main_layout.innerHTML="Ingrese nro de Ipad: ";
    var transmitirButton = html.button({id:'rescue', class:'rel_button'}, "Rescatar").create();
    transmitirButton.onclick=rescatar;

    main_layout.appendChild(html.input({id:"ipadNbr", type:'text'}).create());
    main_layout.appendChild(html.p({id:"messageHolder"}).create());
    main_layout.appendChild(transmitirButton);
}

myOwn.wScreens.pseudo_hdr = myOwn.wScreens.JSON;
