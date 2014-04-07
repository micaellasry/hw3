
// Question 1
function slowDown(f,time){
    return function(){
        if((typeof this.lastCalled === 'undefined') || (new Date().getTime() - this.lastCalled > time)){
            this.lastCalled = new Date().getTime();
            this.runFirstTime = true;
            f();
            return;
        }

        if(this.runFirstTime) {
            this.runFirstTime = false;
            setTimeout(f,time);
        }
    };
}

//Question 2
function eventHandler(element, eventType){
    this.operations = {};
    this.register = function() {
        if(arguments.length === 1){
            this.operations['noFilter'] = arguments[0];
        } else if(arguments.length === 2) {
            this.operations[arguments[0]] = arguments[1];
        }
        return this;
    };
    element.addEventListener(eventType,(function(e){
        var classes = e.target.className.split(" ");
        if(typeof this.operations['noFilter'] !== 'undefined'){
            this.operations['noFilter'](e);
        }
        for(var i=0;i<classes.length;i++){
            if(typeof this.operations[classes[i]] !== 'undefined'){
                this.operations[classes[i]](e);
            }
        }
    }.bind(this)));
}

function eventDispatcher(element,eventType) {
    return new eventHandler(element, eventType);
}


//Question 3
function riddle() {
    var a = [];
    var squared = function(n){
        return function(){
            return n*n;
        };
    };
    for (var i = 0; i < 10; i++) {
        a.push(squared(i));
    }
    return a;
}


