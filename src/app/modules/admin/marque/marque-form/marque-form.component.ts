import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MarqueService} from "../marque.service";
import {MarquesElement} from "../marque.module";

@Component({
  selector: 'app-marque-form',
  templateUrl: './marque-form.component.html',
  styleUrls: ['./marque-form.component.scss']
})
export class MarqueFormComponent implements OnInit {
    MarquesForm: FormGroup;
    alert: any;
    item: any;
    currentItemId: string;
    constructor(
        private marqueService: MarqueService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }


    initForm(item): void {
        this.MarquesForm = new FormGroup({
            label: new FormControl(item?.label,),
        });
    }




    isFormInEditMode(): boolean {
        return !!this.currentItemId;
    }

    onSubmit(): void {
        const formData = this.MarquesForm.value;
        console.log(formData);
        const objectToSubmit: MarquesElement = {...this.item, ...this.MarquesForm.value};
        console.log(objectToSubmit);
        this.marqueService.postMarque(objectToSubmit).then(() => console.log(objectToSubmit));
        this.router.navigate(['./marques']);

    }

    ngOnInit(): void {

        this.currentItemId = this.activatedRoute.snapshot.params.id;
        if (!!this.currentItemId) {
            this.marqueService.getMarqueById(this.currentItemId).then((item) => {
                this.item = item;
                this.initForm(item);

            });
        } else {
            this.initForm(null);
        }
    }
}
