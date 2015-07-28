;(function (bat) {
    var base = bat.base;
    var events = {
      complete : beacon.createEvent('complete'),
      over : beacon.createEvent('over')
    }

    base.events = events;
}) (bat);
