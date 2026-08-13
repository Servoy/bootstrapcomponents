import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ServoyBootstrapBaseLabel } from '../bts_baselabel';
import { ServoyPublicModule } from '@servoy/public';

@Component( {
    selector: 'bootstrapcomponents-button',
    templateUrl: './button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule]
} )
export class ServoyBootstrapButton extends ServoyBootstrapBaseLabel<HTMLButtonElement> {

    svyOnInit() {
        super.svyOnInit();
        if ( this.onDoubleClickMethodID() ) {
            this.renderer.listen( this.elementRef()!.nativeElement, 'dblclick', ( e ) => {
                this.onDoubleClickMethodID()!( e );
            } );
        }
    }
}

