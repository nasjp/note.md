import { Converter } from './markdown';

export class Blockquote implements Converter {
  private static prefix = '> ';
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
    const blockquote = this.createHeaderElement();
    this.element.replaceWith(blockquote);
    this.setPosition(blockquote);
  }

  private createHeaderElement(): Element {
    const blockquote = document.createElement('blockquote');
    if (this.name !== '') {
      blockquote.setAttribute('name', this.name);
    }

    blockquote.innerHTML = this.blockquoteText();
    return blockquote;
  }

  private setPosition(element: Element) {
    this.selection.collapse(
        element,
        this.adjust(),
    );
  }

  private blockquoteText() {
    return this.text.replace(Blockquote.prefix, '');
  }

  private adjust() {
    const offset = this.offset - Blockquote.prefix.length;
    return offset < 0 ? 0 : offset;
  }
}
