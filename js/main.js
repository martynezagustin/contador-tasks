const container = document.querySelector('.container')
const inputTarea = document.getElementById('tarea')
const submitTarea = document.querySelector('#send-tarea')
const listaTareas = document.querySelector('#lista-tasks')
const main = document.querySelector('.main')



let tareas = JSON.parse(localStorage.getItem('Tareas')) || []
let id = 0

function addTarea(id, tarea) {
    const taskLi = `<li id="${id}" class="tarea-asignada"><input type="checkbox" name="" id="tarea-${id}">${tarea}<button class="p-2 button-cancel" type="submit">X</button></li>`
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
            elemento.innerHTML = `${tarea.nombreTarea}<i class="fa-sharp fa-solid fa-trash p-2 icon-delete" data-id=${id} id=${id}></i>`
            listaTareas.append(elemento)
            const deleteIcon = document.querySelectorAll('.icon-delete')
            deleteIcon.forEach((boton) => {
                boton.addEventListener("click", removerTarea)
                boton.addEventListener("mouseover", () => 
                    boton.style.color = "tomato"
                )
                boton.addEventListener("mouseout", () => {
                    boton.style.color = "red"
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

actualizarTareas()
