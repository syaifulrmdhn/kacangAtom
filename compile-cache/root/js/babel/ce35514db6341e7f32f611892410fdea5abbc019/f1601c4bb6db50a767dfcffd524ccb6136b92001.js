Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersToggleClassName = require('./helpers/toggle-class-name');

var _helpersToggleClassName2 = _interopRequireDefault(_helpersToggleClassName);

'use babel';

var classNames = {
  'native-ui-autoResizeTabs': atom.config.get('native-ui.tabs.autoResizeTabs'),
  'native-ui-macTransparency': atom.config.get('native-ui.ui.macTransparency'),
  'native-ui-seamlessScrollbars': atom.config.get('native-ui.ui.seamlessScrollbars')
};

if (atom.config.get('native-ui.ui.macTransparency')) {
  // Make sidebars transparent
  require('electron').remote.getCurrentWindow().setVibrancy('light');
}

exports['default'] = {
  activate: function activate() {
    Object.keys(classNames).forEach(function (className) {
      return (0, _helpersToggleClassName2['default'])(className, classNames[className]);
    });
  },

  deactivate: function deactivate() {
    // Reset all class names
    Object.keys(classNames).forEach(function (className) {
      return (0, _helpersToggleClassName2['default'])(className, false);
    });
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3N5YWlmLy5hdG9tL3BhY2thZ2VzL25hdGl2ZS11aS9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7c0NBRTRCLDZCQUE2Qjs7OztBQUZ6RCxXQUFXLENBQUM7O0FBSVosSUFBTSxVQUFVLEdBQUc7QUFDakIsNEJBQTBCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7QUFDNUUsNkJBQTJCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7QUFDNUUsZ0NBQThCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUM7Q0FDbkYsQ0FBQzs7QUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLEVBQUU7O0FBRW5ELFNBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDcEU7O3FCQUVjO0FBQ2IsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsVUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTO2FBQ3ZDLHlDQUFnQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQUMsQ0FDbkQsQ0FBQztHQUNIOztBQUVELFlBQVUsRUFBQSxzQkFBRzs7QUFFWCxVQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7YUFBSSx5Q0FBZ0IsU0FBUyxFQUFFLEtBQUssQ0FBQztLQUFBLENBQUMsQ0FBQztHQUNqRjtDQUNGIiwiZmlsZSI6Ii9ob21lL3N5YWlmLy5hdG9tL3BhY2thZ2VzL25hdGl2ZS11aS9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgdG9nZ2xlQ2xhc3NOYW1lIGZyb20gJy4vaGVscGVycy90b2dnbGUtY2xhc3MtbmFtZSc7XG5cbmNvbnN0IGNsYXNzTmFtZXMgPSB7XG4gICduYXRpdmUtdWktYXV0b1Jlc2l6ZVRhYnMnOiBhdG9tLmNvbmZpZy5nZXQoJ25hdGl2ZS11aS50YWJzLmF1dG9SZXNpemVUYWJzJyksXG4gICduYXRpdmUtdWktbWFjVHJhbnNwYXJlbmN5JzogYXRvbS5jb25maWcuZ2V0KCduYXRpdmUtdWkudWkubWFjVHJhbnNwYXJlbmN5JyksXG4gICduYXRpdmUtdWktc2VhbWxlc3NTY3JvbGxiYXJzJzogYXRvbS5jb25maWcuZ2V0KCduYXRpdmUtdWkudWkuc2VhbWxlc3NTY3JvbGxiYXJzJylcbn07XG5cbmlmIChhdG9tLmNvbmZpZy5nZXQoJ25hdGl2ZS11aS51aS5tYWNUcmFuc3BhcmVuY3knKSkge1xuICAvLyBNYWtlIHNpZGViYXJzIHRyYW5zcGFyZW50XG4gIHJlcXVpcmUoJ2VsZWN0cm9uJykucmVtb3RlLmdldEN1cnJlbnRXaW5kb3coKS5zZXRWaWJyYW5jeSgnbGlnaHQnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhY3RpdmF0ZSgpIHtcbiAgICBPYmplY3Qua2V5cyhjbGFzc05hbWVzKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiAoXG4gICAgICB0b2dnbGVDbGFzc05hbWUoY2xhc3NOYW1lLCBjbGFzc05hbWVzW2NsYXNzTmFtZV0pKSxcbiAgICApO1xuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgLy8gUmVzZXQgYWxsIGNsYXNzIG5hbWVzXG4gICAgT2JqZWN0LmtleXMoY2xhc3NOYW1lcykuZm9yRWFjaChjbGFzc05hbWUgPT4gdG9nZ2xlQ2xhc3NOYW1lKGNsYXNzTmFtZSwgZmFsc2UpKTtcbiAgfVxufTtcbiJdfQ==