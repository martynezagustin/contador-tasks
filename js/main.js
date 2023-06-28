const container = document.querySelector('.container')
const inputTarea = document.getElementById('tarea')
const submitTarea = document.querySelector('#send-tarea')
const listaTareas = document.querySelector('#lista-tasks')
const main = document.querySelector('.main')

let tareas = JSON.parse(localStorage.getItem('Tareas')) || []
let id = 0

function addTarea(id, tarea) {
    const taskLi = `"${id}${tarea}`
    listaTareas.insertAdjacentHTML("beforeend", taskLi)
}


submitTarea.addEventListener("click", (e) => {
    e.preventDefault()
    const nombreTarea = inputTarea.value
    if (nombreTarea != '') {
        addTarea(id, nombreTarea)
        tareas.push({
            id: id,
            nombreTarea: nombreTarea
        })
        localStorage.setItem('Tareas', JSON.stringify(tareas))
        id++
        actualizarTareas()
        inputTarea.value = ''
    } else {
        alert("Por favor, te pido, ingresá algo")
    }
})

function actualizarTareas() {
    listaTareas.innerHTML = ""
    if (tareas.length === 0) {
        listaTareas.innerHTML = `<li class = "p-2 text-center" style="list-style-type:none;color:red">No tienes tareas!</li>`
    } else {
        tareas.forEach((tarea) => {
            const elemento = document.createElement("li")
            elemento.classList.add("tarea-asignada")
            elemento.classList.add("p-2")
            elemento.classList.add("mt-3")
            elemento.innerHTML = `<i class="fa-regular fa-circle" data-id=${tarea.id}></i>${tarea.nombreTarea}<i class="fa-sharp fa-solid fa-trash p-2 icon-delete" data-id=${tarea.id} id=${id}></i>`
            listaTareas.append(elemento)
            const deleteIcon = document.querySelectorAll('.icon-delete')
            const taskReady = document.querySelectorAll('.fa-circle')
            deleteIcon.forEach((boton) => {
                boton.addEventListener("click", removerTarea)
                boton.addEventListener("mouseover", () => 
                    boton.style.color = "tomato"
                )
                boton.addEventListener("mouseout", () => {
                    boton.style.color = "red"
                })
                taskReady.forEach((circulo) => {
                    circulo.addEventListener("click", terminarTarea)
                })
            })
        })
    }
}


function removerTarea(e) {
    const taskId = parseInt(e.target.dataset.id)
    const index = tareas.findIndex((tarea) => tarea.id === taskId);
    if(index !== -1){
        tareas.splice(index, 1)
        localStorage.setItem("Tareas", JSON.stringify(tareas))
        actualizarTareas()
    }
}

function terminarTarea(e){
    const taskId = parseInt(e.target.dataset.id)
    const tareaTerminada = tareas.find(tarea => tarea.id === taskId)
    if(tareaTerminada !== -1){
        console.log(tareaTerminada.nombreTarea)
    } else {
        alert("No se encontró la tarea")
    }
}


actualizarTareas()
