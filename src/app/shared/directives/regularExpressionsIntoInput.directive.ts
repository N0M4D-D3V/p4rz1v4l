import { Directive, HostListener, ElementRef, Input } from "@angular/core";
import { RegularExpression } from "@dictionary/regular-expression/regular-expression.dictionary";
import { SpecialKeysInterface } from "@interfaces/special-key.interface";

@Directive({
  selector:
    "[regexInput]" /* Solo caracteres permitidos por la expresión regular seleccionada (dentro de un input/textarea) */,
})
export class RegularExpressionDirective {
  @Input() public regexName: string;
  private specialKeys: Array<string> = SpecialKeysInterface;

  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    let regex: RegExp;
    switch (this.regexName) {
      case "onlyNumbers":
        regex = new RegExp(RegularExpression?.onlyNumbers);
        break;
      case "onlyNumbersAndTwoDecimals":
        regex = new RegExp(RegularExpression?.onlyNumbersAndTwoDecimals);
        break;
      case "onlyNumbersAndLetters":
        regex = new RegExp(RegularExpression?.onlyNumbersAndLetters);
        break;
      case "onlyNumbersAndLettersHypenAndSlash":
        regex = new RegExp(
          RegularExpression?.onlyNumbersAndLettersHypenAndSlash
        );
        break;
      case "onlyNumbersAndLettersUppercase":
        regex = new RegExp(RegularExpression?.onlyNumbersAndLettersUppercase);
        break;
      default:
        regex = new RegExp(RegularExpression?.onlyNumbersAndLetters);
    }

    if (this.specialKeys?.indexOf(event?.key) !== -1) {
      return;
    }
    const current: string = this.el?.nativeElement?.value;
    const next: string = current?.concat(event?.key);
    if (next && !String(next).match(regex)) {
      event?.preventDefault();
    }
  }
}
