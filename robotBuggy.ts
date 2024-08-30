/**
* Robot Buggy blocks
* http://scienceoxford.github.io/robot-buggy
* https://scienceoxford.com/schools/primary-schools/shows-workshops-primary/
*/

enum Dir {
    forward,
    backward
}

enum Tur {
    left,
    right
}

enum Speed {
    slow = 300,
    medium = 600,
    fast = 800
}

enum Pin {
    p0 = 100,
    p1 = 101,
    p2 = 102,
    p8 = 108,
    p12 = 112,
    p13 = 113,
    p14 = 114,
    p15 = 115,
    p16 = 116
}

enum Motors {
    left,
    right,
    //% block="left+right"
    both
}

let LF = 113;
let LB = 112;
let RF = 115;
let RB = 114;

//% weight=100 color=#c1d72e icon="\uf140"
namespace robotBuggy {
    /**
     * Set up which pins the motor driver is connected to
     * @param lf sets pin value for left motor forwards e.g. Pin.p13
     * @param lb sets pin value for left motor reverse e.g. Pin.p12
     * @param rf sets pin value for right motor forwards e.g. Pin.p15
     * @param rb sets pin value for right motor reverse e.g. Pin.p14
     */
    //% block="set up left forward %lf set up left backward %lb set up right forward %rf set up right backward %rb"
    //% lf.defl=Pin.p13 lb.defl=Pin.p12 rf.defl=Pin.p15 rb.defl=Pin.p14
    //% advanced=true
    export function setup(lf: Pin, lb: Pin, rf: Pin, rb: Pin) {
        LF = lf,
        LB = lb,
        RF = rf,
        RB = rb
        stopRobot()
    }

    /**
     * Stop your robot's motors
     */
    //% block="stop robot motors"
    //% advanced=true
    export function stopRobot() {
        pins.analogWritePin(LF, 0)
        pins.analogWritePin(LB, 0)
        pins.analogWritePin(RF, 0)
        pins.analogWritePin(RB, 0)
    }

    /**
     * Sets up your robot to the default settings
     */
    //% block="activate robot"
    export function activateRobot() {
        stopRobot()
    }


    /**
     * Turn your robot for a set amount of time
     * @param turn choose a direction, eg: left
     * @param value choose a speed, eg: medium
     * @param duration choose how long the motor runs for in ms, eg: 1000
     */
    //% block="turn %direction at speed %value for duration %duration"
    //% value.defl=medium
    //% duration.shadow=timePicker
    export function turn(direction: Tur, value: Speed, duration: number) {
        if (direction == Tur.left) {
            pins.analogWritePin(LB, Math.abs(value))
            pins.analogWritePin(RF, Math.abs(value))
        } else if (direction == Tur.right) {
            pins.analogWritePin(LF, Math.abs(value))
            pins.analogWritePin(RB, Math.abs(value))
        }
        basic.pause(duration)
        stopRobot()
    }
    
    /**
     * Move your robot for a set amount of time
     * @param move choose a direction, eg: forward
     * @param value choose a speed, eg: medium
     * @param duration choose how long the motor runs for in ms, eg: 1000
     */
    //% block="move %direction at speed %value for duration %duration"
    //% value.defl=medium
    //% duration.shadow=timePicker
    export function movement(direction: Dir, value: Speed, duration: number) {
        if (direction == Dir.forward) {
            pins.analogWritePin(LF, Math.abs(value))
            pins.analogWritePin(RF, Math.abs(value))
        } else if (direction == Dir.backward) {
            pins.analogWritePin(LB, Math.abs(value))
            pins.analogWritePin(RB, Math.abs(value))
        }
        basic.pause(duration)
        stopRobot()
    }

    /**
     * Turn your motors on - for use with a controller
     * @param valueLeft choose a speed, eg: 600
     * @param valueRight choose a speed, eg: 600
     */
    //% block="start left motor at speed %valueLeft start right motor at speed %valueRight"
    //% valueLeft.min=-1023 valueLeft.max=1023 valueLeft.defl=600
    //% valueRight.min=-1023 valueRight.max=1023 valueRight.defl=600
    //% advanced=true
    export function movementNoStop(valueLeft: number, valueRight: number) {
        if (valueLeft >= 0) {
            pins.analogWritePin(LF, Math.abs(valueLeft))
        } else if (valueLeft < 0) {
            pins.analogWritePin(LB, Math.abs(valueLeft))
        }
        if (valueRight >= 0) {
            pins.analogWritePin(RF, Math.abs(valueRight))
        } else if (valueRight < 0) {
            pins.analogWritePin(RB, Math.abs(valueRight))
        }
    }

    /**
     * Control your robot's motors independently
     * @param valueLeft choose a speed, eg: 600
     * @param valueRight choose a speed, eg: 600
     * @param duration choose how long the motors run for in ms, eg: 1000
     * @param image choose which icon to display whilst moving, eg: duck
     */
    //% block="set left at speed %valueLeft set right at speed %valueRight for duration %duration with image %image"
    //% valueLeft.min=-1023 valueLeft.max=1023 valueLeft.defl=600
    //% valueRight.min=-1023 valueRight.max=1023 valueRight.defl=600
    //% duration.shadow=timePicker
    //% advanced=true
    export function movementIndependent(valueLeft: number, valueRight: number, duration: number, image: IconNames) {
        images.iconImage(image).showImage(0)
        if (valueLeft >= 0) {
            pins.analogWritePin(LF, Math.abs(valueLeft))
        } else if (valueLeft < 0) {
            pins.analogWritePin(LB, Math.abs(valueLeft))
        }
        if (valueRight >= 0) {
            pins.analogWritePin(RF, Math.abs(valueRight))
        } else if (valueRight < 0) {
            pins.analogWritePin(RB, Math.abs(valueRight))
        }
        basic.pause(duration)
        stopRobot()
        basic.clearScreen()
    }

    /**
     * Control your robot's motors independently - without images
     * @param valueLeft choose a speed, eg: 600
     * @param valueRight choose a speed, eg: 600
     * @param duration choose how long the motors run for in ms, eg: 1000
     */
    //% block="set left at speed %valueLeft set right at speed %valueRight for duration %duration"
    //% valueLeft.min=-1023 valueLeft.max=1023 valueLeft.defl=600
    //% valueRight.min=-1023 valueRight.max=1023 valueRight.defl=600
    //% duration.shadow=timePicker
    //% advanced=true
    export function movementIndependentBlank(valueLeft: number, valueRight: number, duration: number) {
        if (valueLeft >= 0) {
            pins.analogWritePin(LF, Math.abs(valueLeft))
        } else if (valueLeft < 0) {
            pins.analogWritePin(LB, Math.abs(valueLeft))
        }
        if (valueRight >= 0) {
            pins.analogWritePin(RF, Math.abs(valueRight))
        } else if (valueRight < 0) {
            pins.analogWritePin(RB, Math.abs(valueRight))
        }
        basic.pause(duration)
        stopRobot()
        basic.clearScreen()
    }

}