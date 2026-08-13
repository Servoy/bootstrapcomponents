
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { ServoyBootstrapBasefield } from '../bts_basefield';
import { ServoyPublicModule } from '@servoy/public';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'bootstrapcomponents-textarea',
    templateUrl: './textarea.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ServoyPublicModule, FormsModule]
})
export class ServoyBootstrapTextarea extends ServoyBootstrapBasefield<HTMLTextAreaElement> {

    readonly maxLength = input<number | undefined>(undefined);
    _maxLength = signal<number | undefined>(undefined);

    svyOnInit() {
        super.svyOnInit();
        this._maxLength.set(this.maxLength());
        const maxLength = this.maxLength();
        if (!maxLength || maxLength === 0) {
            this._maxLength.set(524288);
        }
    }
    
    onModelChange(newValue: any) {
        this._dataProviderID.set(newValue);
        this.pushUpdate();
    }

}
