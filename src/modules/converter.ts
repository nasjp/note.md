import { Converter } from './markdown';
import { Header } from './header';

export const getConverter = (
    element: Element,
    selection: Selection,
): Converter | null => {
  if (Header.is(element)) {
    return new Header(element, selection);
  }

  return null;
};
