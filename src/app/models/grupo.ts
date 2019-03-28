import { Celula } from "./celula";

export class Grupo {
    public nome: string;
    public celulas: Celula[];

    public sum: number;

    public calcSum(){
        let sum = 0;
        this.celulas.forEach((celula, index, ar) => {
            sum += celula.valor;
        });
        this.sum = sum;
        return sum;
    }
}