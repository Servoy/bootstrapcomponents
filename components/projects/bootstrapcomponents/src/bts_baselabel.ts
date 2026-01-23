import { ServoyBootstrapBaseComponent } from './bts_basecomp';
import { Renderer2, Directive, ChangeDetectorRef, input } from '@angular/core';

@Directive()
// eslint-disable-next-line
export class ServoyBootstrapBaseLabel<T extends HTMLElement> extends ServoyBootstrapBaseComponent<T> {

    readonly onActionMethodID = input<(e: Event, data?: any) => void>(undefined);
    readonly onRightClickMethodID = input<(e: Event, data?: any) => void>(undefined);
    readonly onDoubleClickMethodID = input<(e: Event, data?: any) => void>(undefined);

    readonly imageStyleClass = input<string>(undefined);
    readonly trailingImageStyleClass = input<string>(undefined);
    readonly showAs = input<string>(undefined);

    constructor(renderer: Renderer2, protected cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnInit() {
        super.svyOnInit();
        if (this.onActionMethodID()) {
            if (this.onDoubleClickMethodID()) {
                this.renderer.listen(this.getFocusElement(), 'click', e => {
                    if(this.enabled()) {
                        if (this.timeoutID) {
                            window.clearTimeout(this.timeoutID);
                            this.timeoutID = null;
                            // double click, do nothing will be done in sub classes
                        } else {
                            this.timeoutID = window.setTimeout(() => {
                                this.timeoutID = null;
                                this.onActionMethodID()(e, this.getDataTarget(e));
                            }, 250);
                        }
                    }
                });
            } else {
                    this.renderer.listen(this.getFocusElement(), 'click', e => {
                        if(this.enabled()) this.onActionMethodID()(e, this.getDataTarget(e));
                    });
            }
        }
        if (this.onRightClickMethodID()) {
            this.renderer.listen(this.getFocusElement(), 'contextmenu', e => {
                if(this.enabled()) this.onRightClickMethodID()(e, this.getDataTarget(e));
                return false;
            });
        }
    }

    isTrustedHTML(): boolean {
        if (this.servoyApi.trustAsHtml() || this.showAs() === 'trusted_html') {
            return true;
        }
        return false;
    }

    protected getDataTarget(event): any {
        const dataTarget = event.target.closest('[data-target]');
        if (dataTarget) {
            return dataTarget.getAttribute('data-target');
        }
        return null;
    }
}
