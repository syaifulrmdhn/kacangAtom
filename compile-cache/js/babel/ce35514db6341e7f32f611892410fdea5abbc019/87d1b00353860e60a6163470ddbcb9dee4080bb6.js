'use babel';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  changeUseBladeComments: null,

  config: {
    useBladeComments: {
      type: 'boolean',
      'default': true,
      description: 'Use Blade comments by default when toggling line comments'
    }
  },

  activate: function activate() {
    this.changeUseBladeComments = atom.config.observe('language-blade.useBladeComments', function (enabled) {
      var opts = { scopeSelector: ['.text.html.php.blade'] };
      if (enabled) {
        atom.config.set('editor.commentStart', '{{-- ', opts);
        atom.config.set('editor.commentEnd', ' --}}', opts);
      } else {
        atom.config.unset('editor.commentStart', opts);
        atom.config.unset('editor.commentEnd', opts);
      }
    });
  },

  deactivate: function deactivate() {
    this.changeUseBladeComments.dispose();
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3N5YWlmLy5hdG9tL3BhY2thZ2VzL2xhbmd1YWdlLWJsYWRlL2xpYi9sYW5ndWFnZS1ibGFkZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7O3FCQUVJO0FBQ2Isd0JBQXNCLEVBQUUsSUFBSTs7QUFFNUIsUUFBTSxFQUFFO0FBQ04sb0JBQWdCLEVBQUU7QUFDaEIsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxJQUFJO0FBQ2IsaUJBQVcsRUFBRSwyREFBMkQ7S0FDekU7R0FDRjs7QUFFRCxVQUFRLEVBQUMsb0JBQUc7QUFDVixRQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsVUFBQSxPQUFPLEVBQUk7QUFDOUYsVUFBTSxJQUFJLEdBQUcsRUFBQyxhQUFhLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFDLENBQUE7QUFDdEQsVUFBSSxPQUFPLEVBQUU7QUFDWCxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDckQsWUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO09BQ3BELE1BQU07QUFDTCxZQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUM5QyxZQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtPQUM3QztLQUNGLENBQUMsQ0FBQTtHQUNIOztBQUVELFlBQVUsRUFBQyxzQkFBRztBQUNaLFFBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtHQUN0QztDQUNGIiwiZmlsZSI6Ii9ob21lL3N5YWlmLy5hdG9tL3BhY2thZ2VzL2xhbmd1YWdlLWJsYWRlL2xpYi9sYW5ndWFnZS1ibGFkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2hhbmdlVXNlQmxhZGVDb21tZW50czogbnVsbCxcblxuICBjb25maWc6IHtcbiAgICB1c2VCbGFkZUNvbW1lbnRzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246ICdVc2UgQmxhZGUgY29tbWVudHMgYnkgZGVmYXVsdCB3aGVuIHRvZ2dsaW5nIGxpbmUgY29tbWVudHMnXG4gICAgfVxuICB9LFxuXG4gIGFjdGl2YXRlICgpIHtcbiAgICB0aGlzLmNoYW5nZVVzZUJsYWRlQ29tbWVudHMgPSBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsYW5ndWFnZS1ibGFkZS51c2VCbGFkZUNvbW1lbnRzJywgZW5hYmxlZCA9PiB7XG4gICAgICBjb25zdCBvcHRzID0ge3Njb3BlU2VsZWN0b3I6IFsnLnRleHQuaHRtbC5waHAuYmxhZGUnXX1cbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnZWRpdG9yLmNvbW1lbnRTdGFydCcsICd7ey0tICcsIG9wdHMpXG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnZWRpdG9yLmNvbW1lbnRFbmQnLCAnIC0tfX0nLCBvcHRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXRvbS5jb25maWcudW5zZXQoJ2VkaXRvci5jb21tZW50U3RhcnQnLCBvcHRzKVxuICAgICAgICBhdG9tLmNvbmZpZy51bnNldCgnZWRpdG9yLmNvbW1lbnRFbmQnLCBvcHRzKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5jaGFuZ2VVc2VCbGFkZUNvbW1lbnRzLmRpc3Bvc2UoKVxuICB9XG59XG4iXX0=