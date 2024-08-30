input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Heart)
    robotBuggy.movement(Dir.forward, Speed.medium, 2000)
    robotBuggy.turn(Tur.left, Speed.slow, 1000)
    basic.clearScreen()
})
robotBuggy.activateRobot()
