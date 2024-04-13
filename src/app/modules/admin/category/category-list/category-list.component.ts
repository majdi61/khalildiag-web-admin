import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../categories.service";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    categoriesDataSource: any [] = [];
    page: any;
    displayedColumns: string[] = ['id', 'name', 'action'];
    pageSizeOptions = [5, 10, 25, 100];
    constructor(private _activatedRoute: ActivatedRoute,
                private _fuseConfirmationService: FuseConfirmationService,
                private _router: Router,
                private CategoriesService: CategoriesService,
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
            this.fetchCategoriesDataSource();
        });
    }

    fetchCategoriesDataSource(): void {
        const queryParams: any = {
            page: this.getPageIndex(),
            size: this.getPageSize(),
        };
        console.log('queryParams: ', queryParams);
        this.CategoriesService.getCategoriesList(queryParams).then((page) => {
            this.categoriesDataSource = page.content || [];
            this.page = page;
            console.log(this.categoriesDataSource);
        });
    }

    onDeletePlace(id: string): void {
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
                this.CategoriesService.deleteCategoryById(id).then(() => this.fetchCategoriesDataSource());
            }
        });
    }

    ngOnInit(): void {

        this.fetchCategoriesDataSource();
    }
}
