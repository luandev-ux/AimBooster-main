const crosshair = document.querySelector('.cursor')
const target  = document.querySelector('.target')
const scoreText = document.querySelector('.score')
const timerText = document.querySelector('.timer')
const highscoreText = document.querySelector('.highscore')
const playbutton = document.querySelector('.menupage .playbtn')


const damage = document.querySelector('.damage')
const shoot = document.querySelector('.shoot')
var score = 0;
var timeLeft = 30;
var highscore = 0;

document.addEventListener("keydown", my_onkeydown_handler);
document.addEventListener('contextmenu', event => event.preventDefault());

document.querySelector('.menupage').addEventListener('click', (e) => e.stopPropagation())
function my_onkeydown_handler( event ) {
    switch (event.keyCode) {
        case 116 : // 'F5'
            event.preventDefault();
            event.keyCode = 0;
            window.status = "F5 disabled";
            break;
    }
}

playbutton.addEventListener('click', () => {
    document.querySelector('.menupage').style.opacity = "0";
    setTimeout(() => {
        document.querySelector('.menupage').style.display = "none";
    }, 100)
    play()
})


const play = () => {
    setInterval(() => {
        timer()
    }, 1000)
}
window.onload = () => {
    if(localStorage.getItem('highscore')){
        highscore = localStorage.getItem('highscore')
        highscoreText.innerHTML = `Placar máximo ${highscore}`
    }
    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;
    respawn()
}

document.addEventListener('mousemove', (e) => {
    crosshair.style.left = `${e.clientX}px`
    crosshair.style.top = `${e.clientY}px`
})

const respawn = () => {
    const top = Math.floor(Math.random() * window.innerHeight)
    const left = Math.floor(Math.random() * window.innerWidth)
    target.style.top = `${top}px`
    target.style.left = `${left}px`
    window.navigator.vibrate(250);
    
}

const gameOver = () => {
    // alert(`Sua pontuação foi: ${score}`)
    if(localStorage.getItem('highscore') < score){
        localStorage.setItem('highscore', score)
        highscore = score;
        highscoreText.innerHTML = `Placar máximo ${highscore}`
    }
    score = 0;
    timeLeft = 31;
    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;

}
const timer = () => {
    if(timeLeft === 0){
        gameOver()
        
    }
    timeLeft -= 1;
    timerText.innerHTML = timeLeft;
}

document.addEventListener('click', ()=> {
    damage.currentTime = 0;
    damage.play()
    
})


target.addEventListener('click', (e) => {
    e.stopPropagation();
    shoot.currentTime = 0;
    shoot.play()
    score += 1;
    scoreText.innerHTML = score;
    respawn();
})
swal({
    title: 'Bem-vindo(a) ao jogo!',
    text: "Identifique o círculo vermelho, e aperte para acumular o máximo de pontos possíveis em um tempo limitado! \n \n O placar máximo é registrado a cada 30 segundos",
    type: 'info',
  })