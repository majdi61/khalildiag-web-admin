import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {CategoriesElement} from "../category.module";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
    categoriesForm: FormGroup;
    alert: any;
    item: any;
    currentItemId: string;
    constructor(
        private CategoriesService: CategoriesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }


    initForm(item): void {
        this.categoriesForm = new FormGroup({
            label: new FormControl(item?.label,),
        });
    }




    isFormInEditMode(): boolean {
        return !!this.currentItemId;
    }

    onSubmit(): void {
        const formData = this.categoriesForm.value;
        console.log(formData);
        const objectToSubmit: CategoriesElement = {...this.item, ...this.categoriesForm.value};
        console.log(objectToSubmit);
        this.CategoriesService.postCategory(objectToSubmit).then(() => console.log(objectToSubmit));
        this.router.navigate(['./categories']);

    }

    ngOnInit(): void {

        this.currentItemId = this.activatedRoute.snapshot.params.id;
        if (!!this.currentItemId) {
            this.CategoriesService.getCategoryById(this.currentItemId).then((item) => {
                this.item = item;
                this.initForm(item);

            });
        } else {
            this.initForm(null);
        }
    }
}
