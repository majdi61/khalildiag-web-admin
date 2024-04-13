import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarqueListComponent } from './marque-list/marque-list.component';
import { MarqueFormComponent } from './marque-form/marque-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {Route, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: MarqueListComponent,
    },
    {
        path: ':id/edit',
        pathMatch: 'full',
        component: MarqueFormComponent
    },
    {
        path: 'form',
        pathMatch: 'full',
        component: MarqueFormComponent
    },
    {path: '**', redirectTo: ''},
];

export interface MarquesElement {
    id: string;
    name: any;
    product: any
}
@NgModule({
  declarations: [
    MarqueListComponent,
    MarqueFormComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        RouterModule,
        FormsModule,
        FuseAlertModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class MarqueModule { }
