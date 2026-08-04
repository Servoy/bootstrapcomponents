import {Component, OnChanges, ChangeDetectionStrategy, SimpleChanges, ViewEncapsulation, inject, input, signal} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'svy-ngb-highlight',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `@for (part of parts; track $index) {
  ` +
  `@if ($odd) {
  <span [class]="highlightClass()" [innerHTML]="part"></span>
} @else {
  <span [innerHTML]="part"></span>
  }` +
  `
}`, // template needs to be formatted in a certain way so we don't add empty text nodes
    styleUrls: ['./highlight.scss'],
    standalone: false
})
/* eslint-enable @angular-eslint/component-selector */
export class SvyNgbHighlight implements OnChanges {
  parts!: (string | SafeHtml)[];

  private sanitizer = inject(DomSanitizer);

  readonly trusted = input(false);

  /**
   * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
   */
  readonly highlightClass = input('ngb-highlight');

  /**
   * The text highlighting is added to.
   *
   * If the `term` is found inside this text, it will be highlighted.
   * If the `term` contains array then all the items from it will be highlighted inside the text.
   */
  readonly result = input<string | null | undefined>(undefined);

  /**
   * The term or array of terms to be highlighted.
   * Since version `v4.2.0` term could be a `string[]`
   */
  readonly term = input<string | readonly string[] | undefined>(undefined);

  /**
   * Boolean option to determine if the highlighting should be sensitive to accents or not.
   *
   * This feature is only available for browsers that implement the `String.normalize` function
   * (typically not Internet Explorer).
   * If you want to use this feature in a browser that does not implement `String.normalize`,
   * you will have to include a polyfill in your application (`unorm` for example).
   *
   * @since 9.1.0
   */
  accentSensitive = signal(true);

  ngOnChanges(_changes: SimpleChanges) {
    const accentSensitive = this.accentSensitive();
    if (!accentSensitive && !String.prototype.normalize) {
      console.warn(
          'The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser ' +
          'that does not implement the `String.normalize` function. ' +
          'You will have to include a polyfill in your application to use this feature in the current browser.');
      this.accentSensitive.set(true);
    }
    const result = this.toString(this.result());

    const termValue = this.term();
    const terms = Array.isArray(termValue) ? termValue : [termValue];
    const prepareTerm = (term: any) => this.accentSensitive() ? term : this.removeAccents(term);
    const escapedTerms = terms.map(term => this.regExpEscape(prepareTerm(this.toString(term)))).filter(term => term);
    const toSplit = accentSensitive ? result : this.removeAccents(result);

    const parts = escapedTerms.length ? toSplit.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];

    let stringParts: string[];
    if (accentSensitive) {
      stringParts = parts;
    } else {
      let offset = 0;
      stringParts = parts.map(part => result.substring(offset, offset += part.length));
    }

    if (this.trusted()) {
      this.parts = stringParts.map(part => this.sanitizer.bypassSecurityTrustHtml(part));
    } else {
      this.parts = stringParts;
    }
  }
  
  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  
  regExpEscape(text : string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  
  toString(value: any): string {
     return (value !== undefined && value !== null) ? `${value}` : '';
  }
}