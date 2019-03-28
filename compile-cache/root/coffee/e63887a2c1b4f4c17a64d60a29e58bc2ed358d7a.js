(function() {
  var $, CompositeDisposable, PlatformIOTerminalView, StatusBar, StatusIcon, View, os, path, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  ref = require('atom-space-pen-views'), $ = ref.$, View = ref.View;

  PlatformIOTerminalView = require('./view');

  StatusIcon = require('./status-icon');

  os = require('os');

  path = require('path');

  module.exports = StatusBar = (function(superClass) {
    extend(StatusBar, superClass);

    function StatusBar() {
      this.moveTerminalView = bind(this.moveTerminalView, this);
      this.onDropTabBar = bind(this.onDropTabBar, this);
      this.onDrop = bind(this.onDrop, this);
      this.onDragOver = bind(this.onDragOver, this);
      this.onDragEnd = bind(this.onDragEnd, this);
      this.onDragLeave = bind(this.onDragLeave, this);
      this.onDragStart = bind(this.onDragStart, this);
      this.closeAll = bind(this.closeAll, this);
      return StatusBar.__super__.constructor.apply(this, arguments);
    }

    StatusBar.prototype.terminalViews = [];

    StatusBar.prototype.activeTerminal = null;

    StatusBar.prototype.returnFocus = null;

    StatusBar.content = function() {
      return this.div({
        "class": 'vk-terminal status-bar',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.i({
            "class": "icon icon-plus",
            click: 'newTerminalView',
            outlet: 'plusBtn'
          });
          _this.ul({
            "class": "list-inline status-container",
            tabindex: '-1',
            outlet: 'statusContainer',
            is: 'space-pen-ul'
          });
          return _this.i({
            "class": "icon icon-x",
            click: 'closeAll',
            outlet: 'closeBtn'
          });
        };
      })(this));
    };

    StatusBar.prototype.initialize = function(statusBarProvider) {
      var handleBlur, handleFocus;
      this.statusBarProvider = statusBarProvider;
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'vk-terminal:focus': (function(_this) {
          return function() {
            return _this.focusTerminal();
          };
        })(this),
        'vk-terminal:new': (function(_this) {
          return function() {
            return _this.newTerminalView();
          };
        })(this),
        'vk-terminal:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this),
        'vk-terminal:next': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activeNextTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'vk-terminal:prev': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activePrevTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'vk-terminal:close': (function(_this) {
          return function() {
            return _this.destroyActiveTerm();
          };
        })(this),
        'vk-terminal:close-all': (function(_this) {
          return function() {
            return _this.closeAll();
          };
        })(this),
        'vk-terminal:rename': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.rename();
            });
          };
        })(this),
        'vk-terminal:insert-selected-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection('$S');
            });
          };
        })(this),
        'vk-terminal:insert-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.inputDialog();
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-1': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText1'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-2': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText2'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-3': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText3'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-4': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText4'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-5': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText5'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-6': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText6'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-7': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText7'));
            });
          };
        })(this),
        'vk-terminal:insert-custom-text-8': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('vk-terminal.customTexts.customText8'));
            });
          };
        })(this),
        'vk-terminal:fullscreen': (function(_this) {
          return function() {
            return _this.activeTerminal.maximize();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.xterm', {
        'vk-terminal:paste': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.paste();
            });
          };
        })(this),
        'vk-terminal:copy': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.copy();
            });
          };
        })(this)
      }));
      this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(item) {
          var mapping, nextTerminal, prevTerminal;
          if (item == null) {
            return;
          }
          if (item.constructor.name === "PlatformIOTerminalView") {
            return setTimeout(item.focus, 100);
          } else if (item.constructor.name === "TextEditor") {
            mapping = atom.config.get('vk-terminal.core.mapTerminalsTo');
            if (mapping === 'None') {
              return;
            }
            switch (mapping) {
              case 'File':
                nextTerminal = _this.getTerminalById(item.getPath(), function(view) {
                  return view.getId().filePath;
                });
                break;
              case 'Folder':
                nextTerminal = _this.getTerminalById(path.dirname(item.getPath()), function(view) {
                  return view.getId().folderPath;
                });
            }
            prevTerminal = _this.getActiveTerminalView();
            if (prevTerminal !== nextTerminal) {
              if (nextTerminal == null) {
                if (item.getTitle() !== 'untitled') {
                  if (atom.config.get('vk-terminal.core.mapTerminalsToAutoOpen')) {
                    return nextTerminal = _this.createTerminalView();
                  }
                }
              } else {
                _this.setActiveTerminalView(nextTerminal);
                if (prevTerminal != null ? prevTerminal.panel.isVisible() : void 0) {
                  return nextTerminal.toggle();
                }
              }
            }
          }
        };
      })(this)));
      this.registerContextMenu();
      this.subscriptions.add(atom.tooltips.add(this.plusBtn, {
        title: 'New Terminal'
      }));
      this.subscriptions.add(atom.tooltips.add(this.closeBtn, {
        title: 'Close All'
      }));
      this.statusContainer.on('dblclick', (function(_this) {
        return function(event) {
          if (event.target === event.delegateTarget) {
            return _this.newTerminalView();
          }
        };
      })(this));
      this.statusContainer.on('dragstart', '.vk-terminal-status-icon', this.onDragStart);
      this.statusContainer.on('dragend', '.vk-terminal-status-icon', this.onDragEnd);
      this.statusContainer.on('dragleave', this.onDragLeave);
      this.statusContainer.on('dragover', this.onDragOver);
      this.statusContainer.on('drop', this.onDrop);
      handleBlur = (function(_this) {
        return function() {
          var terminal;
          if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
            _this.returnFocus = _this.terminalViewForTerminal(terminal);
            return terminal.blur();
          }
        };
      })(this);
      handleFocus = (function(_this) {
        return function() {
          if (_this.returnFocus) {
            return setTimeout(function() {
              var ref1;
              if ((ref1 = _this.returnFocus) != null) {
                ref1.focus();
              }
              return _this.returnFocus = null;
            }, 100);
          }
        };
      })(this);
      window.addEventListener('blur', handleBlur);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('blur', handleBlur);
        }
      });
      window.addEventListener('focus', handleFocus);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('focus', handleFocus);
        }
      });
      return this.attach();
    };

    StatusBar.prototype.registerContextMenu = function() {
      return this.subscriptions.add(atom.commands.add('.vk-terminal.status-bar', {
        'vk-terminal:status-red': this.setStatusColor,
        'vk-terminal:status-orange': this.setStatusColor,
        'vk-terminal:status-yellow': this.setStatusColor,
        'vk-terminal:status-green': this.setStatusColor,
        'vk-terminal:status-blue': this.setStatusColor,
        'vk-terminal:status-purple': this.setStatusColor,
        'vk-terminal:status-pink': this.setStatusColor,
        'vk-terminal:status-cyan': this.setStatusColor,
        'vk-terminal:status-magenta': this.setStatusColor,
        'vk-terminal:status-default': this.clearStatusColor,
        'vk-terminal:context-close': function(event) {
          return $(event.target).closest('.vk-terminal-status-icon')[0].terminalView.destroy();
        },
        'vk-terminal:context-hide': function(event) {
          var statusIcon;
          statusIcon = $(event.target).closest('.vk-terminal-status-icon')[0];
          if (statusIcon.isActive()) {
            return statusIcon.terminalView.hide();
          }
        },
        'vk-terminal:context-rename': function(event) {
          return $(event.target).closest('.vk-terminal-status-icon')[0].rename();
        }
      }));
    };

    StatusBar.prototype.registerPaneSubscription = function() {
      return this.subscriptions.add(this.paneSubscription = atom.workspace.observePanes((function(_this) {
        return function(pane) {
          var paneElement, tabBar;
          paneElement = $(atom.views.getView(pane));
          tabBar = paneElement.find('ul');
          tabBar.on('drop', function(event) {
            return _this.onDropTabBar(event, pane);
          });
          tabBar.on('dragstart', function(event) {
            var ref1;
            if (((ref1 = event.target.item) != null ? ref1.constructor.name : void 0) !== 'PlatformIOTerminalView') {
              return;
            }
            return event.originalEvent.dataTransfer.setData('vk-terminal-tab', 'true');
          });
          return pane.onDidDestroy(function() {
            return tabBar.off('drop', this.onDropTabBar);
          });
        };
      })(this)));
    };

    StatusBar.prototype.createTerminalView = function(autoRun) {
      var args, shell, shellArguments;
      shell = atom.config.get('vk-terminal.core.shell');
      shellArguments = atom.config.get('vk-terminal.core.shellArguments');
      args = shellArguments.split(/\s+/g).filter(function(arg) {
        return arg;
      });
      return this.createEmptyTerminalView(autoRun, shell, args);
    };

    StatusBar.prototype.createEmptyTerminalView = function(autoRun, shell, args) {
      var directory, editorFolder, editorPath, home, id, j, len, platformIOTerminalView, projectFolder, pwd, ref1, ref2, statusIcon;
      if (autoRun == null) {
        autoRun = [];
      }
      if (shell == null) {
        shell = null;
      }
      if (args == null) {
        args = [];
      }
      if (this.paneSubscription == null) {
        this.registerPaneSubscription();
      }
      projectFolder = atom.project.getPaths()[0];
      editorPath = (ref1 = atom.workspace.getActiveTextEditor()) != null ? ref1.getPath() : void 0;
      if (editorPath != null) {
        editorFolder = path.dirname(editorPath);
        ref2 = atom.project.getPaths();
        for (j = 0, len = ref2.length; j < len; j++) {
          directory = ref2[j];
          if (editorPath.indexOf(directory) >= 0) {
            projectFolder = directory;
          }
        }
      }
      if ((projectFolder != null ? projectFolder.indexOf('atom://') : void 0) >= 0) {
        projectFolder = void 0;
      }
      home = process.platform === 'win32' ? process.env.HOMEPATH : process.env.HOME;
      switch (atom.config.get('vk-terminal.core.workingDirectory')) {
        case 'Project':
          pwd = projectFolder || editorFolder || home;
          break;
        case 'Active File':
          pwd = editorFolder || projectFolder || home;
          break;
        default:
          pwd = home;
      }
      id = editorPath || projectFolder || home;
      id = {
        filePath: id,
        folderPath: path.dirname(id)
      };
      statusIcon = new StatusIcon();
      platformIOTerminalView = new PlatformIOTerminalView(id, pwd, statusIcon, this, shell, args, autoRun);
      statusIcon.initialize(platformIOTerminalView);
      platformIOTerminalView.attach();
      this.terminalViews.push(platformIOTerminalView);
      this.statusContainer.append(statusIcon);
      return platformIOTerminalView;
    };

    StatusBar.prototype.activeNextTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index + 1);
    };

    StatusBar.prototype.activePrevTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index - 1);
    };

    StatusBar.prototype.indexOf = function(view) {
      return this.terminalViews.indexOf(view);
    };

    StatusBar.prototype.activeTerminalView = function(index) {
      if (this.terminalViews.length < 2) {
        return false;
      }
      if (index >= this.terminalViews.length) {
        index = 0;
      }
      if (index < 0) {
        index = this.terminalViews.length - 1;
      }
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.getActiveTerminalView = function() {
      return this.activeTerminal;
    };

    StatusBar.prototype.focusTerminal = function() {
      var terminal;
      if (this.activeTerminal == null) {
        return;
      }
      if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
        return this.activeTerminal.blur();
      } else {
        return this.activeTerminal.focusTerminal();
      }
    };

    StatusBar.prototype.getTerminalById = function(target, selector) {
      var index, j, ref1, terminal;
      if (selector == null) {
        selector = function(terminal) {
          return terminal.id;
        };
      }
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminal = this.terminalViews[index];
        if (terminal != null) {
          if (selector(terminal) === target) {
            return terminal;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.terminalViewForTerminal = function(terminal) {
      var index, j, ref1, terminalView;
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminalView = this.terminalViews[index];
        if (terminalView != null) {
          if (terminalView.getTerminal() === terminal) {
            return terminalView;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.runInActiveView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if (view != null) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.runNewTerminal = function() {
      this.activeTerminal = this.createEmptyTerminalView();
      this.activeTerminal.toggle();
      return this.activeTerminal;
    };

    StatusBar.prototype.runCommandInNewTerminal = function(commands) {
      this.activeTerminal = this.createTerminalView(commands);
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.runInOpenView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if ((view != null) && view.panel.isVisible()) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.setActiveTerminalView = function(view) {
      return this.activeTerminal = view;
    };

    StatusBar.prototype.removeTerminalView = function(view) {
      var index;
      index = this.indexOf(view);
      if (index < 0) {
        return;
      }
      this.terminalViews.splice(index, 1);
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.activateAdjacentTerminal = function(index) {
      if (index == null) {
        index = 0;
      }
      if (!(this.terminalViews.length > 0)) {
        return false;
      }
      index = Math.max(0, index - 1);
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.newTerminalView = function() {
      var ref1;
      if ((ref1 = this.activeTerminal) != null ? ref1.animating : void 0) {
        return;
      }
      this.activeTerminal = this.createTerminalView();
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.attach = function() {
      return this.statusBarProvider.addLeftTile({
        item: this,
        priority: -93
      });
    };

    StatusBar.prototype.destroyActiveTerm = function() {
      var index;
      if (this.activeTerminal == null) {
        return;
      }
      index = this.indexOf(this.activeTerminal);
      this.activeTerminal.destroy();
      this.activeTerminal = null;
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.closeAll = function() {
      var index, j, ref1, view;
      for (index = j = ref1 = this.terminalViews.length; ref1 <= 0 ? j <= 0 : j >= 0; index = ref1 <= 0 ? ++j : --j) {
        view = this.terminalViews[index];
        if (view != null) {
          view.destroy();
        }
      }
      return this.activeTerminal = null;
    };

    StatusBar.prototype.destroy = function() {
      var j, len, ref1, view;
      this.subscriptions.dispose();
      ref1 = this.terminalViews;
      for (j = 0, len = ref1.length; j < len; j++) {
        view = ref1[j];
        view.ptyProcess.terminate();
        view.terminal.destroy();
      }
      return this.detach();
    };

    StatusBar.prototype.toggle = function() {
      if (this.terminalViews.length === 0) {
        this.activeTerminal = this.createTerminalView();
      } else if (this.activeTerminal === null) {
        this.activeTerminal = this.terminalViews[0];
      }
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.setStatusColor = function(event) {
      var color;
      color = event.type.match(/\w+$/)[0];
      color = atom.config.get("vk-terminal.iconColors." + color).toRGBAString();
      return $(event.target).closest('.vk-terminal-status-icon').css('color', color);
    };

    StatusBar.prototype.clearStatusColor = function(event) {
      return $(event.target).closest('.vk-terminal-status-icon').css('color', '');
    };

    StatusBar.prototype.onDragStart = function(event) {
      var element;
      event.originalEvent.dataTransfer.setData('vk-terminal-panel', 'true');
      element = $(event.target).closest('.vk-terminal-status-icon');
      element.addClass('is-dragging');
      return event.originalEvent.dataTransfer.setData('from-index', element.index());
    };

    StatusBar.prototype.onDragLeave = function(event) {
      return this.removePlaceholder();
    };

    StatusBar.prototype.onDragEnd = function(event) {
      return this.clearDropTarget();
    };

    StatusBar.prototype.onDragOver = function(event) {
      var element, newDropTargetIndex, statusIcons;
      event.preventDefault();
      event.stopPropagation();
      if (event.originalEvent.dataTransfer.getData('vk-terminal') !== 'true') {
        return;
      }
      newDropTargetIndex = this.getDropTargetIndex(event);
      if (newDropTargetIndex == null) {
        return;
      }
      this.removeDropTargetClasses();
      statusIcons = this.statusContainer.children('.vk-terminal-status-icon');
      if (newDropTargetIndex < statusIcons.length) {
        element = statusIcons.eq(newDropTargetIndex).addClass('is-drop-target');
        return this.getPlaceholder().insertBefore(element);
      } else {
        element = statusIcons.eq(newDropTargetIndex - 1).addClass('drop-target-is-after');
        return this.getPlaceholder().insertAfter(element);
      }
    };

    StatusBar.prototype.onDrop = function(event) {
      var dataTransfer, fromIndex, pane, paneIndex, panelEvent, tabEvent, toIndex, view;
      dataTransfer = event.originalEvent.dataTransfer;
      panelEvent = dataTransfer.getData('vk-terminal-panel') === 'true';
      tabEvent = dataTransfer.getData('vk-terminal-tab') === 'true';
      if (!(panelEvent || tabEvent)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      toIndex = this.getDropTargetIndex(event);
      this.clearDropTarget();
      if (tabEvent) {
        fromIndex = parseInt(dataTransfer.getData('sortable-index'));
        paneIndex = parseInt(dataTransfer.getData('from-pane-index'));
        pane = atom.workspace.getPanes()[paneIndex];
        view = pane.itemAtIndex(fromIndex);
        pane.removeItem(view, false);
        view.show();
        view.toggleTabView();
        this.terminalViews.push(view);
        if (view.statusIcon.isActive()) {
          view.open();
        }
        this.statusContainer.append(view.statusIcon);
        fromIndex = this.terminalViews.length - 1;
      } else {
        fromIndex = parseInt(dataTransfer.getData('from-index'));
      }
      return this.updateOrder(fromIndex, toIndex);
    };

    StatusBar.prototype.onDropTabBar = function(event, pane) {
      var dataTransfer, fromIndex, tabBar, view;
      dataTransfer = event.originalEvent.dataTransfer;
      if (dataTransfer.getData('vk-terminal-panel') !== 'true') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.clearDropTarget();
      fromIndex = parseInt(dataTransfer.getData('from-index'));
      view = this.terminalViews[fromIndex];
      view.css("height", "");
      view.terminal.element.style.height = "";
      tabBar = $(event.target).closest('.tab-bar');
      view.toggleTabView();
      this.removeTerminalView(view);
      this.statusContainer.children().eq(fromIndex).detach();
      view.statusIcon.removeTooltip();
      pane.addItem(view, pane.getItems().length);
      pane.activateItem(view);
      return view.focus();
    };

    StatusBar.prototype.clearDropTarget = function() {
      var element;
      element = this.find('.is-dragging');
      element.removeClass('is-dragging');
      this.removeDropTargetClasses();
      return this.removePlaceholder();
    };

    StatusBar.prototype.removeDropTargetClasses = function() {
      this.statusContainer.find('.is-drop-target').removeClass('is-drop-target');
      return this.statusContainer.find('.drop-target-is-after').removeClass('drop-target-is-after');
    };

    StatusBar.prototype.getDropTargetIndex = function(event) {
      var element, elementCenter, statusIcons, target;
      target = $(event.target);
      if (this.isPlaceholder(target)) {
        return;
      }
      statusIcons = this.statusContainer.children('.vk-terminal-status-icon');
      element = target.closest('.vk-terminal-status-icon');
      if (element.length === 0) {
        element = statusIcons.last();
      }
      if (!element.length) {
        return 0;
      }
      elementCenter = element.offset().left + element.width() / 2;
      if (event.originalEvent.pageX < elementCenter) {
        return statusIcons.index(element);
      } else if (element.next('.vk-terminal-status-icon').length > 0) {
        return statusIcons.index(element.next('.vk-terminal-status-icon'));
      } else {
        return statusIcons.index(element) + 1;
      }
    };

    StatusBar.prototype.getPlaceholder = function() {
      return this.placeholderEl != null ? this.placeholderEl : this.placeholderEl = $('<li class="placeholder"></li>');
    };

    StatusBar.prototype.removePlaceholder = function() {
      var ref1;
      if ((ref1 = this.placeholderEl) != null) {
        ref1.remove();
      }
      return this.placeholderEl = null;
    };

    StatusBar.prototype.isPlaceholder = function(element) {
      return element.is('.placeholder');
    };

    StatusBar.prototype.iconAtIndex = function(index) {
      return this.getStatusIcons().eq(index);
    };

    StatusBar.prototype.getStatusIcons = function() {
      return this.statusContainer.children('.vk-terminal-status-icon');
    };

    StatusBar.prototype.moveIconToIndex = function(icon, toIndex) {
      var container, followingIcon;
      followingIcon = this.getStatusIcons()[toIndex];
      container = this.statusContainer[0];
      if (followingIcon != null) {
        return container.insertBefore(icon, followingIcon);
      } else {
        return container.appendChild(icon);
      }
    };

    StatusBar.prototype.moveTerminalView = function(fromIndex, toIndex) {
      var activeTerminal, view;
      activeTerminal = this.getActiveTerminalView();
      view = this.terminalViews.splice(fromIndex, 1)[0];
      this.terminalViews.splice(toIndex, 0, view);
      return this.setActiveTerminalView(activeTerminal);
    };

    StatusBar.prototype.updateOrder = function(fromIndex, toIndex) {
      var icon;
      if (fromIndex === toIndex) {
        return;
      }
      if (fromIndex < toIndex) {
        toIndex--;
      }
      icon = this.getStatusIcons().eq(fromIndex).detach();
      this.moveIconToIndex(icon.get(0), toIndex);
      this.moveTerminalView(fromIndex, toIndex);
      icon.addClass('inserted');
      return icon.one('webkitAnimationEnd', function() {
        return icon.removeClass('inserted');
      });
    };

    return StatusBar;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc3lhaWYvLmF0b20vcGFja2FnZXMvdmstdGVybWluYWwvbGliL3N0YXR1cy1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSwwRkFBQTtJQUFBOzs7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixNQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBRCxFQUFJOztFQUVKLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSxRQUFSOztFQUN6QixVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVI7O0VBRWIsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztFQUNMLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFFUCxNQUFNLENBQUMsT0FBUCxHQUNNOzs7Ozs7Ozs7Ozs7Ozs7d0JBQ0osYUFBQSxHQUFlOzt3QkFDZixjQUFBLEdBQWdCOzt3QkFDaEIsV0FBQSxHQUFhOztJQUViLFNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLHdCQUFQO1FBQWlDLFFBQUEsRUFBVSxDQUFDLENBQTVDO09BQUwsRUFBb0QsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ2xELEtBQUMsQ0FBQSxDQUFELENBQUc7WUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLGdCQUFQO1lBQXlCLEtBQUEsRUFBTyxpQkFBaEM7WUFBbUQsTUFBQSxFQUFRLFNBQTNEO1dBQUg7VUFDQSxLQUFDLENBQUEsRUFBRCxDQUFJO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyw4QkFBUDtZQUF1QyxRQUFBLEVBQVUsSUFBakQ7WUFBdUQsTUFBQSxFQUFRLGlCQUEvRDtZQUFrRixFQUFBLEVBQUksY0FBdEY7V0FBSjtpQkFDQSxLQUFDLENBQUEsQ0FBRCxDQUFHO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxhQUFQ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QUFhLFNBQUEsR0FBWSxPQUF6QjtRQUFBLE9BQUEsR0FBQTs7TUFFQSxJQUFBLEdBQU8sSUFBQyxDQUFBLGNBQUQsQ0FBQSxDQUFpQixDQUFDLEVBQWxCLENBQXFCLFNBQXJCLENBQStCLENBQUMsTUFBaEMsQ0FBQTtNQUNQLElBQUMsQ0FBQSxlQUFELENBQWlCLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxDQUFqQixFQUE4QixPQUE5QjtNQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixTQUFsQixFQUE2QixPQUE3QjtNQUNBLElBQUksQ0FBQyxRQUFMLENBQWMsVUFBZDthQUNBLElBQUksQ0FBQyxHQUFMLENBQVMsb0JBQVQsRUFBK0IsU0FBQTtlQUFHLElBQUksQ0FBQyxXQUFMLENBQWlCLFVBQWpCO01BQUgsQ0FBL0I7SUFSVzs7OztLQTVjUztBQVZ4QiIsInNvdXJjZXNDb250ZW50IjpbIntDb21wb3NpdGVEaXNwb3NhYmxlfSA9IHJlcXVpcmUgJ2F0b20nXG57JCwgVmlld30gPSByZXF1aXJlICdhdG9tLXNwYWNlLXBlbi12aWV3cydcblxuUGxhdGZvcm1JT1Rlcm1pbmFsVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblN0YXR1c0ljb24gPSByZXF1aXJlICcuL3N0YXR1cy1pY29uJ1xuXG5vcyA9IHJlcXVpcmUgJ29zJ1xucGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFN0YXR1c0JhciBleHRlbmRzIFZpZXdcbiAgdGVybWluYWxWaWV3czogW11cbiAgYWN0aXZlVGVybWluYWw6IG51bGxcbiAgcmV0dXJuRm9jdXM6IG51bGxcblxuICBAY29udGVudDogLT5cbiAgICBAZGl2IGNsYXNzOiAndmstdGVybWluYWwgc3RhdHVzLWJhcicsIHRhYmluZGV4OiAtMSwgPT5cbiAgICAgIEBpIGNsYXNzOiBcImljb24gaWNvbi1wbHVzXCIsIGNsaWNrOiAnbmV3VGVybWluYWxWaWV3Jywgb3V0bGV0OiAncGx1c0J0bidcbiAgICAgIEB1bCBjbGFzczogXCJsaXN0LWlubGluZSBzdGF0dXMtY29udGFpbmVyXCIsIHRhYmluZGV4OiAnLTEnLCBvdXRsZXQ6ICdzdGF0dXNDb250YWluZXInLCBpczogJ3NwYWNlLXBlbi11bCdcbiAgICAgIEBpIGNsYXNzOiBcImljb24gaWNvbi14XCIsIGNsaWNrOiAnY2xvc2VBbGwnLCBvdXRsZXQ6ICdjbG9zZUJ0bidcblxuICBpbml0aWFsaXplOiAoQHN0YXR1c0JhclByb3ZpZGVyKSAtPlxuICAgICMgYXRvbS53b3Jrc3BhY2UuYWRkQm90dG9tUGFuZWwoaXRlbTogdGhpcywgdmlzaWJsZTogZmFsc2UpXG4gICAgQHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS5jb21tYW5kcy5hZGQgJ2F0b20td29ya3NwYWNlJyxcbiAgICAgICd2ay10ZXJtaW5hbDpmb2N1cyc6ID0+IEBmb2N1c1Rlcm1pbmFsKClcbiAgICAgICd2ay10ZXJtaW5hbDpuZXcnOiA9PiBAbmV3VGVybWluYWxWaWV3KClcbiAgICAgICd2ay10ZXJtaW5hbDp0b2dnbGUnOiA9PiBAdG9nZ2xlKClcbiAgICAgICd2ay10ZXJtaW5hbDpuZXh0JzogPT5cbiAgICAgICAgcmV0dXJuIHVubGVzcyBAYWN0aXZlVGVybWluYWxcbiAgICAgICAgcmV0dXJuIGlmIEBhY3RpdmVUZXJtaW5hbC5pc0FuaW1hdGluZygpXG4gICAgICAgIEBhY3RpdmVUZXJtaW5hbC5vcGVuKCkgaWYgQGFjdGl2ZU5leHRUZXJtaW5hbFZpZXcoKVxuICAgICAgJ3ZrLXRlcm1pbmFsOnByZXYnOiA9PlxuICAgICAgICByZXR1cm4gdW5sZXNzIEBhY3RpdmVUZXJtaW5hbFxuICAgICAgICByZXR1cm4gaWYgQGFjdGl2ZVRlcm1pbmFsLmlzQW5pbWF0aW5nKClcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLm9wZW4oKSBpZiBAYWN0aXZlUHJldlRlcm1pbmFsVmlldygpXG4gICAgICAndmstdGVybWluYWw6Y2xvc2UnOiA9PiBAZGVzdHJveUFjdGl2ZVRlcm0oKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmNsb3NlLWFsbCc6ID0+IEBjbG9zZUFsbCgpXG4gICAgICAndmstdGVybWluYWw6cmVuYW1lJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5yZW5hbWUoKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1zZWxlY3RlZC10ZXh0JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oJyRTJylcbiAgICAgICd2ay10ZXJtaW5hbDppbnNlcnQtdGV4dCc6ID0+IEBydW5JbkFjdGl2ZVZpZXcgKGkpIC0+IGkuaW5wdXREaWFsb2coKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0xJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MScpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0yJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MicpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0zJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MycpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC00JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NCcpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC01JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NScpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC02JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NicpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC03JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NycpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC04JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0OCcpKVxuICAgICAgJ3ZrLXRlcm1pbmFsOmZ1bGxzY3JlZW4nOiA9PiBAYWN0aXZlVGVybWluYWwubWF4aW1pemUoKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICcueHRlcm0nLFxuICAgICAgJ3ZrLXRlcm1pbmFsOnBhc3RlJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5wYXN0ZSgpXG4gICAgICAndmstdGVybWluYWw6Y29weSc6ID0+IEBydW5JbkFjdGl2ZVZpZXcgKGkpIC0+IGkuY29weSgpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS53b3Jrc3BhY2Uub25EaWRDaGFuZ2VBY3RpdmVQYW5lSXRlbSAoaXRlbSkgPT5cbiAgICAgIHJldHVybiB1bmxlc3MgaXRlbT9cblxuICAgICAgaWYgaXRlbS5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiUGxhdGZvcm1JT1Rlcm1pbmFsVmlld1wiXG4gICAgICAgIHNldFRpbWVvdXQgaXRlbS5mb2N1cywgMTAwXG4gICAgICBlbHNlIGlmIGl0ZW0uY29uc3RydWN0b3IubmFtZSBpcyBcIlRleHRFZGl0b3JcIlxuICAgICAgICBtYXBwaW5nID0gYXRvbS5jb25maWcuZ2V0KCd2ay10ZXJtaW5hbC5jb3JlLm1hcFRlcm1pbmFsc1RvJylcbiAgICAgICAgcmV0dXJuIGlmIG1hcHBpbmcgaXMgJ05vbmUnXG5cbiAgICAgICAgc3dpdGNoIG1hcHBpbmdcbiAgICAgICAgICB3aGVuICdGaWxlJ1xuICAgICAgICAgICAgbmV4dFRlcm1pbmFsID0gQGdldFRlcm1pbmFsQnlJZCBpdGVtLmdldFBhdGgoKSwgKHZpZXcpIC0+IHZpZXcuZ2V0SWQoKS5maWxlUGF0aFxuICAgICAgICAgIHdoZW4gJ0ZvbGRlcidcbiAgICAgICAgICAgIG5leHRUZXJtaW5hbCA9IEBnZXRUZXJtaW5hbEJ5SWQgcGF0aC5kaXJuYW1lKGl0ZW0uZ2V0UGF0aCgpKSwgKHZpZXcpIC0+IHZpZXcuZ2V0SWQoKS5mb2xkZXJQYXRoXG5cbiAgICAgICAgcHJldlRlcm1pbmFsID0gQGdldEFjdGl2ZVRlcm1pbmFsVmlldygpXG4gICAgICAgIGlmIHByZXZUZXJtaW5hbCAhPSBuZXh0VGVybWluYWxcbiAgICAgICAgICBpZiBub3QgbmV4dFRlcm1pbmFsP1xuICAgICAgICAgICAgaWYgaXRlbS5nZXRUaXRsZSgpIGlzbnQgJ3VudGl0bGVkJ1xuICAgICAgICAgICAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ3ZrLXRlcm1pbmFsLmNvcmUubWFwVGVybWluYWxzVG9BdXRvT3BlbicpXG4gICAgICAgICAgICAgICAgbmV4dFRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHNldEFjdGl2ZVRlcm1pbmFsVmlldyhuZXh0VGVybWluYWwpXG4gICAgICAgICAgICBuZXh0VGVybWluYWwudG9nZ2xlKCkgaWYgcHJldlRlcm1pbmFsPy5wYW5lbC5pc1Zpc2libGUoKVxuXG4gICAgQHJlZ2lzdGVyQ29udGV4dE1lbnUoKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20udG9vbHRpcHMuYWRkIEBwbHVzQnRuLCB0aXRsZTogJ05ldyBUZXJtaW5hbCdcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS50b29sdGlwcy5hZGQgQGNsb3NlQnRuLCB0aXRsZTogJ0Nsb3NlIEFsbCdcblxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RibGNsaWNrJywgKGV2ZW50KSA9PlxuICAgICAgQG5ld1Rlcm1pbmFsVmlldygpIHVubGVzcyBldmVudC50YXJnZXQgIT0gZXZlbnQuZGVsZWdhdGVUYXJnZXRcblxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RyYWdzdGFydCcsICcudmstdGVybWluYWwtc3RhdHVzLWljb24nLCBAb25EcmFnU3RhcnRcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnZW5kJywgJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicsIEBvbkRyYWdFbmRcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnbGVhdmUnLCBAb25EcmFnTGVhdmVcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnb3ZlcicsIEBvbkRyYWdPdmVyXG4gICAgQHN0YXR1c0NvbnRhaW5lci5vbiAnZHJvcCcsIEBvbkRyb3BcblxuICAgIGhhbmRsZUJsdXIgPSA9PlxuICAgICAgaWYgdGVybWluYWwgPSBQbGF0Zm9ybUlPVGVybWluYWxWaWV3LmdldEZvY3VzZWRUZXJtaW5hbCgpXG4gICAgICAgIEByZXR1cm5Gb2N1cyA9IEB0ZXJtaW5hbFZpZXdGb3JUZXJtaW5hbCh0ZXJtaW5hbClcbiAgICAgICAgdGVybWluYWwuYmx1cigpXG5cbiAgICBoYW5kbGVGb2N1cyA9ID0+XG4gICAgICBpZiBAcmV0dXJuRm9jdXNcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEByZXR1cm5Gb2N1cz8uZm9jdXMoKVxuICAgICAgICAgIEByZXR1cm5Gb2N1cyA9IG51bGxcbiAgICAgICAgLCAxMDBcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdibHVyJywgaGFuZGxlQmx1clxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBkaXNwb3NlOiAtPlxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ2JsdXInLCBoYW5kbGVCbHVyXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnZm9jdXMnLCBoYW5kbGVGb2N1c1xuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBkaXNwb3NlOiAtPlxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ2ZvY3VzJywgaGFuZGxlRm9jdXNcblxuICAgIEBhdHRhY2goKVxuXG4gIHJlZ2lzdGVyQ29udGV4dE1lbnU6IC0+XG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICcudmstdGVybWluYWwuc3RhdHVzLWJhcicsXG4gICAgICAndmstdGVybWluYWw6c3RhdHVzLXJlZCc6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3ZrLXRlcm1pbmFsOnN0YXR1cy1vcmFuZ2UnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICd2ay10ZXJtaW5hbDpzdGF0dXMteWVsbG93JzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAndmstdGVybWluYWw6c3RhdHVzLWdyZWVuJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAndmstdGVybWluYWw6c3RhdHVzLWJsdWUnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICd2ay10ZXJtaW5hbDpzdGF0dXMtcHVycGxlJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAndmstdGVybWluYWw6c3RhdHVzLXBpbmsnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICd2ay10ZXJtaW5hbDpzdGF0dXMtY3lhbic6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3ZrLXRlcm1pbmFsOnN0YXR1cy1tYWdlbnRhJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAndmstdGVybWluYWw6c3RhdHVzLWRlZmF1bHQnOiBAY2xlYXJTdGF0dXNDb2xvclxuICAgICAgJ3ZrLXRlcm1pbmFsOmNvbnRleHQtY2xvc2UnOiAoZXZlbnQpIC0+XG4gICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcudmstdGVybWluYWwtc3RhdHVzLWljb24nKVswXS50ZXJtaW5hbFZpZXcuZGVzdHJveSgpXG4gICAgICAndmstdGVybWluYWw6Y29udGV4dC1oaWRlJzogKGV2ZW50KSAtPlxuICAgICAgICBzdGF0dXNJY29uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpWzBdXG4gICAgICAgIHN0YXR1c0ljb24udGVybWluYWxWaWV3LmhpZGUoKSBpZiBzdGF0dXNJY29uLmlzQWN0aXZlKClcbiAgICAgICd2ay10ZXJtaW5hbDpjb250ZXh0LXJlbmFtZSc6IChldmVudCkgLT5cbiAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpWzBdLnJlbmFtZSgpXG5cbiAgcmVnaXN0ZXJQYW5lU3Vic2NyaXB0aW9uOiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBAcGFuZVN1YnNjcmlwdGlvbiA9IGF0b20ud29ya3NwYWNlLm9ic2VydmVQYW5lcyAocGFuZSkgPT5cbiAgICAgIHBhbmVFbGVtZW50ID0gJChhdG9tLnZpZXdzLmdldFZpZXcocGFuZSkpXG4gICAgICB0YWJCYXIgPSBwYW5lRWxlbWVudC5maW5kKCd1bCcpXG5cbiAgICAgIHRhYkJhci5vbiAnZHJvcCcsIChldmVudCkgPT4gQG9uRHJvcFRhYkJhcihldmVudCwgcGFuZSlcbiAgICAgIHRhYkJhci5vbiAnZHJhZ3N0YXJ0JywgKGV2ZW50KSAtPlxuICAgICAgICByZXR1cm4gdW5sZXNzIGV2ZW50LnRhcmdldC5pdGVtPy5jb25zdHJ1Y3Rvci5uYW1lIGlzICdQbGF0Zm9ybUlPVGVybWluYWxWaWV3J1xuICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhICd2ay10ZXJtaW5hbC10YWInLCAndHJ1ZSdcbiAgICAgIHBhbmUub25EaWREZXN0cm95IC0+IHRhYkJhci5vZmYgJ2Ryb3AnLCBAb25Ecm9wVGFiQmFyXG5cbiAgY3JlYXRlVGVybWluYWxWaWV3OiAoYXV0b1J1bikgLT5cbiAgICBzaGVsbCA9IGF0b20uY29uZmlnLmdldCAndmstdGVybWluYWwuY29yZS5zaGVsbCdcbiAgICBzaGVsbEFyZ3VtZW50cyA9IGF0b20uY29uZmlnLmdldCAndmstdGVybWluYWwuY29yZS5zaGVsbEFyZ3VtZW50cydcbiAgICBhcmdzID0gc2hlbGxBcmd1bWVudHMuc3BsaXQoL1xccysvZykuZmlsdGVyIChhcmcpIC0+IGFyZ1xuICAgIEBjcmVhdGVFbXB0eVRlcm1pbmFsVmlldyBhdXRvUnVuLCBzaGVsbCwgYXJnc1xuXG4gIGNyZWF0ZUVtcHR5VGVybWluYWxWaWV3OiAoYXV0b1J1bj1bXSwgc2hlbGwgPSBudWxsLCBhcmdzID0gW10pIC0+XG4gICAgQHJlZ2lzdGVyUGFuZVN1YnNjcmlwdGlvbigpIHVubGVzcyBAcGFuZVN1YnNjcmlwdGlvbj9cblxuICAgIHByb2plY3RGb2xkZXIgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVswXVxuICAgIGVkaXRvclBhdGggPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk/LmdldFBhdGgoKVxuXG4gICAgaWYgZWRpdG9yUGF0aD9cbiAgICAgIGVkaXRvckZvbGRlciA9IHBhdGguZGlybmFtZShlZGl0b3JQYXRoKVxuICAgICAgZm9yIGRpcmVjdG9yeSBpbiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKVxuICAgICAgICBpZiBlZGl0b3JQYXRoLmluZGV4T2YoZGlyZWN0b3J5KSA+PSAwXG4gICAgICAgICAgcHJvamVjdEZvbGRlciA9IGRpcmVjdG9yeVxuXG4gICAgcHJvamVjdEZvbGRlciA9IHVuZGVmaW5lZCBpZiBwcm9qZWN0Rm9sZGVyPy5pbmRleE9mKCdhdG9tOi8vJykgPj0gMFxuXG4gICAgaG9tZSA9IGlmIHByb2Nlc3MucGxhdGZvcm0gaXMgJ3dpbjMyJyB0aGVuIHByb2Nlc3MuZW52LkhPTUVQQVRIIGVsc2UgcHJvY2Vzcy5lbnYuSE9NRVxuXG4gICAgc3dpdGNoIGF0b20uY29uZmlnLmdldCgndmstdGVybWluYWwuY29yZS53b3JraW5nRGlyZWN0b3J5JylcbiAgICAgIHdoZW4gJ1Byb2plY3QnIHRoZW4gcHdkID0gcHJvamVjdEZvbGRlciBvciBlZGl0b3JGb2xkZXIgb3IgaG9tZVxuICAgICAgd2hlbiAnQWN0aXZlIEZpbGUnIHRoZW4gcHdkID0gZWRpdG9yRm9sZGVyIG9yIHByb2plY3RGb2xkZXIgb3IgaG9tZVxuICAgICAgZWxzZSBwd2QgPSBob21lXG5cbiAgICBpZCA9IGVkaXRvclBhdGggb3IgcHJvamVjdEZvbGRlciBvciBob21lXG4gICAgaWQgPSBmaWxlUGF0aDogaWQsIGZvbGRlclBhdGg6IHBhdGguZGlybmFtZShpZClcblxuICAgIHN0YXR1c0ljb24gPSBuZXcgU3RhdHVzSWNvbigpXG4gICAgcGxhdGZvcm1JT1Rlcm1pbmFsVmlldyA9IG5ldyBQbGF0Zm9ybUlPVGVybWluYWxWaWV3KGlkLCBwd2QsIHN0YXR1c0ljb24sIHRoaXMsIHNoZWxsLCBhcmdzLCBhdXRvUnVuKVxuICAgIHN0YXR1c0ljb24uaW5pdGlhbGl6ZShwbGF0Zm9ybUlPVGVybWluYWxWaWV3KVxuXG4gICAgcGxhdGZvcm1JT1Rlcm1pbmFsVmlldy5hdHRhY2goKVxuXG4gICAgQHRlcm1pbmFsVmlld3MucHVzaCBwbGF0Zm9ybUlPVGVybWluYWxWaWV3XG4gICAgQHN0YXR1c0NvbnRhaW5lci5hcHBlbmQgc3RhdHVzSWNvblxuICAgIHJldHVybiBwbGF0Zm9ybUlPVGVybWluYWxWaWV3XG5cbiAgYWN0aXZlTmV4dFRlcm1pbmFsVmlldzogLT5cbiAgICBpbmRleCA9IEBpbmRleE9mKEBhY3RpdmVUZXJtaW5hbClcbiAgICByZXR1cm4gZmFsc2UgaWYgaW5kZXggPCAwXG4gICAgQGFjdGl2ZVRlcm1pbmFsVmlldyBpbmRleCArIDFcblxuICBhY3RpdmVQcmV2VGVybWluYWxWaWV3OiAtPlxuICAgIGluZGV4ID0gQGluZGV4T2YoQGFjdGl2ZVRlcm1pbmFsKVxuICAgIHJldHVybiBmYWxzZSBpZiBpbmRleCA8IDBcbiAgICBAYWN0aXZlVGVybWluYWxWaWV3IGluZGV4IC0gMVxuXG4gIGluZGV4T2Y6ICh2aWV3KSAtPlxuICAgIEB0ZXJtaW5hbFZpZXdzLmluZGV4T2YodmlldylcblxuICBhY3RpdmVUZXJtaW5hbFZpZXc6IChpbmRleCkgLT5cbiAgICByZXR1cm4gZmFsc2UgaWYgQHRlcm1pbmFsVmlld3MubGVuZ3RoIDwgMlxuXG4gICAgaWYgaW5kZXggPj0gQHRlcm1pbmFsVmlld3MubGVuZ3RoXG4gICAgICBpbmRleCA9IDBcbiAgICBpZiBpbmRleCA8IDBcbiAgICAgIGluZGV4ID0gQHRlcm1pbmFsVmlld3MubGVuZ3RoIC0gMVxuXG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgcmV0dXJuIHRydWVcblxuICBnZXRBY3RpdmVUZXJtaW5hbFZpZXc6IC0+XG4gICAgcmV0dXJuIEBhY3RpdmVUZXJtaW5hbFxuXG4gIGZvY3VzVGVybWluYWw6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAYWN0aXZlVGVybWluYWw/XG5cbiAgICBpZiB0ZXJtaW5hbCA9IFBsYXRmb3JtSU9UZXJtaW5hbFZpZXcuZ2V0Rm9jdXNlZFRlcm1pbmFsKClcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLmJsdXIoKVxuICAgIGVsc2VcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLmZvY3VzVGVybWluYWwoKVxuXG4gIGdldFRlcm1pbmFsQnlJZDogKHRhcmdldCwgc2VsZWN0b3IpIC0+XG4gICAgc2VsZWN0b3IgPz0gKHRlcm1pbmFsKSAtPiB0ZXJtaW5hbC5pZFxuXG4gICAgZm9yIGluZGV4IGluIFswIC4uIEB0ZXJtaW5hbFZpZXdzLmxlbmd0aF1cbiAgICAgIHRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgICBpZiB0ZXJtaW5hbD9cbiAgICAgICAgcmV0dXJuIHRlcm1pbmFsIGlmIHNlbGVjdG9yKHRlcm1pbmFsKSA9PSB0YXJnZXRcblxuICAgIHJldHVybiBudWxsXG5cbiAgdGVybWluYWxWaWV3Rm9yVGVybWluYWw6ICh0ZXJtaW5hbCkgLT5cbiAgICBmb3IgaW5kZXggaW4gWzAgLi4gQHRlcm1pbmFsVmlld3MubGVuZ3RoXVxuICAgICAgdGVybWluYWxWaWV3ID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgICBpZiB0ZXJtaW5hbFZpZXc/XG4gICAgICAgIHJldHVybiB0ZXJtaW5hbFZpZXcgaWYgdGVybWluYWxWaWV3LmdldFRlcm1pbmFsKCkgPT0gdGVybWluYWxcblxuICAgIHJldHVybiBudWxsXG5cbiAgcnVuSW5BY3RpdmVWaWV3OiAoY2FsbGJhY2spIC0+XG4gICAgdmlldyA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgIGlmIHZpZXc/XG4gICAgICByZXR1cm4gY2FsbGJhY2sodmlldylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHJ1bk5ld1Rlcm1pbmFsOiAoKSAtPlxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IEBjcmVhdGVFbXB0eVRlcm1pbmFsVmlldygpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLnRvZ2dsZSgpXG4gICAgcmV0dXJuIEBhY3RpdmVUZXJtaW5hbFxuXG4gIHJ1bkNvbW1hbmRJbk5ld1Rlcm1pbmFsOiAoY29tbWFuZHMpIC0+XG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldyhjb21tYW5kcylcbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcblxuICBydW5Jbk9wZW5WaWV3OiAoY2FsbGJhY2spIC0+XG4gICAgdmlldyA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgIGlmIHZpZXc/IGFuZCB2aWV3LnBhbmVsLmlzVmlzaWJsZSgpXG4gICAgICByZXR1cm4gY2FsbGJhY2sodmlldylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHNldEFjdGl2ZVRlcm1pbmFsVmlldzogKHZpZXcpIC0+XG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gdmlld1xuXG4gIHJlbW92ZVRlcm1pbmFsVmlldzogKHZpZXcpIC0+XG4gICAgaW5kZXggPSBAaW5kZXhPZiB2aWV3XG4gICAgcmV0dXJuIGlmIGluZGV4IDwgMFxuICAgIEB0ZXJtaW5hbFZpZXdzLnNwbGljZSBpbmRleCwgMVxuXG4gICAgQGFjdGl2YXRlQWRqYWNlbnRUZXJtaW5hbCBpbmRleFxuXG4gIGFjdGl2YXRlQWRqYWNlbnRUZXJtaW5hbDogKGluZGV4PTApIC0+XG4gICAgcmV0dXJuIGZhbHNlIHVubGVzcyBAdGVybWluYWxWaWV3cy5sZW5ndGggPiAwXG5cbiAgICBpbmRleCA9IE1hdGgubWF4KDAsIGluZGV4IC0gMSlcbiAgICBAYWN0aXZlVGVybWluYWwgPSBAdGVybWluYWxWaWV3c1tpbmRleF1cblxuICAgIHJldHVybiB0cnVlXG5cbiAgbmV3VGVybWluYWxWaWV3OiAtPlxuICAgIHJldHVybiBpZiBAYWN0aXZlVGVybWluYWw/LmFuaW1hdGluZ1xuXG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLnRvZ2dsZSgpXG5cbiAgYXR0YWNoOiAtPlxuICAgIEBzdGF0dXNCYXJQcm92aWRlci5hZGRMZWZ0VGlsZShpdGVtOiB0aGlzLCBwcmlvcml0eTogLTkzKVxuXG4gIGRlc3Ryb3lBY3RpdmVUZXJtOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQGFjdGl2ZVRlcm1pbmFsP1xuXG4gICAgaW5kZXggPSBAaW5kZXhPZihAYWN0aXZlVGVybWluYWwpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLmRlc3Ryb3koKVxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IG51bGxcblxuICAgIEBhY3RpdmF0ZUFkamFjZW50VGVybWluYWwgaW5kZXhcblxuICBjbG9zZUFsbDogPT5cbiAgICBmb3IgaW5kZXggaW4gW0B0ZXJtaW5hbFZpZXdzLmxlbmd0aCAuLiAwXVxuICAgICAgdmlldyA9IEB0ZXJtaW5hbFZpZXdzW2luZGV4XVxuICAgICAgaWYgdmlldz9cbiAgICAgICAgdmlldy5kZXN0cm95KClcbiAgICBAYWN0aXZlVGVybWluYWwgPSBudWxsXG5cbiAgZGVzdHJveTogLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICBmb3IgdmlldyBpbiBAdGVybWluYWxWaWV3c1xuICAgICAgdmlldy5wdHlQcm9jZXNzLnRlcm1pbmF0ZSgpXG4gICAgICB2aWV3LnRlcm1pbmFsLmRlc3Ryb3koKVxuICAgIEBkZXRhY2goKVxuXG4gIHRvZ2dsZTogLT5cbiAgICBpZiBAdGVybWluYWxWaWV3cy5sZW5ndGggPT0gMFxuICAgICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgZWxzZSBpZiBAYWN0aXZlVGVybWluYWwgPT0gbnVsbFxuICAgICAgQGFjdGl2ZVRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbMF1cbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcblxuICBzZXRTdGF0dXNDb2xvcjogKGV2ZW50KSAtPlxuICAgIGNvbG9yID0gZXZlbnQudHlwZS5tYXRjaCgvXFx3KyQvKVswXVxuICAgIGNvbG9yID0gYXRvbS5jb25maWcuZ2V0KFwidmstdGVybWluYWwuaWNvbkNvbG9ycy4je2NvbG9yfVwiKS50b1JHQkFTdHJpbmcoKVxuICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcudmstdGVybWluYWwtc3RhdHVzLWljb24nKS5jc3MgJ2NvbG9yJywgY29sb3JcblxuICBjbGVhclN0YXR1c0NvbG9yOiAoZXZlbnQpIC0+XG4gICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpLmNzcyAnY29sb3InLCAnJ1xuXG4gIG9uRHJhZ1N0YXJ0OiAoZXZlbnQpID0+XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSAndmstdGVybWluYWwtcGFuZWwnLCAndHJ1ZSdcblxuICAgIGVsZW1lbnQgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnZrLXRlcm1pbmFsLXN0YXR1cy1pY29uJylcbiAgICBlbGVtZW50LmFkZENsYXNzICdpcy1kcmFnZ2luZydcbiAgICBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhICdmcm9tLWluZGV4JywgZWxlbWVudC5pbmRleCgpXG5cbiAgb25EcmFnTGVhdmU6IChldmVudCkgPT5cbiAgICBAcmVtb3ZlUGxhY2Vob2xkZXIoKVxuXG4gIG9uRHJhZ0VuZDogKGV2ZW50KSA9PlxuICAgIEBjbGVhckRyb3BUYXJnZXQoKVxuXG4gIG9uRHJhZ092ZXI6IChldmVudCkgPT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB1bmxlc3MgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndmstdGVybWluYWwnKSBpcyAndHJ1ZSdcbiAgICAgIHJldHVyblxuXG4gICAgbmV3RHJvcFRhcmdldEluZGV4ID0gQGdldERyb3BUYXJnZXRJbmRleChldmVudClcbiAgICByZXR1cm4gdW5sZXNzIG5ld0Ryb3BUYXJnZXRJbmRleD9cbiAgICBAcmVtb3ZlRHJvcFRhcmdldENsYXNzZXMoKVxuICAgIHN0YXR1c0ljb25zID0gQHN0YXR1c0NvbnRhaW5lci5jaGlsZHJlbiAnLnZrLXRlcm1pbmFsLXN0YXR1cy1pY29uJ1xuXG4gICAgaWYgbmV3RHJvcFRhcmdldEluZGV4IDwgc3RhdHVzSWNvbnMubGVuZ3RoXG4gICAgICBlbGVtZW50ID0gc3RhdHVzSWNvbnMuZXEobmV3RHJvcFRhcmdldEluZGV4KS5hZGRDbGFzcyAnaXMtZHJvcC10YXJnZXQnXG4gICAgICBAZ2V0UGxhY2Vob2xkZXIoKS5pbnNlcnRCZWZvcmUoZWxlbWVudClcbiAgICBlbHNlXG4gICAgICBlbGVtZW50ID0gc3RhdHVzSWNvbnMuZXEobmV3RHJvcFRhcmdldEluZGV4IC0gMSkuYWRkQ2xhc3MgJ2Ryb3AtdGFyZ2V0LWlzLWFmdGVyJ1xuICAgICAgQGdldFBsYWNlaG9sZGVyKCkuaW5zZXJ0QWZ0ZXIoZWxlbWVudClcblxuICBvbkRyb3A6IChldmVudCkgPT5cbiAgICB7ZGF0YVRyYW5zZmVyfSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnRcbiAgICBwYW5lbEV2ZW50ID0gZGF0YVRyYW5zZmVyLmdldERhdGEoJ3ZrLXRlcm1pbmFsLXBhbmVsJykgaXMgJ3RydWUnXG4gICAgdGFiRXZlbnQgPSBkYXRhVHJhbnNmZXIuZ2V0RGF0YSgndmstdGVybWluYWwtdGFiJykgaXMgJ3RydWUnXG4gICAgcmV0dXJuIHVubGVzcyBwYW5lbEV2ZW50IG9yIHRhYkV2ZW50XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIHRvSW5kZXggPSBAZ2V0RHJvcFRhcmdldEluZGV4KGV2ZW50KVxuICAgIEBjbGVhckRyb3BUYXJnZXQoKVxuXG4gICAgaWYgdGFiRXZlbnRcbiAgICAgIGZyb21JbmRleCA9IHBhcnNlSW50KGRhdGFUcmFuc2Zlci5nZXREYXRhKCdzb3J0YWJsZS1pbmRleCcpKVxuICAgICAgcGFuZUluZGV4ID0gcGFyc2VJbnQoZGF0YVRyYW5zZmVyLmdldERhdGEoJ2Zyb20tcGFuZS1pbmRleCcpKVxuICAgICAgcGFuZSA9IGF0b20ud29ya3NwYWNlLmdldFBhbmVzKClbcGFuZUluZGV4XVxuICAgICAgdmlldyA9IHBhbmUuaXRlbUF0SW5kZXgoZnJvbUluZGV4KVxuICAgICAgcGFuZS5yZW1vdmVJdGVtKHZpZXcsIGZhbHNlKVxuICAgICAgdmlldy5zaG93KClcblxuICAgICAgdmlldy50b2dnbGVUYWJWaWV3KClcbiAgICAgIEB0ZXJtaW5hbFZpZXdzLnB1c2ggdmlld1xuICAgICAgdmlldy5vcGVuKCkgaWYgdmlldy5zdGF0dXNJY29uLmlzQWN0aXZlKClcbiAgICAgIEBzdGF0dXNDb250YWluZXIuYXBwZW5kIHZpZXcuc3RhdHVzSWNvblxuICAgICAgZnJvbUluZGV4ID0gQHRlcm1pbmFsVmlld3MubGVuZ3RoIC0gMVxuICAgIGVsc2VcbiAgICAgIGZyb21JbmRleCA9IHBhcnNlSW50KGRhdGFUcmFuc2Zlci5nZXREYXRhKCdmcm9tLWluZGV4JykpXG4gICAgQHVwZGF0ZU9yZGVyKGZyb21JbmRleCwgdG9JbmRleClcblxuICBvbkRyb3BUYWJCYXI6IChldmVudCwgcGFuZSkgPT5cbiAgICB7ZGF0YVRyYW5zZmVyfSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnRcbiAgICByZXR1cm4gdW5sZXNzIGRhdGFUcmFuc2Zlci5nZXREYXRhKCd2ay10ZXJtaW5hbC1wYW5lbCcpIGlzICd0cnVlJ1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgQGNsZWFyRHJvcFRhcmdldCgpXG5cbiAgICBmcm9tSW5kZXggPSBwYXJzZUludChkYXRhVHJhbnNmZXIuZ2V0RGF0YSgnZnJvbS1pbmRleCcpKVxuICAgIHZpZXcgPSBAdGVybWluYWxWaWV3c1tmcm9tSW5kZXhdXG4gICAgdmlldy5jc3MgXCJoZWlnaHRcIiwgXCJcIlxuICAgIHZpZXcudGVybWluYWwuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIlwiXG4gICAgdGFiQmFyID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy50YWItYmFyJylcblxuICAgIHZpZXcudG9nZ2xlVGFiVmlldygpXG4gICAgQHJlbW92ZVRlcm1pbmFsVmlldyB2aWV3XG4gICAgQHN0YXR1c0NvbnRhaW5lci5jaGlsZHJlbigpLmVxKGZyb21JbmRleCkuZGV0YWNoKClcbiAgICB2aWV3LnN0YXR1c0ljb24ucmVtb3ZlVG9vbHRpcCgpXG5cbiAgICBwYW5lLmFkZEl0ZW0gdmlldywgcGFuZS5nZXRJdGVtcygpLmxlbmd0aFxuICAgIHBhbmUuYWN0aXZhdGVJdGVtIHZpZXdcblxuICAgIHZpZXcuZm9jdXMoKVxuXG4gIGNsZWFyRHJvcFRhcmdldDogLT5cbiAgICBlbGVtZW50ID0gQGZpbmQoJy5pcy1kcmFnZ2luZycpXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyAnaXMtZHJhZ2dpbmcnXG4gICAgQHJlbW92ZURyb3BUYXJnZXRDbGFzc2VzKClcbiAgICBAcmVtb3ZlUGxhY2Vob2xkZXIoKVxuXG4gIHJlbW92ZURyb3BUYXJnZXRDbGFzc2VzOiAtPlxuICAgIEBzdGF0dXNDb250YWluZXIuZmluZCgnLmlzLWRyb3AtdGFyZ2V0JykucmVtb3ZlQ2xhc3MgJ2lzLWRyb3AtdGFyZ2V0J1xuICAgIEBzdGF0dXNDb250YWluZXIuZmluZCgnLmRyb3AtdGFyZ2V0LWlzLWFmdGVyJykucmVtb3ZlQ2xhc3MgJ2Ryb3AtdGFyZ2V0LWlzLWFmdGVyJ1xuXG4gIGdldERyb3BUYXJnZXRJbmRleDogKGV2ZW50KSAtPlxuICAgIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHJldHVybiBpZiBAaXNQbGFjZWhvbGRlcih0YXJnZXQpXG5cbiAgICBzdGF0dXNJY29ucyA9IEBzdGF0dXNDb250YWluZXIuY2hpbGRyZW4oJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpXG4gICAgZWxlbWVudCA9IHRhcmdldC5jbG9zZXN0KCcudmstdGVybWluYWwtc3RhdHVzLWljb24nKVxuICAgIGVsZW1lbnQgPSBzdGF0dXNJY29ucy5sYXN0KCkgaWYgZWxlbWVudC5sZW5ndGggaXMgMFxuXG4gICAgcmV0dXJuIDAgdW5sZXNzIGVsZW1lbnQubGVuZ3RoXG5cbiAgICBlbGVtZW50Q2VudGVyID0gZWxlbWVudC5vZmZzZXQoKS5sZWZ0ICsgZWxlbWVudC53aWR0aCgpIC8gMlxuXG4gICAgaWYgZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWCA8IGVsZW1lbnRDZW50ZXJcbiAgICAgIHN0YXR1c0ljb25zLmluZGV4KGVsZW1lbnQpXG4gICAgZWxzZSBpZiBlbGVtZW50Lm5leHQoJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpLmxlbmd0aCA+IDBcbiAgICAgIHN0YXR1c0ljb25zLmluZGV4KGVsZW1lbnQubmV4dCgnLnZrLXRlcm1pbmFsLXN0YXR1cy1pY29uJykpXG4gICAgZWxzZVxuICAgICAgc3RhdHVzSWNvbnMuaW5kZXgoZWxlbWVudCkgKyAxXG5cbiAgZ2V0UGxhY2Vob2xkZXI6IC0+XG4gICAgQHBsYWNlaG9sZGVyRWwgPz0gJCgnPGxpIGNsYXNzPVwicGxhY2Vob2xkZXJcIj48L2xpPicpXG5cbiAgcmVtb3ZlUGxhY2Vob2xkZXI6IC0+XG4gICAgQHBsYWNlaG9sZGVyRWw/LnJlbW92ZSgpXG4gICAgQHBsYWNlaG9sZGVyRWwgPSBudWxsXG5cbiAgaXNQbGFjZWhvbGRlcjogKGVsZW1lbnQpIC0+XG4gICAgZWxlbWVudC5pcygnLnBsYWNlaG9sZGVyJylcblxuICBpY29uQXRJbmRleDogKGluZGV4KSAtPlxuICAgIEBnZXRTdGF0dXNJY29ucygpLmVxKGluZGV4KVxuXG4gIGdldFN0YXR1c0ljb25zOiAtPlxuICAgIEBzdGF0dXNDb250YWluZXIuY2hpbGRyZW4oJy52ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicpXG5cbiAgbW92ZUljb25Ub0luZGV4OiAoaWNvbiwgdG9JbmRleCkgLT5cbiAgICBmb2xsb3dpbmdJY29uID0gQGdldFN0YXR1c0ljb25zKClbdG9JbmRleF1cbiAgICBjb250YWluZXIgPSBAc3RhdHVzQ29udGFpbmVyWzBdXG4gICAgaWYgZm9sbG93aW5nSWNvbj9cbiAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoaWNvbiwgZm9sbG93aW5nSWNvbilcbiAgICBlbHNlXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbilcblxuICBtb3ZlVGVybWluYWxWaWV3OiAoZnJvbUluZGV4LCB0b0luZGV4KSA9PlxuICAgIGFjdGl2ZVRlcm1pbmFsID0gQGdldEFjdGl2ZVRlcm1pbmFsVmlldygpXG4gICAgdmlldyA9IEB0ZXJtaW5hbFZpZXdzLnNwbGljZShmcm9tSW5kZXgsIDEpWzBdXG4gICAgQHRlcm1pbmFsVmlld3Muc3BsaWNlIHRvSW5kZXgsIDAsIHZpZXdcbiAgICBAc2V0QWN0aXZlVGVybWluYWxWaWV3IGFjdGl2ZVRlcm1pbmFsXG5cbiAgdXBkYXRlT3JkZXI6IChmcm9tSW5kZXgsIHRvSW5kZXgpIC0+XG4gICAgcmV0dXJuIGlmIGZyb21JbmRleCBpcyB0b0luZGV4XG4gICAgdG9JbmRleC0tIGlmIGZyb21JbmRleCA8IHRvSW5kZXhcblxuICAgIGljb24gPSBAZ2V0U3RhdHVzSWNvbnMoKS5lcShmcm9tSW5kZXgpLmRldGFjaCgpXG4gICAgQG1vdmVJY29uVG9JbmRleCBpY29uLmdldCgwKSwgdG9JbmRleFxuICAgIEBtb3ZlVGVybWluYWxWaWV3IGZyb21JbmRleCwgdG9JbmRleFxuICAgIGljb24uYWRkQ2xhc3MgJ2luc2VydGVkJ1xuICAgIGljb24ub25lICd3ZWJraXRBbmltYXRpb25FbmQnLCAtPiBpY29uLnJlbW92ZUNsYXNzKCdpbnNlcnRlZCcpXG4iXX0=
