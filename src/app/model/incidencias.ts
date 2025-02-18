export interface Incidencias {
    id: string;
    nombre: string;
    precio: number;
    tipo: "Mantenimiento" | "Reparación" | "Limpieza" | "Instalación" | "Configuración" | "Otros";
    categoria: "Log" | "Warn" | "Error";
    descripcion: string;
    fechaIncidencia: string;
    createdAt: Date;
    empleado: string;
}