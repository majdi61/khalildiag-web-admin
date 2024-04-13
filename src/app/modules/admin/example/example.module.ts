import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FuseCardModule} from "../../../../@fuse/components/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        MatTabsModule,
        FuseCardModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ExampleModule
{
}
