'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'toggle-multi-cursor:toggle': () => this.toggle()
    }));

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace atom-text-editor:not([mini]).toggle-multi-cursor-marked', {
      'core:move-up': ev => atom.commands.dispatch(ev.target, 'multi-cursor:expandUp')
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    const editor = atom.views.getView(atom.workspace.getActiveTextEditor());
    editor.classList.toggle('toggle-multi-cursor-marked');
  }

};
