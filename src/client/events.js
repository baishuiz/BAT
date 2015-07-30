;(function (bat) {
    var base = bat.base;
    var events = {
      complete : beacon.createEvent('complete'),
      ooo : beacon.createEvent('ooo'),
      over : beacon.createEvent('over')
    }

    base.events = events;
}) (bat);
