var TopLeftDot = function(element, centerX, centerY, radius, durationMicros) {
  Dot.prototype.constructor.call(this, element, centerX, centerY, radius, durationMicros);
}
TopLeftDot.prototype = Object.create(Dot.prototype);
TopLeftDot.prototype.constructor = TopLeftDot;
TopLeftDot.prototype.leftObj = new CSSUnitValue(0, 'px');
TopLeftDot.prototype.topObj = new CSSUnitValue(0, 'px');
TopLeftDot.prototype.sizeObj = new CSSUnitValue(0, 'px');

TopLeftDot.prototype.setPosition = function(position) {
  this.leftObj.value = this.centerX + position[0];
  this.element.attributeStyleMap.set('left', this.leftObj);
  this.topObj.value = this.centerY + position[1];
  this.element.attributeStyleMap.set('top', this.topObj);
  this.sizeObj.value = position[2];
  this.element.attributeStyleMap.set('width', this.sizeObj);
  this.element.attributeStyleMap.set('height', this.sizeObj);
};

typedom_topleft = {
  animationFrame: 0,
  createDot:function(element, centerX, centerY, radius) {
    var angle = Math.random() * Math.PI * 2;
    var dot = new TopLeftDot(
    element,
    centerX,
    centerY,
    radius,
    durationMicros);
    dot.reset(0);
    return dot;
  },
  start:function(dots) {
    function updateDots(dots, timestamp) {
      for (var i = 0; i < dots.length; ++i) {
        if (dots[i].done(timestamp)) {
          dots[i].reset(timestamp);
          } else {
          dots[i].update(timestamp);
        }
      }
      updateFPS(timestamp);
      this.animationFrame = window.requestAnimationFrame(updateDots.bind(this, dots));
    }
    this.animationFrame = window.requestAnimationFrame(updateDots.bind(this, dots));
  },
  stop:function() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
    }
  },
};
