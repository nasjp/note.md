import { Converter } from './markdown';

export class Bold implements Converter {
  private static regexp = /\*\*(.+?)\*\*/g;
  private static sign = '**';
  private readonly text: string = '';
  private readonly matchStr: string = '';

  public static is(element: Element) {
    if (element.tagName !== 'P') {
      return false;
    }

    const text = element.textContent;

    const matches = text?.match(this.regexp);

    return matches ? matches?.length > 0 : false;
  }

  constructor(
    private element: Element,
    private selection: Selection,
  ) {
    this.text = this.element.innerHTML ?? '';

    const matches = this.text.match(Bold.regexp);

    if (matches !== null && matches.length > 0) {
      this.matchStr = matches[0];
    }
  }

  public convert() {
    this.element.innerHTML = this.innerHTML() ?? this.element.innerHTML;

    this.setPosition();
  }

  private innerHTML() {
    const text = this.text.replace(
        this.matchStr,
        this.matchStr.replace(Bold.sign, '').replace(Bold.sign, '').bold(),
    );

    const b = '</b>';

    const isBoldEnd = text.lastIndexOf(b) + b.length == text.length;

    // FIXME スペースをいれることで次の文字も太字になること防いでいる
    // スペースダサすぎるので修正したい
    return isBoldEnd ? text + ' ' : text;
  }

  private setPosition() {
    // FIXME 正確にカーソル位置を割り当てるように修正
    this.selection.collapse(
        this.element.lastChild,
        this.element.lastChild?.textContent?.length ?? 0,
    );
  }
}
