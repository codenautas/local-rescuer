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
    var nroIpad = '';
    c.post({
        url: location.protocol + '//' + location.hostname + (location.port? ':' + location.port:'')+ '/local-rescuer/rescatar',
        data: {
            timestamp_dm: JSON.stringify(new Date().getTime()),
            local_storage: JSON.stringify(localStorage),
            nro_ipad: JSON.stringify(nroIpad)
        }
    }).then(function (result) {
        console.log('transmitir');
    }).catch(function (err) {
        console.log(err);
    });

}

myOwn.wScreens.pseudo_hdr = myOwn.wScreens.JSON;