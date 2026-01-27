import { Component, Renderer2, Pipe, PipeTransform, ChangeDetectorRef, ChangeDetectionStrategy, input } from '@angular/core';
import { ServoyBootstrapBaseLabel } from '../bts_baselabel';

@Component({
    selector: 'bootstrapcomponents-datalabel',
    templateUrl: './datalabel.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapDatalabel extends ServoyBootstrapBaseLabel<HTMLSpanElement> {

    readonly dataProviderID = input(undefined);
    readonly styleClassExpression = input(undefined);
    readonly valuelistID = input(undefined);
    readonly format = input(undefined);

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onDoubleClickMethodID()) {
            this.renderer.listen(this.elementRef.nativeElement, 'dblclick', (e) => {
                if(this.enabled()) this.onDoubleClickMethodID()(e, this.getDataTarget(e));
            });
        }
    }

}

@Pipe( {
    name: 'designFilter',
    standalone: false
} )
export class DesignTextPipe implements PipeTransform {
    constructor( ) {
    }

    transform( input: string, inDesigner: boolean ): any {
        if ( inDesigner ) {
            return 'DataLabel';
        }
        return input;
    }
}
