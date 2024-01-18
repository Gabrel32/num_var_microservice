(function () {
  //verifica el metodo at()
  if (!Array.prototype.at) {
    Array.prototype.at = function (index) {
      if (index < 0) {
        index = this.length + index;
      }
      if (index >= 0 && index < this.length) {
        return this[index];
      }
      return undefined;
    };
  }
})();
