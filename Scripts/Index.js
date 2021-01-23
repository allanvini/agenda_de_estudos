let toDo = JSON.parse(localStorage.getItem('toDoList')) || [];
let studyMaterials = JSON.parse(localStorage.getItem('studyMaterials')) || [];
let annotations = JSON.parse(localStorage.getItem('annotations')) || [];

let toDoColumn = document.getElementById("toDoColumn");
let materialsColumn = document.getElementById("materialsColumn");
let annotationsColumn = document.getElementById("annotationsColumn");

let toDoContainer = document.getElementById("toDoContainer");
let materialsContainer = document.getElementById("materialsContainer");
let annotationsContainer =  document.getElementById("annotationsContainer");

let modalsContainer = document.getElementById("modals-container");

window.onload = ()=>{
    renderToDo(toDo);
    renderStudyMaterials(studyMaterials);
    renderAnnotations(annotations);
}

function saveToDoList(){
    localStorage.setItem('toDoList', JSON.stringify(toDo));
}

function saveStudyMaterialsList(){
    localStorage.setItem('studyMaterials', JSON.stringify(studyMaterials));
}

function saveAnnotationsList(){
    localStorage.setItem('annotations', JSON.stringify(annotations));
}


function renderToDo(data){
    toDoColumn.innerHTML = "";

    let htmlBlock = [];

    data.forEach(element => {
        htmlBlock.push(
            `
            <div class="card">
                <p class="card-title">${element.title}</p>
                <p class="card-description">${element.description}</p>
                <button class="button" onclick="deleteTodo(${data.indexOf(element)})">Terminado/Excluir</button>
            </div>
            `
        );
    });

    toDoColumn.innerHTML = htmlBlock.join("");
}

function renderStudyMaterials(data){
    materialsColumn.innerHTML = "";

    let htmlBlock = [];

    data.forEach(element =>{
        htmlBlock.push(
            `
                <div class="card">
                    <p class="card-title">${element.title}</p>
                    <p class="card-description">${element.description}</p>
                    <p>Link:</p>
                    <a class="link-reference" href="${element.link}" target="_blank"/>${element.link}</a>
                    <button class="button" onclick="deleteMaterial(${data.indexOf(element)})">Terminado/Excluir</button>
                </div>
            `
        )
    })

    materialsColumn.innerHTML = htmlBlock.join("");
}

function renderAnnotations(data){
    annotationsColumn.innerHTML = "";

    let htmlBlock = [];

    data.forEach(element=>{
        htmlBlock.push(
            `
            <div class="card">
                <p class="card-title">${element.title}</p>
                <p class="card-description"> ${element.description}</p>
                <button class="button" onclick="deleteAnnotation(${data.indexOf(element)})">Terminado/Excluir</button>
            </div>
            `
        )
    })

    annotationsColumn.innerHTML = htmlBlock.join("");
}


function generateToDoModal(){
    modalsContainer.innerHTML = 
    `
        <div class="modal-form">
            <p>Registrar nova tarefa</p>
            <span>Título: </span>
            <input id="toDoTitle" placeholder="Título"/>
            <span>Descrição: </span>
            <textarea id="toDoDescription" placeholder="Descrição"></textarea>
            <div>
                <button class="button" onclick="addToDo()">Adicionar</button>
                <button class="button" onclick="closeModal()">Cancelar</button>
            </div>
        </div>
    `
    enableModal();
}

function addToDo(){

    let title = document.getElementById("toDoTitle").value;
    let description = document.getElementById("toDoDescription").value;

    toDo.push({
        title: title,
        description: description
    });

    saveToDoList();

    renderToDo(toDo);

    closeModal();

}

function deleteTodo(pos){
    toDo.splice(pos, 1);
    renderToDo(toDo);
    saveToDoList();
}

