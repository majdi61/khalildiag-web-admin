import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../@fuse/services/confirmation";
import {PageEvent} from "@angular/material/paginator";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    productsDataSource: any [] = [];
    page: any;
    displayedColumns: string[] = ['ref', 'name','marque','model','category', 'action'];
    pageSizeOptions = [5, 10, 25, 100];
    constructor(private _activatedRoute: ActivatedRoute,
                private _fuseConfirmationService: FuseConfirmationService,
                private _router: Router,
                private productsService: ProductsService,
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
            this.fetchProductsDataSource();
        });
    }

    fetchProductsDataSource(): void {
        const queryParams: any = {
            page: this.getPageIndex(),
            size: this.getPageSize(),
            sort: 'uiid,desc',
        };
        console.log('queryParams: ', queryParams);
        this.productsService.getProductsList(queryParams).then((page) => {
            this.productsDataSource = page.content || [];
            this.page = page;
            console.log(this.productsDataSource);
        });
    }

    onDeleteProduct(id: string): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Places',
            message: 'Are you sure you want to delete this product? This action cannot be undone!',
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
                this.productsService.deleteProductById(id).then(() => this.fetchProductsDataSource());
            }
        });
    }

    ngOnInit(): void {

        this.fetchProductsDataSource();
    }
}
