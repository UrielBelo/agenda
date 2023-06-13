const fs = require('fs')
const sqlite = require('sqlite-sync')
const estados = require('./assets/estados.json')

module.exports = (name,entity,uf,city) => {
    const dir = fs.readdirSync('./')

    let isDatabase = false
    for(file of dir){
        if(file == 'dataset.db'){
            isDatabase = true
        }
    }

    if(!isDatabase){
        fs.writeFileSync('./dataset.db')
    }

    sqlite.connect('./dataset.db')
    sqlite.run(`CREATE TABLE IF NOT EXISTS CALL_HISTORY(
        CALL_NAME TEXT,
        CALL_ENTITY VARCHAR(2),
        CALL_UF VARCHAR(2),
        CALL_CITY TEXT,
        CALL_DATE DATETIME
    );`)

    const ufSigla = estados[estados.findIndex(x => x.codigo_uf == uf)].uf
    const cd = new Date()
    const cdO = {
        y: cd.getFullYear(),
        m: (cd.getMonth() + 1).toString().padStart(2,'0'),
        d: (cd.getDate()).toString().padStart(2,'0'),
        h: (cd.getHours()).toString().padStart(2,'0'),
        mm: (cd.getMinutes()).toString().padStart(2,'0'),
        s: (cd.getSeconds()).toString().padStart(2,'0')
    }
    const timeString = `${cdO.y}-${cdO.m}-${cdO.d} ${cdO.h}:${cdO.mm}:${cdO.s}.000`

    //Lógica de Inserção
    sqlite.insert('CALL_HISTORY',{
        CALL_NAME: name,
        CALL_ENTITY: entity,
        CALL_UF: ufSigla,
        CALL_CITY: city,
        CALL_DATE: timeString
    })

    sqlite.close()
}