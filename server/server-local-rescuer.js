"use strict";

var Path = require('path');
var backendPlus = require("backend-plus");
var MiniTools = require('mini-tools');

var changing = require('best-globals').changing;
var fs = require('fs-promise');

// var serveContent = require('serve-content');

class AppLocalRescuer extends backendPlus.AppBackend{
    constructor(){
        super();
    }
    
    addLoggedServices(){
        var be = this;
        super.addLoggedServices();
        this.app.get('/echo', function(req,res){
            res.end('echo');
        });
    }
    getProcedures(){
        var be = this;
        return super.getProcedures().then(function(procedures){
            return procedures.concat(
                require('./procedures-local-rescuer.js').map(be.procedureDefCompleter, be)
            );
        });
    }
    getMenu(context){
        return {menu:[
            {menuType:'menu', name:'menu', label:'menú', menuContent:[
                {menuType:'proc', name:'rescatar_local_storage', label:'rescatar local storage'},
                {menuType:'table', name:'subidas'},
                ,
            ]}
        ]}
    }
    getTables(){
        return super.getTables().concat([
            'usuarios',
            'subidas'
        ]);
    }
    clientIncludes(req, hideBEPlusInclusions) {
        return super.clientIncludes(req, hideBEPlusInclusions).concat(
            { type: 'js' , src: 'offline.js'    },
            { type: 'css', file: 'my-things2.css' }
        )
    }
    offLine(req){
        return {manifestName:'local-rescuer.manifest'};
    }
}

new AppLocalRescuer().start();