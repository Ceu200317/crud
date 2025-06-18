function abrirModal(id) {
    document.getElementById('modalEditar').style.display = 'flex';
    carregarUmaTarefa(id)
    console.log(id)
}
function fecharModal() {
    document.getElementById('modalEditar').style.display = 'none';
}

async function carregarUmaTarefa(id) {
    const url = `http://localhost:3000/tarefas/${id}`
    const resposta = await fetch(url)
    const tarefa = await resposta.json()   
    console.log(tarefa)
}

async function carregarTarefas(params) {
    const url = 'http://localhost:3000/tarefas'
    const resposta = await fetch(url)
    const tarefas = await resposta.json()
    const divListaTarefas = document.getElementById('lista-tarefas')
    divListaTarefas.innerHTML = ''
    tarefas.forEach(tarefa => {
       divListaTarefas.innerHTML += 
       `<div class="tarefa" >
        <span class="texto-tarefa">${tarefa.descricao}</span>
        <div class="botoes-tarefa">
          <button class="botao-editar" onclick="abrirModal('${tarefa.id}')">Editar</button>
          <button class="botao-deletar">Deletar</button>
        </div>
      </div>`
    });  
}

carregarTarefas()
