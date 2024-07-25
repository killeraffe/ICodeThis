// Click "UIDesignDaily" for a surprise

// I will make this look better in the future but right now, I have a different project going on

/* ============================================================================= */

const canvas = document.getElementById("canvas")
const canvas2 = document.getElementById("canvas2")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
canvas2.height = window.innerHeight
canvas2.width = window.innerWidth
const ctx = canvas.getContext("2d")
const ctx2 = canvas2.getContext("2d")

var blackNWhite = false
var ballz = []
var mousePos = {
    x: canvas.offsetLeft + canvas.width / 2,
    y: canvas.offsetTop + canvas.height / 2
}

class Ball {
    constructor(x, y, radius, toColor) {
        this.x = x
        this.y = y
        this.newX = this.x
        this.newY = this.y
        this.radius = radius
        this.toColor = toColor
    }

    draw() {
        this.newX = this.x - (mousePos.x - canvas.offsetLeft - canvas.width / 2) / (800 / this.radius)
        this.newY = this.y - (mousePos.y - canvas.offsetTop - canvas.height / 2) / (800 / this.radius)

        let topColor = ctx2.getImageData(this.newX <= 0 ? 1 : this.newX >= canvas.width ? canvas.width - 1 : this.newX, this.newY <= 0 ? 1 : this.newY >= canvas.height ? canvas.height - 1 : this.newY, 1, 1).data
        let gradient = ctx.createLinearGradient(this.newX, this.newY - this.radius, this.newX, this.newY + this.radius)

        gradient.addColorStop(0, `rgb(${topColor[0]}, ${topColor[1]}, ${topColor[2]})`)
        gradient.addColorStop(1, `rgb(${topColor[0] + this.toColor}, ${topColor[1] + this.toColor}, ${topColor[2] + this.toColor})`)

        ctx.beginPath()
        ctx.arc(this.newX, this.newY, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.closePath()
    }
}

function drawCanvas2() {
    if (blackNWhite) return ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    let gradient2 = ctx2.createLinearGradient(0, 0, canvas2.width, canvas2.height)
    gradient2.addColorStop(0, "#f073c8")
    gradient2.addColorStop(1, "#ff6a94")
    ctx2.beginPath()
    ctx2.rect(0, 0, canvas2.width, canvas2.height)
    ctx2.fillStyle = gradient2
    ctx2.fill()
    ctx2.closePath()
    createBallz()
}

function animate() {
    requestAnimationFrame(animate)
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballz.forEach(ball => ball.draw())
}

function createBallz() {
    ballz.push(new Ball(canvas.width * 0.76, canvas.height * 0.5, 50, 10))
    ballz.push(new Ball(canvas.width * 0.13, canvas.height * 0.9, 150, 20))
    ballz.push(new Ball(canvas.width * 0.9, canvas.height * 0.13, 200, 10))
}

drawCanvas2()
animate()
window.addEventListener("mousemove", e => mousePos = e)
document.querySelector("#taskName").addEventListener("click", () => {
    let children = document.querySelectorAll("p, a")
    blackNWhite = !blackNWhite
    drawCanvas2()
    for (let i = 0; i < children.length; i++) children[i].style.color = blackNWhite ? "black" : "white"
})
