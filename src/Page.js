;(function (bat) {
    var base = bat.base;
    
    function Page(URI){
        var ifm = document.createElement("iframe");
        var body = document.head || document.querySelector("head");
        var location = document.location;
        //ifm.setAttribute("src", URI);
        body.appendChild(ifm);
        return ifm;
    }
    base.Page = Page;
}) (bat);