// adiciona uma nova tarefa para a tabela
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const projectName = document.getElementById('project-name').value;
    const clientName = document.getElementById('client-name').value;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value);

    const taskList = document.getElementById('task-list');
    const newRow = document.createElement('tr'); // Criar uma nova linha para a tabela

    newRow.classList.add('clickable-row'); // Adicionar a classe 'clickable-row'
    newRow.dataset.projectName = projectName; // Armazenar o nome do projeto como atributo

    // preenche a linha com os dados do projeto
    newRow.innerHTML = `
        <td>${projectName}</td>
        <td>${clientName}</td>
        <td>R$ ${hourlyRate.toFixed(2)}</td>
        <td class="start-time">--:--</td>
        <td class="stop-time">--:--</td>
        <td>
            <input type="text" class="timer-display" value="00:00:00">
            <button class="timer-btn">Iniciar</button>
        </td>
        <td class="total-display">R$ 0,00</td>
    `;

    // adicionar linha a tabela <tbody>
    taskList.appendChild(newRow);
    document.getElementById('task-form').reset(); // Limpar o formulário

    // faz  a linha ficar clicável
    newRow.addEventListener('click', function () {
        const projectName = encodeURIComponent(this.dataset.projectName);
        window.open(`projetos2.html?nome=${projectName}`, '_blank');

    });

    // adiciona funcionalidades ao botão iniciar
    const timerButton = newRow.querySelector('.timer-btn');
    const timerDisplay = newRow.querySelector('.timer-display');
    const totalDisplay = newRow.querySelector('.total-display');
    const startTimeCell = newRow.querySelector('.start-time');
    const stopTimeCell = newRow.querySelector('.stop-time');

    // impede que o botão de iniciar seja clicável e leve para a pagina do projeto
    timerButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede o clique na linha
    });

    // impede que o seletor do cronômetro seja clicável
    timerDisplay.addEventListener('click', function (event) {
     event.stopPropagation(); // Impede o clique na linha
    });

    setupTimer(timerButton, timerDisplay, totalDisplay, startTimeCell, stopTimeCell, hourlyRate);
});

// configuração do cronômetro
function setupTimer(button, display, totalDisplay, startTimeCell, stopTimeCell, hourlyRate) {
    let timer = null; // Referência ao cronômetro
    let elapsedSeconds = 0; // Contador em segundos
    let accumulatedTotal = 0; // Total acumulado

    // converte o tempo do formato HH:MM:SS para segundos
    function timeToSeconds(time) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    // converte os segundos para HH:MM:SS
    function secondsToTime(seconds) {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    }

    // atualiza o total acumulado $$ com base no tempo decorrido
    function updateTotalFromTime(seconds) {
        accumulatedTotal = (seconds / 3600) * hourlyRate;
        totalDisplay.textContent = `R$ ${accumulatedTotal.toFixed(2)}`;
    }

    // obtem o horário atual em formato HH:MM
    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // sincroniza o valor do campo de entrada com o contador em segungos
    display.addEventListener('change', function () {
        elapsedSeconds = timeToSeconds(display.value);
        updateTotalFromTime(elapsedSeconds); // atualizar o total acumulado ao editar
    });

    // função que controla o cronômetro
    button.addEventListener('click', function () {
        if (button.textContent === 'Iniciar') {
            button.textContent = 'Pausar';
            startTimeCell.textContent = getCurrentTime(); // registrar horário de início
            timer = setInterval(() => {
                elapsedSeconds++;
                display.value = secondsToTime(elapsedSeconds);

                // incrementa o total acumulado
                updateTotalFromTime(elapsedSeconds);
            }, 1000);
        } else {
            button.textContent = 'Iniciar';
            stopTimeCell.textContent = getCurrentTime(); // registra o horário de parada
            clearInterval(timer);
            timer = null;
        }
    });
}



