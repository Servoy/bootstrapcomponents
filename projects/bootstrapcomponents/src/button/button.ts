import { Component, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { ServoyBootstrapBaseLabel } from '../bts_baselabel';

@Component( {
    selector: 'bootstrapcomponents-button',
    templateUrl: './button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
} )
export class ServoyBootstrapButton extends ServoyBootstrapBaseLabel<HTMLButtonElement> {

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if ( this.onDoubleClickMethodID ) {
            this.renderer.listen( this.elementRef.nativeElement, 'dblclick', ( e ) => {
                this.onDoubleClickMethodID( e );
            } );
        }
    }
}

