'use strict';

const { getStories, getConfigureArgs, reset } = require('./index');

const { Gtk } = imports.gi;
Gtk.init(null);

const headerbar = new Gtk.HeaderBar();
headerbar.show_close_button = true;

const window = new Gtk.Window();
window.connect('destroy', () => Gtk.main_quit());
window.set_default_size(400, 400);
window.set_titlebar(headerbar);
window.title = 'gjs-storybook';
window.show_all();

function render() {
  reset();

  const [createContext, module] = getConfigureArgs();
  const context = createContext();
  console.log(context.keys())
  context.keys().forEach(m => context(m));

  if (module.hot) {
    module.hot.accept(context.id, () => {
      console.log('upd');
      render();
    });
  }

  reconcile(window, getStories());
}

render();

Gtk.main();

function reconcile(container, children) {
  const currChildren = container.get_children().filter(_ => !(_ instanceof Gtk.HeaderBar));

  for (const currChild of currChildren) {
    if (!children.includes(currChild)) {
      container.remove(currChild);
    }
  }

  for (const child of children) {
    if (!currChildren.includes(child)) {
      container.add(child);
    }
  }

  container.show_all(); // no update without it
}