function generateMaterialModal(){
    modalsContainer.innerHTML = 
    `
        <div class="modal-form">
            <p>Registrar novo material de estudo</p>
            <span>Título: </span>
            <input id="studyMaterialTitle" placeholder="Título"/>
            <span>Descrição: </span>
            <textarea id="studyMaterialDescription" placeholder="Descrição"></textarea>
            <span>Link: </span>
            <input id="studyMaterialLink" placeholder="Link"/>
            <div>
                <button class="button" onclick="addStudyMaterial()">Adicionar</button>
                <button class="button" onclick="closeModal()">Cancelar</button>
            </div>
        </div>
    `
    enableModal();
}

function addStudyMaterial(){
    let title = document.getElementById("studyMaterialTitle").value;
    let description = document.getElementById("studyMaterialDescription").value;
    let link = document.getElementById("studyMaterialLink").value;

    studyMaterials.push({
        title: title,
        description: description,
        link: link
    });

    saveStudyMaterialsList();
    renderStudyMaterials(studyMaterials);
    closeModal();
}

function deleteMaterial(pos){
    studyMaterials.splice(pos,1);
    renderStudyMaterials(studyMaterials);
    saveStudyMaterialsList();
}

function generateAnnotationModal(){
    modalsContainer.innerHTML = 
    `
        <div class="modal-form">
            <p>Fazer anotação</p>
            <span>Assunto: </span>
            <input id="annotationTitle" placeholder="Assunto"/>
            <span>Anotação: </span>
            <textarea id="annotationDescription" placeholder="Anotação"></textarea>
            <div>
                <button class="button" onclick="addAnnotation()">Adicionar</button>
                <button class="button" onclick="closeModal()">Cancelar</button>
            </div>
        </div>
    `
    enableModal();
}

function addAnnotation(){
    let title = document.getElementById("annotationTitle").value;
    let description = document.getElementById("annotationDescription").value;

    annotations.push({
        title: title,
        description: description
    });

    saveAnnotationsList();
    renderAnnotations(annotations);
    closeModal();
}

function deleteAnnotation(pos){
    annotations.splice(pos, 1);
    renderAnnotations(annotations);
    saveAnnotationsList();
}

function closeModal(){
    modalsContainer.innerHTML = "";
    modalsContainer.style.display = "none";
}

function enableModal(){
    modalsContainer.style.display="flex";
}


/**
 * Mobile functions above
 */

let btnShowToDoColumn = document.getElementById("btnShowToDoColumn");
let btnShowMaterialsColumn = document.getElementById("btnShowMaterialsColumn");
let btnShowAnnotationsColumn = document.getElementById("btnShowAnnotationsColumn");

function showToDoColumn(){
    toDoContainer.style.display = "block";
    materialsContainer.style.display = "none";
    annotationsContainer.style.display = "none";
    btnShowToDoColumn.style.backgroundColor = "rgb(243, 82, 82)";
    btnShowMaterialsColumn.style.backgroundColor = "rgb(243, 59, 59)";
    btnShowAnnotationsColumn.style.backgroundColor = "rgb(243, 59, 59)";

}

function showMaterialsColumn(){
    toDoContainer.style.display = "none";
    materialsContainer.style.display = "block";
    annotationsContainer.style.display = "none";
    btnShowToDoColumn.style.backgroundColor = "rgb(243, 59, 59)";
    btnShowMaterialsColumn.style.backgroundColor = "rgb(243, 82, 82)";
    btnShowAnnotationsColumn.style.backgroundColor = "rgb(243, 59, 59)";
}

function showAnnotationsColumn(){
    toDoContainer.style.display = "none";
    materialsContainer.style.display = "none";
    annotationsContainer.style.display = "block";
    btnShowToDoColumn.style.backgroundColor = "rgb(243, 59, 59)";
    btnShowMaterialsColumn.style.backgroundColor = "rgb(243, 59, 59)";
    btnShowAnnotationsColumn.style.backgroundColor = "rgb(243, 82, 82)";
}