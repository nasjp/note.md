import { Converter } from './markdown';

export class CodeBlock implements Converter {
  private static prefix = '```';
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
    const codeBlock = this.createHeaderElement();
    this.element.replaceWith(codeBlock);
    this.setPosition(codeBlock);
  }

  private createHeaderElement(): Element {
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'p-textNoteCode';

    if (this.name !== '') {
      codeBlock.setAttribute('name', this.name);
    }

    codeBlock.innerHTML = this.codeBlockHTML();
    return codeBlock;
  }

  private setPosition(element: Element) {
    this.selection.collapse(
        element,
        this.adjust(),
    );
  }

  private codeBlockHTML() {
    const text = this.text.replace(CodeBlock.prefix, '');
    return `<code class="p-textNoteCode__main">${text}</code>`;
  }

  private adjust() {
    const offset = this.offset - CodeBlock.prefix.length;
    return offset < 0 ? 0 : offset;
  }
}
