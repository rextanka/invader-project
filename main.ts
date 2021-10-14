function setupRocketBase () {
    rocketBase = sprites.create(assets.image`missileBase`, SpriteKind.Player)
    rocketBase.setPosition(Math.trunc(scene.screenWidth() / 2), scene.screenHeight() - rocketBase.height)
    rocketBase.setStayInScreen(true)
    controller.moveSprite(rocketBase, 100, 0)
}
let rocketBase: Sprite = null
setupRocketBase()
