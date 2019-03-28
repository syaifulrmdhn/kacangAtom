(function() {
  var ColorExpression, ExpressionsRegistry, SVGColors, colorRegexp, colors, comma, elmAngle, float, floatOrPercent, hexadecimal, insensitive, int, intOrPercent, namePrefixes, notQuote, optionalPercent, pe, percent, ps, ref, ref1, registry, strip, variables;

  ref = require('./regexes'), int = ref.int, float = ref.float, percent = ref.percent, optionalPercent = ref.optionalPercent, intOrPercent = ref.intOrPercent, floatOrPercent = ref.floatOrPercent, comma = ref.comma, notQuote = ref.notQuote, hexadecimal = ref.hexadecimal, ps = ref.ps, pe = ref.pe, variables = ref.variables, namePrefixes = ref.namePrefixes;

  ref1 = require('./utils'), strip = ref1.strip, insensitive = ref1.insensitive;

  ExpressionsRegistry = require('./expressions-registry');

  ColorExpression = require('./color-expression');

  SVGColors = require('./svg-colors');

  module.exports = registry = new ExpressionsRegistry(ColorExpression);

  registry.createExpression('pigments:css_hexa_8', "#(" + hexadecimal + "{8})(?![\\d\\w-])", 1, ['css', 'less', 'styl', 'stylus', 'sass', 'scss'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hexRGBA = hexa;
  });

  registry.createExpression('pigments:argb_hexa_8', "#(" + hexadecimal + "{8})(?![\\d\\w-])", ['*'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hexARGB = hexa;
  });

  registry.createExpression('pigments:css_hexa_6', "#(" + hexadecimal + "{6})(?![\\d\\w-])", ['*'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hex = hexa;
  });

  registry.createExpression('pigments:css_hexa_4', "(?:" + namePrefixes + ")#(" + hexadecimal + "{4})(?![\\d\\w-])", ['*'], function(match, expression, context) {
    var _, colorAsInt, hexa;
    _ = match[0], hexa = match[1];
    colorAsInt = context.readInt(hexa, 16);
    this.colorExpression = "#" + hexa;
    this.red = (colorAsInt >> 12 & 0xf) * 17;
    this.green = (colorAsInt >> 8 & 0xf) * 17;
    this.blue = (colorAsInt >> 4 & 0xf) * 17;
    return this.alpha = ((colorAsInt & 0xf) * 17) / 255;
  });

  registry.createExpression('pigments:css_hexa_3', "(?:" + namePrefixes + ")#(" + hexadecimal + "{3})(?![\\d\\w-])", ['*'], function(match, expression, context) {
    var _, colorAsInt, hexa;
    _ = match[0], hexa = match[1];
    colorAsInt = context.readInt(hexa, 16);
    this.colorExpression = "#" + hexa;
    this.red = (colorAsInt >> 8 & 0xf) * 17;
    this.green = (colorAsInt >> 4 & 0xf) * 17;
    return this.blue = (colorAsInt & 0xf) * 17;
  });

  registry.createExpression('pigments:int_hexa_8', "0x(" + hexadecimal + "{8})(?!" + hexadecimal + ")", ['*'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hexARGB = hexa;
  });

  registry.createExpression('pigments:int_hexa_6', "0x(" + hexadecimal + "{6})(?!" + hexadecimal + ")", ['*'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hex = hexa;
  });

  registry.createExpression('pigments:css_rgb', strip("" + (insensitive('rgb')) + ps + "\\s* (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3];
    this.red = context.readIntOrPercent(r);
    this.green = context.readIntOrPercent(g);
    this.blue = context.readIntOrPercent(b);
    return this.alpha = 1;
  });

  registry.createExpression('pigments:css_rgba', strip("" + (insensitive('rgba')) + ps + "\\s* (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
    this.red = context.readIntOrPercent(r);
    this.green = context.readIntOrPercent(g);
    this.blue = context.readIntOrPercent(b);
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:stylus_rgba', strip("rgba" + ps + "\\s* (" + notQuote + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, baseColor, subexpr;
    _ = match[0], subexpr = match[1], a = match[2];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    this.rgb = baseColor.rgb;
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:css_hsl', strip("" + (insensitive('hsl')) + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), ['css', 'sass', 'scss', 'styl', 'stylus'], function(match, expression, context) {
    var _, h, hsl, l, s;
    _ = match[0], h = match[1], s = match[2], l = match[3];
    hsl = [context.readInt(h), context.readFloat(s), context.readFloat(l)];
    if (hsl.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsl = hsl;
    return this.alpha = 1;
  });

  registry.createExpression('pigments:less_hsl', strip("hsl" + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['less'], function(match, expression, context) {
    var _, h, hsl, l, s;
    _ = match[0], h = match[1], s = match[2], l = match[3];
    hsl = [context.readInt(h), context.readFloatOrPercent(s) * 100, context.readFloatOrPercent(l) * 100];
    if (hsl.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsl = hsl;
    return this.alpha = 1;
  });

  registry.createExpression('pigments:css_hsla', strip("" + (insensitive('hsla')) + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, h, hsl, l, s;
    _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
    hsl = [context.readInt(h), context.readFloat(s), context.readFloat(l)];
    if (hsl.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsl = hsl;
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:hsv', strip("(?:" + (insensitive('hsv')) + "|" + (insensitive('hsb')) + ")" + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, h, hsv, s, v;
    _ = match[0], h = match[1], s = match[2], v = match[3];
    hsv = [context.readInt(h), context.readFloat(s), context.readFloat(v)];
    if (hsv.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsv = hsv;
    return this.alpha = 1;
  });

  registry.createExpression('pigments:hsva', strip("(?:" + (insensitive('hsva')) + "|" + (insensitive('hsba')) + ")" + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, h, hsv, s, v;
    _ = match[0], h = match[1], s = match[2], v = match[3], a = match[4];
    hsv = [context.readInt(h), context.readFloat(s), context.readFloat(v)];
    if (hsv.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsv = hsv;
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:hcg', strip("(?:" + (insensitive('hcg')) + ")" + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, c, gr, h, hcg;
    _ = match[0], h = match[1], c = match[2], gr = match[3];
    hcg = [context.readInt(h), context.readFloat(c), context.readFloat(gr)];
    if (hcg.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hcg = hcg;
    return this.alpha = 1;
  });

  registry.createExpression('pigments:hcga', strip("(?:" + (insensitive('hcga')) + ")" + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, c, gr, h, hcg;
    _ = match[0], h = match[1], c = match[2], gr = match[3], a = match[4];
    hcg = [context.readInt(h), context.readFloat(c), context.readFloat(gr)];
    if (hcg.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hcg = hcg;
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:vec4', strip("vec4" + ps + "\\s* (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + pe), ['*'], function(match, expression, context) {
    var _, a, h, l, s;
    _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
    return this.rgba = [context.readFloat(h) * 255, context.readFloat(s) * 255, context.readFloat(l) * 255, context.readFloat(a)];
  });

  registry.createExpression('pigments:hwb', strip("" + (insensitive('hwb')) + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + comma + " (" + optionalPercent + "|" + variables + ") (?:" + comma + "(" + float + "|" + variables + "))? " + pe), ['*'], function(match, expression, context) {
    var _, a, b, h, w;
    _ = match[0], h = match[1], w = match[2], b = match[3], a = match[4];
    this.hwb = [context.readInt(h), context.readFloat(w), context.readFloat(b)];
    return this.alpha = a != null ? context.readFloat(a) : 1;
  });

  registry.createExpression('pigments:cmyk', strip("" + (insensitive('cmyk')) + ps + "\\s* (" + float + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + comma + " (" + float + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, c, k, m, y;
    _ = match[0], c = match[1], m = match[2], y = match[3], k = match[4];
    return this.cmyk = [context.readFloat(c), context.readFloat(m), context.readFloat(y), context.readFloat(k)];
  });

  registry.createExpression('pigments:gray', strip("" + (insensitive('gray')) + ps + "\\s* (" + optionalPercent + "|" + variables + ") (?:" + comma + "(" + float + "|" + variables + "))? " + pe), 1, ['*'], function(match, expression, context) {
    var _, a, p;
    _ = match[0], p = match[1], a = match[2];
    p = context.readFloat(p) / 100 * 255;
    this.rgb = [p, p, p];
    return this.alpha = a != null ? context.readFloat(a) : 1;
  });

  colors = Object.keys(SVGColors.allCases);

  colorRegexp = "(?:" + namePrefixes + ")(" + (colors.join('|')) + ")\\b(?![ \\t]*[-\\.:=\\(])";

  registry.createExpression('pigments:named_colors', colorRegexp, [], function(match, expression, context) {
    var _, name;
    _ = match[0], name = match[1];
    this.colorExpression = this.name = name;
    return this.hex = context.SVGColors.allCases[name].replace('#', '');
  });

  registry.createExpression('pigments:darken', strip("darken" + ps + " (" + notQuote + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloat(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [h, s, context.clampInt(l - amount)];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:lighten', strip("lighten" + ps + " (" + notQuote + ") " + comma + " (" + optionalPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloat(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [h, s, context.clampInt(l + amount)];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:fade', strip("(?:fade|alpha)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    this.rgb = baseColor.rgb;
    return this.alpha = amount;
  });

  registry.createExpression('pigments:transparentize', strip("(?:transparentize|fadeout|fade-out|fade_out)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    this.rgb = baseColor.rgb;
    return this.alpha = context.clamp(baseColor.alpha - amount);
  });

  registry.createExpression('pigments:opacify', strip("(?:opacify|fadein|fade-in|fade_in)" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    this.rgb = baseColor.rgb;
    return this.alpha = context.clamp(baseColor.alpha + amount);
  });

  registry.createExpression('pigments:stylus_component_functions', strip("(red|green|blue)" + ps + " (" + notQuote + ") " + comma + " (" + int + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, channel, subexpr;
    _ = match[0], channel = match[1], subexpr = match[2], amount = match[3];
    amount = context.readInt(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    if (isNaN(amount)) {
      return this.invalid = true;
    }
    return this[channel] = amount;
  });

  registry.createExpression('pigments:transparentify', strip("transparentify" + ps + " (" + notQuote + ") " + pe), ['*'], function(match, expression, context) {
    var _, alpha, bestAlpha, bottom, expr, processChannel, ref2, top;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), top = ref2[0], bottom = ref2[1], alpha = ref2[2];
    top = context.readColor(top);
    bottom = context.readColor(bottom);
    alpha = context.readFloatOrPercent(alpha);
    if (context.isInvalid(top)) {
      return this.invalid = true;
    }
    if ((bottom != null) && context.isInvalid(bottom)) {
      return this.invalid = true;
    }
    if (bottom == null) {
      bottom = new context.Color(255, 255, 255, 1);
    }
    if (isNaN(alpha)) {
      alpha = void 0;
    }
    bestAlpha = ['red', 'green', 'blue'].map(function(channel) {
      var res;
      res = (top[channel] - bottom[channel]) / ((0 < top[channel] - bottom[channel] ? 255 : 0) - bottom[channel]);
      return res;
    }).sort(function(a, b) {
      return a < b;
    })[0];
    processChannel = function(channel) {
      if (bestAlpha === 0) {
        return bottom[channel];
      } else {
        return bottom[channel] + (top[channel] - bottom[channel]) / bestAlpha;
      }
    };
    if (alpha != null) {
      bestAlpha = alpha;
    }
    bestAlpha = Math.max(Math.min(bestAlpha, 1), 0);
    this.red = processChannel('red');
    this.green = processChannel('green');
    this.blue = processChannel('blue');
    return this.alpha = Math.round(bestAlpha * 100) / 100;
  });

  registry.createExpression('pigments:hue', strip("hue" + ps + " (" + notQuote + ") " + comma + " (" + int + "deg|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloat(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    if (isNaN(amount)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [amount % 360, s, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:stylus_sl_component_functions', strip("(saturation|lightness)" + ps + " (" + notQuote + ") " + comma + " (" + intOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, channel, subexpr;
    _ = match[0], channel = match[1], subexpr = match[2], amount = match[3];
    amount = context.readInt(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    if (isNaN(amount)) {
      return this.invalid = true;
    }
    baseColor[channel] = amount;
    return this.rgba = baseColor.rgba;
  });

  registry.createExpression('pigments:adjust-hue', strip("adjust-hue" + ps + " (" + notQuote + ") " + comma + " (-?" + int + "deg|" + variables + "|-?" + optionalPercent + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloat(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [(h + amount) % 360, s, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:mix', "mix" + ps + "(" + notQuote + ")" + pe, ['*'], function(match, expression, context) {
    var _, amount, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1], amount = ref2[2];
    if (amount != null) {
      amount = context.readFloatOrPercent(amount);
    } else {
      amount = 0.5;
    }
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = context.mixColors(baseColor1, baseColor2, amount), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:stylus_tint', strip("tint" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['styl', 'stylus', 'less'], function(match, expression, context) {
    var _, amount, baseColor, subexpr, white;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    white = new context.Color(255, 255, 255);
    return this.rgba = context.mixColors(white, baseColor, amount).rgba;
  });

  registry.createExpression('pigments:stylus_shade', strip("shade" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['styl', 'stylus', 'less'], function(match, expression, context) {
    var _, amount, baseColor, black, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    black = new context.Color(0, 0, 0);
    return this.rgba = context.mixColors(black, baseColor, amount).rgba;
  });

  registry.createExpression('pigments:compass_tint', strip("tint" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['sass:compass', 'scss:compass'], function(match, expression, context) {
    var _, amount, baseColor, subexpr, white;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    white = new context.Color(255, 255, 255);
    return this.rgba = context.mixColors(baseColor, white, amount).rgba;
  });

  registry.createExpression('pigments:compass_shade', strip("shade" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['sass:compass', 'scss:compass'], function(match, expression, context) {
    var _, amount, baseColor, black, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    black = new context.Color(0, 0, 0);
    return this.rgba = context.mixColors(baseColor, black, amount).rgba;
  });

  registry.createExpression('pigments:bourbon_tint', strip("tint" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['sass:bourbon', 'scss:bourbon'], function(match, expression, context) {
    var _, amount, baseColor, subexpr, white;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    white = new context.Color(255, 255, 255);
    return this.rgba = context.mixColors(white, baseColor, amount).rgba;
  });

  registry.createExpression('pigments:bourbon_shade', strip("shade" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['sass:bourbon', 'scss:bourbon'], function(match, expression, context) {
    var _, amount, baseColor, black, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    black = new context.Color(0, 0, 0);
    return this.rgba = context.mixColors(black, baseColor, amount).rgba;
  });

  registry.createExpression('pigments:desaturate', "desaturate" + ps + "(" + notQuote + ")" + comma + "(" + floatOrPercent + "|" + variables + ")" + pe, ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [h, context.clampInt(s - amount * 100), l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:saturate', strip("saturate" + ps + " (" + notQuote + ") " + comma + " (" + floatOrPercent + "|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, amount, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], amount = match[2];
    amount = context.readFloatOrPercent(amount);
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [h, context.clampInt(s + amount * 100), l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:grayscale', "gr(?:a|e)yscale" + ps + "(" + notQuote + ")" + pe, ['*'], function(match, expression, context) {
    var _, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [h, 0, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:invert', "invert" + ps + "(" + notQuote + ")" + pe, ['*'], function(match, expression, context) {
    var _, b, baseColor, g, r, ref2, subexpr;
    _ = match[0], subexpr = match[1];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.rgb, r = ref2[0], g = ref2[1], b = ref2[2];
    this.rgb = [255 - r, 255 - g, 255 - b];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:complement', "complement" + ps + "(" + notQuote + ")" + pe, ['*'], function(match, expression, context) {
    var _, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [(h + 180) % 360, s, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:spin', strip("spin" + ps + " (" + notQuote + ") " + comma + " (-?(" + int + ")(deg)?|" + variables + ") " + pe), ['*'], function(match, expression, context) {
    var _, angle, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1], angle = match[2];
    baseColor = context.readColor(subexpr);
    angle = context.readInt(angle);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [(360 + h + angle) % 360, s, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:contrast_n_arguments', strip("contrast" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, base, baseColor, dark, expr, light, ref2, ref3, res, threshold;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), base = ref2[0], dark = ref2[1], light = ref2[2], threshold = ref2[3];
    baseColor = context.readColor(base);
    dark = context.readColor(dark);
    light = context.readColor(light);
    if (threshold != null) {
      threshold = context.readPercent(threshold);
    }
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    if (dark != null ? dark.invalid : void 0) {
      return this.invalid = true;
    }
    if (light != null ? light.invalid : void 0) {
      return this.invalid = true;
    }
    res = context.contrast(baseColor, dark, light);
    if (context.isInvalid(res)) {
      return this.invalid = true;
    }
    return ref3 = context.contrast(baseColor, dark, light, threshold), this.rgb = ref3.rgb, ref3;
  });

  registry.createExpression('pigments:contrast_1_argument', strip("contrast" + ps + " (" + notQuote + ") " + pe), ['*'], function(match, expression, context) {
    var _, baseColor, ref2, subexpr;
    _ = match[0], subexpr = match[1];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    return ref2 = context.contrast(baseColor), this.rgb = ref2.rgb, ref2;
  });

  registry.createExpression('pigments:css_color_function', "(?:" + namePrefixes + ")(" + (insensitive('color')) + ps + "(" + notQuote + ")" + pe + ")", ['css'], function(match, expression, context) {
    var _, cssColor, e, expr, k, ref2, rgba, v;
    try {
      _ = match[0], expr = match[1];
      ref2 = context.vars;
      for (k in ref2) {
        v = ref2[k];
        expr = expr.replace(RegExp("" + (k.replace(/\(/g, '\\(').replace(/\)/g, '\\)')), "g"), v.value);
      }
      cssColor = require('css-color-function');
      rgba = cssColor.convert(expr.toLowerCase());
      this.rgba = context.readColor(rgba).rgba;
      return this.colorExpression = expr;
    } catch (error) {
      e = error;
      return this.invalid = true;
    }
  });

  registry.createExpression('pigments:sass_adjust_color', "adjust-color" + ps + "(" + notQuote + ")" + pe, 1, ['*'], function(match, expression, context) {
    var _, baseColor, i, len, param, params, res, subexpr, subject;
    _ = match[0], subexpr = match[1];
    res = context.split(subexpr);
    subject = res[0];
    params = res.slice(1);
    baseColor = context.readColor(subject);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    for (i = 0, len = params.length; i < len; i++) {
      param = params[i];
      context.readParam(param, function(name, value) {
        return baseColor[name] += context.readFloat(value);
      });
    }
    return this.rgba = baseColor.rgba;
  });

  registry.createExpression('pigments:sass_scale_color', "scale-color" + ps + "(" + notQuote + ")" + pe, 1, ['*'], function(match, expression, context) {
    var MAX_PER_COMPONENT, _, baseColor, i, len, param, params, res, subexpr, subject;
    MAX_PER_COMPONENT = {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
      hue: 360,
      saturation: 100,
      lightness: 100
    };
    _ = match[0], subexpr = match[1];
    res = context.split(subexpr);
    subject = res[0];
    params = res.slice(1);
    baseColor = context.readColor(subject);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    for (i = 0, len = params.length; i < len; i++) {
      param = params[i];
      context.readParam(param, function(name, value) {
        var dif, result;
        value = context.readFloat(value) / 100;
        result = value > 0 ? (dif = MAX_PER_COMPONENT[name] - baseColor[name], result = baseColor[name] + dif * value) : result = baseColor[name] * (1 + value);
        return baseColor[name] = result;
      });
    }
    return this.rgba = baseColor.rgba;
  });

  registry.createExpression('pigments:sass_change_color', "change-color" + ps + "(" + notQuote + ")" + pe, 1, ['*'], function(match, expression, context) {
    var _, baseColor, i, len, param, params, res, subexpr, subject;
    _ = match[0], subexpr = match[1];
    res = context.split(subexpr);
    subject = res[0];
    params = res.slice(1);
    baseColor = context.readColor(subject);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    for (i = 0, len = params.length; i < len; i++) {
      param = params[i];
      context.readParam(param, function(name, value) {
        return baseColor[name] = context.readFloat(value);
      });
    }
    return this.rgba = baseColor.rgba;
  });

  registry.createExpression('pigments:stylus_blend', strip("blend" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return this.rgba = [baseColor1.red * baseColor1.alpha + baseColor2.red * (1 - baseColor1.alpha), baseColor1.green * baseColor1.alpha + baseColor2.green * (1 - baseColor1.alpha), baseColor1.blue * baseColor1.alpha + baseColor2.blue * (1 - baseColor1.alpha), baseColor1.alpha + baseColor2.alpha - baseColor1.alpha * baseColor2.alpha];
  });

  registry.createExpression('pigments:lua_rgba', strip("(?:" + namePrefixes + ")Color" + ps + "\\s* (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + comma + " (" + int + "|" + variables + ") " + pe), ['lua'], function(match, expression, context) {
    var _, a, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
    this.red = context.readInt(r);
    this.green = context.readInt(g);
    this.blue = context.readInt(b);
    return this.alpha = context.readInt(a) / 255;
  });

  registry.createExpression('pigments:multiply', strip("multiply" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.MULTIPLY), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:screen', strip("screen" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.SCREEN), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:overlay', strip("overlay" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.OVERLAY), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:softlight', strip("softlight" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.SOFT_LIGHT), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:hardlight', strip("hardlight" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.HARD_LIGHT), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:difference', strip("difference" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.DIFFERENCE), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:exclusion', strip("exclusion" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.EXCLUSION), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:average', strip("average" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.AVERAGE), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:negation', strip("negation" + ps + " ( " + notQuote + " " + comma + " " + notQuote + " ) " + pe), ['*'], function(match, expression, context) {
    var _, baseColor1, baseColor2, color1, color2, expr, ref2, ref3;
    _ = match[0], expr = match[1];
    ref2 = context.split(expr), color1 = ref2[0], color2 = ref2[1];
    baseColor1 = context.readColor(color1);
    baseColor2 = context.readColor(color2);
    if (context.isInvalid(baseColor1) || context.isInvalid(baseColor2)) {
      return this.invalid = true;
    }
    return ref3 = baseColor1.blend(baseColor2, context.BlendModes.NEGATION), this.rgba = ref3.rgba, ref3;
  });

  registry.createExpression('pigments:elm_rgba', strip("rgba\\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), ['elm'], function(match, expression, context) {
    var _, a, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
    this.red = context.readInt(r);
    this.green = context.readInt(g);
    this.blue = context.readInt(b);
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:elm_rgb', strip("rgb\\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ") \\s+ (" + int + "|" + variables + ")"), ['elm'], function(match, expression, context) {
    var _, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3];
    this.red = context.readInt(r);
    this.green = context.readInt(g);
    return this.blue = context.readInt(b);
  });

  elmAngle = "(?:" + float + "|\\(degrees\\s+(?:" + int + "|" + variables + ")\\))";

  registry.createExpression('pigments:elm_hsl', strip("hsl\\s+ (" + elmAngle + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), ['elm'], function(match, expression, context) {
    var _, elmDegreesRegexp, h, hsl, l, m, s;
    elmDegreesRegexp = new RegExp("\\(degrees\\s+(" + context.int + "|" + context.variablesRE + ")\\)");
    _ = match[0], h = match[1], s = match[2], l = match[3];
    if (m = elmDegreesRegexp.exec(h)) {
      h = context.readInt(m[1]);
    } else {
      h = context.readFloat(h) * 180 / Math.PI;
    }
    hsl = [h, context.readFloat(s), context.readFloat(l)];
    if (hsl.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsl = hsl;
    return this.alpha = 1;
  });

  registry.createExpression('pigments:elm_hsla', strip("hsla\\s+ (" + elmAngle + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ") \\s+ (" + float + "|" + variables + ")"), ['elm'], function(match, expression, context) {
    var _, a, elmDegreesRegexp, h, hsl, l, m, s;
    elmDegreesRegexp = new RegExp("\\(degrees\\s+(" + context.int + "|" + context.variablesRE + ")\\)");
    _ = match[0], h = match[1], s = match[2], l = match[3], a = match[4];
    if (m = elmDegreesRegexp.exec(h)) {
      h = context.readInt(m[1]);
    } else {
      h = context.readFloat(h) * 180 / Math.PI;
    }
    hsl = [h, context.readFloat(s), context.readFloat(l)];
    if (hsl.some(function(v) {
      return (v == null) || isNaN(v);
    })) {
      return this.invalid = true;
    }
    this.hsl = hsl;
    return this.alpha = context.readFloat(a);
  });

  registry.createExpression('pigments:elm_grayscale', "gr(?:a|e)yscale\\s+(" + float + "|" + variables + ")", ['elm'], function(match, expression, context) {
    var _, amount;
    _ = match[0], amount = match[1];
    amount = Math.floor(255 - context.readFloat(amount) * 255);
    return this.rgb = [amount, amount, amount];
  });

  registry.createExpression('pigments:elm_complement', strip("complement\\s+(" + notQuote + ")"), ['elm'], function(match, expression, context) {
    var _, baseColor, h, l, ref2, s, subexpr;
    _ = match[0], subexpr = match[1];
    baseColor = context.readColor(subexpr);
    if (context.isInvalid(baseColor)) {
      return this.invalid = true;
    }
    ref2 = baseColor.hsl, h = ref2[0], s = ref2[1], l = ref2[2];
    this.hsl = [(h + 180) % 360, s, l];
    return this.alpha = baseColor.alpha;
  });

  registry.createExpression('pigments:latex_gray', strip("\\[gray\\]\\{(" + float + ")\\}"), ['tex'], function(match, expression, context) {
    var _, amount;
    _ = match[0], amount = match[1];
    amount = context.readFloat(amount) * 255;
    return this.rgb = [amount, amount, amount];
  });

  registry.createExpression('pigments:latex_html', strip("\\[HTML\\]\\{(" + hexadecimal + "{6})\\}"), ['tex'], function(match, expression, context) {
    var _, hexa;
    _ = match[0], hexa = match[1];
    return this.hex = hexa;
  });

  registry.createExpression('pigments:latex_rgb', strip("\\[rgb\\]\\{(" + float + ")" + comma + "(" + float + ")" + comma + "(" + float + ")\\}"), ['tex'], function(match, expression, context) {
    var _, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3];
    r = Math.floor(context.readFloat(r) * 255);
    g = Math.floor(context.readFloat(g) * 255);
    b = Math.floor(context.readFloat(b) * 255);
    return this.rgb = [r, g, b];
  });

  registry.createExpression('pigments:latex_RGB', strip("\\[RGB\\]\\{(" + int + ")" + comma + "(" + int + ")" + comma + "(" + int + ")\\}"), ['tex'], function(match, expression, context) {
    var _, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3];
    r = context.readInt(r);
    g = context.readInt(g);
    b = context.readInt(b);
    return this.rgb = [r, g, b];
  });

  registry.createExpression('pigments:latex_cmyk', strip("\\[cmyk\\]\\{(" + float + ")" + comma + "(" + float + ")" + comma + "(" + float + ")" + comma + "(" + float + ")\\}"), ['tex'], function(match, expression, context) {
    var _, c, k, m, y;
    _ = match[0], c = match[1], m = match[2], y = match[3], k = match[4];
    c = context.readFloat(c);
    m = context.readFloat(m);
    y = context.readFloat(y);
    k = context.readFloat(k);
    return this.cmyk = [c, m, y, k];
  });

  registry.createExpression('pigments:latex_predefined', strip('\\{(black|blue|brown|cyan|darkgray|gray|green|lightgray|lime|magenta|olive|orange|pink|purple|red|teal|violet|white|yellow)\\}'), ['tex'], function(match, expression, context) {
    var _, name;
    _ = match[0], name = match[1];
    return this.hex = context.SVGColors.allCases[name].replace('#', '');
  });

  registry.createExpression('pigments:latex_predefined_dvipnames', strip('\\{(Apricot|Aquamarine|Bittersweet|Black|Blue|BlueGreen|BlueViolet|BrickRed|Brown|BurntOrange|CadetBlue|CarnationPink|Cerulean|CornflowerBlue|Cyan|Dandelion|DarkOrchid|Emerald|ForestGreen|Fuchsia|Goldenrod|Gray|Green|GreenYellow|JungleGreen|Lavender|LimeGreen|Magenta|Mahogany|Maroon|Melon|MidnightBlue|Mulberry|NavyBlue|OliveGreen|Orange|OrangeRed|Orchid|Peach|Periwinkle|PineGreen|Plum|ProcessBlue|Purple|RawSienna|Red|RedOrange|RedViolet|Rhodamine|RoyalBlue|RoyalPurple|RubineRed|Salmon|SeaGreen|Sepia|SkyBlue|SpringGreen|Tan|TealBlue|Thistle|Turquoise|Violet|VioletRed|White|WildStrawberry|Yellow|YellowGreen|YellowOrange)\\}'), ['tex'], function(match, expression, context) {
    var _, name;
    _ = match[0], name = match[1];
    return this.hex = context.DVIPnames[name].replace('#', '');
  });

  registry.createExpression('pigments:latex_mix', strip('\\{([^!\\n\\}]+[!][^\\}\\n]+)\\}'), ['tex'], function(match, expression, context) {
    var _, expr, mix, nextColor, op, triplet;
    _ = match[0], expr = match[1];
    op = expr.split('!');
    mix = function(arg) {
      var a, b, colorA, colorB, p;
      a = arg[0], p = arg[1], b = arg[2];
      colorA = a instanceof context.Color ? a : context.readColor("{" + a + "}");
      colorB = b instanceof context.Color ? b : context.readColor("{" + b + "}");
      percent = context.readInt(p);
      return context.mixColors(colorA, colorB, percent / 100);
    };
    if (op.length === 2) {
      op.push(new context.Color(255, 255, 255));
    }
    nextColor = null;
    while (op.length > 0) {
      triplet = op.splice(0, 3);
      nextColor = mix(triplet);
      if (op.length > 0) {
        op.unshift(nextColor);
      }
    }
    return this.rgb = nextColor.rgb;
  });

  registry.createExpression('pigments:qt_rgba', strip("Qt\\.rgba" + ps + "\\s* (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + comma + " (" + float + ") " + pe), ['qml', 'c', 'cc', 'cpp'], 1, function(match, expression, context) {
    var _, a, b, g, r;
    _ = match[0], r = match[1], g = match[2], b = match[3], a = match[4];
    this.red = context.readFloat(r) * 255;
    this.green = context.readFloat(g) * 255;
    this.blue = context.readFloat(b) * 255;
    return this.alpha = context.readFloat(a);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc3lhaWYvLmF0b20vcGFja2FnZXMvcGlnbWVudHMvbGliL2NvbG9yLWV4cHJlc3Npb25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsTUFjSSxPQUFBLENBQVEsV0FBUixDQWRKLEVBQ0UsYUFERixFQUVFLGlCQUZGLEVBR0UscUJBSEYsRUFJRSxxQ0FKRixFQUtFLCtCQUxGLEVBTUUsbUNBTkYsRUFPRSxpQkFQRixFQVFFLHVCQVJGLEVBU0UsNkJBVEYsRUFVRSxXQVZGLEVBV0UsV0FYRixFQVlFLHlCQVpGLEVBYUU7O0VBR0YsT0FBdUIsT0FBQSxDQUFRLFNBQVIsQ0FBdkIsRUFBQyxrQkFBRCxFQUFROztFQUVSLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSx3QkFBUjs7RUFDdEIsZUFBQSxHQUFrQixPQUFBLENBQVEsb0JBQVI7O0VBQ2xCLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUjs7RUFFWixNQUFNLENBQUMsT0FBUCxHQUNBLFFBQUEsR0FBVyxJQUFJLG1CQUFKLENBQXdCLGVBQXhCOztFQVdYLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixxQkFBMUIsRUFBaUQsSUFBQSxHQUFLLFdBQUwsR0FBaUIsbUJBQWxFLEVBQXNGLENBQXRGLEVBQXlGLENBQUMsS0FBRCxFQUFRLE1BQVIsRUFBZ0IsTUFBaEIsRUFBd0IsUUFBeEIsRUFBa0MsTUFBbEMsRUFBMEMsTUFBMUMsQ0FBekYsRUFBNEksU0FBQyxLQUFELEVBQVEsVUFBUixFQUFvQixPQUFwQjtBQUMxSSxRQUFBO0lBQUMsWUFBRCxFQUFJO1dBRUosSUFBQyxDQUFBLE9BQUQsR0FBVztFQUgrSCxDQUE1STs7RUFNQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsc0JBQTFCLEVBQWtELElBQUEsR0FBSyxXQUFMLEdBQWlCLG1CQUFuRSxFQUF1RixDQUFDLEdBQUQsQ0FBdkYsRUFBOEYsU0FBQyxLQUFELEVB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R0FBUixFQUFhLElBQWIsRUFBbUIsS0FBbkIsQ0FWSixFQVUrQixDQVYvQixFQVVrQyxTQUFDLEtBQUQsRUFBUSxVQUFSLEVBQW9CLE9BQXBCO0FBQ2hDLFFBQUE7SUFBQyxZQUFELEVBQUcsWUFBSCxFQUFLLFlBQUwsRUFBTyxZQUFQLEVBQVM7SUFFVCxJQUFDLENBQUEsR0FBRCxHQUFPLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQWxCLENBQUEsR0FBdUI7SUFDOUIsSUFBQyxDQUFBLEtBQUQsR0FBUyxPQUFPLENBQUMsU0FBUixDQUFrQixDQUFsQixDQUFBLEdBQXVCO0lBQ2hDLElBQUMsQ0FBQSxJQUFELEdBQVEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBbEIsQ0FBQSxHQUF1QjtXQUMvQixJQUFDLENBQUEsS0FBRCxHQUFTLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQWxCO0VBTnVCLENBVmxDO0FBdDZDQSIsInNvdXJjZXNDb250ZW50IjpbIntcbiAgaW50XG4gIGZsb2F0XG4gIHBlcmNlbnRcbiAgb3B0aW9uYWxQZXJjZW50XG4gIGludE9yUGVyY2VudFxuICBmbG9hdE9yUGVyY2VudFxuICBjb21tYVxuICBub3RRdW90ZVxuICBoZXhhZGVjaW1hbFxuICBwc1xuICBwZVxuICB2YXJpYWJsZXNcbiAgbmFtZVByZWZpeGVzXG59ID0gcmVxdWlyZSAnLi9yZWdleGVzJ1xuXG57c3RyaXAsIGluc2Vuc2l0aXZlfSA9IHJlcXVpcmUgJy4vdXRpbHMnXG5cbkV4cHJlc3Npb25zUmVnaXN0cnkgPSByZXF1aXJlICcuL2V4cHJlc3Npb25zLXJlZ2lzdHJ5J1xuQ29sb3JFeHByZXNzaW9uID0gcmVxdWlyZSAnLi9jb2xvci1leHByZXNzaW9uJ1xuU1ZHQ29sb3JzID0gcmVxdWlyZSAnLi9zdmctY29sb3JzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5yZWdpc3RyeSA9IG5ldyBFeHByZXNzaW9uc1JlZ2lzdHJ5KENvbG9yRXhwcmVzc2lvbilcblxuIyMgICAgIyMgICAgICAgIyMjIyAjIyMjIyMjIyAjIyMjIyMjIyAjIyMjIyMjIyAgICAgIyMjICAgICMjXG4jIyAgICAjIyAgICAgICAgIyMgICAgICMjICAgICMjICAgICAgICMjICAgICAjIyAgICMjICMjICAgIyNcbiMjICAgICMjICAgICAgICAjIyAgICAgIyMgICAgIyMgICAgICAgIyMgICAgICMjICAjIyAgICMjICAjI1xuIyMgICAgIyMgICAgICAgICMjICAgICAjIyAgICAjIyMjIyMgICAjIyMjIyMjIyAgIyMgICAgICMjICMjXG4jIyAgICAjIyAgICAgICAgIyMgICAgICMjICAgICMjICAgICAgICMjICAgIyMgICAjIyMjIyMjIyMgIyNcbiMjICAgICMjICAgICAgICAjIyAgICAgIyMgICAgIyMgICAgICAgIyMgICAgIyMgICMjICAgICAjIyAjI1xuIyMgICAgIyMjIyMjIyMgIyMjIyAgICAjIyAgICAjIyMjIyMjIyAjIyAgICAgIyMgIyMgICAgICMjICMjIyMjIyMjXG5cbiMgIzZmMzQ4OWVmXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpjc3NfaGV4YV84JywgXCIjKCN7aGV4YWRlY2ltYWx9ezh9KSg/IVtcXFxcZFxcXFx3LV0pXCIsIDEsIFsnY3NzJywgJ2xlc3MnLCAnc3R5bCcsICdzdHlsdXMnLCAnc2FzcycsICdzY3NzJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGhleGFdID0gbWF0Y2hcblxuICBAaGV4UkdCQSA9IGhleGFcblxuIyAjNmYzNDg5ZWZcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmFyZ2JfaGV4YV84JywgXCIjKCN7aGV4YWRlY2ltYWx9ezh9KSg/IVtcXFxcZFxcXFx3LV0pXCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBoZXhhXSA9IG1hdGNoXG5cbiAgQGhleEFSR0IgPSBoZXhhXG5cbiMgIzM0ODllZlxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6Y3NzX2hleGFfNicsIFwiIygje2hleGFkZWNpbWFsfXs2fSkoPyFbXFxcXGRcXFxcdy1dKVwiLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgaGV4YV0gPSBtYXRjaFxuXG4gIEBoZXggPSBoZXhhXG5cbiMgIzZmMzRcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNzc19oZXhhXzQnLCBcIig/OiN7bmFtZVByZWZpeGVzfSkjKCN7aGV4YWRlY2ltYWx9ezR9KSg/IVtcXFxcZFxcXFx3LV0pXCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBoZXhhXSA9IG1hdGNoXG4gIGNvbG9yQXNJbnQgPSBjb250ZXh0LnJlYWRJbnQoaGV4YSwgMTYpXG5cbiAgQGNvbG9yRXhwcmVzc2lvbiA9IFwiIyN7aGV4YX1cIlxuICBAcmVkID0gKGNvbG9yQXNJbnQgPj4gMTIgJiAweGYpICogMTdcbiAgQGdyZWVuID0gKGNvbG9yQXNJbnQgPj4gOCAmIDB4ZikgKiAxN1xuICBAYmx1ZSA9IChjb2xvckFzSW50ID4+IDQgJiAweGYpICogMTdcbiAgQGFscGhhID0gKChjb2xvckFzSW50ICYgMHhmKSAqIDE3KSAvIDI1NVxuXG4jICMzOGVcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNzc19oZXhhXzMnLCBcIig/OiN7bmFtZVByZWZpeGVzfSkjKCN7aGV4YWRlY2ltYWx9ezN9KSg/IVtcXFxcZFxcXFx3LV0pXCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBoZXhhXSA9IG1hdGNoXG4gIGNvbG9yQXNJbnQgPSBjb250ZXh0LnJlYWRJbnQoaGV4YSwgMTYpXG5cbiAgQGNvbG9yRXhwcmVzc2lvbiA9IFwiIyN7aGV4YX1cIlxuICBAcmVkID0gKGNvbG9yQXNJbnQgPj4gOCAmIDB4ZikgKiAxN1xuICBAZ3JlZW4gPSAoY29sb3JBc0ludCA+PiA0ICYgMHhmKSAqIDE3XG4gIEBibHVlID0gKGNvbG9yQXNJbnQgJiAweGYpICogMTdcblxuIyAweGFiMzQ4OWVmXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czppbnRfaGV4YV84JywgXCIweCgje2hleGFkZWNpbWFsfXs4fSkoPyEje2hleGFkZWNpbWFsfSlcIiwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGhleGFdID0gbWF0Y2hcblxuICBAaGV4QVJHQiA9IGhleGFcblxuIyAweDM0ODllZlxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6aW50X2hleGFfNicsIFwiMHgoI3toZXhhZGVjaW1hbH17Nn0pKD8hI3toZXhhZGVjaW1hbH0pXCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBoZXhhXSA9IG1hdGNoXG5cbiAgQGhleCA9IGhleGFcblxuIyByZ2IoNTAsMTIwLDIwMClcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNzc19yZ2InLCBzdHJpcChcIlxuICAje2luc2Vuc2l0aXZlICdyZ2InfSN7cHN9XFxcXHMqXG4gICAgKCN7aW50T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tpbnRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje2ludE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxyLGcsYl0gPSBtYXRjaFxuXG4gIEByZWQgPSBjb250ZXh0LnJlYWRJbnRPclBlcmNlbnQocilcbiAgQGdyZWVuID0gY29udGV4dC5yZWFkSW50T3JQZXJjZW50KGcpXG4gIEBibHVlID0gY29udGV4dC5yZWFkSW50T3JQZXJjZW50KGIpXG4gIEBhbHBoYSA9IDFcblxuIyByZ2JhKDUwLDEyMCwyMDAsMC43KVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6Y3NzX3JnYmEnLCBzdHJpcChcIlxuICAje2luc2Vuc2l0aXZlICdyZ2JhJ30je3BzfVxcXFxzKlxuICAgICgje2ludE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7aW50T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tpbnRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLHIsZyxiLGFdID0gbWF0Y2hcblxuICBAcmVkID0gY29udGV4dC5yZWFkSW50T3JQZXJjZW50KHIpXG4gIEBncmVlbiA9IGNvbnRleHQucmVhZEludE9yUGVyY2VudChnKVxuICBAYmx1ZSA9IGNvbnRleHQucmVhZEludE9yUGVyY2VudChiKVxuICBAYWxwaGEgPSBjb250ZXh0LnJlYWRGbG9hdChhKVxuXG4jIHJnYmEoZ3JlZW4sMC43KVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c3R5bHVzX3JnYmEnLCBzdHJpcChcIlxuICByZ2JhI3twc31cXFxccypcbiAgICAoI3tub3RRdW90ZX0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxzdWJleHByLGFdID0gbWF0Y2hcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIEByZ2IgPSBiYXNlQ29sb3IucmdiXG4gIEBhbHBoYSA9IGNvbnRleHQucmVhZEZsb2F0KGEpXG5cbiMgaHNsKDIxMCw1MCUsNTAlKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6Y3NzX2hzbCcsIHN0cmlwKFwiXG4gICN7aW5zZW5zaXRpdmUgJ2hzbCd9I3twc31cXFxccypcbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7b3B0aW9uYWxQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWydjc3MnLCAnc2FzcycsICdzY3NzJywgJ3N0eWwnLCAnc3R5bHVzJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18saCxzLGxdID0gbWF0Y2hcblxuICBoc2wgPSBbXG4gICAgY29udGV4dC5yZWFkSW50KGgpXG4gICAgY29udGV4dC5yZWFkRmxvYXQocylcbiAgICBjb250ZXh0LnJlYWRGbG9hdChsKVxuICBdXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBoc2wuc29tZSAodikgLT4gbm90IHY/IG9yIGlzTmFOKHYpXG5cbiAgQGhzbCA9IGhzbFxuICBAYWxwaGEgPSAxXG5cbiMgaHNsKDIxMCw1MCUsNTAlKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6bGVzc19oc2wnLCBzdHJpcChcIlxuICBoc2wje3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWydsZXNzJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18saCxzLGxdID0gbWF0Y2hcblxuICBoc2wgPSBbXG4gICAgY29udGV4dC5yZWFkSW50KGgpXG4gICAgY29udGV4dC5yZWFkRmxvYXRPclBlcmNlbnQocykgKiAxMDBcbiAgICBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChsKSAqIDEwMFxuICBdXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBoc2wuc29tZSAodikgLT4gbm90IHY/IG9yIGlzTmFOKHYpXG5cbiAgQGhzbCA9IGhzbFxuICBAYWxwaGEgPSAxXG5cbiMgaHNsYSgyMTAsNTAlLDUwJSwwLjcpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpjc3NfaHNsYScsIHN0cmlwKFwiXG4gICN7aW5zZW5zaXRpdmUgJ2hzbGEnfSN7cHN9XFxcXHMqXG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7b3B0aW9uYWxQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxoLHMsbCxhXSA9IG1hdGNoXG5cbiAgaHNsID0gW1xuICAgIGNvbnRleHQucmVhZEludChoKVxuICAgIGNvbnRleHQucmVhZEZsb2F0KHMpXG4gICAgY29udGV4dC5yZWFkRmxvYXQobClcbiAgXVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgaHNsLnNvbWUgKHYpIC0+IG5vdCB2PyBvciBpc05hTih2KVxuXG4gIEBoc2wgPSBoc2xcbiAgQGFscGhhID0gY29udGV4dC5yZWFkRmxvYXQoYSlcblxuIyBoc3YoMjEwLDcwJSw5MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpoc3YnLCBzdHJpcChcIlxuICAoPzoje2luc2Vuc2l0aXZlICdoc3YnfXwje2luc2Vuc2l0aXZlICdoc2InfSkje3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxoLHMsdl0gPSBtYXRjaFxuXG4gIGhzdiA9IFtcbiAgICBjb250ZXh0LnJlYWRJbnQoaClcbiAgICBjb250ZXh0LnJlYWRGbG9hdChzKVxuICAgIGNvbnRleHQucmVhZEZsb2F0KHYpXG4gIF1cblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGhzdi5zb21lICh2KSAtPiBub3Qgdj8gb3IgaXNOYU4odilcblxuICBAaHN2ID0gaHN2XG4gIEBhbHBoYSA9IDFcblxuIyBoc3ZhKDIxMCw3MCUsOTAlLDAuNylcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmhzdmEnLCBzdHJpcChcIlxuICAoPzoje2luc2Vuc2l0aXZlICdoc3ZhJ318I3tpbnNlbnNpdGl2ZSAnaHNiYSd9KSN7cHN9XFxcXHMqXG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7b3B0aW9uYWxQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxoLHMsdixhXSA9IG1hdGNoXG5cbiAgaHN2ID0gW1xuICAgIGNvbnRleHQucmVhZEludChoKVxuICAgIGNvbnRleHQucmVhZEZsb2F0KHMpXG4gICAgY29udGV4dC5yZWFkRmxvYXQodilcbiAgXVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgaHN2LnNvbWUgKHYpIC0+IG5vdCB2PyBvciBpc05hTih2KVxuXG4gIEBoc3YgPSBoc3ZcbiAgQGFscGhhID0gY29udGV4dC5yZWFkRmxvYXQoYSlcblxuIyBoY2coMjEwLDYwJSw1MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpoY2cnLCBzdHJpcChcIlxuICAoPzoje2luc2Vuc2l0aXZlICdoY2cnfSkje3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxoLGMsZ3JdID0gbWF0Y2hcblxuICBoY2cgPSBbXG4gICAgY29udGV4dC5yZWFkSW50KGgpXG4gICAgY29udGV4dC5yZWFkRmxvYXQoYylcbiAgICBjb250ZXh0LnJlYWRGbG9hdChncilcbiAgXVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgaGNnLnNvbWUgKHYpIC0+IG5vdCB2PyBvciBpc05hTih2KVxuXG4gIEBoY2cgPSBoY2dcbiAgQGFscGhhID0gMVxuXG4jIGhjZ2EoMjEwLDYwJSw1MCUsMC43KVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6aGNnYScsIHN0cmlwKFwiXG4gICg/OiN7aW5zZW5zaXRpdmUgJ2hjZ2EnfSkje3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18saCxjLGdyLGFdID0gbWF0Y2hcblxuICBoY2cgPSBbXG4gICAgY29udGV4dC5yZWFkSW50KGgpXG4gICAgY29udGV4dC5yZWFkRmxvYXQoYylcbiAgICBjb250ZXh0LnJlYWRGbG9hdChncilcbiAgXVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgaGNnLnNvbWUgKHYpIC0+IG5vdCB2PyBvciBpc05hTih2KVxuXG4gIEBoY2cgPSBoY2dcbiAgQGFscGhhID0gY29udGV4dC5yZWFkRmxvYXQoYSlcblxuIyB2ZWM0KDAuMiwgMC41LCAwLjksIDAuNylcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOnZlYzQnLCBzdHJpcChcIlxuICB2ZWM0I3twc31cXFxccypcbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLGgscyxsLGFdID0gbWF0Y2hcblxuICBAcmdiYSA9IFtcbiAgICBjb250ZXh0LnJlYWRGbG9hdChoKSAqIDI1NVxuICAgIGNvbnRleHQucmVhZEZsb2F0KHMpICogMjU1XG4gICAgY29udGV4dC5yZWFkRmxvYXQobCkgKiAyNTVcbiAgICBjb250ZXh0LnJlYWRGbG9hdChhKVxuICBdXG5cbiMgaHdiKDIxMCw0MCUsNDAlKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6aHdiJywgc3RyaXAoXCJcbiAgI3tpbnNlbnNpdGl2ZSAnaHdiJ30je3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICg/OiN7Y29tbWF9KCN7ZmxvYXR9fCN7dmFyaWFibGVzfSkpP1xuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxoLHcsYixhXSA9IG1hdGNoXG5cbiAgQGh3YiA9IFtcbiAgICBjb250ZXh0LnJlYWRJbnQoaClcbiAgICBjb250ZXh0LnJlYWRGbG9hdCh3KVxuICAgIGNvbnRleHQucmVhZEZsb2F0KGIpXG4gIF1cbiAgQGFscGhhID0gaWYgYT8gdGhlbiBjb250ZXh0LnJlYWRGbG9hdChhKSBlbHNlIDFcblxuIyBjbXlrKDAsMC41LDEsMClcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNteWsnLCBzdHJpcChcIlxuICAje2luc2Vuc2l0aXZlICdjbXlrJ30je3BzfVxcXFxzKlxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLGMsbSx5LGtdID0gbWF0Y2hcblxuICBAY215ayA9IFtcbiAgICBjb250ZXh0LnJlYWRGbG9hdChjKVxuICAgIGNvbnRleHQucmVhZEZsb2F0KG0pXG4gICAgY29udGV4dC5yZWFkRmxvYXQoeSlcbiAgICBjb250ZXh0LnJlYWRGbG9hdChrKVxuICBdXG5cbiMgZ3JheSg1MCUpXG4jIFRoZSBwcmlvcml0eSBpcyBzZXQgdG8gMSB0byBtYWtlIHN1cmUgdGhhdCBpdCBhcHBlYXJzIGJlZm9yZSBuYW1lZCBjb2xvcnNcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmdyYXknLCBzdHJpcChcIlxuICAje2luc2Vuc2l0aXZlICdncmF5J30je3BzfVxcXFxzKlxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAgICg/OiN7Y29tbWF9KCN7ZmxvYXR9fCN7dmFyaWFibGVzfSkpP1xuICAje3BlfVwiKSwgMSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cblxuICBbXyxwLGFdID0gbWF0Y2hcblxuICBwID0gY29udGV4dC5yZWFkRmxvYXQocCkgLyAxMDAgKiAyNTVcbiAgQHJnYiA9IFtwLCBwLCBwXVxuICBAYWxwaGEgPSBpZiBhPyB0aGVuIGNvbnRleHQucmVhZEZsb2F0KGEpIGVsc2UgMVxuXG4jIGRvZGdlcmJsdWVcbmNvbG9ycyA9IE9iamVjdC5rZXlzKFNWR0NvbG9ycy5hbGxDYXNlcylcbmNvbG9yUmVnZXhwID0gXCIoPzoje25hbWVQcmVmaXhlc30pKCN7Y29sb3JzLmpvaW4oJ3wnKX0pXFxcXGIoPyFbIFxcXFx0XSpbLVxcXFwuOj1cXFxcKF0pXCJcblxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6bmFtZWRfY29sb3JzJywgY29sb3JSZWdleHAsIFtdLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLG5hbWVdID0gbWF0Y2hcblxuICBAY29sb3JFeHByZXNzaW9uID0gQG5hbWUgPSBuYW1lXG4gIEBoZXggPSBjb250ZXh0LlNWR0NvbG9ycy5hbGxDYXNlc1tuYW1lXS5yZXBsYWNlKCcjJywnJylcblxuIyMgICAgIyMjIyMjIyMgIyMgICAgICMjICMjICAgICMjICAjIyMjIyNcbiMjICAgICMjICAgICAgICMjICAgICAjIyAjIyMgICAjIyAjIyAgICAjI1xuIyMgICAgIyMgICAgICAgIyMgICAgICMjICMjIyMgICMjICMjXG4jIyAgICAjIyMjIyMgICAjIyAgICAgIyMgIyMgIyMgIyMgIyNcbiMjICAgICMjICAgICAgICMjICAgICAjIyAjIyAgIyMjIyAjI1xuIyMgICAgIyMgICAgICAgIyMgICAgICMjICMjICAgIyMjICMjICAgICMjXG4jIyAgICAjIyAgICAgICAgIyMjIyMjIyAgIyMgICAgIyMgICMjIyMjI1xuXG4jIGRhcmtlbigjNjY2NjY2LCAyMCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpkYXJrZW4nLCBzdHJpcChcIlxuICBkYXJrZW4je3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje29wdGlvbmFsUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkRmxvYXQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIFtoLHMsbF0gPSBiYXNlQ29sb3IuaHNsXG5cbiAgQGhzbCA9IFtoLCBzLCBjb250ZXh0LmNsYW1wSW50KGwgLSBhbW91bnQpXVxuICBAYWxwaGEgPSBiYXNlQ29sb3IuYWxwaGFcblxuIyBsaWdodGVuKCM2NjY2NjYsIDIwJSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmxpZ2h0ZW4nLCBzdHJpcChcIlxuICBsaWdodGVuI3twc31cbiAgICAoI3tub3RRdW90ZX0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tvcHRpb25hbFBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHIsIGFtb3VudF0gPSBtYXRjaFxuXG4gIGFtb3VudCA9IGNvbnRleHQucmVhZEZsb2F0KGFtb3VudClcbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcblxuICBbaCxzLGxdID0gYmFzZUNvbG9yLmhzbFxuXG4gIEBoc2wgPSBbaCwgcywgY29udGV4dC5jbGFtcEludChsICsgYW1vdW50KV1cbiAgQGFscGhhID0gYmFzZUNvbG9yLmFscGhhXG5cbiMgZmFkZSgjZmZmZmZmLCAwLjUpXG4jIGFscGhhKCNmZmZmZmYsIDAuNSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmZhZGUnLCBzdHJpcChcIlxuICAoPzpmYWRlfGFscGhhKSN7cHN9XG4gICAgKCN7bm90UXVvdGV9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHIsIGFtb3VudF0gPSBtYXRjaFxuXG4gIGFtb3VudCA9IGNvbnRleHQucmVhZEZsb2F0T3JQZXJjZW50KGFtb3VudClcbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcblxuICBAcmdiID0gYmFzZUNvbG9yLnJnYlxuICBAYWxwaGEgPSBhbW91bnRcblxuIyB0cmFuc3BhcmVudGl6ZSgjZmZmZmZmLCAwLjUpXG4jIHRyYW5zcGFyZW50aXplKCNmZmZmZmYsIDUwJSlcbiMgZmFkZW91dCgjZmZmZmZmLCAwLjUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czp0cmFuc3BhcmVudGl6ZScsIHN0cmlwKFwiXG4gICg/OnRyYW5zcGFyZW50aXplfGZhZGVvdXR8ZmFkZS1vdXR8ZmFkZV9vdXQpI3twc31cbiAgICAoI3tub3RRdW90ZX0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkRmxvYXRPclBlcmNlbnQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIEByZ2IgPSBiYXNlQ29sb3IucmdiXG4gIEBhbHBoYSA9IGNvbnRleHQuY2xhbXAoYmFzZUNvbG9yLmFscGhhIC0gYW1vdW50KVxuXG4jIG9wYWNpZnkoMHg3OGZmZmZmZiwgMC41KVxuIyBvcGFjaWZ5KDB4NzhmZmZmZmYsIDUwJSlcbiMgZmFkZWluKDB4NzhmZmZmZmYsIDAuNSlcbiMgYWxwaGEoMHg3OGZmZmZmZiwgMC41KVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6b3BhY2lmeScsIHN0cmlwKFwiXG4gICg/Om9wYWNpZnl8ZmFkZWlufGZhZGUtaW58ZmFkZV9pbikje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgQHJnYiA9IGJhc2VDb2xvci5yZ2JcbiAgQGFscGhhID0gY29udGV4dC5jbGFtcChiYXNlQ29sb3IuYWxwaGEgKyBhbW91bnQpXG5cbiMgcmVkKCMwMDAsMjU1KVxuIyBncmVlbigjMDAwLDI1NSlcbiMgYmx1ZSgjMDAwLDI1NSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOnN0eWx1c19jb21wb25lbnRfZnVuY3Rpb25zJywgc3RyaXAoXCJcbiAgKHJlZHxncmVlbnxibHVlKSN7cHN9XG4gICAgKCN7bm90UXVvdGV9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7aW50fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBjaGFubmVsLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRJbnQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGlzTmFOKGFtb3VudClcblxuICBAW2NoYW5uZWxdID0gYW1vdW50XG5cbiMgdHJhbnNwYXJlbnRpZnkoIzgwODA4MClcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOnRyYW5zcGFyZW50aWZ5Jywgc3RyaXAoXCJcbiAgdHJhbnNwYXJlbnRpZnkje3BzfVxuICAoI3tub3RRdW90ZX0pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW3RvcCwgYm90dG9tLCBhbHBoYV0gPSBjb250ZXh0LnNwbGl0KGV4cHIpXG5cbiAgdG9wID0gY29udGV4dC5yZWFkQ29sb3IodG9wKVxuICBib3R0b20gPSBjb250ZXh0LnJlYWRDb2xvcihib3R0b20pXG4gIGFscGhhID0gY29udGV4dC5yZWFkRmxvYXRPclBlcmNlbnQoYWxwaGEpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZCh0b3ApXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgYm90dG9tPyBhbmQgY29udGV4dC5pc0ludmFsaWQoYm90dG9tKVxuXG4gIGJvdHRvbSA/PSBuZXcgY29udGV4dC5Db2xvcigyNTUsMjU1LDI1NSwxKVxuICBhbHBoYSA9IHVuZGVmaW5lZCBpZiBpc05hTihhbHBoYSlcblxuICBiZXN0QWxwaGEgPSBbJ3JlZCcsJ2dyZWVuJywnYmx1ZSddLm1hcCgoY2hhbm5lbCkgLT5cbiAgICByZXMgPSAodG9wW2NoYW5uZWxdIC0gKGJvdHRvbVtjaGFubmVsXSkpIC8gKChpZiAwIDwgdG9wW2NoYW5uZWxdIC0gKGJvdHRvbVtjaGFubmVsXSkgdGhlbiAyNTUgZWxzZSAwKSAtIChib3R0b21bY2hhbm5lbF0pKVxuICAgIHJlc1xuICApLnNvcnQoKGEsIGIpIC0+IGEgPCBiKVswXVxuXG4gIHByb2Nlc3NDaGFubmVsID0gKGNoYW5uZWwpIC0+XG4gICAgaWYgYmVzdEFscGhhIGlzIDBcbiAgICAgIGJvdHRvbVtjaGFubmVsXVxuICAgIGVsc2VcbiAgICAgIGJvdHRvbVtjaGFubmVsXSArICh0b3BbY2hhbm5lbF0gLSAoYm90dG9tW2NoYW5uZWxdKSkgLyBiZXN0QWxwaGFcblxuICBiZXN0QWxwaGEgPSBhbHBoYSBpZiBhbHBoYT9cbiAgYmVzdEFscGhhID0gTWF0aC5tYXgoTWF0aC5taW4oYmVzdEFscGhhLCAxKSwgMClcblxuICBAcmVkID0gcHJvY2Vzc0NoYW5uZWwoJ3JlZCcpXG4gIEBncmVlbiA9IHByb2Nlc3NDaGFubmVsKCdncmVlbicpXG4gIEBibHVlID0gcHJvY2Vzc0NoYW5uZWwoJ2JsdWUnKVxuICBAYWxwaGEgPSBNYXRoLnJvdW5kKGJlc3RBbHBoYSAqIDEwMCkgLyAxMDBcblxuIyBodWUoIzg1NSwgNjBkZWcpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpodWUnLCBzdHJpcChcIlxuICBodWUje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2ludH1kZWd8I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkRmxvYXQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGlzTmFOKGFtb3VudClcblxuICBbaCxzLGxdID0gYmFzZUNvbG9yLmhzbFxuXG4gIEBoc2wgPSBbYW1vdW50ICUgMzYwLCBzLCBsXVxuICBAYWxwaGEgPSBiYXNlQ29sb3IuYWxwaGFcblxuIyBzYXR1cmF0aW9uKCM4NTUsIDYwZGVnKVxuIyBsaWdodG5lc3MoIzg1NSwgNjBkZWcpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpzdHlsdXNfc2xfY29tcG9uZW50X2Z1bmN0aW9ucycsIHN0cmlwKFwiXG4gIChzYXR1cmF0aW9ufGxpZ2h0bmVzcykje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2ludE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgY2hhbm5lbCwgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkSW50KGFtb3VudClcbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBpc05hTihhbW91bnQpXG5cbiAgYmFzZUNvbG9yW2NoYW5uZWxdID0gYW1vdW50XG4gIEByZ2JhID0gYmFzZUNvbG9yLnJnYmFcblxuIyBhZGp1c3QtaHVlKCM4NTUsIDYwZGVnKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6YWRqdXN0LWh1ZScsIHN0cmlwKFwiXG4gIGFkanVzdC1odWUje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgtPyN7aW50fWRlZ3wje3ZhcmlhYmxlc318LT8je29wdGlvbmFsUGVyY2VudH0pXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgW2gscyxsXSA9IGJhc2VDb2xvci5oc2xcblxuICBAaHNsID0gWyhoICsgYW1vdW50KSAlIDM2MCwgcywgbF1cbiAgQGFscGhhID0gYmFzZUNvbG9yLmFscGhhXG5cbiMgbWl4KCNmMDAsICMwMEYsIDI1JSlcbiMgbWl4KCNmMDAsICMwMEYpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czptaXgnLCBcIm1peCN7cHN9KCN7bm90UXVvdGV9KSN7cGV9XCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyLCBhbW91bnRdID0gY29udGV4dC5zcGxpdChleHByKVxuXG4gIGlmIGFtb3VudD9cbiAgICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGVsc2VcbiAgICBhbW91bnQgPSAwLjVcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICB7QHJnYmF9ID0gY29udGV4dC5taXhDb2xvcnMoYmFzZUNvbG9yMSwgYmFzZUNvbG9yMiwgYW1vdW50KVxuXG4jIHRpbnQocmVkLCA1MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpzdHlsdXNfdGludCcsIHN0cmlwKFwiXG4gIHRpbnQje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnc3R5bCcsICdzdHlsdXMnLCAnbGVzcyddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgd2hpdGUgPSBuZXcgY29udGV4dC5Db2xvcigyNTUsIDI1NSwgMjU1KVxuXG4gIEByZ2JhID0gY29udGV4dC5taXhDb2xvcnMod2hpdGUsIGJhc2VDb2xvciwgYW1vdW50KS5yZ2JhXG5cbiMgc2hhZGUocmVkLCA1MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpzdHlsdXNfc2hhZGUnLCBzdHJpcChcIlxuICBzaGFkZSN7cHN9XG4gICAgKCN7bm90UXVvdGV9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWydzdHlsJywgJ3N0eWx1cycsICdsZXNzJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHIsIGFtb3VudF0gPSBtYXRjaFxuXG4gIGFtb3VudCA9IGNvbnRleHQucmVhZEZsb2F0T3JQZXJjZW50KGFtb3VudClcbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcblxuICBibGFjayA9IG5ldyBjb250ZXh0LkNvbG9yKDAsMCwwKVxuXG4gIEByZ2JhID0gY29udGV4dC5taXhDb2xvcnMoYmxhY2ssIGJhc2VDb2xvciwgYW1vdW50KS5yZ2JhXG5cbiMgdGludChyZWQsIDUwJSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNvbXBhc3NfdGludCcsIHN0cmlwKFwiXG4gIHRpbnQje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnc2Fzczpjb21wYXNzJywgJ3Njc3M6Y29tcGFzcyddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgd2hpdGUgPSBuZXcgY29udGV4dC5Db2xvcigyNTUsIDI1NSwgMjU1KVxuXG4gIEByZ2JhID0gY29udGV4dC5taXhDb2xvcnMoYmFzZUNvbG9yLCB3aGl0ZSwgYW1vdW50KS5yZ2JhXG5cbiMgc2hhZGUocmVkLCA1MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpjb21wYXNzX3NoYWRlJywgc3RyaXAoXCJcbiAgc2hhZGUje3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgje2Zsb2F0T3JQZXJjZW50fXwje3ZhcmlhYmxlc30pXG4gICN7cGV9XG5cIiksIFsnc2Fzczpjb21wYXNzJywgJ3Njc3M6Y29tcGFzcyddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgYmxhY2sgPSBuZXcgY29udGV4dC5Db2xvcigwLDAsMClcblxuICBAcmdiYSA9IGNvbnRleHQubWl4Q29sb3JzKGJhc2VDb2xvciwgYmxhY2ssIGFtb3VudCkucmdiYVxuXG4jIHRpbnQocmVkLCA1MCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpib3VyYm9uX3RpbnQnLCBzdHJpcChcIlxuICB0aW50I3twc31cbiAgICAoI3tub3RRdW90ZX0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJ3Nhc3M6Ym91cmJvbicsICdzY3NzOmJvdXJib24nXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkRmxvYXRPclBlcmNlbnQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIHdoaXRlID0gbmV3IGNvbnRleHQuQ29sb3IoMjU1LCAyNTUsIDI1NSlcblxuICBAcmdiYSA9IGNvbnRleHQubWl4Q29sb3JzKHdoaXRlLCBiYXNlQ29sb3IsIGFtb3VudCkucmdiYVxuXG4jIHNoYWRlKHJlZCwgNTAlKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6Ym91cmJvbl9zaGFkZScsIHN0cmlwKFwiXG4gIHNoYWRlI3twc31cbiAgICAoI3tub3RRdW90ZX0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KVxuICAje3BlfVxuXCIpLCBbJ3Nhc3M6Ym91cmJvbicsICdzY3NzOmJvdXJib24nXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwciwgYW1vdW50XSA9IG1hdGNoXG5cbiAgYW1vdW50ID0gY29udGV4dC5yZWFkRmxvYXRPclBlcmNlbnQoYW1vdW50KVxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIGJsYWNrID0gbmV3IGNvbnRleHQuQ29sb3IoMCwwLDApXG5cbiAgQHJnYmEgPSBjb250ZXh0Lm1peENvbG9ycyhibGFjaywgYmFzZUNvbG9yLCBhbW91bnQpLnJnYmFcblxuIyBkZXNhdHVyYXRlKCM4NTUsIDIwJSlcbiMgZGVzYXR1cmF0ZSgjODU1LCAwLjIpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpkZXNhdHVyYXRlJywgXCJkZXNhdHVyYXRlI3twc30oI3tub3RRdW90ZX0pI3tjb21tYX0oI3tmbG9hdE9yUGVyY2VudH18I3t2YXJpYWJsZXN9KSN7cGV9XCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByLCBhbW91bnRdID0gbWF0Y2hcblxuICBhbW91bnQgPSBjb250ZXh0LnJlYWRGbG9hdE9yUGVyY2VudChhbW91bnQpXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgW2gscyxsXSA9IGJhc2VDb2xvci5oc2xcblxuICBAaHNsID0gW2gsIGNvbnRleHQuY2xhbXBJbnQocyAtIGFtb3VudCAqIDEwMCksIGxdXG4gIEBhbHBoYSA9IGJhc2VDb2xvci5hbHBoYVxuXG4jIHNhdHVyYXRlKCM4NTUsIDIwJSlcbiMgc2F0dXJhdGUoIzg1NSwgMC4yKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c2F0dXJhdGUnLCBzdHJpcChcIlxuICBzYXR1cmF0ZSN7cHN9XG4gICAgKCN7bm90UXVvdGV9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7ZmxvYXRPclBlcmNlbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHIsIGFtb3VudF0gPSBtYXRjaFxuXG4gIGFtb3VudCA9IGNvbnRleHQucmVhZEZsb2F0T3JQZXJjZW50KGFtb3VudClcbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcblxuICBbaCxzLGxdID0gYmFzZUNvbG9yLmhzbFxuXG4gIEBoc2wgPSBbaCwgY29udGV4dC5jbGFtcEludChzICsgYW1vdW50ICogMTAwKSwgbF1cbiAgQGFscGhhID0gYmFzZUNvbG9yLmFscGhhXG5cbiMgZ3JheXNjYWxlKHJlZClcbiMgZ3JleXNjYWxlKHJlZClcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmdyYXlzY2FsZScsIFwiZ3IoPzphfGUpeXNjYWxlI3twc30oI3tub3RRdW90ZX0pI3twZX1cIiwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHJdID0gbWF0Y2hcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIFtoLHMsbF0gPSBiYXNlQ29sb3IuaHNsXG5cbiAgQGhzbCA9IFtoLCAwLCBsXVxuICBAYWxwaGEgPSBiYXNlQ29sb3IuYWxwaGFcblxuIyBpbnZlcnQoZ3JlZW4pXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czppbnZlcnQnLCBcImludmVydCN7cHN9KCN7bm90UXVvdGV9KSN7cGV9XCIsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByXSA9IG1hdGNoXG5cbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcblxuICBbcixnLGJdID0gYmFzZUNvbG9yLnJnYlxuXG4gIEByZ2IgPSBbMjU1IC0gciwgMjU1IC0gZywgMjU1IC0gYl1cbiAgQGFscGhhID0gYmFzZUNvbG9yLmFscGhhXG5cbiMgY29tcGxlbWVudChncmVlbilcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNvbXBsZW1lbnQnLCBcImNvbXBsZW1lbnQje3BzfSgje25vdFF1b3RlfSkje3BlfVwiLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwcl0gPSBtYXRjaFxuXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgW2gscyxsXSA9IGJhc2VDb2xvci5oc2xcblxuICBAaHNsID0gWyhoICsgMTgwKSAlIDM2MCwgcywgbF1cbiAgQGFscGhhID0gYmFzZUNvbG9yLmFscGhhXG5cbiMgc3BpbihncmVlbiwgMjApXG4jIHNwaW4oZ3JlZW4sIDIwZGVnKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c3BpbicsIHN0cmlwKFwiXG4gIHNwaW4je3BzfVxuICAgICgje25vdFF1b3RlfSlcbiAgICAje2NvbW1hfVxuICAgICgtPygje2ludH0pKGRlZyk/fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHIsIGFuZ2xlXSA9IG1hdGNoXG5cbiAgYmFzZUNvbG9yID0gY29udGV4dC5yZWFkQ29sb3Ioc3ViZXhwcilcbiAgYW5nbGUgPSBjb250ZXh0LnJlYWRJbnQoYW5nbGUpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgW2gscyxsXSA9IGJhc2VDb2xvci5oc2xcblxuICBAaHNsID0gWygzNjAgKyBoICsgYW5nbGUpICUgMzYwLCBzLCBsXVxuICBAYWxwaGEgPSBiYXNlQ29sb3IuYWxwaGFcblxuIyBjb250cmFzdCgjNjY2NjY2LCAjMTExMTExLCAjOTk5OTk5LCB0aHJlc2hvbGQpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpjb250cmFzdF9uX2FyZ3VtZW50cycsIHN0cmlwKFwiXG4gIGNvbnRyYXN0I3twc31cbiAgICAoXG4gICAgICAje25vdFF1b3RlfVxuICAgICAgI3tjb21tYX1cbiAgICAgICN7bm90UXVvdGV9XG4gICAgKVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgZXhwcl0gPSBtYXRjaFxuXG4gIFtiYXNlLCBkYXJrLCBsaWdodCwgdGhyZXNob2xkXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihiYXNlKVxuICBkYXJrID0gY29udGV4dC5yZWFkQ29sb3IoZGFyaylcbiAgbGlnaHQgPSBjb250ZXh0LnJlYWRDb2xvcihsaWdodClcbiAgdGhyZXNob2xkID0gY29udGV4dC5yZWFkUGVyY2VudCh0aHJlc2hvbGQpIGlmIHRocmVzaG9sZD9cblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcilcbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBkYXJrPy5pbnZhbGlkXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgbGlnaHQ/LmludmFsaWRcblxuICByZXMgPSBjb250ZXh0LmNvbnRyYXN0KGJhc2VDb2xvciwgZGFyaywgbGlnaHQpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChyZXMpXG5cbiAge0ByZ2J9ID0gY29udGV4dC5jb250cmFzdChiYXNlQ29sb3IsIGRhcmssIGxpZ2h0LCB0aHJlc2hvbGQpXG5cbiMgY29udHJhc3QoIzY2NjY2NilcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmNvbnRyYXN0XzFfYXJndW1lbnQnLCBzdHJpcChcIlxuICBjb250cmFzdCN7cHN9XG4gICAgKCN7bm90UXVvdGV9KVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgc3ViZXhwcl0gPSBtYXRjaFxuXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmV4cHIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAge0ByZ2J9ID0gY29udGV4dC5jb250cmFzdChiYXNlQ29sb3IpXG5cbiMgY29sb3IoZ3JlZW4gdGludCg1MCUpKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6Y3NzX2NvbG9yX2Z1bmN0aW9uJywgXCIoPzoje25hbWVQcmVmaXhlc30pKCN7aW5zZW5zaXRpdmUgJ2NvbG9yJ30je3BzfSgje25vdFF1b3RlfSkje3BlfSlcIiwgWydjc3MnXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICB0cnlcbiAgICBbXyxleHByXSA9IG1hdGNoXG4gICAgZm9yIGssdiBvZiBjb250ZXh0LnZhcnNcbiAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UoLy8vXG4gICAgICAgICN7ay5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpfVxuICAgICAgLy8vZywgdi52YWx1ZSlcblxuICAgIGNzc0NvbG9yID0gcmVxdWlyZSAnY3NzLWNvbG9yLWZ1bmN0aW9uJ1xuICAgIHJnYmEgPSBjc3NDb2xvci5jb252ZXJ0KGV4cHIudG9Mb3dlckNhc2UoKSlcbiAgICBAcmdiYSA9IGNvbnRleHQucmVhZENvbG9yKHJnYmEpLnJnYmFcbiAgICBAY29sb3JFeHByZXNzaW9uID0gZXhwclxuICBjYXRjaCBlXG4gICAgQGludmFsaWQgPSB0cnVlXG5cbiMgYWRqdXN0LWNvbG9yKHJlZCwgJGxpZ2h0bmVzczogMzAlKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c2Fzc19hZGp1c3RfY29sb3InLCBcImFkanVzdC1jb2xvciN7cHN9KCN7bm90UXVvdGV9KSN7cGV9XCIsIDEsIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBzdWJleHByXSA9IG1hdGNoXG4gIHJlcyA9IGNvbnRleHQuc3BsaXQoc3ViZXhwcilcbiAgc3ViamVjdCA9IHJlc1swXVxuICBwYXJhbXMgPSByZXMuc2xpY2UoMSlcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJqZWN0KVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIGZvciBwYXJhbSBpbiBwYXJhbXNcbiAgICBjb250ZXh0LnJlYWRQYXJhbSBwYXJhbSwgKG5hbWUsIHZhbHVlKSAtPlxuICAgICAgYmFzZUNvbG9yW25hbWVdICs9IGNvbnRleHQucmVhZEZsb2F0KHZhbHVlKVxuXG4gIEByZ2JhID0gYmFzZUNvbG9yLnJnYmFcblxuIyBzY2FsZS1jb2xvcihyZWQsICRsaWdodG5lc3M6IDMwJSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOnNhc3Nfc2NhbGVfY29sb3InLCBcInNjYWxlLWNvbG9yI3twc30oI3tub3RRdW90ZX0pI3twZX1cIiwgMSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgTUFYX1BFUl9DT01QT05FTlQgPVxuICAgIHJlZDogMjU1XG4gICAgZ3JlZW46IDI1NVxuICAgIGJsdWU6IDI1NVxuICAgIGFscGhhOiAxXG4gICAgaHVlOiAzNjBcbiAgICBzYXR1cmF0aW9uOiAxMDBcbiAgICBsaWdodG5lc3M6IDEwMFxuXG4gIFtfLCBzdWJleHByXSA9IG1hdGNoXG4gIHJlcyA9IGNvbnRleHQuc3BsaXQoc3ViZXhwcilcbiAgc3ViamVjdCA9IHJlc1swXVxuICBwYXJhbXMgPSByZXMuc2xpY2UoMSlcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJqZWN0KVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIGZvciBwYXJhbSBpbiBwYXJhbXNcbiAgICBjb250ZXh0LnJlYWRQYXJhbSBwYXJhbSwgKG5hbWUsIHZhbHVlKSAtPlxuICAgICAgdmFsdWUgPSBjb250ZXh0LnJlYWRGbG9hdCh2YWx1ZSkgLyAxMDBcblxuICAgICAgcmVzdWx0ID0gaWYgdmFsdWUgPiAwXG4gICAgICAgIGRpZiA9IE1BWF9QRVJfQ09NUE9ORU5UW25hbWVdIC0gYmFzZUNvbG9yW25hbWVdXG4gICAgICAgIHJlc3VsdCA9IGJhc2VDb2xvcltuYW1lXSArIGRpZiAqIHZhbHVlXG4gICAgICBlbHNlXG4gICAgICAgIHJlc3VsdCA9IGJhc2VDb2xvcltuYW1lXSAqICgxICsgdmFsdWUpXG5cbiAgICAgIGJhc2VDb2xvcltuYW1lXSA9IHJlc3VsdFxuXG4gIEByZ2JhID0gYmFzZUNvbG9yLnJnYmFcblxuIyBjaGFuZ2UtY29sb3IocmVkLCAkbGlnaHRuZXNzOiAzMCUpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpzYXNzX2NoYW5nZV9jb2xvcicsIFwiY2hhbmdlLWNvbG9yI3twc30oI3tub3RRdW90ZX0pI3twZX1cIiwgMSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHJdID0gbWF0Y2hcbiAgcmVzID0gY29udGV4dC5zcGxpdChzdWJleHByKVxuICBzdWJqZWN0ID0gcmVzWzBdXG4gIHBhcmFtcyA9IHJlcy5zbGljZSgxKVxuXG4gIGJhc2VDb2xvciA9IGNvbnRleHQucmVhZENvbG9yKHN1YmplY3QpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IpXG5cbiAgZm9yIHBhcmFtIGluIHBhcmFtc1xuICAgIGNvbnRleHQucmVhZFBhcmFtIHBhcmFtLCAobmFtZSwgdmFsdWUpIC0+XG4gICAgICBiYXNlQ29sb3JbbmFtZV0gPSBjb250ZXh0LnJlYWRGbG9hdCh2YWx1ZSlcblxuICBAcmdiYSA9IGJhc2VDb2xvci5yZ2JhXG5cbiMgYmxlbmQocmdiYSgjRkZERTAwLC40MiksIDB4MTlDMjYxKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c3R5bHVzX2JsZW5kJywgc3RyaXAoXCJcbiAgYmxlbmQje3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICBAcmdiYSA9IFtcbiAgICBiYXNlQ29sb3IxLnJlZCAqIGJhc2VDb2xvcjEuYWxwaGEgKyBiYXNlQ29sb3IyLnJlZCAqICgxIC0gYmFzZUNvbG9yMS5hbHBoYSlcbiAgICBiYXNlQ29sb3IxLmdyZWVuICogYmFzZUNvbG9yMS5hbHBoYSArIGJhc2VDb2xvcjIuZ3JlZW4gKiAoMSAtIGJhc2VDb2xvcjEuYWxwaGEpXG4gICAgYmFzZUNvbG9yMS5ibHVlICogYmFzZUNvbG9yMS5hbHBoYSArIGJhc2VDb2xvcjIuYmx1ZSAqICgxIC0gYmFzZUNvbG9yMS5hbHBoYSlcbiAgICBiYXNlQ29sb3IxLmFscGhhICsgYmFzZUNvbG9yMi5hbHBoYSAtIGJhc2VDb2xvcjEuYWxwaGEgKiBiYXNlQ29sb3IyLmFscGhhXG4gIF1cblxuIyBDb2xvcig1MCwxMjAsMjAwLDI1NSlcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmx1YV9yZ2JhJywgc3RyaXAoXCJcbiAgKD86I3tuYW1lUHJlZml4ZXN9KUNvbG9yI3twc31cXFxccypcbiAgICAoI3tpbnR9fCN7dmFyaWFibGVzfSlcbiAgICAje2NvbW1hfVxuICAgICgje2ludH18I3t2YXJpYWJsZXN9KVxuICAgICN7Y29tbWF9XG4gICAgKCN7aW50fXwje3ZhcmlhYmxlc30pXG4gICAgI3tjb21tYX1cbiAgICAoI3tpbnR9fCN7dmFyaWFibGVzfSlcbiAgI3twZX1cblwiKSwgWydsdWEnXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxyLGcsYixhXSA9IG1hdGNoXG5cbiAgQHJlZCA9IGNvbnRleHQucmVhZEludChyKVxuICBAZ3JlZW4gPSBjb250ZXh0LnJlYWRJbnQoZylcbiAgQGJsdWUgPSBjb250ZXh0LnJlYWRJbnQoYilcbiAgQGFscGhhID0gY29udGV4dC5yZWFkSW50KGEpIC8gMjU1XG5cbiMjICAgICMjIyMjIyMjICAjIyAgICAgICAjIyMjIyMjIyAjIyAgICAjIyAjIyMjIyMjI1xuIyMgICAgIyMgICAgICMjICMjICAgICAgICMjICAgICAgICMjIyAgICMjICMjICAgICAjI1xuIyMgICAgIyMgICAgICMjICMjICAgICAgICMjICAgICAgICMjIyMgICMjICMjICAgICAjI1xuIyMgICAgIyMjIyMjIyMgICMjICAgICAgICMjIyMjIyAgICMjICMjICMjICMjICAgICAjI1xuIyMgICAgIyMgICAgICMjICMjICAgICAgICMjICAgICAgICMjICAjIyMjICMjICAgICAjI1xuIyMgICAgIyMgICAgICMjICMjICAgICAgICMjICAgICAgICMjICAgIyMjICMjICAgICAjI1xuIyMgICAgIyMjIyMjIyMgICMjIyMjIyMjICMjIyMjIyMjICMjICAgICMjICMjIyMjIyMjXG5cbiMgbXVsdGlwbHkoI2YwMCwgIzAwRilcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOm11bHRpcGx5Jywgc3RyaXAoXCJcbiAgbXVsdGlwbHkje3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICB7QHJnYmF9ID0gYmFzZUNvbG9yMS5ibGVuZChiYXNlQ29sb3IyLCBjb250ZXh0LkJsZW5kTW9kZXMuTVVMVElQTFkpXG5cbiMgc2NyZWVuKCNmMDAsICMwMEYpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpzY3JlZW4nLCBzdHJpcChcIlxuICBzY3JlZW4je3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICB7QHJnYmF9ID0gYmFzZUNvbG9yMS5ibGVuZChiYXNlQ29sb3IyLCBjb250ZXh0LkJsZW5kTW9kZXMuU0NSRUVOKVxuXG5cbiMgb3ZlcmxheSgjZjAwLCAjMDBGKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6b3ZlcmxheScsIHN0cmlwKFwiXG4gIG92ZXJsYXkje3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICB7QHJnYmF9ID0gYmFzZUNvbG9yMS5ibGVuZChiYXNlQ29sb3IyLCBjb250ZXh0LkJsZW5kTW9kZXMuT1ZFUkxBWSlcblxuXG4jIHNvZnRsaWdodCgjZjAwLCAjMDBGKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6c29mdGxpZ2h0Jywgc3RyaXAoXCJcbiAgc29mdGxpZ2h0I3twc31cbiAgICAoXG4gICAgICAje25vdFF1b3RlfVxuICAgICAgI3tjb21tYX1cbiAgICAgICN7bm90UXVvdGV9XG4gICAgKVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgZXhwcl0gPSBtYXRjaFxuXG4gIFtjb2xvcjEsIGNvbG9yMl0gPSBjb250ZXh0LnNwbGl0KGV4cHIpXG5cbiAgYmFzZUNvbG9yMSA9IGNvbnRleHQucmVhZENvbG9yKGNvbG9yMSlcbiAgYmFzZUNvbG9yMiA9IGNvbnRleHQucmVhZENvbG9yKGNvbG9yMilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjEpIG9yIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjIpXG5cbiAge0ByZ2JhfSA9IGJhc2VDb2xvcjEuYmxlbmQoYmFzZUNvbG9yMiwgY29udGV4dC5CbGVuZE1vZGVzLlNPRlRfTElHSFQpXG5cblxuIyBoYXJkbGlnaHQoI2YwMCwgIzAwRilcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmhhcmRsaWdodCcsIHN0cmlwKFwiXG4gIGhhcmRsaWdodCN7cHN9XG4gICAgKFxuICAgICAgI3tub3RRdW90ZX1cbiAgICAgICN7Y29tbWF9XG4gICAgICAje25vdFF1b3RlfVxuICAgIClcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGV4cHJdID0gbWF0Y2hcblxuICBbY29sb3IxLCBjb2xvcjJdID0gY29udGV4dC5zcGxpdChleHByKVxuXG4gIGJhc2VDb2xvcjEgPSBjb250ZXh0LnJlYWRDb2xvcihjb2xvcjEpXG4gIGJhc2VDb2xvcjIgPSBjb250ZXh0LnJlYWRDb2xvcihjb2xvcjIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IxKSBvciBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IyKVxuXG4gIHtAcmdiYX0gPSBiYXNlQ29sb3IxLmJsZW5kKGJhc2VDb2xvcjIsIGNvbnRleHQuQmxlbmRNb2Rlcy5IQVJEX0xJR0hUKVxuXG5cbiMgZGlmZmVyZW5jZSgjZjAwLCAjMDBGKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6ZGlmZmVyZW5jZScsIHN0cmlwKFwiXG4gIGRpZmZlcmVuY2Uje3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMSkgb3IgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yMilcblxuICB7QHJnYmF9ID0gYmFzZUNvbG9yMS5ibGVuZChiYXNlQ29sb3IyLCBjb250ZXh0LkJsZW5kTW9kZXMuRElGRkVSRU5DRSlcblxuIyBleGNsdXNpb24oI2YwMCwgIzAwRilcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmV4Y2x1c2lvbicsIHN0cmlwKFwiXG4gIGV4Y2x1c2lvbiN7cHN9XG4gICAgKFxuICAgICAgI3tub3RRdW90ZX1cbiAgICAgICN7Y29tbWF9XG4gICAgICAje25vdFF1b3RlfVxuICAgIClcbiAgI3twZX1cblwiKSwgWycqJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGV4cHJdID0gbWF0Y2hcblxuICBbY29sb3IxLCBjb2xvcjJdID0gY29udGV4dC5zcGxpdChleHByKVxuXG4gIGJhc2VDb2xvcjEgPSBjb250ZXh0LnJlYWRDb2xvcihjb2xvcjEpXG4gIGJhc2VDb2xvcjIgPSBjb250ZXh0LnJlYWRDb2xvcihjb2xvcjIpXG5cbiAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZSBpZiBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IxKSBvciBjb250ZXh0LmlzSW52YWxpZChiYXNlQ29sb3IyKVxuXG4gIHtAcmdiYX0gPSBiYXNlQ29sb3IxLmJsZW5kKGJhc2VDb2xvcjIsIGNvbnRleHQuQmxlbmRNb2Rlcy5FWENMVVNJT04pXG5cbiMgYXZlcmFnZSgjZjAwLCAjMDBGKVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6YXZlcmFnZScsIHN0cmlwKFwiXG4gIGF2ZXJhZ2Uje3BzfVxuICAgIChcbiAgICAgICN7bm90UXVvdGV9XG4gICAgICAje2NvbW1hfVxuICAgICAgI3tub3RRdW90ZX1cbiAgICApXG4gICN7cGV9XG5cIiksIFsnKiddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBleHByXSA9IG1hdGNoXG5cbiAgW2NvbG9yMSwgY29sb3IyXSA9IGNvbnRleHQuc3BsaXQoZXhwcilcblxuICBiYXNlQ29sb3IxID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IxKVxuICBiYXNlQ29sb3IyID0gY29udGV4dC5yZWFkQ29sb3IoY29sb3IyKVxuXG4gIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjEpIG9yIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjIpXG4gICAgcmV0dXJuIEBpbnZhbGlkID0gdHJ1ZVxuXG4gIHtAcmdiYX0gPSBiYXNlQ29sb3IxLmJsZW5kKGJhc2VDb2xvcjIsIGNvbnRleHQuQmxlbmRNb2Rlcy5BVkVSQUdFKVxuXG4jIG5lZ2F0aW9uKCNmMDAsICMwMEYpXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpuZWdhdGlvbicsIHN0cmlwKFwiXG4gIG5lZ2F0aW9uI3twc31cbiAgICAoXG4gICAgICAje25vdFF1b3RlfVxuICAgICAgI3tjb21tYX1cbiAgICAgICN7bm90UXVvdGV9XG4gICAgKVxuICAje3BlfVxuXCIpLCBbJyonXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgZXhwcl0gPSBtYXRjaFxuXG4gIFtjb2xvcjEsIGNvbG9yMl0gPSBjb250ZXh0LnNwbGl0KGV4cHIpXG5cbiAgYmFzZUNvbG9yMSA9IGNvbnRleHQucmVhZENvbG9yKGNvbG9yMSlcbiAgYmFzZUNvbG9yMiA9IGNvbnRleHQucmVhZENvbG9yKGNvbG9yMilcblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjEpIG9yIGNvbnRleHQuaXNJbnZhbGlkKGJhc2VDb2xvcjIpXG5cbiAge0ByZ2JhfSA9IGJhc2VDb2xvcjEuYmxlbmQoYmFzZUNvbG9yMiwgY29udGV4dC5CbGVuZE1vZGVzLk5FR0FUSU9OKVxuXG4jIyAgICAjIyMjIyMjIyAjIyAgICAgICAjIyAgICAgIyNcbiMjICAgICMjICAgICAgICMjICAgICAgICMjIyAgICMjI1xuIyMgICAgIyMgICAgICAgIyMgICAgICAgIyMjIyAjIyMjXG4jIyAgICAjIyMjIyMgICAjIyAgICAgICAjIyAjIyMgIyNcbiMjICAgICMjICAgICAgICMjICAgICAgICMjICAgICAjI1xuIyMgICAgIyMgICAgICAgIyMgICAgICAgIyMgICAgICMjXG4jIyAgICAjIyMjIyMjIyAjIyMjIyMjIyAjIyAgICAgIyNcblxuIyByZ2JhIDUwIDEyMCAyMDAgMVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6ZWxtX3JnYmEnLCBzdHJpcChcIlxuICByZ2JhXFxcXHMrXG4gICAgKCN7aW50fXwje3ZhcmlhYmxlc30pXG4gICAgXFxcXHMrXG4gICAgKCN7aW50fXwje3ZhcmlhYmxlc30pXG4gICAgXFxcXHMrXG4gICAgKCN7aW50fXwje3ZhcmlhYmxlc30pXG4gICAgXFxcXHMrXG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcblwiKSwgWydlbG0nXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXyxyLGcsYixhXSA9IG1hdGNoXG5cbiAgQHJlZCA9IGNvbnRleHQucmVhZEludChyKVxuICBAZ3JlZW4gPSBjb250ZXh0LnJlYWRJbnQoZylcbiAgQGJsdWUgPSBjb250ZXh0LnJlYWRJbnQoYilcbiAgQGFscGhhID0gY29udGV4dC5yZWFkRmxvYXQoYSlcblxuIyByZ2IgNTAgMTIwIDIwMFxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6ZWxtX3JnYicsIHN0cmlwKFwiXG4gIHJnYlxcXFxzK1xuICAgICgje2ludH18I3t2YXJpYWJsZXN9KVxuICAgIFxcXFxzK1xuICAgICgje2ludH18I3t2YXJpYWJsZXN9KVxuICAgIFxcXFxzK1xuICAgICgje2ludH18I3t2YXJpYWJsZXN9KVxuXCIpLCBbJ2VsbSddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLHIsZyxiXSA9IG1hdGNoXG5cbiAgQHJlZCA9IGNvbnRleHQucmVhZEludChyKVxuICBAZ3JlZW4gPSBjb250ZXh0LnJlYWRJbnQoZylcbiAgQGJsdWUgPSBjb250ZXh0LnJlYWRJbnQoYilcblxuZWxtQW5nbGUgPSBcIig/OiN7ZmxvYXR9fFxcXFwoZGVncmVlc1xcXFxzKyg/OiN7aW50fXwje3ZhcmlhYmxlc30pXFxcXCkpXCJcblxuIyBoc2wgMjEwIDUwIDUwXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czplbG1faHNsJywgc3RyaXAoXCJcbiAgaHNsXFxcXHMrXG4gICAgKCN7ZWxtQW5nbGV9fCN7dmFyaWFibGVzfSlcbiAgICBcXFxccytcbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAgIFxcXFxzK1xuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG5cIiksIFsnZWxtJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgZWxtRGVncmVlc1JlZ2V4cCA9IG5ldyBSZWdFeHAoXCJcXFxcKGRlZ3JlZXNcXFxccysoI3tjb250ZXh0LmludH18I3tjb250ZXh0LnZhcmlhYmxlc1JFfSlcXFxcKVwiKVxuXG4gIFtfLGgscyxsXSA9IG1hdGNoXG5cbiAgaWYgbSA9IGVsbURlZ3JlZXNSZWdleHAuZXhlYyhoKVxuICAgIGggPSBjb250ZXh0LnJlYWRJbnQobVsxXSlcbiAgZWxzZVxuICAgIGggPSBjb250ZXh0LnJlYWRGbG9hdChoKSAqIDE4MCAvIE1hdGguUElcblxuICBoc2wgPSBbXG4gICAgaFxuICAgIGNvbnRleHQucmVhZEZsb2F0KHMpXG4gICAgY29udGV4dC5yZWFkRmxvYXQobClcbiAgXVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgaHNsLnNvbWUgKHYpIC0+IG5vdCB2PyBvciBpc05hTih2KVxuXG4gIEBoc2wgPSBoc2xcbiAgQGFscGhhID0gMVxuXG4jIGhzbGEgMjEwIDUwIDUwIDAuN1xucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6ZWxtX2hzbGEnLCBzdHJpcChcIlxuICBoc2xhXFxcXHMrXG4gICAgKCN7ZWxtQW5nbGV9fCN7dmFyaWFibGVzfSlcbiAgICBcXFxccytcbiAgICAoI3tmbG9hdH18I3t2YXJpYWJsZXN9KVxuICAgIFxcXFxzK1xuICAgICgje2Zsb2F0fXwje3ZhcmlhYmxlc30pXG4gICAgXFxcXHMrXG4gICAgKCN7ZmxvYXR9fCN7dmFyaWFibGVzfSlcblwiKSwgWydlbG0nXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBlbG1EZWdyZWVzUmVnZXhwID0gbmV3IFJlZ0V4cChcIlxcXFwoZGVncmVlc1xcXFxzKygje2NvbnRleHQuaW50fXwje2NvbnRleHQudmFyaWFibGVzUkV9KVxcXFwpXCIpXG5cbiAgW18saCxzLGwsYV0gPSBtYXRjaFxuXG4gIGlmIG0gPSBlbG1EZWdyZWVzUmVnZXhwLmV4ZWMoaClcbiAgICBoID0gY29udGV4dC5yZWFkSW50KG1bMV0pXG4gIGVsc2VcbiAgICBoID0gY29udGV4dC5yZWFkRmxvYXQoaCkgKiAxODAgLyBNYXRoLlBJXG5cbiAgaHNsID0gW1xuICAgIGhcbiAgICBjb250ZXh0LnJlYWRGbG9hdChzKVxuICAgIGNvbnRleHQucmVhZEZsb2F0KGwpXG4gIF1cblxuICByZXR1cm4gQGludmFsaWQgPSB0cnVlIGlmIGhzbC5zb21lICh2KSAtPiBub3Qgdj8gb3IgaXNOYU4odilcblxuICBAaHNsID0gaHNsXG4gIEBhbHBoYSA9IGNvbnRleHQucmVhZEZsb2F0KGEpXG5cbiMgZ3JheXNjYWxlIDFcbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmVsbV9ncmF5c2NhbGUnLCBcImdyKD86YXxlKXlzY2FsZVxcXFxzKygje2Zsb2F0fXwje3ZhcmlhYmxlc30pXCIsIFsnZWxtJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sYW1vdW50XSA9IG1hdGNoXG4gIGFtb3VudCA9IE1hdGguZmxvb3IoMjU1IC0gY29udGV4dC5yZWFkRmxvYXQoYW1vdW50KSAqIDI1NSlcbiAgQHJnYiA9IFthbW91bnQsIGFtb3VudCwgYW1vdW50XVxuXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czplbG1fY29tcGxlbWVudCcsIHN0cmlwKFwiXG4gIGNvbXBsZW1lbnRcXFxccysoI3tub3RRdW90ZX0pXG5cIiksIFsnZWxtJ10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHN1YmV4cHJdID0gbWF0Y2hcblxuICBiYXNlQ29sb3IgPSBjb250ZXh0LnJlYWRDb2xvcihzdWJleHByKVxuXG4gIHJldHVybiBAaW52YWxpZCA9IHRydWUgaWYgY29udGV4dC5pc0ludmFsaWQoYmFzZUNvbG9yKVxuXG4gIFtoLHMsbF0gPSBiYXNlQ29sb3IuaHNsXG5cbiAgQGhzbCA9IFsoaCArIDE4MCkgJSAzNjAsIHMsIGxdXG4gIEBhbHBoYSA9IGJhc2VDb2xvci5hbHBoYVxuXG4jIyAgICAjIyAgICAgICAgICAjIyMgICAgIyMjIyMjIyMgIyMjIyMjIyMgIyMgICAgICMjXG4jIyAgICAjIyAgICAgICAgICMjICMjICAgICAgIyMgICAgIyMgICAgICAgICMjICAgIyNcbiMjICAgICMjICAgICAgICAjIyAgICMjICAgICAjIyAgICAjIyAgICAgICAgICMjICMjXG4jIyAgICAjIyAgICAgICAjIyAgICAgIyMgICAgIyMgICAgIyMjIyMjICAgICAgIyMjXG4jIyAgICAjIyAgICAgICAjIyMjIyMjIyMgICAgIyMgICAgIyMgICAgICAgICAjIyAjI1xuIyMgICAgIyMgICAgICAgIyMgICAgICMjICAgICMjICAgICMjICAgICAgICAjIyAgICMjXG4jIyAgICAjIyMjIyMjIyAjIyAgICAgIyMgICAgIyMgICAgIyMjIyMjIyMgIyMgICAgICMjXG5cbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmxhdGV4X2dyYXknLCBzdHJpcChcIlxuICBcXFxcW2dyYXlcXFxcXVxcXFx7KCN7ZmxvYXR9KVxcXFx9XG5cIiksIFsndGV4J10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGFtb3VudF0gPSBtYXRjaFxuXG4gIGFtb3VudCA9IGNvbnRleHQucmVhZEZsb2F0KGFtb3VudCkgKiAyNTVcbiAgQHJnYiA9IFthbW91bnQsIGFtb3VudCwgYW1vdW50XVxuXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpsYXRleF9odG1sJywgc3RyaXAoXCJcbiAgXFxcXFtIVE1MXFxcXF1cXFxceygje2hleGFkZWNpbWFsfXs2fSlcXFxcfVxuXCIpLCBbJ3RleCddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBoZXhhXSA9IG1hdGNoXG5cbiAgQGhleCA9IGhleGFcblxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6bGF0ZXhfcmdiJywgc3RyaXAoXCJcbiAgXFxcXFtyZ2JcXFxcXVxcXFx7KCN7ZmxvYXR9KSN7Y29tbWF9KCN7ZmxvYXR9KSN7Y29tbWF9KCN7ZmxvYXR9KVxcXFx9XG5cIiksIFsndGV4J10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIHIsZyxiXSA9IG1hdGNoXG5cbiAgciA9IE1hdGguZmxvb3IoY29udGV4dC5yZWFkRmxvYXQocikgKiAyNTUpXG4gIGcgPSBNYXRoLmZsb29yKGNvbnRleHQucmVhZEZsb2F0KGcpICogMjU1KVxuICBiID0gTWF0aC5mbG9vcihjb250ZXh0LnJlYWRGbG9hdChiKSAqIDI1NSlcbiAgQHJnYiA9IFtyLCBnLCBiXVxuXG5yZWdpc3RyeS5jcmVhdGVFeHByZXNzaW9uICdwaWdtZW50czpsYXRleF9SR0InLCBzdHJpcChcIlxuICBcXFxcW1JHQlxcXFxdXFxcXHsoI3tpbnR9KSN7Y29tbWF9KCN7aW50fSkje2NvbW1hfSgje2ludH0pXFxcXH1cblwiKSwgWyd0ZXgnXSwgKG1hdGNoLCBleHByZXNzaW9uLCBjb250ZXh0KSAtPlxuICBbXywgcixnLGJdID0gbWF0Y2hcblxuICByID0gY29udGV4dC5yZWFkSW50KHIpXG4gIGcgPSBjb250ZXh0LnJlYWRJbnQoZylcbiAgYiA9IGNvbnRleHQucmVhZEludChiKVxuICBAcmdiID0gW3IsIGcsIGJdXG5cbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmxhdGV4X2NteWsnLCBzdHJpcChcIlxuICBcXFxcW2NteWtcXFxcXVxcXFx7KCN7ZmxvYXR9KSN7Y29tbWF9KCN7ZmxvYXR9KSN7Y29tbWF9KCN7ZmxvYXR9KSN7Y29tbWF9KCN7ZmxvYXR9KVxcXFx9XG5cIiksIFsndGV4J10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGMsbSx5LGtdID0gbWF0Y2hcblxuICBjID0gY29udGV4dC5yZWFkRmxvYXQoYylcbiAgbSA9IGNvbnRleHQucmVhZEZsb2F0KG0pXG4gIHkgPSBjb250ZXh0LnJlYWRGbG9hdCh5KVxuICBrID0gY29udGV4dC5yZWFkRmxvYXQoaylcbiAgQGNteWsgPSBbYyxtLHksa11cblxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6bGF0ZXhfcHJlZGVmaW5lZCcsIHN0cmlwKCdcbiAgXFxcXHsoYmxhY2t8Ymx1ZXxicm93bnxjeWFufGRhcmtncmF5fGdyYXl8Z3JlZW58bGlnaHRncmF5fGxpbWV8bWFnZW50YXxvbGl2ZXxvcmFuZ2V8cGlua3xwdXJwbGV8cmVkfHRlYWx8dmlvbGV0fHdoaXRlfHllbGxvdylcXFxcfVxuJyksIFsndGV4J10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIG5hbWVdID0gbWF0Y2hcbiAgQGhleCA9IGNvbnRleHQuU1ZHQ29sb3JzLmFsbENhc2VzW25hbWVdLnJlcGxhY2UoJyMnLCcnKVxuXG5cbnJlZ2lzdHJ5LmNyZWF0ZUV4cHJlc3Npb24gJ3BpZ21lbnRzOmxhdGV4X3ByZWRlZmluZWRfZHZpcG5hbWVzJywgc3RyaXAoJ1xuICBcXFxceyhBcHJpY290fEFxdWFtYXJpbmV8Qml0dGVyc3dlZXR8QmxhY2t8Qmx1ZXxCbHVlR3JlZW58Qmx1ZVZpb2xldHxCcmlja1JlZHxCcm93bnxCdXJudE9yYW5nZXxDYWRldEJsdWV8Q2FybmF0aW9uUGlua3xDZXJ1bGVhbnxDb3JuZmxvd2VyQmx1ZXxDeWFufERhbmRlbGlvbnxEYXJrT3JjaGlkfEVtZXJhbGR8Rm9yZXN0R3JlZW58RnVjaHNpYXxHb2xkZW5yb2R8R3JheXxHcmVlbnxHcmVlblllbGxvd3xKdW5nbGVHcmVlbnxMYXZlbmRlcnxMaW1lR3JlZW58TWFnZW50YXxNYWhvZ2FueXxNYXJvb258TWVsb258TWlkbmlnaHRCbHVlfE11bGJlcnJ5fE5hdnlCbHVlfE9saXZlR3JlZW58T3JhbmdlfE9yYW5nZVJlZHxPcmNoaWR8UGVhY2h8UGVyaXdpbmtsZXxQaW5lR3JlZW58UGx1bXxQcm9jZXNzQmx1ZXxQdXJwbGV8UmF3U2llbm5hfFJlZHxSZWRPcmFuZ2V8UmVkVmlvbGV0fFJob2RhbWluZXxSb3lhbEJsdWV8Um95YWxQdXJwbGV8UnViaW5lUmVkfFNhbG1vbnxTZWFHcmVlbnxTZXBpYXxTa3lCbHVlfFNwcmluZ0dyZWVufFRhbnxUZWFsQmx1ZXxUaGlzdGxlfFR1cnF1b2lzZXxWaW9sZXR8VmlvbGV0UmVkfFdoaXRlfFdpbGRTdHJhd2JlcnJ5fFllbGxvd3xZZWxsb3dHcmVlbnxZZWxsb3dPcmFuZ2UpXFxcXH1cbicpLCBbJ3RleCddLCAobWF0Y2gsIGV4cHJlc3Npb24sIGNvbnRleHQpIC0+XG4gIFtfLCBuYW1lXSA9IG1hdGNoXG4gIEBoZXggPSBjb250ZXh0LkRWSVBuYW1lc1tuYW1lXS5yZXBsYWNlKCcjJywnJylcblxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6bGF0ZXhfbWl4Jywgc3RyaXAoJ1xuICBcXFxceyhbXiFcXFxcblxcXFx9XStbIV1bXlxcXFx9XFxcXG5dKylcXFxcfVxuJyksIFsndGV4J10sIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18sIGV4cHJdID0gbWF0Y2hcblxuICBvcCA9IGV4cHIuc3BsaXQoJyEnKVxuXG4gIG1peCA9IChbYSxwLGJdKSAtPlxuICAgIGNvbG9yQSA9IGlmIGEgaW5zdGFuY2VvZiBjb250ZXh0LkNvbG9yIHRoZW4gYSBlbHNlIGNvbnRleHQucmVhZENvbG9yKFwieyN7YX19XCIpXG4gICAgY29sb3JCID0gaWYgYiBpbnN0YW5jZW9mIGNvbnRleHQuQ29sb3IgdGhlbiBiIGVsc2UgY29udGV4dC5yZWFkQ29sb3IoXCJ7I3tifX1cIilcbiAgICBwZXJjZW50ID0gY29udGV4dC5yZWFkSW50KHApXG5cbiAgICBjb250ZXh0Lm1peENvbG9ycyhjb2xvckEsIGNvbG9yQiwgcGVyY2VudCAvIDEwMClcblxuICBvcC5wdXNoKG5ldyBjb250ZXh0LkNvbG9yKDI1NSwgMjU1LCAyNTUpKSBpZiBvcC5sZW5ndGggaXMgMlxuXG4gIG5leHRDb2xvciA9IG51bGxcblxuICB3aGlsZSBvcC5sZW5ndGggPiAwXG4gICAgdHJpcGxldCA9IG9wLnNwbGljZSgwLDMpXG4gICAgbmV4dENvbG9yID0gbWl4KHRyaXBsZXQpXG4gICAgb3AudW5zaGlmdChuZXh0Q29sb3IpIGlmIG9wLmxlbmd0aCA+IDBcblxuICBAcmdiID0gbmV4dENvbG9yLnJnYlxuXG4jICAgICAjIyMjIyMjICAjIyMjIyMjI1xuIyAgICAjIyAgICAgIyMgICAgIyNcbiMgICAgIyMgICAgICMjICAgICMjXG4jICAgICMjICAgICAjIyAgICAjI1xuIyAgICAjIyAgIyMgIyMgICAgIyNcbiMgICAgIyMgICAgIyMgICAgICMjXG4jICAgICAjIyMjIyAjIyAgICAjI1xuXG4jIFF0LnJnYmEoMS4wLDAuNSwwLjAsMC43KVxucmVnaXN0cnkuY3JlYXRlRXhwcmVzc2lvbiAncGlnbWVudHM6cXRfcmdiYScsIHN0cmlwKFwiXG4gIFF0XFxcXC5yZ2JhI3twc31cXFxccypcbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICAgI3tjb21tYX1cbiAgICAoI3tmbG9hdH0pXG4gICN7cGV9XG5cIiksIFsncW1sJywgJ2MnLCAnY2MnLCAnY3BwJ10sIDEsIChtYXRjaCwgZXhwcmVzc2lvbiwgY29udGV4dCkgLT5cbiAgW18scixnLGIsYV0gPSBtYXRjaFxuXG4gIEByZWQgPSBjb250ZXh0LnJlYWRGbG9hdChyKSAqIDI1NVxuICBAZ3JlZW4gPSBjb250ZXh0LnJlYWRGbG9hdChnKSAqIDI1NVxuICBAYmx1ZSA9IGNvbnRleHQucmVhZEZsb2F0KGIpICogMjU1XG4gIEBhbHBoYSA9IGNvbnRleHQucmVhZEZsb2F0KGEpXG4iXX0=
