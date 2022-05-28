function detachStylesheets() {
  Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach(
    (style: any) => {
      style.remove();
    },
  );
}

function insertStylesheet(name) {
  const link = document.createElement('link');
  link.href = '/css/' + name + '.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].append(link);
}
export function toggleTheme(name) {
  detachStylesheets();
  insertStylesheet(name);
}
