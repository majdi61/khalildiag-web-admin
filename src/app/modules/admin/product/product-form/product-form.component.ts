import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductElement} from "../product.module";
import {ModelesService} from "../../modeles/modeles.service";
import {CategoriesService} from "../../category/categories.service";
import {MarqueService} from "../../marque/marque.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    productForm: FormGroup;
    alert: any;
    item: any;
    currentItemId: string;
    data: FormArray;
    modelsDataSource: any;
    categoriesDataSource: any;
    marquesDataSource: any;
    constructor(
        private productsService: ProductsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modelService: ModelesService,
        private CategoriesService: CategoriesService,
        private marqueService: MarqueService,
    ) {
    }


    initForm(item): void {
        this.productForm = new FormGroup({
            label: new FormControl(item?.label,),
            boiteVitesse: new FormControl(item?.boiteVitesse,),
            denomination: new FormControl(item?.denomination,),
            carburant: new FormControl(item?.carburant,),
            cylindre: new FormControl(item?.cylindre,),
            description: new FormControl(item?.description,),
            etat: new FormControl(item?.etat,),
            ref: new FormControl(item?.ref,),
            puissance: new FormControl(item?.puissance,),
            imgUrlList: new FormArray([]),
            marque: new FormGroup({
                id: new FormControl(item?.marque?.id),
                label: new FormControl(item?.marque?.label),
            }),
            model: new FormGroup({
                id: new FormControl(item?.model?.id),
                label: new FormControl(item?.model?.label),
            }),
            category: new FormGroup({
                id: new FormControl(item?.category?.id),
                label: new FormControl(item?.category?.label),
            }),

        });
    }
    fetchMarquesDataSource(): void {
        const queryParams: any = {
            page: 0,
            size:220,

        };
        console.log('queryParams: ', queryParams);
        this.marqueService.getMarquesList(queryParams).then((page) => {
            this.marquesDataSource = page.content || [];
            console.log(this.marquesDataSource);
        });
    }
    fetchCategoriesDataSource(): void {
        const queryParams: any = {
            page: 0,
            size:220,
        };
        console.log('queryParams: ', queryParams);
        this.CategoriesService.getCategoriesList(queryParams).then((page) => {
            this.categoriesDataSource = page.content || [];
            console.log(this.categoriesDataSource);
        });
    }
    fetchModelsDataSource(): void {
        const queryParams: any = {
            page: 0,
            size:220,
        };
        console.log('queryParams: ', queryParams);
        this.modelService.getModelsList(queryParams).then((page) => {
            this.modelsDataSource = page.content || [];
            console.log(this.modelsDataSource);
        });
    }
    createDataItem(item): any {
        if (item?.imgUrlList?.length > 0) {
            const formArray = new FormArray([]);
            item.imgUrlList.forEach((photos) => {
                formArray.push(new FormGroup({
                    path: new FormControl(photos.path ),
                }));
            });
            return formArray;
        } else {
            return new FormGroup({
                path: new FormControl(item?.imgUrlList?.value),
            });
        }
    }

    dataArray(): FormArray {
        return this.productForm.get('imgUrlList') as FormArray;
    }

    addDataItem(): void {
        this.dataArray().push(this.createDataItem(null));
    }

    removeDataItem(i: number): void {
        const remove = this.productForm.get('imgUrlList') as FormArray;
        remove.removeAt(i);
    }

    isFormInEditMode(): boolean {
        return !!this.currentItemId;
    }

    onSubmit(): void {
        const formData = this.productForm.value;
        console.log(formData);
        const objectToSubmit: ProductElement = {...this.item, ...this.productForm.value};
        console.log(objectToSubmit);
        this.productsService.postProduct(objectToSubmit).then(() => console.log(objectToSubmit));
        this.router.navigate(['./products']);

    }
    ngOnInit(): void {

        this.currentItemId = this.activatedRoute.snapshot.params.id;
        this.fetchCategoriesDataSource()
        this.fetchModelsDataSource()
        this.fetchMarquesDataSource()
        if (!!this.currentItemId) {
            this.productsService.getProductById(this.currentItemId).then((item) => {
                this.item = item;
                this.initForm(item);
                if (item?.imgUrlList?.length > 0) {
                    this.productForm.setControl('imgUrlList', this.createDataItem(item));
                }

            });
        } else {
            this.initForm(null);

        }



    }
}
