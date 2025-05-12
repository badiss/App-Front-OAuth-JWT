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

export interface Facture {
    idFacture : number,
    code : string,
    trimestre : string,
    montant : number,
    status : string,
    payment : Payment,
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

export enum INVOICE_STATUS {
    DONE = 'DONE',
    PENDING = 'PENDING'
  }

  export enum TrimestreType {
    T1 = "T1", T2 = "T2", T3 = "T3"
  }