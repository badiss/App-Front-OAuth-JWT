export interface Student {
    studentId : number,
    code : string,
    firstName : string,
    lastName : string,
    programId : string,
    photo : string,
    cours : Cours[]
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
    disabledCour : boolean
}

export interface AffectationStudentCoursDTO {
    coursIds : number[],
    studentId : string,

}


export enum PaymentType {
    CASH, CHECK, TRANSFER, DEPOSIT
}

export enum PaymentStatus {
    CREATED, VALIDATED, REJECTED
}
