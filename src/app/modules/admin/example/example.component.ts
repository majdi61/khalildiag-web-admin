import { Component, ViewEncapsulation,OnInit } from '@angular/core';


@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent  {
    constructor() {
    }

    // on init the Dataservice getUsers() function supplies a user array object.
}
