;(function (bat) {
    var base = bat.base;
    var events = {
      complete : beacon.createEvent('complete'),
      ooo : beacon.createEvent('ooo'),
      over : beacon.createEvent('over'),
      parseDone : beacon.createEvent('done')
    }

    base.events = events;
}) (bat);
