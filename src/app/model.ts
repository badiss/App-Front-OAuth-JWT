export interface Student {
    studentId : number,
    code : string,
    firstName : string,
    lastName : string,
    programId : string,
    photo : string
}

export interface Payment {
    id : number,
    date : string,
    amount : number,
    type : string,
    status : string,
    file : string,
    student : Student
}

export interface Cours {
    idCours : number,
    titre : string,
    date : number,
    heure : string,
    obligatoire : string,
    students : Student[],
}

export enum PaymentType {
    CASH, CHECK, TRANSFER, DEPOSIT
}

export enum PaymentStatus {
    CREATED, VALIDATED, REJECTED
}