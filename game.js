
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
    faceBlockCount = 5
    update()
}

function blockBody(){
    boxer.items.push(items.blockBody)
    bodyBlock = true
    bodyBlockCount = 10
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
        if(boxer.health < 0 || (boxer.health > 0 && boxer.health < 1)){
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
    // if(mouthGuardCount > 0 || faceBlockCount > 0 || bodyBlockCount > 0){  //if the active item timer is greater than 0 then decrement the counter, otherwise clear active items.
    //     activeCount--
    //     console.log(activeCount)
    // } else if (activeCount == 0){
    //     if (mouthGuard){
    //         takeShield()
    //     } else if (faceBlock) {
    //         unblockFace()
    //     } else if (bodyBlock) {
    //         unblockBody()
    //     }

    //     console.log('Active item timed out.')
    // }

    if(mouthGuardCount > 0){
        mouthGuardCount--
        console.log(mouthGuardCount) 
    } else if (mouthGuardCount == 0 && mouthGuard){
        takeShield()
    }

    if(faceBlockCount > 0){
        faceBlockCount--
        console.log(faceBlockCount)
    } else if (faceBlockCount == 0 && faceBlock){
        unblockFace()
    }

    if(bodyBlockCount > 0){
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

document.getElementById("healthBar").width = Math.round(boxer.health.toString()) + '%'

let animateBoxer = setInterval(function(){
    if(boxer.health > 0){
        update()
    }
}, 200);




