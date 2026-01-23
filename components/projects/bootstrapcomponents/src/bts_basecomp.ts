import { ServoyBaseComponent } from '@servoy/public';
import { Directive, Renderer2, SimpleChanges, ChangeDetectorRef, input, model } from '@angular/core';

@Directive()
// eslint-disable-next-line
export class ServoyBootstrapBaseComponent<T extends HTMLElement> extends ServoyBaseComponent<T> {

    readonly enabled = input<boolean>(undefined);
    readonly styleClass = input<string>(undefined);
    readonly variant = input<string[]>(undefined);
    readonly tabSeq = input<number>(undefined);
    readonly text = input<string>(undefined);
    toolTipText = model<string>(undefined);

    timeoutID: number;

    constructor(protected readonly renderer: Renderer2, protected cdRef: ChangeDetectorRef) {
        super(renderer, cdRef);
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                const styleClass = this.styleClass();
                switch (property) {
                    case 'enabled':
                        if (change.currentValue)
                            this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
                        else 
                            this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
                        break;
                    case 'variant':
                        const styleClasses = styleClass?styleClass.trim().split(' '):[];
                        if (change.previousValue){
                           change.previousValue.filter((element: string) => element !== '' && !styleClasses.includes(element))
                                .forEach((element: string) => this.renderer.removeClass(this.getStyleClassElement(), element));
                        }
                        if (change.currentValue) {
                            change.currentValue.filter((element: string) => element !== '').forEach((element: string) => this.renderer.addClass(this.getStyleClassElement(), element));
                        }
                        break;
                    case 'styleClass':
                        if (change.previousValue) {
                            const array = change.previousValue.trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.removeClass(this.getStyleClassElement(), element));
                        }
                        if (change.currentValue) {
                            const array = change.currentValue.trim().split(' ');
                            array.filter((element: string) => element !== '').forEach((element: string) => this.renderer.addClass(this.getStyleClassElement(), element));
                        }
                        break;
                }
            }
        }
        super.svyOnChanges(changes);
    }

    public getFocusElement(): HTMLElement {
        return this.getNativeElement();
    }

    public getStyleClassElement(): any {
        return this.getNativeElement();
    }

    public requestFocus(mustExecuteOnFocusGainedMethod: boolean) {
        this.getFocusElement().focus();
    }

    public getScrollX(): number {
        return this.getNativeElement().scrollLeft;
    }

    public getScrollY(): number {
        return this.getNativeElement().scrollTop;
    }

    public setScroll(x: number, y: number) {
        this.getNativeElement().scrollLeft = x;
        this.getNativeElement().scrollTop = y;
    }

    public needsScrollbarInformation(): boolean {
        return true;
    }
}
