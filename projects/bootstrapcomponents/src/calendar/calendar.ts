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
        protected formattingService: FormattingService,
        servoyService: ServoyPublicService,
        @Inject(DOCUMENT) doc: Document) {
        super(renderer, cdRef,servoyService, logFactory.getLogger('bts-calendar'), doc);
        doc.addEventListener('keydown', (event) => {
    		if (doc.querySelector('.tempus-dominus-widget') && doc.querySelector('.tempus-dominus-widget').classList.contains('show')) {
        		const containerDays = doc.querySelector('.date-container-days') as HTMLElement;
        		const previousMonth = doc.querySelector('.previous') as HTMLElement;
        		const nextMonth = doc.querySelector('.next') as HTMLElement;
        		const datePicker = doc.querySelector('span[data-td-target="#datetimepicker1"]') as HTMLElement;
        		const clear = doc.querySelector('div[data-action="clear"]') as HTMLElement;
        		const days = [];
        		doc.querySelectorAll('div[data-action="selectDay"]').forEach((itm: HTMLElement) => days.push(itm));
        		const activeDay = days.filter((itm: HTMLElement) => itm.classList.contains('active'))[0];
        		const today = days.filter((itm: HTMLElement) => itm.classList.contains('today'))[0];
        		const day = activeDay || today;
        		const currentIndex = days.indexOf(day);
        		if (event.key === 'Escape') {
            		datePicker.click();
        		} else if (event.key === 'Delete') {
					clear.click();
				} else if (containerDays.style.display === 'grid') {
					if (currentIndex === -1) {
						days[0].click();
					} else if (event.key === 'ArrowLeft') {
						if (days[currentIndex - 1]) {
                    		days[currentIndex - 1].click();
                		} else {
                    		previousMonth.click();
                		}
            		} else if (event.key === 'ArrowRight') {
                		if (days[currentIndex + 1]) {
                    		days[currentIndex + 1].click();
                		} else {
                    		nextMonth.click();
                		}
            		} else if (event.key === 'ArrowUp') {
                		if (days[currentIndex - 7]) {
                    		days[currentIndex - 7].click();
                		} else {
                    		previousMonth.click();
                		}
            		} else if (event.key === 'ArrowDown') {
                		if (days[currentIndex + 7]) {
                    		days[currentIndex + 7].click();
                		} else {
                    		nextMonth.click();
                		}
            		}
        		}
    		}
		});
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
            this.picker = new TempusDominus(this.getNativeElement(), this.config);
            this.picker.dates.formatInput =  (date: DateTime) => date?this.formattingService.format(date, this.format, false):'';
            this.picker.dates.parseInput =  (value: string) => {
                const parsed = this.formattingService.parse(value?value.trim():null, this.format, true, this.dataProviderID);
                if (parsed instanceof Date && !isNaN(parsed.getTime())) return  new DateTime(parsed);
                return null;
            };
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
