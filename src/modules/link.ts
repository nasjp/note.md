import { Converter } from './markdown';

export class Link implements Converter {
  private static regexp
    = /\[(.+?)\]\((https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+)\)/
  private readonly text: string = '';
  private readonly url: string = '';
  private readonly discription: string = '';

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

    const matches = this.text.match(Link.regexp);

    if (matches !== null && matches.length === 3) {
      this.discription = matches[1];
      this.url = matches[2];
    }
  }

  public convert() {
    this.element.innerHTML = this.innerHTML() ?? this.element.innerHTML;

    this.setPosition();
  }

  private innerHTML() {
    const anchor = document.createElement('a');
    anchor.href = this.url;
    anchor.target = '_blank';

    anchor.text = this.discription;

    return anchor.outerHTML;
  }

  private setPosition() {
    // FIXME 正確にカーソル位置を割り当てるように修正
    this.selection.collapse(
        this.element.lastChild,
        1,
    );
  }
}
