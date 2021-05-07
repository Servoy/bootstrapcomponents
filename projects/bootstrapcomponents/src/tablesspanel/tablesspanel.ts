import { Component, ChangeDetectorRef, Renderer2, ContentChild, TemplateRef, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseComponent } from '../bts_basecomp';

@Component({
    selector: 'bootstrapcomponents-tablesspanel',
    templateUrl: './tablesspanel.html',
    styleUrls: ['./tablesspanel.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapTablesspanel extends ServoyBootstrapBaseComponent<HTMLDivElement> {

    @Input() containedForm: string;
    @Input() relationName: string;
    @Input() waitForData: any;
    @Input() height: number;

    @ContentChild(TemplateRef, { static: true })
    templateRef: TemplateRef<any>;

    private realContainedForm: any;
    private formWillShowCalled: any;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, private servoyPublic: ServoyPublicService) {
        super(renderer, cdRef);
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes) {
            for (const property of Object.keys(changes)) {
                const change = changes[property];
                switch (property) {
                    case 'containedForm': {
                        if (change.currentValue !== change.previousValue)
                            if (change.previousValue) {
                                this.formWillShowCalled = change.currentValue;
                                this.servoyApi.hideForm(change.previousValue, null, null, change.currentValue, this.relationName, null)
                                    .then(() => {
                                        this.realContainedForm = this.containedForm;
                                        this.cdRef.detectChanges();
                                    });
                            } else if (change.currentValue) {
                                this.setRealContainedForm(change.currentValue, this.relationName);
                            }
                        break;
                    }
                    case 'visible': {
                        if (this.containedForm && change.currentValue !== change.previousValue) {
                            this.formWillShowCalled = this.realContainedForm = undefined;
                            if (change.currentValue) {
                                this.setRealContainedForm(this.containedForm, this.relationName);
                            } else {
                                this.servoyApi.hideForm(this.containedForm);
                            }
                        }
                        break;
                    }
                }
            }
            super.svyOnChanges(changes);
        }
    }

    setRealContainedForm(formName: any, relationName: any) {
        if (this.formWillShowCalled !== formName && formName) {
            this.formWillShowCalled = formName;
            if (this.waitForData) {
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
        let style = { position: "relative" }
        let minHeight = 0;
        if (this.height) {
            minHeight = this.height
        }
        else if (this.containedForm) {
            // for absolute form default height is design height, for responsive form default height is 0
            const formCache = this.servoyPublic.getFormCacheByName(this.containedForm);
            if (formCache && formCache.absolute) {
                minHeight = formCache.size.height;
            }
        }
        if (minHeight > 0) {
            style['minHeight'] = minHeight + "px";
        }
        return style;
    }
}
