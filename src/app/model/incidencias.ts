export interface Incidencias {
    id: number;
    nombre: string;
    precio: number;
    tipo: "Mantenimiento" | "Reparación" | "Limpieza" | "Instalación" | "Configuración" | "Otros";
    categoria: "Log" | "Warn" | "Error";
    descripcion: string;
    fechaIncidencia: string;
    createdAt: Date;
    // Implementar fecha de creación aquí, en el json y en el backend
}