import { getConverter } from './modules/converter';

window.onload = function() {
  const body = document.getElementById('note-body');
  if (body == null) {
    return;
  }

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      const child = Array.from(body.children).find((child) => {
        return child.isEqualNode(record.target.parentNode);
      });

      if (!child) {
        return;
      }

      const selection = window.getSelection();
      if (selection === null) {
        return;
      }

      const converter = getConverter(child, selection);

      if (converter === null) {
        return;
      }

      converter.convert();
    });
  });

  observer.observe(body, {
    characterData: true,
    subtree: true,
  });
};
