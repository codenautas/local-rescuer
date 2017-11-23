"use strict";

var changing = require('best-globals').changing;
var bestGlobals = require('best-globals');
var datetime = bestGlobals.datetime;

var ProceduresLocalRescuer = [
    {
        action:'rescatar',
        parameters:[
            {name:'timestamp_dm'  , typeName:'timestamp' },
            {name:'local_storage' , typeName:'text'      },
            {name:'nro_ipad'      , typeName:'text'      },
            {name:'user_agent'      , typeName:'text', encoding: 'plain'     },
        ],
        coreFunction:function(context, parameters){
            console.log("parameters:", parameters);
            var client=context.client;
            var be=context.be;
            return Promise.resolve().then(function(){
                return client.query("insert into subidas(timestamp_dm, timestamp_server, local_storage, nro_ipad, user_agent) values ($1, current_timestamp, $2, $3, $4) returning subida",
                    [new Date(parameters.timestamp_dm), parameters.local_storage, parameters.nro_ipad, parameters.user_agent]).fetchUniqueRow();
            }).then(function(result){
                return result.row;
            });
        }
    },
];

module.exports = ProceduresLocalRescuer;