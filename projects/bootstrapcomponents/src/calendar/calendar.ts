import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, ElementRef, ViewChild, Input, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Inject, HostListener } from '@angular/core';
import { DateTime, Namespace, TempusDominus } from '@eonasdan/tempus-dominus';
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
    }

	@HostListener('keydown', ['$event'])
  	onKeyDown(event: KeyboardEvent) {
		const shortcuts = ['KeyT', 'KeyY', 'KeyB', 'KeyE', 'NumpadAdd', 'NumpadSubtract'];
        if (!this.picker) return;
    	if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			if (!this.picker.display.isVisible && event.key === 'ArrowDown') {
				this.picker.show();
			} else if (this.picker.display.isVisible) {
				event.preventDefault();
				this.dateChange(event.key);
			}
		} else if (event.key === 'Delete') {
			if (this.picker.display.isVisible) {
				this.picker.clear();
			}
		} else if (event.key === 'Escape' || event.key === 'Enter') {
			if (this.picker.display.isVisible) {
				this.picker.hide();
			}
		} else if(shortcuts.includes(event.code)) {
			let date = new Date();
			if (event.code === 'NumpadSubtract') {
				if (this.picker.dates.lastPicked) {
					date = new Date(this.picker.dates.lastPicked);
					date.setDate(date.getDate() - 1);
					this.updateDate(event, date);
				}
			} else if (event.code === 'NumpadAdd') {
				if (this.picker.dates.lastPicked) {
					date = new Date(this.picker.dates.lastPicked);
					date.setDate(date.getDate() + 1);
					this.updateDate(event, date);
				}
			} else if (!this.formatDateIsString() || this.inputElementRef.nativeElement.value === '') {
				if (event.code === 'KeyY') {
					date.setDate(date.getDate() - 1);
				} else if (event.code === 'KeyB') {
					date.setDate(1);
				} else if (event.code === 'KeyE') {
					const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
					date.setDate(lastDayOfMonth);
				} 
				this.updateDate(event, date);
			}	
		}
  	}

  	@HostListener('click', ['$event'])
  	onClick(event) {
		if (this.picker && this.picker.display.isVisible) {
			this.picker.display.widget.addEventListener('click', () => this.getFocusElement().focus());
		}
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
                    const showYear = format.indexOf('y') >= 0 || format.indexOf('Y') >= 0;
                    const showMonth = format.indexOf('M') >= 0;
                    const showDate = format.indexOf('d') >= 0 || format.indexOf('D') >= 0;
                    const showHour = format.indexOf('h') >= 0 || format.indexOf('H') >= 0;
                    const showMinute = format.indexOf('m') >= 0;
                    const showSecond = format.indexOf('s') >= 0 || format.indexOf('S') >= 0;
                    this.config.display.components.calendar = showYear || showMonth || showDate;
                    this.config.display.components.decades = showYear;
                    this.config.display.components.year = showYear;
                    this.config.display.components.month = showMonth;
                    this.config.display.components.date = showDate;
                    this.config.display.components.clock = showHour || showMinute || showSecond;
                    this.config.display.components.hours = showHour;
                    this.config.display.components.minutes = showMinute;
                    this.config.display.components.seconds = showSecond;
                    if (format.indexOf('a') >= 0 || format.indexOf('A') >= 0 || format.indexOf('am') >= 0 || format.indexOf('AM') >= 0) {
						this.config.localization.hourCycle = 'h12';
					} else if (format.indexOf('H') >= 0) {
						this.config.localization.hourCycle = 'h23';
					} else if (format.indexOf('h') >= 0) {
						this.config.localization.hourCycle = 'h12';
					}
                    if (this.picker) this.picker.updateOptions(this.config);
                } else {
                    this.log.warn('wrong format or type given into the calendar field ' + JSON.stringify(change.currentValue));
                }
            }
        }
        if (changes.findmode) {
            if (changes.findmode.currentValue) {
                this.picker.dispose();
                this.picker = null;
            } else {
                this.initializePicker();
            }
        }
        if (changes.pickerOnly) {
            // pickerOnly maps on the readonly flag so just set that boolean of the parent class
            this.editable = !this.pickerOnly;
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
            const currentValue = (this.inputElementRef.nativeElement as HTMLInputElement).value;
            (this.inputElementRef.nativeElement as HTMLInputElement).value='';
            this.picker = new TempusDominus(this.getNativeElement(), this.config);
            (this.inputElementRef.nativeElement as HTMLInputElement).value = currentValue;
            this.picker.dates.formatInput =  (date: DateTime) => date?this.formattingService.format(date, this.format, false):'';
            this.picker.dates.parseInput =  (value: string) => {
                const parsed = this.formattingService.parse(value?value.trim():null, this.format, true, this.dataProviderID, true);
                if (parsed instanceof Date && !isNaN(parsed.getTime())) return  DateTime.convert(parsed, null, this.config.localization);
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
    
    private updateDate(event: KeyboardEvent, date: Date) {
		this.picker.dates.setValue(DateTime.convert(date));
		event.preventDefault();
	}
    
    private formatDateIsString() {
		if (this.format) {
			if (this.format.edit) {
				const format = this.format.edit.toLowerCase();
				if (format.includes('mmm') || format.includes('mmmm') || format.includes('ddd') || format.includes('dddd')) {
					return true;
				}
			}
		}
		return false;
	}

	private dateChange(key: string) {
		const picker = document.querySelector('.tempus-dominus-widget.show:not(.inline)');
		if (picker) {
			const containerDays: HTMLElement = picker.querySelector('.date-container-days');
			const previousMonth: HTMLElement = picker.querySelector('.previous');
			const nextMonth: HTMLElement = picker.querySelector('.next');
        	const days = [];
        	picker.querySelectorAll('div[data-action="selectDay"]').forEach((itm: HTMLElement) => days.push(itm));
        	const activeDay = days.filter((itm: HTMLElement) => itm.classList.contains('active'))[0];
        	const today = days.filter((itm: HTMLElement) => itm.classList.contains('today'))[0];
        	const day = activeDay || today;
        	const currentIndex = days.indexOf(day);
        	if (containerDays.style.display === 'grid') {
				if (currentIndex === -1) {
					days[0].click();
				} else if (key === 'ArrowLeft') {
					if (days[currentIndex - 1]) {
                    	days[currentIndex - 1].click();
                	} else {
                    	previousMonth.click();
                	}
            	} else if (key === 'ArrowRight') {
                	if (days[currentIndex + 1]) {
                    	days[currentIndex + 1].click();
                	} else {
                    	nextMonth.click();
                	}
            	} else if (key === 'ArrowUp') {
                	if (days[currentIndex - 7]) {
                    	days[currentIndex - 7].click();
                	} else {
                    	previousMonth.click();
                	}
            	} else if (key === 'ArrowDown') {
                	if (days[currentIndex + 7]) {
                    	days[currentIndex + 7].click();
                	} else {
                    	nextMonth.click();
                	}
            	}
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
