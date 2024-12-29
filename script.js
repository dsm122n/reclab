document.addEventListener("DOMContentLoaded", () => {
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
        apellidos: "Apellidos",
        cedula: "xx.xxx.xxx-x",
        telefono: "99999999",
        direccion: "xxxxxxxxxxxxxxxx"
    }
    const solicitud = [];

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
        if (event.key === "ArrowRight") {
            const activeExam = document.querySelector(".examen-select");
            if (activeExam) {
                addExamToList(activeExam.closest(".examen"));
            }
        } else if (event.key === "ArrowLeft") {
            removeLastExam();
        }
    });

    form.addEventListener("submit", (event) => {

        event.preventDefault();
        printPDF();
    });

    function addExamToList(examElement) {
        const selectValue = examElement.querySelector(".examen-select").value;
        const otherValue = examElement.querySelector(".examen-otro").value;
        const examName = otherValue || selectValue;

        if (examName) {
            solicitud.push(examName);
            updateListado();
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

    function printPDF() {
        datosPaciente.nombre = document.getElementById("nombre").value;
        datosPaciente.rut = document.getElementById("rut").value;
        datosPaciente.edad = document.getElementById("edad").value;
        datosPaciente.sexo = document.getElementById("sexo").value;
        const printWindow = window.open("", "_blank");
    
        // Dynamic HTML content with patient and prescriptor data
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Prescripción de Exámenes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                        background-color: #fff;
                    }
                    h1 {
                        text-align: center;
                        color: #4CAF50;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .header, .footer {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    .header p, .footer p {
                        margin: 5px 0;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                    }
                    li {
                        font-size: 18px;
                        margin-bottom: 10px;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 14px;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <p><strong>Nombre del Paciente:</strong> ${datosPaciente.nombre} ${datosPaciente.apellidos}</p>
                    <p><strong>Edad:</strong> ${datosPaciente.edad} años</p>
                    <p><strong>Sexo:</strong> ${datosPaciente.sexo}</p>
                </div>
                <h1>Reclab - Prescripción de Exámenes</h1>
                <ul>
                    ${solicitud.map((exam) => `<li>${exam}</li>`).join("")}
                </ul>
                <div class="footer">
                    <p><strong>Nombre del Prescriptor:</strong> ${datosPrescriptor.nombre} ${datosPrescriptor.apellidos}</p>
                    <p><strong>Cédula:</strong> ${datosPrescriptor.cedula}</p>
                    <p><strong>Teléfono:</strong> ${datosPrescriptor.telefono}</p>
                    <p><strong>Dirección:</strong> ${datosPrescriptor.direccion}</p>
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
    
    
});