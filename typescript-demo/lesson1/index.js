var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + "  " + lastName;
    }
    return User;
}());
function welcome(user) {
    return "I am from fullName ddd " + user.fullName;
}
// let user  = {
//     firstName: 'wang',
//     lastName: 'mike'
// }
var user = new User("wang", "mike");
console.log(welcome(user));
//# sourceMappingURL=index.js.map