import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {Route, RouterModule} from "@angular/router";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";

const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent,
    },
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: ProductFormComponent
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: ProductFormComponent
    },
    {path: '**', redirectTo: ''},
];

export interface ProductElement {
    id: string;

}
@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        RouterModule,
        FuseAlertModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
    ]
})
export class ProductModule { }
