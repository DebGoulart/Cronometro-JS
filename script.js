const startButton = document.querySelector("[data-start]");
const pauseButton = document.querySelector("[data-pause]");
const restartButton = document.querySelector("[data-restart]");
const timeElement = document.querySelector("[data-time]");
const millisecondsElement = document.querySelector(".ms");

let segundos = 0,
    minutos = 0,
    horas = 0;
let millisegundos = 0;

let interval;
let isRunning = false;

const renderTime = (segundos, minutos, horas, millisegundos) => {
    const Zero = (value) => {
        if (value < 10) {
            return "0" + value;
        } else {
            return value.toString();
        }
    };

    timeElement.innerHTML = Zero(horas) + ":" + Zero(minutos) + ":" + Zero(segundos);
    millisecondsElement.innerHTML = "." + millisegundos.toString().padStart(2, '0');
};

const startTime = () => {

    startButton.setAttribute("disabled", "true");
    pauseButton.removeAttribute("disabled");
    restartButton.removeAttribute("disabled");


    interval = setInterval(() => {
        millisegundos++;
        while (millisegundos === 100) {
            millisegundos = 0;
            segundos++;
            while (segundos === 1000) {
                segundos = 0;
                minutos++;
            }

            while (minutos === 1000) {
                segundos = 0;
                minutos = 0;
                horas++;
            }
        }

        renderTime(segundos, minutos, horas, millisegundos);
        console.log(horas, ":", minutos, ":", segundos);
    }, 10);
};

const pauseTime = () => {
    startButton.removeAttribute("disabled");
    pauseButton.setAttribute("disabled", "true");
    startButton.innerHTML = "Continuar";

    clearInterval(interval);
    isRunning = false;
};

const restartTime = () => {
    startButton.removeAttribute("disabled");
    pauseButton.setAttribute("disabled", "true");
    startButton.innerHTML = "Reiniciar";
    restartButton.setAttribute("disabled", "true");



    clearInterval(interval);
    isRunning = false;

    segundos = 0;
    minutos = 0;
    horas = 0;
    millisegundos = 0;
    renderTime(segundos, minutos, horas, millisegundos);
}

startButton.onclick = () => {
    const startValue = startButton.getAttribute("data-start");

    startTime(startValue);
};

pauseButton.onclick = () => {
    pauseTime();
};

restartButton.onclick = () => {
    restartTime();
};
