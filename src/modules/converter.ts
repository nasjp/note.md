import { Converter } from './markdown';
import { Header } from './header';
import { Bold } from './bold';
import { Blockquote } from './blockquote';
import { CodeBlock } from './codeblock';
import { Center } from './center';
import { Link } from './link';

export const getConverter = (
    element: Element,
    selection: Selection,
): Converter | null => {
  if (Bold.is(element)) {
    return new Bold(element, selection);
  }

  if (Header.is(element)) {
    return new Header(element, selection);
  }

  if (Blockquote.is(element)) {
    return new Blockquote(element, selection);
  }

  if (CodeBlock.is(element)) {
    return new CodeBlock(element, selection);
  }

  if (Center.is(element)) {
    return new Center(element, selection);
  }

  if (Link.is(element)) {
    return new Link(element, selection);
  }

  return null;
};
