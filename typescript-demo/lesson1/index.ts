interface Person {
    firstName: string;
    lastName: string;
}
class User {
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName:string,lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + "  " + lastName;
    }
}
function welcome(user:User){
    return "I am from fullName " + user.fullName;
}

// let user  = {
//     firstName: 'wang',
//     lastName: 'mike'
// }
let user = new User("wang","mike");
console.log(welcome(user))