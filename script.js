const form = document.getElementById("reclabForm");
const examContainer = document.querySelector(".examenes");
const listado = document.getElementById("listado_ex");
var datosPaciente = {
    nombre: "",
    rut: "",
    fecha_nacimiento: "",
    edad: "",
    sexo: "",
    hipotesis_diagnóstica: "",
    fecha_solicitud: ""

}
var datosPrescriptor = {
    nombre: "Daniel Arturo San Martín Martínez",
    profesion: "Médico Cirujano",
    cedula: "20.283.646-1",
    numero_registro: "861577",
    mail:"dasanmartinm@gmail.com - +569 6831 2852",
    direccion: "Comandante Las Heras 2180, San Bernardo, Región Metropolitana"
}
const solicitud = [];

document.addEventListener("DOMContentLoaded", () => {});

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

    // fecha de nacimiento
    document.getElementById("fecha_nacimiento").addEventListener("change", (event) => {
        const age = calculateAge(event.target.value);
        document.getElementById("edad").value = age;
    }
    );


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
    document.getElementById("fecha_solicitud").valueAsDate = new Date();

    

    
    
});

// calculate age from date of birth
function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    const diff = now - dob;
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function printPDF() {
    console.log("Printing PDF...");
const printWindow = window.open("", "_blank");
datosPaciente.nombre = document.getElementById("nombre").value;
datosPaciente.rut = document.getElementById("rut").value;
datosPaciente.fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
datosPaciente.edad = document.getElementById("edad").value;
datosPaciente.hipotesis_diagnóstica = document.getElementById("hipotesis_diagnostica").value;
datosPaciente.sexo = document.getElementById("sexo").value;
datosPaciente.fecha_solicitud = document.getElementById("fecha_solicitud").value;

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
    <div class="page">
    <div class="header">

                    <h1>Solicitud de Exámenes</h1>
                        <div class="px-data">
                            <p><strong>Nombre del Paciente:</strong> ${datosPaciente.nombre}</p>
                            <p><strong>RUT:</strong> ${datosPaciente.rut} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <strong>Sexo:</strong> ${datosPaciente.sexo}</p> 
                            <p><strong>Fecha de Nacimiento:</strong> ${datosPaciente.fecha_nacimiento} &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp <strong>Edad:</strong> ${datosPaciente.edad} años</p>
                            <p><strong>Hipótesis Diagnóstica:</strong> ${datosPaciente.hipotesis_diagnóstica}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  <strong>Fecha de Solicitud:</strong> ${datosPaciente.fecha_solicitud}</p>
                        </div>
                    </div>
        <div class="content">
            Exámenes solicitados:<br>
                <ul>
                    ${solicitud.map((exam) => `<li>${exam}</li>`).join("")}
                </ul>
        </div>
        <div class="footer center">
            <p> Dr. ${datosPrescriptor.nombre} - ${datosPrescriptor.profesion}</p>
            <p><strong>Cédula:</strong> ${datosPrescriptor.cedula}   -   <strong>N° Registro:</strong> ${datosPrescriptor.numero_registro}</p>
            <p><strong>Contacto:</strong> ${datosPrescriptor.mail}</p>
            <p><strong>Dirección:</strong> ${datosPrescriptor.direccion}</p>
            <p>Página <span class="pageNumber"></span></p>
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