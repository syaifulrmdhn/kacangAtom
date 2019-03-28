(function() {
  module.exports = {
    view: null,
    activate: function() {
      var _TriggerKey, _command, _commands, _keymap, _linuxSelector, _macSelector, _triggerKey, _windowsSelector;
      this.view = (require('./ColorPicker-view'))();
      _command = 'color-picker:open';
      _triggerKey = (atom.config.get('color-picker.triggerKey')).toLowerCase();
      _TriggerKey = _triggerKey.toUpperCase();
      _macSelector = '.platform-darwin atom-workspace';
      _windowsSelector = '.platform-win32 atom-workspace';
      _linuxSelector = '.platform-linux atom-workspace';
      _keymap = {};
      _keymap["" + _macSelector] = {};
      _keymap["" + _macSelector]["cmd-" + _TriggerKey] = _command;
      _keymap["" + _windowsSelector] = {};
      _keymap["" + _windowsSelector]["ctrl-alt-" + _triggerKey] = _command;
      _keymap["" + _linuxSelector] = {};
      _keymap["" + _linuxSelector]["ctrl-alt-" + _triggerKey] = _command;
      atom.keymaps.add('color-picker:trigger', _keymap);
      atom.contextMenu.add({
        'atom-text-editor': [
          {
            label: 'Color Picker',
            command: _command
          }
        ]
      });
      _commands = {};
      _commands["" + _command] = (function(_this) {
        return function() {
          var ref;
          if (!((ref = _this.view) != null ? ref.canOpen : void 0)) {
            return;
          }
          return _this.view.open();
        };
      })(this);
      atom.commands.add('atom-text-editor', _commands);
      return this.view.activate();
    },
    deactivate: function() {
      var ref;
      return (ref = this.view) != null ? ref.destroy() : void 0;
    },
    provideColorPicker: function() {
      return {
        open: (function(_this) {
          return function(Editor, Cursor) {
            var ref;
            if (!((ref = _this.view) != null ? ref.canOpen : void 0)) {
              return;
            }
            return _this.view.open(Editor, Cursor);
          };
        })(this)
      };
    },
    config: {
      randomColor: {
        title: 'Serve a random color on open',
        description: 'If the Color Picker doesn\'t get an input color, it serves a completely random color.',
        type: 'boolean',
        "default": true
      },
      automaticReplace: {
        title: 'Automatically Replace Color',
        description: 'Replace selected color automatically on change. Works well with as-you-type CSS reloaders.',
        type: 'boolean',
        "default": false
      },
      alphaChannelAlways: {
        title: 'Always include alpha channel value',
        description: 'Output alpha channel value, even if it is 1.0',
        type: 'boolean',
        "default": false
      },
      abbreviateValues: {
        title: 'Abbreviate Color Values',
        description: 'If possible, abbreviate color values, like for example “0.3” to “.3”,  “#ffffff” to “#fff” and “rgb(0, 0, 0)” to “rgb(0,0,0)”.',
        type: 'boolean',
        "default": false
      },
      uppercaseColorValues: {
        title: 'Uppercase Color Values',
        description: 'If sensible, uppercase the color value. For example, “#aaa” becomes “#AAA”.',
        type: 'boolean',
        "default": false
      },
      preferredFormat: {
        title: 'Preferred Color Format',
        description: 'On open, the Color Picker will show a color in this format.',
        type: 'string',
        "enum": ['RGB', 'HEX', 'HSL', 'HSV', 'VEC'],
        "default": 'RGB'
      },
      triggerKey: {
        title: 'Trigger key',
        description: 'Decide what trigger key should open the Color Picker. `CMD-SHIFT-{TRIGGER_KEY}` and `CTRL-ALT-{TRIGGER_KEY}`. Requires a restart.',
        type: 'string',
        "enum": ['C', 'E', 'H', 'K'],
        "default": 'C'
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc3lhaWYvLmF0b20vcGFja2FnZXMvY29sb3ItcGlja2VyL2xpYi9Db2xvclBpY2tlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUk7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUNJO0lBQUEsSUFBQSxFQUFNLElBQU47SUFFQSxRQUFBLEVBQVUsU0FBQTtBQUNOLFVBQUE7TUFBQSxJQUFDLENBQUEsSUFBRCxHQUFRLENBQUMsT0FBQSxDQUFRLG9CQUFSLENBQUQsQ0FBQSxDQUFBO01BQ1IsUUFBQSxHQUFXO01BSVgsV0FBQSxHQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQixDQUFELENBQTJDLENBQUMsV0FBNUMsQ0FBQTtNQUNkLFdBQUEsR0FBYyxXQUFXLENBQUMsV0FBWixDQUFBO01BR2QsWUFBQSxHQUFlO01BQ2YsZ0JBQUEsR0FBbUI7TUFDbkIsY0FBQSxHQUFpQjtNQUVqQixPQUFBLEdBQVU7TUFHVixPQUFRLENBQUEsRUFBQSxHQUFJLFlBQUosQ0FBUixHQUErQjtNQUMvQixPQUFRLENBQUEsRUFBQSxHQUFJLFlBQUosQ0FBcUIsQ0FBQSxNQUFBLEdBQVEsV0FBUixDQUE3QixHQUF1RDtNQUV2RCxPQUFRLENBQUEsRUFBQSxHQUFJLGdCQUFKLENBQVIsR0FBbUM7TUFDbkMsT0FBUSxDQUFBLEVBQUEsR0FBSSxnQkFBSixDQUF5QixDQUFBLFdBQUEsR0FBYSxXQUFiLENBQWpDLEdBQWdFO01BRWhFLE9BQVEsQ0FBQSxFQUFBLEdBQUksY0FBSixDQUFSLEdBQWlDO01BQ2pDLE9BQVEsQ0FBQSxFQUFBLEdBQUksY0FBSixDQUF1QixDQUFBLFdBQUEsR0FBYSxXQUFiLENBQS9CLEdBQThEO01BRzlELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBYixDQUFpQixzQkFBakIsRUFBeUMsT0FBekM7TUFJQSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQWpCLENBQXFCO1FBQUEsa0JBQUEsRUFBb0I7VUFDckM7WUFBQSxLQUFBLEVBQU8sY0FBUDtZQUNBLE9BQUEsRUFBUyxRQURUO1dBRHFDO1NBQXBCO09BQXJCO01BTUEsU0FBQSxHQUFZO01BQUksU0FBVSxDQUFBLEVBQUEsR0FBSSxRQUFKLENBQVYsR0FBNkIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO0FBQ3pDLGNBQUE7VUFBQSxJQUFBLGtDQUFtQixDQUFFLGlCQUFyQjtBQUFBLG1CQUFBOztpQkFDQSxLQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBQTtRQUZ5QztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7TUFHN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxTQUF0QztBQUVBLGFBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFOLENBQUE7SUExQ0QsQ0FGVjtJQThDQSxVQUFBLEVBQVksU0FBQTtBQUFHLFVBQUE7NENBQUssQ0FBRSxPQUFQLENBQUE7SUFBSCxDQTlDWjtJQWdEQSxrQkFBQSxFQUFvQixTQUFBO0FBQ2hCLGFBQU87UUFDSCxJQUFBLEVBQU0sQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQyxNQUFELEVBQVMsTUFBVDtBQUNGLGdCQUFBO1lBQUEsSUFBQSxrQ0FBbUIsQ0FBRSxpQkFBckI7QUFBQSxxQkFBQTs7QUFDQSxtQkFBTyxLQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxNQUFYLEVBQW1CLE1BQW5CO1VBRkw7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBREg7O0lBRFMsQ0FoRHBCO0lBdURBLE1BQUEsRUFFSTtNQUFBLFdBQUEsRUFDSTtRQUFBLEtBQUEsRUFBTyw4QkFBUDtRQUNBLFdBQUEsRUFBYSx1RkFEYjtRQUVBLElBQUEsRUFBTSxTQUZOO1FBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUhUO09BREo7TUFNQSxnQkFBQSxFQUNJO1FBQUEsS0FBQSxFQUFPLDZCQUFQO1FBQ0EsV0FBQSxFQUFhLDRGQURiO1FBRUEsSUFBQSxFQUFNLFNBRk47UUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSFQ7T0FQSjtNQVlBLGtCQUFBLEVBQ0k7UUFBQSxLQUFBLEVBQU8sb0NBQVA7UUFDQSxXQUFBLEVBQWEsK0NBRGI7UUFFQSxJQUFBLEVBQU0sU0FGTjtRQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FIVDtPQWJKO01BbUJBLGdCQUFBLEVBQ0k7UUFBQSxLQUFBLEVBQU8seUJBQVA7UUFDQSxXQUFBLEVBQWEsZ0lBRGI7UUFFQSxJQUFBLEVBQU0sU0FGTjtRQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FIVDtPQXBCSjtNQTBCQSxvQkFBQSxFQUNJO1FBQUEsS0FBQSxFQUFPLHdCQUFQO1FBQ0EsV0FBQSxFQUFhLDZFQURiO1FBRUEsSUFBQSxFQUFNLFNBRk47UUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSFQ7T0EzQko7TUFnQ0EsZUFBQSxFQUNJO1FBQUEsS0FBQSxFQUFPLHdCQUFQO1FBQ0EsV0FBQSxFQUFhLDZEQURiO1FBRUEsSUFBQSxFQUFNLFFBRk47UUFHQSxDQUFBLElBQUEsQ0FBQSxFQUFNLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBSE47UUFJQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSlQ7T0FqQ0o7TUF3Q0EsVUFBQSxFQUNJO1FBQUEsS0FBQSxFQUFPLGFBQVA7UUFDQSxXQUFBLEVBQWEsbUlBRGI7UUFFQSxJQUFBLEVBQU0sUUFGTjtRQUdBLENBQUEsSUFBQSxDQUFBLEVBQU0sQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FITjtRQUlBLENBQUEsT0FBQSxDQUFBLEVBQVMsR0FKVDtPQXpDSjtLQXpESjs7QUFESiIsInNvdXJjZXNDb250ZW50IjpbIiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyAgQ29sb3IgUGlja2VyXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIG1vZHVsZS5leHBvcnRzID1cbiAgICAgICAgdmlldzogbnVsbFxuXG4gICAgICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICAgICAgQHZpZXcgPSAocmVxdWlyZSAnLi9Db2xvclBpY2tlci12aWV3JykoKVxuICAgICAgICAgICAgX2NvbW1hbmQgPSAnY29sb3ItcGlja2VyOm9wZW4nXG5cbiAgICAgICAgIyAgU2V0IGtleSBiaW5kaW5nc1xuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgX3RyaWdnZXJLZXkgPSAoYXRvbS5jb25maWcuZ2V0ICdjb2xvci1waWNrZXIudHJpZ2dlcktleScpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIF9UcmlnZ2VyS2V5ID0gX3RyaWdnZXJLZXkudG9VcHBlckNhc2UoKVxuXG4gICAgICAgICAgICAjIFRPRE8gdGhpcyBkb2Vzbid0IGxvb2sgdG9vIGdvb2RcbiAgICAgICAgICAgIF9tYWNTZWxlY3RvciA9ICcucGxhdGZvcm0tZGFyd2luIGF0b20td29ya3NwYWNlJ1xuICAgICAgICAgICAgX3dpbmRvd3NTZWxlY3RvciA9ICcucGxhdGZvcm0td2luMzIgYXRvbS13b3Jrc3BhY2UnXG4gICAgICAgICAgICBfbGludXhTZWxlY3RvciA9ICcucGxhdGZvcm0tbGludXggYXRvbS13b3Jrc3BhY2UnXG5cbiAgICAgICAgICAgIF9rZXltYXAgPSB7fVxuXG4gICAgICAgICAgICAjIE1hYyBPUyBYXG4gICAgICAgICAgICBfa2V5bWFwW1wiI3sgX21hY1NlbGVjdG9yIH1cIl0gPSB7fVxuICAgICAgICAgICAgX2tleW1hcFtcIiN7IF9tYWNTZWxlY3RvciB9XCJdW1wiY21kLSN7IF9UcmlnZ2VyS2V5IH1cIl0gPSBfY29tbWFuZFxuICAgICAgICAgICAgIyBXaW5kb3dzXG4gICAgICAgICAgICBfa2V5bWFwW1wiI3sgX3dpbmRvd3NTZWxlY3RvciB9XCJdID0ge31cbiAgICAgICAgICAgIF9rZXltYXBbXCIjeyBfd2luZG93c1NlbGVjdG9yIH1cIl1bXCJjdHJsLWFsdC0jeyBfdHJpZ2dlcktleSB9XCJdID0gX2NvbW1hbmRcbiAgICAgICAgICAgICMgTGludXhcbiAgICAgICAgICAgIF9rZXltYXBbXCIjeyBfbGludXhTZWxlY3RvciB9XCJdID0ge31cbiAgICAgICAgICAgIF9rZXltYXBbXCIjeyBfbGludXhTZWxlY3RvciB9XCJdW1wiY3RybC1hbHQtI3sgX3RyaWdnZXJLZXkgfVwiXSA9IF9jb21tYW5kXG5cbiAgICAgICAgICAgICMgQWRkIHRoZSBrZXltYXBcbiAgICAgICAgICAgIGF0b20ua2V5bWFwcy5hZGQgJ2NvbG9yLXBpY2tlcjp0cmlnZ2VyJywgX2tleW1hcFxuXG4gICAgICAgICMgIEFkZCBjb250ZXh0IG1lbnUgY29tbWFuZFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgYXRvbS5jb250ZXh0TWVudS5hZGQgJ2F0b20tdGV4dC1lZGl0b3InOiBbXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb2xvciBQaWNrZXInXG4gICAgICAgICAgICAgICAgY29tbWFuZDogX2NvbW1hbmRdXG5cbiAgICAgICAgIyAgQWRkIGNvbG9yLXBpY2tlcjpvcGVuIGNvbW1hbmRcbiAgICAgICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIF9jb21tYW5kcyA9IHt9OyBfY29tbWFuZHNbXCIjeyBfY29tbWFuZCB9XCJdID0gPT5cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5sZXNzIEB2aWV3Py5jYW5PcGVuXG4gICAgICAgICAgICAgICAgQHZpZXcub3BlbigpXG4gICAgICAgICAgICBhdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS10ZXh0LWVkaXRvcicsIF9jb21tYW5kc1xuXG4gICAgICAgICAgICByZXR1cm4gQHZpZXcuYWN0aXZhdGUoKVxuXG4gICAgICAgIGRlYWN0aXZhdGU6IC0+IEB2aWV3Py5kZXN0cm95KClcblxuICAgICAgICBwcm92aWRlQ29sb3JQaWNrZXI6IC0+XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9wZW46IChFZGl0b3IsIEN1cnNvcikgPT5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVubGVzcyBAdmlldz8uY2FuT3BlblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQHZpZXcub3BlbiBFZGl0b3IsIEN1cnNvclxuICAgICAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZzpcbiAgICAgICAgICAgICMgUmFuZG9tIGNvbG9yIGNvbmZpZ3VyYXRpb246IE9uIENvbG9yIFBpY2tlciBvcGVuLCBzaG93IGEgcmFuZG9tIGNvbG9yXG4gICAgICAgICAgICByYW5kb21Db2xvcjpcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1NlcnZlIGEgcmFuZG9tIGNvbG9yIG9uIG9wZW4nXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdJZiB0aGUgQ29sb3IgUGlja2VyIGRvZXNuXFwndCBnZXQgYW4gaW5wdXQgY29sb3IsIGl0IHNlcnZlcyBhIGNvbXBsZXRlbHkgcmFuZG9tIGNvbG9yLidcbiAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgICAgICAjIEF1dG9tYXRpYyBSZXBsYWNlIGNvbmZpZ3VyYXRpb246IFJlcGxhY2UgY29sb3IgdmFsdWUgb24gY2hhbmdlXG4gICAgICAgICAgICBhdXRvbWF0aWNSZXBsYWNlOlxuICAgICAgICAgICAgICAgIHRpdGxlOiAnQXV0b21hdGljYWxseSBSZXBsYWNlIENvbG9yJ1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmVwbGFjZSBzZWxlY3RlZCBjb2xvciBhdXRvbWF0aWNhbGx5IG9uIGNoYW5nZS4gV29ya3Mgd2VsbCB3aXRoIGFzLXlvdS10eXBlIENTUyByZWxvYWRlcnMuJ1xuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgICAgICAjIEFsd2F5cyBvdXRwdXQgYWxwaGEgdmFsdWVcbiAgICAgICAgICAgIGFscGhhQ2hhbm5lbEFsd2F5czpcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0Fsd2F5cyBpbmNsdWRlIGFscGhhIGNoYW5uZWwgdmFsdWUnXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdPdXRwdXQgYWxwaGEgY2hhbm5lbCB2YWx1ZSwgZXZlbiBpZiBpdCBpcyAxLjAnXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgICAgICMgQWJicmV2aWF0ZSB2YWx1ZXMgY29uZmlndXJhdGlvbjogSWYgcG9zc2libGUsIGFiYnJldmlhdGUgY29sb3IgdmFsdWVzLiBFZy4g4oCcMC4z4oCdIHRvIOKAnC4z4oCdXG4gICAgICAgICAgICAjIFRPRE86IENhbiB3ZSBhYmJyZXZpYXRlIHNvbWV0aGluZyBlbHNlP1xuICAgICAgICAgICAgYWJicmV2aWF0ZVZhbHVlczpcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0FiYnJldmlhdGUgQ29sb3IgVmFsdWVzJ1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgcG9zc2libGUsIGFiYnJldmlhdGUgY29sb3IgdmFsdWVzLCBsaWtlIGZvciBleGFtcGxlIOKAnDAuM+KAnSB0byDigJwuM+KAnSwgIOKAnCNmZmZmZmbigJ0gdG8g4oCcI2ZmZuKAnSBhbmQg4oCccmdiKDAsIDAsIDAp4oCdIHRvIOKAnHJnYigwLDAsMCnigJ0uJ1xuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgICAgICAjIFVwcGVyY2FzZSBjb2xvciB2YWx1ZSBjb25maWd1cmF0aW9uOiBVcHBlcmNhc2UgZm9yIGV4YW1wbGUgSEVYIGNvbG9yIHZhbHVlc1xuICAgICAgICAgICAgIyBUT0RPOiBEb2VzIGl0IG1ha2Ugc2Vuc2UgdG8gdXBwZXJjYXNlIGFueXRoaW5nIG90aGVyIHRoYW4gSEVYIGNvbG9ycz9cbiAgICAgICAgICAgIHVwcGVyY2FzZUNvbG9yVmFsdWVzOlxuICAgICAgICAgICAgICAgIHRpdGxlOiAnVXBwZXJjYXNlIENvbG9yIFZhbHVlcydcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0lmIHNlbnNpYmxlLCB1cHBlcmNhc2UgdGhlIGNvbG9yIHZhbHVlLiBGb3IgZXhhbXBsZSwg4oCcI2FhYeKAnSBiZWNvbWVzIOKAnCNBQUHigJ0uJ1xuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgICAgICAjIFByZWZlcnJlZCBjb2xvciBmb3JtYXQgY29uZmlndXJhdGlvbjogU2V0IHdoYXQgY29sb3IgZm9ybWF0IHRoZSBjb2xvciBwaWNrZXIgc2hvdWxkIGRpc3BsYXkgaW5pdGlhbGx5XG4gICAgICAgICAgICBwcmVmZXJyZWRGb3JtYXQ6XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdQcmVmZXJyZWQgQ29sb3IgRm9ybWF0J1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT24gb3BlbiwgdGhlIENvbG9yIFBpY2tlciB3aWxsIHNob3cgYSBjb2xvciBpbiB0aGlzIGZvcm1hdC4nXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICAgICAgICBlbnVtOiBbJ1JHQicsICdIRVgnLCAnSFNMJywgJ0hTVicsICdWRUMnXVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICdSR0InXG4gICAgICAgICAgICAjIFRyaWdnZXIga2V5OiBTZXQgd2hhdCB0cmlnZ2VyIGtleSBvcGVucyB0aGUgY29sb3IgcGlja2VyXG4gICAgICAgICAgICAjIFRPRE8gbW9yZSBvcHRpb25zP1xuICAgICAgICAgICAgdHJpZ2dlcktleTpcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1RyaWdnZXIga2V5J1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVjaWRlIHdoYXQgdHJpZ2dlciBrZXkgc2hvdWxkIG9wZW4gdGhlIENvbG9yIFBpY2tlci4gYENNRC1TSElGVC17VFJJR0dFUl9LRVl9YCBhbmQgYENUUkwtQUxULXtUUklHR0VSX0tFWX1gLiBSZXF1aXJlcyBhIHJlc3RhcnQuJ1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgZW51bTogWydDJywgJ0UnLCAnSCcsICdLJ11cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAnQydcbiJdfQ==
