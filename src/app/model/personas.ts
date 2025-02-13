export interface Persona {
    id: number;
    nombre: string;
}

export interface Empleados extends Persona {
    email: string;
    telefono: number;
}