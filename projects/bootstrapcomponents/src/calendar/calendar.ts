import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ElementRef, ViewChild, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DateTime, Namespace, TempusDominus } from '@servoy/tempus-dominus';
import { Format, FormattingService } from '@servoy/public';
import { LoggerFactory, ServoyPublicService } from '@servoy/public';
import { ServoyBootstrapBaseCalendar } from './basecalendar';

@Component({
    selector: 'bootstrapcomponents-calendar',
    templateUrl: './calendar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServoyBootstrapCalendar extends ServoyBootstrapBaseCalendar {

    @ViewChild('inputElement') inputElementRef: ElementRef;

    @Input() format: Format;
    @Input() pickerOnly: boolean;

    private hasFocus = false;
    private isBlur = false;

    constructor(renderer: Renderer2,
        cdRef: ChangeDetectorRef,
        logFactory: LoggerFactory,
        private formattingService: FormattingService,
        servoyService: ServoyPublicService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef,servoyService, logFactory.getLogger('bts-calendar'), doc);
        this.config.hooks = {
            inputFormat: (date: DateTime) => formattingService.format(date, this.format, false),
            inputParse: (value: string) => {
                const parsed = this.formattingService.parse(value?value.trim():null, this.format, true, this.dataProviderID);
                if (parsed instanceof Date) return  new DateTime(parsed);
                return null;
            }
        };
    }


    attachFocusListeners(nativeElement: any) {
        super.attachFocusListeners(nativeElement);
        if (this.onFocusGainedMethodID) {
            this.renderer.listen(nativeElement, 'focus', () => this.checkOnFocus());
            this.picker.subscribe(Namespace.events.show, () => this.checkOnFocus());
        }

        if (this.onFocusLostMethodID) {
            this.renderer.listen(nativeElement, 'blur', () => this.checkOnBlur());
            this.picker.subscribe(Namespace.events.hide, () => this.checkOnBlur());
        }
    }

    svyOnChanges(changes: SimpleChanges) {
        if (changes.format) {
            const change = changes.format;
            if (change.currentValue) {
                if (change.currentValue.type === 'DATETIME' && change.currentValue.display) {
                    const format = change.currentValue.display;
                    const showCalendar = format.indexOf('y') >= 0 || format.indexOf('M') >= 0;
                    const showTime = format.indexOf('h') >= 0 || format.indexOf('H') >= 0 || format.indexOf('m') >= 0;
                    const showSecondsTimer = format.indexOf('s') >= 0;
                    this.config.display.components.useTwentyfourHour = !(format.indexOf('h') >= 0 || format.indexOf('a') >= 0 || format.indexOf('A') >= 0);
                    this.config.display.components.decades = showCalendar;
                    this.config.display.components.year = showCalendar;
                    this.config.display.components.month = showCalendar;
                    this.config.display.components.date = showCalendar;
                    this.config.display.components.hours = showTime;
                    this.config.display.components.minutes = showTime;
                    this.config.display.components.seconds = showTime;
                    this.config.display.components.seconds = showSecondsTimer;
                    if (this.picker !== null) this.picker.updateOptions(this.config);
                } else {
                    this.log.warn('wrong format or type given into the calendar field ' + JSON.stringify(change.currentValue));
                }
            }
        }
        if (changes.findmode)
            if (changes.findmode.currentValue) {
                this.picker.dispose();
                this.picker = null;
            } else {
                this.initializePicker();
            }
        super.svyOnChanges(changes);
    }

    public modelChange(event: any) {
        if (this.findmode) {
            this.dataProviderID = event;
            super.pushUpdate();
        }
    }

    public getNativeChild(): any {
        return this.inputElementRef.nativeElement;
    }

    getFocusElement(): any {
        return this.inputElementRef.nativeElement;
    }

    getStyleClassElement(): any {
        return this.inputElementRef.nativeElement;
    }

    initializePicker() {
        if (!this.picker) {
            let formatted = '';
            if (this.dataProviderID) {
                formatted = this.formattingService.format(this.dataProviderID, this.format, false);
            }
            this.renderer.setProperty(this.inputElementRef.nativeElement, 'value', formatted);
            this.picker = new TempusDominus(this.getNativeElement(), this.config);
            this.picker.subscribe(Namespace.events.change, (event) => this.dateChanged(event));
            if (this.onFocusGainedMethodID) {
                this.picker.subscribe(Namespace.events.show, () => this.checkOnFocus());
            }
            if (this.onFocusLostMethodID) {
                this.picker.subscribe(Namespace.events.hide, () => this.checkOnBlur());
            }
        }
    }

    private checkOnBlur() {
        this.isBlur = true;
        setTimeout(() => {
            if (this.hasFocus && this.isBlur && (this.doc.activeElement.parentElement !== this.getNativeElement())) {
                this.hasFocus = false;
                this.isBlur = false;
                this.onFocusLostMethodID(new CustomEvent('blur'));
            }
        });
    }

    private checkOnFocus() {
        this.isBlur = false;
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocusGainedMethodID(new CustomEvent('focus'));
        }
    }

}
