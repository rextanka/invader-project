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
    theTicks = Math.round((defaultTickInterval_ms_constant + defaultTickInterval_ms_constant * stressRatio * 31) / 32)
    return theTicks
}
function setMoveRight (moveRight: boolean) {
    moveRightBool = moveRight
}
function getNextTickTime_ms () {
    return nextTickTime_ms
}
function setNextTickTime_ms (interval_ms: number) {
    nextTickTime_ms = game.runtime() + computeTickInterval_ms()
    return nextTickTime_ms
}
function moveInvaders (moveRight: boolean, deltaX: number, deltaY: number) {
    if (moveRight) {
        moveX = deltaX
    } else {
        moveX = deltaX * -1
    }
    for (let this_invader of sprites.allOfKind(SpriteKind.Enemy)) {
        updateSpriteImage(this_invader, getInvaderImageFlip() == 0)
        this_invader.x += moveX
        this_invader.y += deltaY
        if (this_invader.x > scene.screenWidth() - this_invader.width) {
            setMoveRowDown(true)
            setMoveRight(false)
        } else if (this_invader.x < 0 + this_invader.width) {
            setMoveRowDown(true)
            setMoveRight(true)
        }
    }
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
function setMoveRowDown (bool: boolean) {
    moveNextRowDown = bool
}
function getMoveRight () {
    return moveRightBool
}
function updateGame () {
    if (getMoveRowDown()) {
        updateDeltaY = deltaY_constant
        updateDeltaX = 0
        moveInvaders(getMoveRight(), updateDeltaX, updateDeltaY)
        setMoveRowDown(false)
    } else {
        updateDeltaY = 0
        updateDeltaX = deltaX_constant
        moveInvaders(getMoveRight(), updateDeltaX, updateDeltaY)
    }
    invertInvaderFlip()
    setNextTickTime_ms(tickInterval_ms)
}
function newLevel () {
	
}
function getMoveRowDown () {
    return moveNextRowDown
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let updateDeltaX = 0
let updateDeltaY = 0
let moveNextRowDown = false
let invaderSprite: Sprite = null
let rocketBase: Sprite = null
let moveX = 0
let moveRightBool = false
let theTicks = 0
let stressFactor = 0
let stressRatio = 0
let spriteImg1: Image[] = []
let spriteImg0: Image[] = []
let nextTickTime_ms = 0
let tickInterval_ms = 0
let defaultTickInterval_ms_constant = 0
let flipInvaderImageState = 0
let deltaX_constant = 0
let deltaY_constant = 0
let numberInvadersInitial = 0
info.setScore(0)
info.setLife(3)
numberInvadersInitial = 50
let levelNumber = 1
setupRocketBase()
setupInvaderSpriteImgs()
createSingleInvaderSpriteWithIndex(1, 12, 20)
deltaY_constant = 6
deltaX_constant = 2
flipInvaderImageState = 0
defaultTickInterval_ms_constant = 500
tickInterval_ms = defaultTickInterval_ms_constant
nextTickTime_ms = setNextTickTime_ms(getNextTickTime_ms())
setMoveRight(true)
game.onUpdate(function () {
    if (game.runtime() >= getNextTickTime_ms()) {
        updateGame()
    }
})
