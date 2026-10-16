class ClientController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Enlazamos todos los eventos de la vista con nuestras funciones
        this.view.bindAddClient(this.handleAddClient);
        this.view.bindDeleteClient(this.handleDeleteClient);
        this.view.bindAcceptClient(this.handleAcceptClient);

        // Renderizamos la tabla inicial (Read del CRUD)
        this.updateView();
    }

    // Clean Code: Función centralizada para refrescar la tabla
    updateView = () => {
        const clients = this.model.getClients();
        this.view.renderClients(clients);
    }

    // Lógica para CREAR
    handleAddClient = async (clientData) => {
        const result = await this.model.createClient(clientData);
        if (result.success) {
            document.getElementById('client-form').reset();
            this.updateView(); // Refrescamos la tabla
        }
    };

    // Lógica para ELIMINAR
    handleDeleteClient = async (id) => {
        // Le preguntamos al usuario si está seguro
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            await this.model.deleteClient(id);
            this.updateView(); // Refrescamos la tabla
        }
    };

    // Lógica para ACTUALIZAR
    handleAcceptClient = async (id) => {
        await this.model.updateClientStatus(id, 'Aceptado');
        this.updateView(); // Refrescamos la tabla
    };
}