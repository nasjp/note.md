import { Converter } from './markdown';

export class Center implements Converter {
  private static prefix = '>> ';
  private readonly text: string = '';
  private readonly name: string = '';
  private readonly offset: number;

  public static is(element: Element) {
    const text = element.textContent;

    return text ? text.startsWith(this.prefix) : false;
  }

  constructor(
    private element: Element,
    private selection: Selection,
  ) {
    this.text = this.element.textContent ?? '';

    this.name = this.element.getAttribute('name') ?? '';

    const range = selection.getRangeAt(0);
    this.offset = range.collapsed ? range.startOffset : 0;
  }

  public convert() {
    const center = this.createHeaderElement();
    this.element.replaceWith(center);
    this.setPosition(center);
  }

  private createHeaderElement(): Element {
    const center = document.createElement('p');
    if (this.name !== '') {
      center.setAttribute('name', this.name);
    }

    center.style.textAlign = 'center';

    center.innerHTML = this.centerText();
    return center;
  }

  private setPosition(element: Element) {
    this.selection.collapse(
        element,
        this.adjust(),
    );
  }

  private centerText() {
    return this.text.replace(Center.prefix, '');
  }

  private adjust() {
    const offset = this.offset - Center.prefix.length;
    return offset < 0 ? 0 : offset;
  }
}
