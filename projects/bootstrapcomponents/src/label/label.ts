import { ServoyBootstrapBaseLabel } from '../bts_baselabel';
import { Component, Input, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
    selector: 'bootstrapcomponents-label',
    templateUrl: './label.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapLabel extends ServoyBootstrapBaseLabel<HTMLSpanElement> {

    @Input() labelFor: string;
    @Input() styleClassExpression: string;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onDoubleClickMethodID) {
            this.renderer.listen(this.elementRef.nativeElement, 'dblclick', (e) => {
                this.onDoubleClickMethodID(e, this.getDataTarget(e));
            });
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'styleClassExpression':
                        if (change.previousValue) {
                            const array = change.previousValue.toString().trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.removeClass(this.getStyleClassElement(), element));
                        }
                        if (change.currentValue) {
                            const array = change.currentValue.toString().trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.addClass(this.getStyleClassElement(), element));
                        }
                        break;
                }
            }
        }
        super.svyOnChanges(changes);
    }
}
