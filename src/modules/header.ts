import { Converter } from './markdown';

export class Header implements Converter {
  private static prefix = '# ';
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
    const header = this.createHeaderElement();
    this.element.replaceWith(header);
    this.setPosition(header);
  }

  private createHeaderElement(): Element {
    const header = document.createElement('h3');
    if (this.name !== '') {
      header.setAttribute('name', name);
    }

    header.innerHTML = this.headerText();
    return header;
  }

  private setPosition(element: Element) {
    this.selection.setPosition(
        element,
        this.offset - Header.prefix.length,
    );
  }

  private headerText() {
    return this.text.replace(Header.prefix, '');
  }
}
