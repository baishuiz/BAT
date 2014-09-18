/*
 * @module  assert
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (bat) {
    var base = bat.base;

    var Assert = function(target) {
        this.is = function(val) {
            var result = (target === val);
            base.beacon(result).on(base.event.stop)
            return result;
        }

    }
    base.Assert = Assert;
}) (bat);