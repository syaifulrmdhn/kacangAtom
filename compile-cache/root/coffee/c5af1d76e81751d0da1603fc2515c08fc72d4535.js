(function() {
  var CompositeDisposable, RenameDialog, StatusIcon,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  RenameDialog = null;

  module.exports = StatusIcon = (function(superClass) {
    extend(StatusIcon, superClass);

    function StatusIcon() {
      return StatusIcon.__super__.constructor.apply(this, arguments);
    }

    StatusIcon.prototype.active = false;

    StatusIcon.prototype.initialize = function(terminalView) {
      var ref;
      this.terminalView = terminalView;
      this.classList.add('vk-terminal-status-icon');
      this.icon = document.createElement('i');
      this.icon.classList.add('icon', 'icon-terminal');
      this.appendChild(this.icon);
      this.name = document.createElement('span');
      this.name.classList.add('name');
      this.appendChild(this.name);
      this.dataset.type = (ref = this.terminalView.constructor) != null ? ref.name : void 0;
      this.addEventListener('click', (function(_this) {
        return function(arg) {
          var ctrlKey, which;
          which = arg.which, ctrlKey = arg.ctrlKey;
          if (which === 1) {
            _this.terminalView.toggle();
            return true;
          } else if (which === 2) {
            _this.terminalView.destroy();
            return false;
          }
        };
      })(this));
      return this.setupTooltip();
    };

    StatusIcon.prototype.setupTooltip = function() {
      var onMouseEnter;
      onMouseEnter = (function(_this) {
        return function(event) {
          if (event.detail === 'vk-terminal') {
            return;
          }
          return _this.updateTooltip();
        };
      })(this);
      this.mouseEnterSubscription = {
        dispose: (function(_this) {
          return function() {
            _this.removeEventListener('mouseenter', onMouseEnter);
            return _this.mouseEnterSubscription = null;
          };
        })(this)
      };
      return this.addEventListener('mouseenter', onMouseEnter);
    };

    StatusIcon.prototype.updateTooltip = function() {
      var process;
      this.removeTooltip();
      if (process = this.terminalView.getTerminalTitle()) {
        this.tooltip = atom.tooltips.add(this, {
          title: process,
          html: false,
          delay: {
            show: 1000,
            hide: 100
          }
        });
      }
      return this.dispatchEvent(new CustomEvent('mouseenter', {
        bubbles: true,
        detail: 'vk-terminal'
      }));
    };

    StatusIcon.prototype.removeTooltip = function() {
      if (this.tooltip) {
        this.tooltip.dispose();
      }
      return this.tooltip = null;
    };

    StatusIcon.prototype.destroy = function() {
      this.removeTooltip();
      if (this.mouseEnterSubscription) {
        this.mouseEnterSubscription.dispose();
      }
      return this.remove();
    };

    StatusIcon.prototype.activate = function() {
      this.classList.add('active');
      return this.active = true;
    };

    StatusIcon.prototype.isActive = function() {
      return this.classList.contains('active');
    };

    StatusIcon.prototype.deactivate = function() {
      this.classList.remove('active');
      return this.active = false;
    };

    StatusIcon.prototype.toggle = function() {
      if (this.active) {
        this.classList.remove('active');
      } else {
        this.classList.add('active');
      }
      return this.active = !this.active;
    };

    StatusIcon.prototype.isActive = function() {
      return this.active;
    };

    StatusIcon.prototype.rename = function() {
      var dialog;
      if (RenameDialog == null) {
        RenameDialog = require('./rename-dialog');
      }
      dialog = new RenameDialog(this);
      return dialog.attach();
    };

    StatusIcon.prototype.getName = function() {
      return this.name.textContent.substring(1);
    };

    StatusIcon.prototype.updateName = function(name) {
      if (name !== this.getName()) {
        if (name) {
          name = "&nbsp;" + name;
        }
        this.name.innerHTML = name;
        return this.terminalView.emit('did-change-title');
      }
    };

    return StatusIcon;

  })(HTMLElement);

  module.exports = document.registerElement('vk-terminal-status-icon', {
    prototype: StatusIcon.prototype,
    "extends": 'li'
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc3lhaWYvLmF0b20vcGFja2FnZXMvdmstdGVybWluYWwvbGliL3N0YXR1cy1pY29uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsNkNBQUE7SUFBQTs7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUV4QixZQUFBLEdBQWU7O0VBRWYsTUFBTSxDQUFDLE9BQVAsR0FDTTs7Ozs7Ozt5QkFDSixNQUFBLEdBQVE7O3lCQUVSLFVBQUEsR0FBWSxTQUFDLFlBQUQ7QUFDVixVQUFBO01BRFcsSUFBQyxDQUFBLGVBQUQ7TUFDWCxJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsQ0FBZSx5QkFBZjtNQUVBLElBQUMsQ0FBQSxJQUFELEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkI7TUFDUixJQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFoQixDQUFvQixNQUFwQixFQUE0QixlQUE1QjtNQUNBLElBQUMsQ0FBQSxXQUFELENBQWEsSUFBQyxDQUFBLElBQWQ7TUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCO01BQ1IsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBaEIsQ0FBb0IsTUFBcEI7TUFDQSxJQUFDLENBQUEsV0FBRCxDQUFhLElBQUMsQ0FBQSxJQUFkO01BRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULHNEQUF5QyxDQUFFO01BRTNDLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixPQUFsQixFQUEyQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUMsR0FBRDtBQUN6QixjQUFBO1VBRDJCLG1CQUFPO1VBQ2xDLElBQUcsS0FBQSxLQUFTLENBQVo7WUFDRSxLQUFDLENBQUEsWUFBWSxDQUFDLE1BQWQsQ0FBQTttQkFDQSxLQUZGO1dBQUEsTUFHSyxJQUFHLEtBQUEsS0FBUyxDQUFaO1lBQ0gs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LE1BQVAsQ0FBQTtJQUhNOzt5QkFLUixPQUFBLEdBQVMsU0FBQTthQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQWxCLENBQTRCLENBQTVCO0lBQUg7O3lCQUVULFVBQUEsR0FBWSxTQUFDLElBQUQ7TUFDVixJQUFHLElBQUEsS0FBVSxJQUFDLENBQUEsT0FBRCxDQUFBLENBQWI7UUFDRSxJQUEwQixJQUExQjtVQUFBLElBQUEsR0FBTyxRQUFBLEdBQVcsS0FBbEI7O1FBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFOLEdBQWtCO2VBQ2xCLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixrQkFBbkIsRUFIRjs7SUFEVTs7OztLQXhGVzs7RUE4RnpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBQVEsQ0FBQyxlQUFULENBQXlCLHlCQUF6QixFQUFvRDtJQUFBLFNBQUEsRUFBVyxVQUFVLENBQUMsU0FBdEI7SUFBaUMsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUExQztHQUFwRDtBQW5HakIiLCJzb3VyY2VzQ29udGVudCI6WyJ7Q29tcG9zaXRlRGlzcG9zYWJsZX0gPSByZXF1aXJlICdhdG9tJ1xuXG5SZW5hbWVEaWFsb2cgPSBudWxsXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFN0YXR1c0ljb24gZXh0ZW5kcyBIVE1MRWxlbWVudFxuICBhY3RpdmU6IGZhbHNlXG5cbiAgaW5pdGlhbGl6ZTogKEB0ZXJtaW5hbFZpZXcpIC0+XG4gICAgQGNsYXNzTGlzdC5hZGQgJ3ZrLXRlcm1pbmFsLXN0YXR1cy1pY29uJ1xuXG4gICAgQGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJylcbiAgICBAaWNvbi5jbGFzc0xpc3QuYWRkICdpY29uJywgJ2ljb24tdGVybWluYWwnXG4gICAgQGFwcGVuZENoaWxkKEBpY29uKVxuXG4gICAgQG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBAbmFtZS5jbGFzc0xpc3QuYWRkICduYW1lJ1xuICAgIEBhcHBlbmRDaGlsZChAbmFtZSlcblxuICAgIEBkYXRhc2V0LnR5cGUgPSBAdGVybWluYWxWaWV3LmNvbnN0cnVjdG9yPy5uYW1lXG5cbiAgICBAYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoe3doaWNoLCBjdHJsS2V5fSkgPT5cbiAgICAgIGlmIHdoaWNoIGlzIDFcbiAgICAgICAgQHRlcm1pbmFsVmlldy50b2dnbGUoKVxuICAgICAgICB0cnVlXG4gICAgICBlbHNlIGlmIHdoaWNoIGlzIDJcbiAgICAgICAgQHRlcm1pbmFsVmlldy5kZXN0cm95KClcbiAgICAgICAgZmFsc2VcblxuICAgIEBzZXR1cFRvb2x0aXAoKVxuXG4gIHNldHVwVG9vbHRpcDogLT5cblxuICAgIG9uTW91c2VFbnRlciA9IChldmVudCkgPT5cbiAgICAgIHJldHVybiBpZiBldmVudC5kZXRhaWwgaXMgJ3ZrLXRlcm1pbmFsJ1xuICAgICAgQHVwZGF0ZVRvb2x0aXAoKVxuXG4gICAgQG1vdXNlRW50ZXJTdWJzY3JpcHRpb24gPSBkaXNwb3NlOiA9PlxuICAgICAgQHJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBvbk1vdXNlRW50ZXIpXG4gICAgICBAbW91c2VFbnRlclN1YnNjcmlwdGlvbiA9IG51bGxcblxuICAgIEBhZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgb25Nb3VzZUVudGVyKVxuXG4gIHVwZGF0ZVRvb2x0aXA6IC0+XG4gICAgQHJlbW92ZVRvb2x0aXAoKVxuXG4gICAgaWYgcHJvY2VzcyA9IEB0ZXJtaW5hbFZpZXcuZ2V0VGVybWluYWxUaXRsZSgpXG4gICAgICBAdG9vbHRpcCA9IGF0b20udG9vbHRpcHMuYWRkIHRoaXMsXG4gICAgICAgIHRpdGxlOiBwcm9jZXNzXG4gICAgICAgIGh0bWw6IGZhbHNlXG4gICAgICAgIGRlbGF5OlxuICAgICAgICAgIHNob3c6IDEwMDBcbiAgICAgICAgICBoaWRlOiAxMDBcblxuICAgIEBkaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbW91c2VlbnRlcicsIGJ1YmJsZXM6IHRydWUsIGRldGFpbDogJ3ZrLXRlcm1pbmFsJykpXG5cbiAgcmVtb3ZlVG9vbHRpcDogLT5cbiAgICBAdG9vbHRpcC5kaXNwb3NlKCkgaWYgQHRvb2x0aXBcbiAgICBAdG9vbHRpcCA9IG51bGxcblxuICBkZXN0cm95OiAtPlxuICAgIEByZW1vdmVUb29sdGlwKClcbiAgICBAbW91c2VFbnRlclN1YnNjcmlwdGlvbi5kaXNwb3NlKCkgaWYgQG1vdXNlRW50ZXJTdWJzY3JpcHRpb25cbiAgICBAcmVtb3ZlKClcblxuICBhY3RpdmF0ZTogLT5cbiAgICBAY2xhc3NMaXN0LmFkZCAnYWN0aXZlJ1xuICAgIEBhY3RpdmUgPSB0cnVlXG5cbiAgaXNBY3RpdmU6IC0+XG4gICAgQGNsYXNzTGlzdC5jb250YWlucyAnYWN0aXZlJ1xuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQGNsYXNzTGlzdC5yZW1vdmUgJ2FjdGl2ZSdcbiAgICBAYWN0aXZlID0gZmFsc2VcblxuICB0b2dnbGU6IC0+XG4gICAgaWYgQGFjdGl2ZVxuICAgICAgQGNsYXNzTGlzdC5yZW1vdmUgJ2FjdGl2ZSdcbiAgICBlbHNlXG4gICAgICBAY2xhc3NMaXN0LmFkZCAnYWN0aXZlJ1xuICAgIEBhY3RpdmUgPSAhQGFjdGl2ZVxuXG4gIGlzQWN0aXZlOiAtPlxuICAgIHJldHVybiBAYWN0aXZlXG5cbiAgcmVuYW1lOiAtPlxuICAgIFJlbmFtZURpYWxvZyA/PSByZXF1aXJlICcuL3JlbmFtZS1kaWFsb2cnXG4gICAgZGlhbG9nID0gbmV3IFJlbmFtZURpYWxvZyB0aGlzXG4gICAgZGlhbG9nLmF0dGFjaCgpXG5cbiAgZ2V0TmFtZTogLT4gQG5hbWUudGV4dENvbnRlbnQuc3Vic3RyaW5nKDEpXG5cbiAgdXBkYXRlTmFtZTogKG5hbWUpIC0+XG4gICAgaWYgbmFtZSBpc250IEBnZXROYW1lKClcbiAgICAgIG5hbWUgPSBcIiZuYnNwO1wiICsgbmFtZSBpZiBuYW1lXG4gICAgICBAbmFtZS5pbm5lckhUTUwgPSBuYW1lXG4gICAgICBAdGVybWluYWxWaWV3LmVtaXQgJ2RpZC1jaGFuZ2UtdGl0bGUnXG5cbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCd2ay10ZXJtaW5hbC1zdGF0dXMtaWNvbicsIHByb3RvdHlwZTogU3RhdHVzSWNvbi5wcm90b3R5cGUsIGV4dGVuZHM6ICdsaScpXG4iXX0=
