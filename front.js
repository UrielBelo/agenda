const $clientName = document.getElementById('clientName')
const $clientEntity = document.getElementById('clientEntity')
const $clientUF = document.getElementById('clientUF')
const $clientCity = document.getElementById('clientCity')
const $insert = document.getElementById('insert')

let citysJSON

const main = async () => {
    citysJSON = await getFileData('./assets/municipios.json')
    const ufJSON = await getFileData('./assets/estados.json')

    $clientName.focus()
    
    for(uf of ufJSON){
        const ufOption = document.createElement('option')
        ufOption.setAttribute('value',uf['codigo_uf'])
        ufOption.innerHTML = uf['uf']
        $clientUF.appendChild(ufOption)
    }
    $clientUF.value = '35'
    generateCitys('35')

    console.log(ufJSON)
}
const getFileData = (path) => {
    return new Promise( async (resolve,reject) => {
        try{
            const response = await fetch(path)
            const jsonData = await response.json()
            resolve(jsonData)
        }catch(err){
            reject(err)
        }
    })
}
const generateCitys = (uf) => {
    const newCityList = citysJSON.filter(x => x.codigo_uf == uf)

    $clientCity.innerHTML = ''

    for(city of newCityList){
        const cityOption = document.createElement('option')
        cityOption.setAttribute('value',city['nome'])
        cityOption.innerHTML = city['nome']
        $clientCity.appendChild(cityOption)
    }
}
const insertCall = () => {
    const clientName = $clientName.value
    const clientEntity = $clientEntity.value
    const clientUF = $clientUF.value
    const clientCity = $clientCity.value

    $clientName.value = ''
    $clientEntity.value = ''
    $clientUF.value = '35'
    $clientCity.value = ''

    $clientName.focus()

    window.electronAPI.insertCall({
        name: clientName,
        entity: clientEntity,
        uf: clientUF,
        city: clientCity
    })
}

$clientUF.addEventListener('change', (ev) => {
    const newValue = ev.target.value
    generateCitys(newValue)
})
$insert.addEventListener('mousedown', () => {
    insertCall()
})
$insert.addEventListener('keydown', (ev) => {
    if(ev.keyCode == 13){
        insertCall()
    }
})



main()