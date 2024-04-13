import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PageEvent} from "@angular/material/paginator";
import {ModelesService} from "../modeles.service";

@Component({
  selector: 'app-modeles-list',
  templateUrl: './modeles-list.component.html',
  styleUrls: ['./modeles-list.component.scss']
})
export class ModelesListComponent implements OnInit {
    modelsDataSource: any [] = [];
    page: any;
    displayedColumns: string[] = ['id', 'name', 'action'];
    pageSizeOptions = [5, 10, 25, 100];
    constructor(private _activatedRoute: ActivatedRoute,
                private _fuseConfirmationService: FuseConfirmationService,
                private _router: Router,
                private modelService: ModelesService,
    ) {
    }

    getPageIndex(): number {
        return this._activatedRoute.snapshot.queryParams?.page ?? 0;
    }

    getPageSize(): number {
        return this._activatedRoute.snapshot.queryParams?.size ?? 100;
    }

    paginate(event: PageEvent | any): void {
        console.log(event);
        this._router.navigate([], {
            queryParams: {
                page: event.pageIndex,
                size: event.pageSize,
            },
            queryParamsHandling: 'merge',
        }).finally(() => {
            this.fetchModelsDataSource();
        });
    }

    fetchModelsDataSource(): void {
        const queryParams: any = {
            page: this.getPageIndex(),
            size: this.getPageSize(),
        };
        console.log('queryParams: ', queryParams);
        this.modelService.getModelsList(queryParams).then((page) => {
            this.modelsDataSource = page.content || [];
            this.page = page;
            console.log(this.modelsDataSource);
        });
    }

    onDeleteModel(id: string): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Places',
            message: 'Are you sure you want to delete this model? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                this.modelService.deleteModelById(id).then(() => this.fetchModelsDataSource());
            }
        });
    }

    ngOnInit(): void {

        this.fetchModelsDataSource();
    }
}
