import { Component, Pipe, PipeTransform, ChangeDetectionStrategy, input, computed, forwardRef } from '@angular/core';
import { ServoyBootstrapBaseLabel } from '../bts_baselabel';
import { ServoyPublicModule } from '@servoy/public';

@Component({
    selector: 'bootstrapcomponents-datalabel',
    templateUrl: './datalabel.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, forwardRef(() => DesignTextPipe)]
})
export class ServoyBootstrapDatalabel extends ServoyBootstrapBaseLabel<HTMLSpanElement> {

    readonly dataProviderID = input(undefined);
    readonly styleClassExpression = input(undefined);
    readonly valuelistID = input(undefined);
    readonly format = input(undefined);

    readonly combinedStyleClass = computed(() => {
        const sc = this.styleClass() || '';
        const sce = this.styleClassExpression() ? this.styleClassExpression() + '' : '';
        return (sc + ' ' + sce).trim();
    });

    svyOnInit() {
        super.svyOnInit();
        if (this.onDoubleClickMethodID()) {
            this.renderer.listen(this.elementRef()!.nativeElement, 'dblclick', (e) => {
                if(this.enabled()) this.onDoubleClickMethodID()!(e, this.getDataTarget(e));
            });
        }
    }

}

@Pipe( {
    name: 'designFilter',
    standalone: true
} )
export class DesignTextPipe implements PipeTransform {
    constructor( ) {
        // intentionally empty
    }

    transform( input: string, inDesigner: boolean ): any {
        if ( inDesigner ) {
            return 'DataLabel';
        }
        return input;
    }
}
