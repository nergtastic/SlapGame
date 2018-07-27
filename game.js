
let boxer = new Target('Bart "Brimstone" Jackson', 100, 0)
let randomPicture = 0
let previousPic = 0
let mouthGuardCount = 0
let faceBlockCount = 0
let bodyBlockCount = 0
let mouthGuard = false
let faceBlock = false
let bodyBlock = false

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
    mouthGuard = true
    mouthGuardCount = 100
    update()
}

function blockFace(){
    boxer.items.push(items.blockFace)
    faceBlock = true
    faceBlockCount = 10
    update()
}

function blockBody(){
    boxer.items.push(items.blockBody)
    bodyBlock = true
    bodyBlockCount = 20
    update()
}

function takeShield(){
    // boxer.items.push(items.mouthGuard)
    let targetItem = boxer.items.indexOf(items.mouthGuard) //Removing the item from the array, taking it out of play
    if (targetItem > -1){
        boxer.items.splice(targetItem, 1)
    }
    mouthGuard = false
    console.log(boxer.items)
    update()
}

function unblockFace(){
    // boxer.items.push(items.blockFace)
    let targetItem = boxer.items.indexOf(items.blockFace) //Removing the item from the array, taking it out of play
    if (targetItem > -1){
        boxer.items.splice(targetItem, 1)
    }
    faceBlock = false
    console.log(boxer.items)
    update()
}

function unblockBody(){
    // boxer.items.push(items.blockBody)
    let targetItem = boxer.items.indexOf(items.blockBody) //Removing the item from the array, taking it out of play
    if (targetItem > -1){
        boxer.items.splice(targetItem, 1)
    }
    bodyBlock = false
    console.log(boxer.items)
    update()
}


function addMods(){ 
    let totalMods = 0
        if (boxer.items.length > 0){
            for(let i = 0; i < boxer.items.length; i++){
                totalMods += boxer.items[i].modifier
            }
        } 
        console.log(totalMods)
    return totalMods
}

function slap(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health != 0){
        boxer.health -= (1 / (1 + mod))
        if(boxer.health < 0 || (boxer.health > 0 && boxer.health < 1)){
            boxer.health = 0
        }
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("health-tally").innerText = Math.round(boxer.health)
        document.getElementById("hits-tally").innerText = boxer.hits
        update()
        console.log('Damage came to: ' + mod + ' so previous health minus (1 divided by (1 + ' + mod + ')).')
    } else {
        alert("Don't you think he's had enough?")
    }
}

function punch(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health != 0){
        boxer.health -= 5/ (1 + mod)
        if(boxer.health < 0 || (boxer.health > 0 && boxer.health < 1)){
            boxer.health = 0
        }
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("health-tally").innerText = Math.round(boxer.health)
        document.getElementById("hits-tally").innerText = boxer.hits
        update()
        console.log('Damage came to: ' + mod + ' so previous health minus (5 divided by (1 + ' + mod + ')).')
    } else {
        alert("Don't you think he's had enough?")
    }
}

function kick(){
    let mod = addMods()
    console.log(mod)
    if(boxer.health != 0){
        boxer.health -= 10/ (1 + mod)
        if(boxer.health < 0 || (boxer.health > 0 && boxer.health < 1)){ //If the math gives a negative health or that of less than 1, then set health to 0.
            boxer.health = 0
        }
        boxer.hits++
        document.getElementById("healthBar").style.width = boxer.health.toString() + '%'
        document.getElementById("health-tally").innerText = Math.round(boxer.health)
        document.getElementById("hits-tally").innerText = boxer.hits
        update()
        console.log('Damage came to: ' + mod + ' so previous health minus (10 divided by (1 + ' + mod + ')).')
    } else {
        alert("Don't you think he's had enough?")
    }
}

function update(){
    previousPicture = randomPicture
    do {
        randomPicture = (Math.floor(Math.random() * 3)) + 1
    } while (randomPicture == previousPicture)
    document.getElementById('slappee').src = './img/Boxer' + randomPicture + '.png'

    if(mouthGuardCount > 0){ //if the target has the mouth guard, then continue counting down
        mouthGuardCount--
        console.log(mouthGuardCount) 
    } else if (mouthGuardCount == 0 && mouthGuard){
        takeShield()
    }

    if(faceBlockCount > 0){ //if the target is blocking his face, then continue counting down
        faceBlockCount--
        console.log(faceBlockCount)
    } else if (faceBlockCount == 0 && faceBlock){
        unblockFace()
    }

    if(bodyBlockCount > 0){ //if the target is blocking his body, then continue counting down
        bodyBlockCount--
        console.log(bodyBlockCount)
    } else if (bodyBlockCount == 0 && bodyBlock){
        unblockBody()
    }

    // Check for active mouthGuard
    if (mouthGuard){
        document.getElementById("mouthGuard").disabled = true
    } else {
        document.getElementById("mouthGuard").disabled = false
    }

    // Check for active face block
    if (faceBlock){
        document.getElementById("blockFace").disabled = true
    } else {
        document.getElementById("blockFace").disabled = false
    }
  
    // Check for active body block
    if (bodyBlock){
        document.getElementById("blockBody").disabled = true
    } else {
        document.getElementById("blockBody").disabled = false
    }

}

function startOver(){
    boxer.health = 100

    mouthGuard = false
    faceBlock = false
    bodyBlock = false

    mouthGuardCount = 0
    faceBlockCount = 0
    bodyBlockCount = 0

    boxer.hits = 0

    document.getElementById("restart").style.display = 'none'
    document.getElementById("slappee").style.marginTop = '-160px'
    document.getElementById("slappee").style.width = '53%'
    document.getElementById("healthBar").style.width = '100%'
    document.getElementById("health-tally").innerText = '100'
    document.getElementById("hits-tally").innerText = '0'

    boxer.items = []

    document.getElementById("mouthGuard").disabled = false
    document.getElementById("blockFace").disabled = false
    document.getElementById("blockBody").disabled = false

    document.getElementById("slap").disabled = false
    document.getElementById("punch").disabled = false
    document.getElementById("kick").disabled = false

    update()
}

document.getElementById("healthBar").width = Math.round(boxer.health.toString()) + '%'


let animateBoxer = setInterval(function(){
    if(boxer.health > 0){
        let randomDefense = (Math.floor(Math.random() * 25)) + 1
        console.log(randomDefense)
        if (randomDefense == 12 && !faceBlock){
            blockFace()
        } else if (randomDefense == 7 && !bodyBlock) {
            blockBody()
        } 
        update()
    } else {
        document.getElementById("restart").style.display = 'block'
        document.getElementById("mouthGuard").disabled = true
        document.getElementById("blockFace").disabled = true
        document.getElementById("blockBody").disabled = true
        document.getElementById("slap").disabled = true
        document.getElementById("punch").disabled = true
        document.getElementById("kick").disabled = true
        document.getElementById('slappee').src = './img/BoxerDown.png'
        document.getElementById('slappee').style.marginTop = '50px'
        document.getElementById('slappee').style.width = '70%'
    }
}, 175);



