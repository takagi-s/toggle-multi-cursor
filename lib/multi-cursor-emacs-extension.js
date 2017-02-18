'use babel';

import MultiCursorEmacsExtensionView from './multi-cursor-emacs-extension-view';
import { CompositeDisposable } from 'atom';

export default {

  multiCursorEmacsExtensionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.multiCursorEmacsExtensionView = new MultiCursorEmacsExtensionView(state.multiCursorEmacsExtensionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.multiCursorEmacsExtensionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'multi-cursor-emacs-extension:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.multiCursorEmacsExtensionView.destroy();
  },

  serialize() {
    return {
      multiCursorEmacsExtensionViewState: this.multiCursorEmacsExtensionView.serialize()
    };
  },

  toggle() {
    const editor = atom.views.getView(atom.workspace.getActiveTextEditor());
    alert(editor);
  }

};
