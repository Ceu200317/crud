async function abrirModal(id) {
    document.getElementById('modalEditar').style.display = 'flex';
    const tarefa = await carregarUmaTarefaSo(id);
    const inputId = document.querySelector('#editar-id');
    const inputDescricao = document.querySelector('#editar-descricao');
    inputId.value = tarefa.id;
    inputDescricao.value = tarefa.descricao;
}

function fecharModal() {
    document.getElementById('modalEditar').style.display = 'none';
}

async function carregarTarefas() {
    const url = 'http://localhost:3000/tarefas';
    const response = await fetch(url);
    const tarefas = await response.json();

    const listaTarefas = document.querySelector('#lista-tarefas');
    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        listaTarefas.innerHTML += `      
            <div class="tarefa" data-id="${tarefa.id}">
                <span class="texto-tarefa">${tarefa.descricao}</span>
                <div class="botoes-tarefa">
                    <button class="botao-editar" onclick="abrirModal('${tarefa.id}')">Editar</button>
                    <button class="botao-deletar" onclick="deletarTarefa('${tarefa.id}')">Deletar</button>
                </div>
            </div>` 
    });
}

async function deletarTarefa(id) {
    const url = `http://localhost:3000/tarefas/${id}`;
    await fetch(url, {
        method: 'DELETE'
    });
    carregarTarefas(); 
}

async function adicionarTarefa() {
    const url = 'http://localhost:3000/tarefas';
    const input = document.querySelector('#entradaNovaTarefa');
    const descricaoTarefa = input.value.trim();

    if (!descricaoTarefa) return; 

    const novaTarefa = {
        descricao: descricaoTarefa
    };

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa)
    });

    input.value = ''; 
    carregarTarefas(); 
}

async function carregarUmaTarefaSo(id) {
    const url = `http://localhost:3000/tarefas/${id}`;
    const response = await fetch(url);
    const tarefa = await response.json();
    return tarefa;
}

async function alterarTarefa() {
    const idDigitado = document.querySelector('#editar-id').value;
    const descricaoDigitado = document.querySelector('#editar-descricao').value.trim();

    if (!descricaoDigitado) return; 

    const url = `http://localhost:3000/tarefas/${idDigitado}`;
    const dadosTarefa = {
        id: idDigitado,
        descricao: descricaoDigitado 
    };

    await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosTarefa)
    });

    fecharModal();       
    carregarTarefas();   
}


carregarTarefas();
