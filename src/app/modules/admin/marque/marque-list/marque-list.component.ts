import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PageEvent} from "@angular/material/paginator";
import {MarqueService} from "../marque.service";

@Component({
  selector: 'app-marque-list',
  templateUrl: './marque-list.component.html',
  styleUrls: ['./marque-list.component.scss']
})
export class MarqueListComponent implements OnInit {
    marquesDataSource: any [] = [];
    page: any;
    displayedColumns: string[] = ['id', 'name', 'action'];
    pageSizeOptions = [5, 10, 25, 100];
    constructor(private _activatedRoute: ActivatedRoute,
                private _fuseConfirmationService: FuseConfirmationService,
                private _router: Router,
                private marqueService: MarqueService,
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
            this.fetchMarquesDataSource();
        });
    }

    fetchMarquesDataSource(): void {
        const queryParams: any = {
            page: this.getPageIndex(),
            size: this.getPageSize(),

        };
        console.log('queryParams: ', queryParams);
        this.marqueService.getMarquesList(queryParams).then((page) => {
            this.marquesDataSource = page.content || [];
            this.page = page;
            console.log(this.marquesDataSource);
        });
    }

    onDeleteMarque(id: string): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Places',
            message: 'Are you sure you want to delete this category? This action cannot be undone!',
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
                this.marqueService.deleteMarqueById(id).then(() => this.fetchMarquesDataSource());
            }
        });
    }

    ngOnInit(): void {

        this.fetchMarquesDataSource();
    }
}
