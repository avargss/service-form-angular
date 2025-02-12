import { Marcas } from "./marcas";

export interface Products {
    id: number;
    imagen: string;
    nombre: string;
    talla: Enumerator;
    precio: number;
    marca: Marcas;
    categoria: "log" | "warn" | "error";
    tipo: string;
}