(function() {
  var ColorScanner, countLines;

  countLines = null;

  module.exports = ColorScanner = (function() {
    function ColorScanner(arg) {
      this.context = (arg != null ? arg : {}).context;
      this.parser = this.context.parser;
      this.registry = this.context.registry;
    }

    ColorScanner.prototype.getRegExp = function() {
      return new RegExp(this.registry.getRegExp(), 'g');
    };

    ColorScanner.prototype.getRegExpForScope = function(scope) {
      return new RegExp(this.registry.getRegExpForScope(scope), 'g');
    };

    ColorScanner.prototype.search = function(text, scope, start) {
      var color, index, lastIndex, match, matchText, regexp;
      if (start == null) {
        start = 0;
      }
      if (countLines == null) {
        countLines = require('./utils').countLines;
      }
      regexp = this.getRegExpForScope(scope);
      regexp.lastIndex = start;
      if (match = regexp.exec(text)) {
        matchText = match[0];
        lastIndex = regexp.lastIndex;
        color = this.parser.parse(matchText, scope);
        if ((index = matchText.indexOf(color.colorExpression)) > 0) {
          lastIndex += -matchText.length + index + color.colorExpression.length;
          matchText = color.colorExpression;
        }
        return {
          color: color,
          match: matchText,
          lastIndex: lastIndex,
          range: [lastIndex - matchText.length, lastIndex],
          line: countLines(text.slice(0, +(lastIndex - matchText.length) + 1 || 9e9)) - 1
        };
      }
    };

    return ColorScanner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc3lhaWYvLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLXNjYW5uZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxVQUFBLEdBQWE7O0VBRWIsTUFBTSxDQUFDLE9BQVAsR0FDTTtJQUNTLHNCQUFDLEdBQUQ7TUFBRSxJQUFDLENBQUEseUJBQUYsTUFBVyxJQUFUO01BQ2QsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDO01BQ25CLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUZWOzsyQkFJYixTQUFBLEdBQVcsU0FBQTthQUNULElBQUksTUFBSixDQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsU0FBVixDQUFBLENBQVgsRUFBa0MsR0FBbEM7SUFEUzs7MkJBR1gsaUJBQUEsR0FBbUIsU0FBQyxLQUFEO2FBQ2pCLElBQUksTUFBSixDQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsaUJBQVYsQ0FBNEIsS0FBNUIsQ0FBWCxFQUErQyxHQUEvQztJQURpQjs7MkJBR25CLE1BQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZDtBQUNOLFVBQUE7O1FBRG9CLFFBQU07O01BQzFCLElBQXdDLGtCQUF4QztRQUFDLGFBQWMsT0FBQSxDQUFRLFNBQVIsYUFBZjs7TUFFQSxNQUFBLEdBQVMsSUFBQyxDQUFBLGlCQUFELENBQW1CLEtBQW5CO01BQ1QsTUFBTSxDQUFDLFNBQVAsR0FBbUI7TUFFbkIsSUFBRyxLQUFBLEdBQVEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaLENBQVg7UUFDRyxZQUFhO1FBQ2IsWUFBYTtRQUVkLEtBQUEsR0FBUSxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLEtBQXpCO1FBSVIsSUFBRyxDQUFDLEtBQUEsR0FBUSxTQUFTLENBQUMsT0FBVixDQUFrQixLQUFLLENBQUMsZUFBeEIsQ0FBVCxDQUFBLEdBQXFELENBQXhEO1VBQ0UsU0FBQSxJQUFhLENBQUMsU0FBUyxDQUFDLE1BQVgsR0FBb0IsS0FBcEIsR0FBNEIsS0FBSyxDQUFDLGVBQWUsQ0FBQztVQUMvRCxTQUFBLEdBQVksS0FBSyxDQUFDLGdCQUZwQjs7ZUFJQTtVQUFBLEtBQUEsRUFBTyxLQUFQO1VBQ0EsS0FBQSxFQUFPLFNBRFA7VUFFQSxTQUFBLEVBQVcsU0FGWDtVQUdBLEtBQUEsRUFBTyxDQUNMLFNBQUEsR0FBWSxTQUFTLENBQUMsTUFEakIsRUFFTCxTQUZLLENBSFA7VUFPQSxJQUFBLEVBQU0sVUFBQSxDQUFXLElBQUsscURBQWhCLENBQUEsR0FBb0QsQ0FQMUQ7VUFaRjs7SUFOTTs7Ozs7QUFkViIsInNvdXJjZXNDb250ZW50IjpbImNvdW50TGluZXMgPSBudWxsXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIENvbG9yU2Nhbm5lclxuICBjb25zdHJ1Y3RvcjogKHtAY29udGV4dH09e30pIC0+XG4gICAgQHBhcnNlciA9IEBjb250ZXh0LnBhcnNlclxuICAgIEByZWdpc3RyeSA9IEBjb250ZXh0LnJlZ2lzdHJ5XG5cbiAgZ2V0UmVnRXhwOiAtPlxuICAgIG5ldyBSZWdFeHAoQHJlZ2lzdHJ5LmdldFJlZ0V4cCgpLCAnZycpXG5cbiAgZ2V0UmVnRXhwRm9yU2NvcGU6IChzY29wZSkgLT5cbiAgICBuZXcgUmVnRXhwKEByZWdpc3RyeS5nZXRSZWdFeHBGb3JTY29wZShzY29wZSksICdnJylcblxuICBzZWFyY2g6ICh0ZXh0LCBzY29wZSwgc3RhcnQ9MCkgLT5cbiAgICB7Y291bnRMaW5lc30gPSByZXF1aXJlICcuL3V0aWxzJyB1bmxlc3MgY291bnRMaW5lcz9cblxuICAgIHJlZ2V4cCA9IEBnZXRSZWdFeHBGb3JTY29wZShzY29wZSlcbiAgICByZWdleHAubGFzdEluZGV4ID0gc3RhcnRcblxuICAgIGlmIG1hdGNoID0gcmVnZXhwLmV4ZWModGV4dClcbiAgICAgIFttYXRjaFRleHRdID0gbWF0Y2hcbiAgICAgIHtsYXN0SW5kZXh9ID0gcmVnZXhwXG5cbiAgICAgIGNvbG9yID0gQHBhcnNlci5wYXJzZShtYXRjaFRleHQsIHNjb3BlKVxuXG4gICAgICAjIHJldHVybiB1bmxlc3MgY29sb3I/XG5cbiAgICAgIGlmIChpbmRleCA9IG1hdGNoVGV4dC5pbmRleE9mKGNvbG9yLmNvbG9yRXhwcmVzc2lvbikpID4gMFxuICAgICAgICBsYXN0SW5kZXggKz0gLW1hdGNoVGV4dC5sZW5ndGggKyBpbmRleCArIGNvbG9yLmNvbG9yRXhwcmVzc2lvbi5sZW5ndGhcbiAgICAgICAgbWF0Y2hUZXh0ID0gY29sb3IuY29sb3JFeHByZXNzaW9uXG5cbiAgICAgIGNvbG9yOiBjb2xvclxuICAgICAgbWF0Y2g6IG1hdGNoVGV4dFxuICAgICAgbGFzdEluZGV4OiBsYXN0SW5kZXhcbiAgICAgIHJhbmdlOiBbXG4gICAgICAgIGxhc3RJbmRleCAtIG1hdGNoVGV4dC5sZW5ndGhcbiAgICAgICAgbGFzdEluZGV4XG4gICAgICBdXG4gICAgICBsaW5lOiBjb3VudExpbmVzKHRleHRbMC4ubGFzdEluZGV4IC0gbWF0Y2hUZXh0Lmxlbmd0aF0pIC0gMVxuIl19
