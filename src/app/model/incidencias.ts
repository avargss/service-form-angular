export interface Incidencias {
    id: number;
    nombre: string;
    precio: number;
    tipo: "Mantenimiento" | "Reparación" | "Limpieza" | "Instalación" | "Configuración" | "Otros";
    categoria: "Log" | "Warn" | "Error";
    descripcion: string;
    fecha: Date;
}