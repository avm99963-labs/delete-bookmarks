function removeTreeOrRecurse(tree) {
  chrome.bookmarks.removeTree(tree.id).catch(() => {
    return Promise.all(tree?.children?.map?.(tree => removeTreeOrRecurse(tree)));
  });
}

function deleteAllBookmarks() {
  chrome.bookmarks.getTree().then(results => {
    return Promise.all(
        results.map(tree => removeTreeOrRecurse(tree)));
  }).then(results => {
    document.getElementById('page-performing-action').style.display = 'none';
    document.getElementById('page-done').style.display = 'block';
  }).catch(err => {
    console.error(err);
  });
}

window.addEventListener('load', () => {
  document.getElementById('do').addEventListener('click', () => {
    let pass = document.getElementById('pass').value;
    let passError = document.getElementById('pass-error');
    if (pass != 'Quiero eliminar todos los marcadores') {
      passError.style.display = 'block';
      return;
    }

    passError.style.display = 'none';
    document.getElementById('page-introduction').style.display = 'none';
    document.getElementById('page-performing-action').style.display = 'block';

    deleteAllBookmarks();
  });
});
