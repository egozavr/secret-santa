import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  errMsg: string | null = '';
  chosen: number | null = null;
  presents: boolean[] = [];
  skipCtrl = new FormControl(null, Validators.pattern(/^\d+$/));

  @ViewChild('skipInput', { static: false })
  private skipInput: ElementRef | null = null;

  onPresentsQtyInput(qty: number) {
    this.errMsg = null;
    if (qty < 5 || qty > 50) {
      this.errMsg = 'Не, столько подарков быть не может 🤷‍♂️';
      return;
    }
    this.presents = Array.from({ length: qty }, () => false);
  }

  onSkipNumInput() {
    this.errMsg = null;

    if (this.leftPresentsQty() === 0) {
      this.errMsg = 'Все подарки уже разыграны! С наступающим 😉';
      return;
    }

    if (this.skipCtrl.invalid) {
      return;
    }

    const rawVal: string = this.skipCtrl.value;
    const toSkip = parseInt(rawVal, 10);
    if (
      typeof toSkip !== 'number' ||
      toSkip < 0 ||
      toSkip >= this.presents.length
    ) {
      this.errMsg = 'Подарка с таким номером нет 🤷‍♂️';
      return;
    }

    this.skipCtrl.disable();

    const toChooseNums: number[] = this.presents
      .map((v, i) => (v === false && i !== toSkip ? i : -1))
      .filter((num) => num !== -1);

    const chosenIndex = Math.floor(Math.random() * toChooseNums.length);
    const chosen = toChooseNums[chosenIndex];

    this.presents[chosen] = true;
    this.chosen = chosen;
    this.skipCtrl.reset();
  }

  onNextClick() {
    this.chosen = null;
    this.skipCtrl.enable();
    const inputEl: HTMLInputElement = this.skipInput?.nativeElement;
    if (inputEl && inputEl.focus) {
      inputEl.focus();
    }
  }

  private leftPresentsQty(): number {
    return this.presents.reduce((p, c) => (c === false ? p + 1 : p), 0);
  }
}
