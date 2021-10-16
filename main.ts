function getInvaderImageFlip () {
    return flipInvaderImageState
}
function updateSpriteImage (mySprite: Sprite, bool: boolean) {
    if (bool) {
        mySprite.setImage(spriteImg0[mySprite.z])
    } else {
        mySprite.setImage(spriteImg1[mySprite.z])
    }
}
function computeTickInterval_ms () {
    stressRatio = sprites.allOfKind(SpriteKind.Enemy).length / numberInvadersInitial
    stressFactor = defaultTickInterval_ms_constant * stressRatio
    theTicks = Math.round((defaultTickInterval_ms_constant + defaultTickInterval_ms_constant * stressRatio * 3) / 4)
    return theTicks
}
function getNextTickTime_ms () {
    return nextTickTime_ms
}
function setNextTickTime_ms (interval_ms: number) {
    nextTickTime_ms = game.runtime() + computeTickInterval_ms()
    return nextTickTime_ms
}
function setupInvaderSpriteImgs () {
    spriteImg1 = [
    assets.image`inv0_1`,
    assets.image`inv1_1`,
    assets.image`inv2_1`,
    assets.image`inv3_1`
    ]
    spriteImg0 = [
    assets.image`inv0_0`,
    assets.image`inv1_0`,
    assets.image`inv2_0`,
    assets.image`inv3_0`
    ]
}
function invertInvaderFlip () {
    if (getInvaderImageFlip() == 0) {
        setInvaderImageFlip(1)
    } else {
        setInvaderImageFlip(0)
    }
    return getInvaderImageFlip()
}
function setInvaderImageFlip (itsVal: number) {
    flipInvaderImageState = itsVal
    return getInvaderImageFlip()
}
function setupRocketBase () {
    rocketBase = sprites.create(assets.image`missileBase`, SpriteKind.Player)
    rocketBase.setPosition(Math.trunc(scene.screenWidth() / 2), scene.screenHeight() - rocketBase.height)
    rocketBase.setStayInScreen(true)
    controller.moveSprite(rocketBase, 100, 0)
}
function createSingleInvaderSpriteWithIndex (itsIndex: number, itsX: number, itsY: number) {
    if (itsIndex < spriteImg0.length && itsIndex >= 0) {
        invaderSprite = sprites.create(spriteImg0[itsIndex], SpriteKind.Enemy)
        invaderSprite.setPosition(itsX, itsY)
    }
}
function updateGame () {
    animateInvaders()
    invertInvaderFlip()
    setNextTickTime_ms(tickInterval_ms)
}
function animateInvaders () {
    for (let this_invader of sprites.allOfKind(SpriteKind.Enemy)) {
        updateSpriteImage(this_invader, getInvaderImageFlip() == 0)
    }
}
let invaderSprite: Sprite = null
let rocketBase: Sprite = null
let theTicks = 0
let stressFactor = 0
let stressRatio = 0
let spriteImg1: Image[] = []
let spriteImg0: Image[] = []
let nextTickTime_ms = 0
let tickInterval_ms = 0
let defaultTickInterval_ms_constant = 0
let flipInvaderImageState = 0
let numberInvadersInitial = 0
info.setScore(0)
info.setLife(3)
numberInvadersInitial = 50
setupRocketBase()
setupInvaderSpriteImgs()
createSingleInvaderSpriteWithIndex(1, 7, 20)
flipInvaderImageState = 0
defaultTickInterval_ms_constant = 1000
tickInterval_ms = defaultTickInterval_ms_constant
nextTickTime_ms = setNextTickTime_ms(getNextTickTime_ms())
game.onUpdate(function () {
    if (game.runtime() >= getNextTickTime_ms()) {
        updateGame()
    }
})
