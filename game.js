
let boxer = new Target('Bart "Brimstone" Jackson', 100, 0)
let randomPicture = 0
let previousPic = 0

let items = {
    mouthGuard: new Item('Mouth Guard', 0.3, 'Bite down, jab and cross!'),
    blockFace: new Item('Face Block', 0.5, 'Keep those hands up!'),
    blockBody: new Item('Body Block', .8, 'Protect those ribs!')
}

function Target(charName, charHealth, charHits){
    this.name = charName
    this.health = charHealth
    this.hits = charHits
    this.items = []
}

function Item(itemName, itemModifier, itemDescription){
    this.name = itemName
    this.modifier = itemModifier
    this.description = itemDescription
}

function giveShield(){
    boxer.items.push(items.mouthGuard)
    update()
}

function blockFace(){
    boxer.items.push(items.blockFace)
    update()
}

function blockBody(){
    boxer.items.push(items.blockBody)
    update()
}

function addMods(){ 
    let totalMods = 0
        if (boxer.items.length > 0){
            for(let i = 0; i < boxer.items.length; i++){
                totalMods += boxer.items[i].modifier
            }
        } 
    return totalMods
}

function slap(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health - (1 / (1 + mod)) > 0){
        boxer.health -= (1 / (1 + mod))
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("healthBar").innerText = Math.round(boxer.health)
        console.log('boxer health is now: ' + Math.round(boxer.health))
    } else {
        alert("Don't you think he's had enough?")
    }
    update()
    console.log('Damage came to: ' + mod + ' so previous health minus (1 divided by (1 + ' + mod + ')).')
}

function punch(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health - 5/(1 + mod) > 0){
        boxer.health -= 5/ (1 + mod)
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("healthBar").innerText = Math.round(boxer.health)
    } else {
        alert("Don't you think he's had enough?")
    }
    update()
    console.log('Damage came to: ' + mod + ' so previous health minus (5 divided by (1 + ' + mod + ')).')
}

function kick(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health - 10/ (1 + mod) > 0){
        boxer.health -= 10/ (1 + mod)
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("healthBar").innerText = Math.round(boxer.health)
    } else {
        alert("Don't you think he's had enough?")
    }
    update()
    console.log('Damage came to: ' + mod + ' so previous health minus (10 divided by (1 + ' + mod + ')).')
}

function update(){
    previousPicture = randomPicture
    do {
        randomPicture = (Math.floor(Math.random() * 3)) + 1
    } while (randomPicture == previousPicture)
    document.getElementById('health').innerText = Math.round(boxer.health)
    document.getElementById('name').innerText = ' ' + boxer.name + ' '
    document.getElementById('hits').innerText = boxer.hits
    document.getElementById('mods').innerText = addMods()
    document.getElementById('slappee').src = './img/Boxer' + randomPicture + '.png'
}

document.getElementById("healthBar").width = Math.round(boxer.health.toString()) + '%'

let animateBoxer = setInterval(function(){
    update()
}, 200);




