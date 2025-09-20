const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    const user = { email, password: `${salt}:${hashedPassword}` };
    users.push(user);
    return user;
}

function login(email, password) {
    const user = users.find(v => v.email === email);
    if (!user) {
        console.log("user not found");
        return;
    }

    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');

    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    if (match) {
        console.log("login successful");
    } else {
        console.log("login unsuccessful");
    }
}

// Demo
const newUser = signup("test@example.com", "secret123");
console.log("Signed up:", newUser);

login("test@example.com", "secret123");   
login("test@example.com", "wrongpass");   
