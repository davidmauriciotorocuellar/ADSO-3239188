class ClientModel {
    constructor() {
        // Simulamos la base de datos obteniendo los datos guardados en el navegador
        this.clients = JSON.parse(localStorage.getItem('clients')) || [];
    }

    // Función interna para simular el guardado en Base de Datos
    _commit(clients) {
        this.clients = clients;
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    // CREATE - Crear
    async createClient(clientData) {
        const newClient = {
            id: Date.now().toString(), // Generamos un ID único
            ...clientData,
            status: 'Pendiente' // Estado por defecto
        };
        this.clients.push(newClient);
        this._commit(this.clients);
        return { success: true, data: newClient };
    }

    // READ - Leer
    getClients() {
        return this.clients;
    }

    // UPDATE - Actualizar (Aceptar usuario)
    async updateClientStatus(id, newStatus) {
        this.clients = this.clients.map(client =>
            client.id === id ? { ...client, status: newStatus } : client
        );
        this._commit(this.clients);
        return { success: true };
    }

    // DELETE - Eliminar
    async deleteClient(id) {
        this.clients = this.clients.filter(client => client.id !== id);
        this._commit(this.clients);
        return { success: true };
    }
}