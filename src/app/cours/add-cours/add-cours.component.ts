import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourService } from '../../servives/cour.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent implements OnInit{

  public coursFormGroup!: FormGroup;
  showProgress: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, 
    private courService: CourService, private router: Router) {

  }

  ngOnInit(): void {
    this.coursFormGroup = this.fb.group({
      titre: this.fb.control(''),
      date: this.fb.control(''),
      heure: this.fb.control(''),
      obligatoire: this.fb.control(''),
    });
    
  }

  saveCour() {
    this.showProgress = true;
    let date: Date = new Date(this.coursFormGroup.value.date);
    let formatDate: string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    // créer un objet FormData pour l'envoyer après comme param.
    let formData : FormData = new FormData();
    formData.set('titre', this.coursFormGroup.value.titre);
    formData.set('date', formatDate);
    formData.set('heure', this.coursFormGroup.value.heure);
    formData.set('obligatoire', this.coursFormGroup.value.obligatoire);
    this.courService.ajouterCour(formData).subscribe({
      next : value => {
        this.showProgress = false;
        alert('Cour saved Successfully');
        this.router.navigateByUrl('/admin/cours');
      },
      error : err => {
        console.log(err);
      }
    });
  }

}
