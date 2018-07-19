let health = 100
let name = "Foghorn Slaphorn"
let hits = 0

function slap(){
    health--
    hits++
    update()
}

function punch(){
    health -= 5
    hits++
    update()
}

function kick(){
    health -= 10
    hits++
    update()
}

function update(){
    document.getElementById('health').innerText = health
    document.getElementById('name').innerText = ' ' + name + ' '
    document.getElementById('hits').innerText = hits
}

update()

