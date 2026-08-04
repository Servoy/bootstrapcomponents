import { Component, ChangeDetectorRef, TemplateRef, SimpleChanges, ChangeDetectionStrategy, input, contentChild, inject } from '@angular/core';
import { ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseComponent } from '../bts_basecomp';

@Component({
    selector: 'bootstrapcomponents-tablesspanel',
    templateUrl: './tablesspanel.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServoyBootstrapTablesspanel extends ServoyBootstrapBaseComponent<HTMLDivElement> {

    readonly containedForm = input<string | undefined>(undefined);
    readonly relationName = input<string | undefined>(undefined);
    readonly waitForData = input<any>(undefined);
    readonly height = input<number | undefined>(undefined);

    readonly templateRef = contentChild(TemplateRef);

    private realContainedForm: any;
    private formWillShowCalled: any;

    private readonly servoyPublic = inject(ServoyPublicService);
    protected readonly cdRef = inject(ChangeDetectorRef);

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'containedForm': {
                        if (change.currentValue !== change.previousValue)
                            if (change.previousValue) {
                                this.formWillShowCalled = change.currentValue;
                                this.servoyApi.hideForm(change.previousValue, undefined, undefined, change.currentValue, this.relationName(), undefined)
                                    .then(() => {
                                        this.realContainedForm = this.containedForm();
                                        this.cdRef.detectChanges();
                                    });
                            } else if (change.currentValue) {
                                this.setRealContainedForm(change.currentValue, this.relationName());
                            }
                        break;
                    }
                    case 'visible': {
                        const containedForm = this.containedForm();
                        if (containedForm && change.currentValue !== change.previousValue) {
                            this.formWillShowCalled = this.realContainedForm = undefined;
                            if (change.currentValue) {
                                this.setRealContainedForm(containedForm, this.relationName());
                            } else {
                                this.servoyApi.hideForm(containedForm);
                            }
                        }
                        break;
                    }
                }
            }
            super.svyOnChanges(changes);
        }
    }

    svyOnInit(): void {
        super.svyOnInit();
        if (this.servoyApi.isInDesigner() && !this.containedForm()) {
            this.getNativeElement().innerText = 'Select contained form';
        }
    }

    setRealContainedForm(formName: any, relationName: any) {
        if (this.formWillShowCalled !== formName && formName) {
            this.formWillShowCalled = formName;
            if (this.waitForData()) {
                this.servoyApi.formWillShow(formName, relationName).then(() => {
                    this.realContainedForm = formName;
                    this.cdRef.detectChanges();
                });
            } else {
                this.servoyApi.formWillShow(formName, relationName).then(() => this.cdRef.detectChanges());
                this.realContainedForm = formName;
            }
        }
    }

    getForm() {
        return this.realContainedForm;
    }

    getContainerStyle() {
        const style: any = { position: 'relative' }
        let minHeight = 0;
        const containedForm = this.containedForm();
        const height = this.height();
        if (height) {
            minHeight = height
        } else if (containedForm) {
            // for absolute form default height is design height, for responsive form default height is 0
            const formCache = this.servoyPublic.getFormCacheByName(containedForm);
            if (formCache && formCache.absolute) {
                minHeight = formCache.size.height;
            }
        }
        if (minHeight > 0) {
            style['minHeight'] = minHeight + 'px';
        }
        return style;
    }
}
