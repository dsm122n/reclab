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
            <style>
             h1 {
                text-align: center;
                color: #4CAF50;
                font-size: 24px;
                margin-bottom: 20px;
            }

                @media print {
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .page {
                        page-break-after: always;
                        margin: 20mm;
                                            }
                    .header, .footer {
                        position: sticky;
                        width: calc(100% - 40mm);
                        left: 20mm;
                    }
                    .header {
                        top: 0;
                        background-color: white;
                        z-index: 1;
                    }
                    .footer {
                        bottom: 0;
                        text-align: center;
                        font-size: 14px;
                        color: #888;
                        background-color: white;
                        z-index: 1;
                    }
                    ul {
                        margin: 0;
                        padding: 0;
                        list-style-type: none;
                    }
                    li {
                        font-size: 18px;
                        margin-bottom: 10px;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                }
            </style>
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

    
    
});