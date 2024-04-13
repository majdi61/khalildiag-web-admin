import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModelesService} from "../modeles.service";
import {ModelElement} from "../modeles.module";

@Component({
  selector: 'app-modeles-form',
  templateUrl: './modeles-form.component.html',
  styleUrls: ['./modeles-form.component.scss']
})
export class ModelesFormComponent implements OnInit {
    modelsForm: FormGroup;
    alert: any;
    item: any;
    currentItemId: string;
    constructor(
        private modelService: ModelesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }


    initForm(item): void {
        this.modelsForm = new FormGroup({
            label: new FormControl(item?.label,),
        });
    }




    isFormInEditMode(): boolean {
        return !!this.currentItemId;
    }

    onSubmit(): void {
        const formData = this.modelsForm.value;
        console.log(formData);
        const objectToSubmit: ModelElement = {...this.item, ...this.modelsForm.value};
        console.log(objectToSubmit);
        this.modelService.postModel(objectToSubmit).then(() => console.log(objectToSubmit));
        this.router.navigate(['./categories']);

    }

    ngOnInit(): void {

        this.currentItemId = this.activatedRoute.snapshot.params.id;
        if (!!this.currentItemId) {
            this.modelService.getModelById(this.currentItemId).then((item) => {
                this.item = item;
                this.initForm(item);

            });
        } else {
            this.initForm(null);
        }
    }
}
