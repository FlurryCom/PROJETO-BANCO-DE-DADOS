// Simulando dados vindos do banco de dados
const projetoSelecionado = {
    nome: "Testaaae 1",
    cliente: "Cliente 2",
    horasTrabalhadas: "20:30", // Formato HH:MM
    ganhos: 1025.0, // Ganhos acumulados
};

// Preenchendo os dados do projeto na página
document.getElementById("project-name").textContent = projetoSelecionado.nome;
document.getElementById("cliente").textContent = projetoSelecionado.cliente;
document.getElementById("horas-trabalhadas").textContent = projetoSelecionado.horasTrabalhadas;
document.getElementById("ganhos").textContent = `R$ ${projetoSelecionado.ganhos.toFixed(2)}`;
