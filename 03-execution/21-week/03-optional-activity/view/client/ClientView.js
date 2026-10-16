class ClientView {
    constructor() {
        this.appContainer = document.getElementById('app-view');
        // Renderizamos la estructura base: formulario y tabla
        this.appContainer.innerHTML = `
            <div class="form-container">
                <h2>Registrar Cliente</h2>
                <form id="client-form">
                    <input type="text" id="document" placeholder="Documento" required />
                    <input type="text" id="name" placeholder="Nombre completo" required />
                    <input type="email" id="email" placeholder="Correo electrónico" required />
                    <input type="text" id="phone" placeholder="Teléfono" required />
                    <button type="submit">Guardar Cliente</button>
                </form>
            </div>
            <div id="clients-list-container">
                <h2>Lista de Clientes</h2>
                <table border="1" width="100%" id="clients-table" style="text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="clients-tbody"></tbody>
                </table>
            </div>
        `;
    }

    // V - Función para pintar los datos de la tabla
    renderClients(clients) {
        const tbody = document.getElementById('clients-tbody');
        tbody.innerHTML = '';

        if (clients.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">No hay clientes registrados.</td></tr>';
            return;
        }

        clients.forEach(client => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${client.document}</td>
                <td>${client.name}</td>
                <td><strong>${client.status}</strong></td>
                <td>
                    <button class="accept-btn" data-id="${client.id}" style="background-color: green; color: white;">Aceptar</button>
                    <button class="delete-btn" data-id="${client.id}" style="background-color: red; color: white;">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Capturador de eventos: Formulario
    bindAddClient(handler) {
        const form = document.getElementById('client-form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const clientData = {
                document: document.getElementById('document').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            handler(clientData);
        });
    }

    // Capturador de eventos: Botón Eliminar
    bindDeleteClient(handler) {
        document.getElementById('clients-tbody').addEventListener('click', event => {
            if (event.target.className === 'delete-btn') {
                const id = event.target.getAttribute('data-id');
                handler(id);
            }
        });
    }

    // Capturador de eventos: Botón Aceptar
    bindAcceptClient(handler) {
        document.getElementById('clients-tbody').addEventListener('click', event => {
            if (event.target.className === 'accept-btn') {
                const id = event.target.getAttribute('data-id');
                handler(id);
            }
        });
    }
}