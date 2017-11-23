"use strict";

module.exports = function(context){
    var admin=context.user.rol==='admin';
    return context.be.tableDefAdapt({
        name:'subidas',
        editable:admin,
        fields:[
            {name:'subida'           , typeName:'integer'   , nullable:false, sequence:{name: 'secuencia_subida', firstValue: 1}},
            {name:'timestamp_dm'     , typeName:'timestamp' , nullable:false                                                    },
            {name:'timestamp_server' , typeName:'timestamp' , nullable:false                                                    },
            {name:'local_storage'    , typeName:'text'      , nullable:false                                                    },
            {name:'nro_ipad'         , typeName:'text'      , nullable:false                                                    },
            {name:'user_agent'       , typeName:'text'      , nullable:false                                                    },
            
        ],
        primaryKey:['subida']
    },context);
}