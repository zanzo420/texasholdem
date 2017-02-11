// A very simple test framework
// Usage:
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
        var equal = false;

        if (obj1 instanceof Array && obj2 instanceof Array) {
            equal = areArraysEqual(obj1, obj2);
        } else {
            equal = (obj1 == obj2)
        }

        if (!equal) {
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

// a private function to compare two arrays
function areArraysEqual(a1, a2) {
    return a1.length==a2.length && a1.every((v,i)=> v === a2[i]);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = function () {
        this.Test = Test;
    };
}