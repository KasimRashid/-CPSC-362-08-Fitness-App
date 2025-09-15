const accounts = new Map();


while (true) {
    var name = prompt("Register Name (or type 'done' to finish): ");
    if (name.toLowerCase() === "done") break;

    var pass = prompt("Register Password: ");
    accounts.set(name, pass);
}

console.log("Registration complete.");

while (true) {
    var user = prompt("Login Name: ");
    if (accounts.has(user)) {
        var password = prompt("Password: ");
        if (accounts.get(user) === password) {
            console.log("Logged In");
            break;
        } else {
            console.log("Wrong password");
        }
    } else {
        console.log("Wrong username");
    }
}