import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelesListComponent } from './modeles-list/modeles-list.component';
import { ModelesFormComponent } from './modeles-form/modeles-form.component';
import {Route, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: ModelesListComponent,
    },
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: ModelesFormComponent
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: ModelesFormComponent
    },
    {path: '**', redirectTo: ''},
];
export interface ModelElement {
    id: string;
    name: any;
    product: any
}
@NgModule({
  declarations: [
    ModelesListComponent,
    ModelesFormComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        FuseAlertModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class ModelesModule { }
