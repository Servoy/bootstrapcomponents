import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectorRef, Renderer2, Input, ChangeDetectionStrategy, Inject, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Format, FormatDirective, WindowRefService } from '@servoy/public';
import { ServoyBootstrapBasefield } from '../bts_basefield';

@Component({
    selector: 'bootstrapcomponents-textbox',
    templateUrl: './textbox.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapTextbox extends ServoyBootstrapBasefield<HTMLInputElement> {

    @Input() format: Format;
    @Input() inputType: string;
    @Input() autocomplete: string;
    @Input() styleClassForEye: string;

    @Output() inputTypeChange = new EventEmitter();

    @ViewChild(FormatDirective) svyFormat: FormatDirective;

    showPass = false;

    constructor(renderer: Renderer2, cdRef: ChangeDetectorRef, @Inject(DOCUMENT) doc: Document, protected windowService: WindowRefService) {
        super(renderer, cdRef, doc);
    }

    svyOnInit() {
        super.svyOnInit();
        if(this.autocomplete === 'off') {
            this.autocomplete = this.windowService.nativeWindow.navigator.userAgent.match(/chrome/i) ? 'chrome-off' : 'off';
        }
        if (this.onActionMethodID) {
            this.renderer.listen(this.getFocusElement(), 'click', e => {
                if (this.editable === false) {
                    this.onActionMethodID(e);
                }
            });
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        super.svyOnChanges(changes);
        if (changes.inputType) {
            this.setInputType(this.inputType);
        }
    }

    onModelChange(newValue) {
        // if format or invalid date, force dataprovider display with formated value / invalid date text
        if(this.format || (newValue && typeof newValue.getTime === 'function' && isNaN(newValue.getTime()))) {
            this.svyFormat.writeValue(newValue);
        } 
        this.dataProviderID = newValue;
    }

    setInputType(inputType: string) {
        const types = ['text', 'password', 'password-with-eye', 'email', 'tel', 'date', 'time', 'datetime-local', 'month', 'week', 'number', 'color','search', 'url'];

        if (types.indexOf(inputType) > -1) {
			if (this.inputType !== inputType) {
            	this.inputType = inputType;
                this.inputTypeChange.emit(this.inputType);
            }
            const dp = this.dataProviderID;
            if (dp) {
                this.svyFormat.writeValue(dp);
            }
            return true;
        } else {
            return false;
        }
    }

    showHidePass() {
	    this.showPass = !this.showPass;
    }

    addClassForEye() {
		let mainClass: string; let openClass: string; let closeClass: string;
		if (this.styleClassForEye) {
			const classes = this.styleClassForEye.split(' ');
			if (classes.length === 3) {
				[mainClass, openClass, closeClass]  = classes;
			} else if (classes.length === 2) {
				mainClass = '';
				[openClass, closeClass]  = classes;
			} else {
				return '';
			}
		} else {
			[mainClass, openClass, closeClass] = ['fa', 'fa-eye', 'fa-eye-slash'];
		}

		if (this.showPass) {
			return mainClass + ' ' + openClass;
		}
		return mainClass + ' ' + closeClass;
	}
}
