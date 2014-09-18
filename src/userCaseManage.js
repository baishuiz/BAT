/*
 * @module  userCaseManage
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (bat) {
    var base = bat.base;



    var tryDoCase = function(tcase) {
        setTimeOut(tcase,0);
    };


    var userCase = {

        set : function(case){
            return stack.push(case);
        },

        get : function() {
            var  activeCase = stack.shift();
            dones.push(activeCase);
            return activeCase;
        },

        doneList : function(){
            return dones;
        },

        todoList : function (){
            return stack;
        },


        run : function(){
            if(stack.length>0 && !isStop) {
                tryDoCase(get().tcase);
                tryDoCase(run);
            }    
        },

        stop : function(){
            isStop =  true;
        }     
    };

    var TaskManage = function(){
        var stack   = [];
        var dones = [];
        var isStop = false;
    };

    TaskManage.prototype = userCase;
    base.TaskManage = TaskManage;
}) (bat);