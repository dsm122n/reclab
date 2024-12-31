const form = document.getElementById("reclabForm");
const examContainer = document.querySelector(".examenes");
const listado = document.getElementById("listado_ex");
var datosPaciente = {
    nombre: "",
    rut: "",
    edad: "",
    sexo: ""

}
var datosPrescriptor = {
    nombre: "Nombre del prescriptor para membrete",
    cedula: "xx.xxx.xxx-x",
    telefono: "99999999",
    direccion: "xxxxxxxxxxxxxxxx"
}
const solicitud = [];
document.addEventListener("DOMContentLoaded", () => {


    form.addEventListener("click", (event) => {
        if (event.target.classList.contains("add")) {
            event.preventDefault();
            addExamToList(event.target.closest(".examen"));
        } else if (event.target.classList.contains("remove")) {
            event.preventDefault();
            removeLastExam();
        }
    });

    document.addEventListener("keydown", (event) => {
        const activeElement = document.activeElement;

        console.log(activeElement);
        if (activeElement.className === "examen-select" ) {
            if (event.key === "Enter") {
                const activeExam = document.querySelector(".examen-select");
                if (activeExam) {
                    addExamToList(activeExam.closest(".examen"));
                }
            } 
            // delete last exam if ctrl + backspace is pressed
            else if (event.key === "Backspace" && event.ctrlKey) {
                removeLastExam();
            }

        }
        if (activeElement.className === "examen-otro" && document.querySelector(".examen-select").innerHTML !== "") {
                
                if (event.key === "Enter") {
                    const activeExam = document.querySelector(".examen-otro");
                    if (activeExam) {
                        addExamToList(activeExam.closest(".examen"));
                    }
                } else if (event.key === "Backspace" && event.ctrlKey) {
                    removeLastExam();
                }
        } 
    });


    function addExamToList(examElement) {
        const selectValue = examElement.querySelector(".examen-select").value;
        const otherValue = examElement.querySelector(".examen-otro").value;
        const examName = otherValue || selectValue;

        if (examName) {
            solicitud.push(examName);
            updateListado();
            document.querySelector(".examen-otro").value = "";
        }
    }

    function removeLastExam() {
        if (solicitud.length > 0) {
            solicitud.pop();
            updateListado();
        }
    }

    function updateListado() {
        listado.innerHTML = ""; // Clear previous list
        solicitud.forEach((exam) => {
            const listItem = document.createElement("option");
            listItem.textContent = exam;
            listado.appendChild(listItem);
        });
    }

    

    
    
});


function printPDF() {
    console.log("Printing PDF...");
const printWindow = window.open("", "_blank");
datosPaciente.nombre = document.getElementById("nombre").value;
datosPaciente.rut = document.getElementById("rut").value;
datosPaciente.edad = document.getElementById("edad").value;
datosPaciente.sexo = document.getElementById("sexo").value;

// Dynamic HTML content with patient and prescriptor data
const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Prescripción de Exámenes</title>
        <link rel="stylesheet" href="print.css" type="text/css" media="print"> 
        <link rel="stylesheet" href="style.css" type="text/css" media="screen">
    </head>
    <body>
    <h1>Solicitud de Exámenes</h1>
    <div class="page">
    <div class="header">
                <p><strong>Nombre del Paciente:</strong> ${datosPaciente.nombre}</p>
                <p><strong>Edad:</strong> ${datosPaciente.edad} años</p>
                <p><strong>Sexo:</strong> ${datosPaciente.sexo}</p>
            </div>
            <ul>
                ${solicitud.map((exam) => `<li>${exam}</li>`).join("")}
            </ul>
            <div class="footer">
                <p><strong>Nombre del Prescriptor:</strong> ${datosPrescriptor.nombre}</p>
                <p><strong>Cédula:</strong> ${datosPrescriptor.cedula}</p>
                <p><strong>Teléfono:</strong> ${datosPrescriptor.telefono}</p>
                <p><strong>Dirección:</strong> ${datosPrescriptor.direccion}</p>
            </div>
        </div>
    </body>
    </html>
`;

// Write the HTML content to the new window and print
printWindow.document.open();
printWindow.document.write(htmlContent);
printWindow.document.close();
printWindow.print();
}