// A very simple test framework
// new Test("Sample Test", function () {
//     var v1 = 1;
//     var v2 = 1;
//     this.areEqual(v1, v2)
//     this.isTrue(true)
// });

class Test {
    constructor(name, func) {
        if (name == undefined || name == "") {
            name = "Anonymous Test";
        }

        if (func == undefined) {
            throw "Test function is required in Test class."
        }

        this.func = func;
        this.name = name;
        this.func.areEqual = this.areEqual;
        this.func.isTrue = this.isTrue;
        this.success = true;
        this.func();
        if (this.success) {
            console.log(this.name + " passed.");
        } else {
            console.log(this.name + " failed.");
        }
    }

    areEqual(obj1, obj2, message = "") {
        if (obj1 != obj2) {
            this.success = false;
            if (message != "") {
                console.error(message);
            } else {
                console.error(this.name + ": assert areEqual failure.");
            }
        }
    }

    isTrue(obj, message = "") {
        if (obj != true) {
            this.success = false;
            if (message != "") {
                console.error(message);
            } else {
                console.error(this.name + ": assert isTrue failure.");
            }
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = function () {
        this.Test = Test;
    };
}