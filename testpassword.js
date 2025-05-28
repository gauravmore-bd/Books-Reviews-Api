const bcrypt = require('bcrypt');

async function testPassword() {
    const plain = 'gaurav123'; // Replace with the password you used when signing up
    const hashed = '$2b$10$qipLoXvXGMY07etSNe4V1e5LYWM7gJqJ/l8DlwD4hEvzHHz6Rxyom'; // Replace with your actual hash from DB

    const match = await bcrypt.compare(plain, hashed);
    console.log("Password match test result:", match);
}

testPassword();