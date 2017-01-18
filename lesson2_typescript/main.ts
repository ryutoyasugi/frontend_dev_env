'use strict';

/* number, string, boolean, any */
let x: number = 10; // 静的型付け
// x = 'foo'
const name = 'Foo'; // 型推論
// name = 'Bar'

class User {
    fullName: string;
    constructor(public firstName: string, public lastName: string) {
        this.fullName = firstName + ' ' + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

export function hello(p: Person): string {
    return 'Hello, ' + p.firstName + ' ' + p.lastName;
}
console.log(hello(new User(name, 'Bar')));
