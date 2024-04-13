import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {Route, RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: CategoryListComponent,
    },
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: CategoryFormComponent
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: CategoryFormComponent
    },
    {path: '**', redirectTo: ''},
];

export interface CategoriesElement {
    id: string;
    name: any;
    product: any
}
@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        RouterModule,
        MatPaginatorModule,
        FuseAlertModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class CategoryModule { }
