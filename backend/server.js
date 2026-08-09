const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// عرض ملفات MIND-GLOW
app.use(express.static(path.join(__dirname, "..")));

// الاتصال بقاعدة البيانات
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mindglow"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("Database connected successfully!");
    }
});

// الصفحة الرئيسية
app.get("/", (req, res) => {
    res.send("MIND-GLOW Backend is working!");
});

// تسجيل مستخدم جديد
app.post("/signup", (req, res) => {

    const {
        firstname,
        lastname,
        phone,
        email,
        gender,
        password,
        birthday
    } = req.body;

    const sql = `
        INSERT INTO users
        (firstname, lastname, phone, email, gender, password, birthday)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            firstname,
            lastname,
            phone,
            email,
            gender,
            password,
            birthday || null
        ],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        message: "This email is already registered."
                    });
                }

                console.log(err);

                return res.status(500).json({
                    message: "Registration failed."
                });
            }

            res.json({
                message: "Account created successfully!",
                userId: result.insertId
            });
        }
    );
});

// ========================================
// LOGIN
// ========================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // التأكد من إدخال البيانات
    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password."
        });
    }

    // البحث عن المستخدم
    const sql = `
        SELECT id, firstname, lastname, phone, email, gender, birthday
        FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(
        sql,
        [email, password],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Login failed."
                });
            }

            // المستخدم غير موجود أو البيانات خاطئة
            if (results.length === 0) {
                return res.status(401).json({
                    message: "Email or password is incorrect."
                });
            }

            // المستخدم موجود
            const user = results[0];

            res.json({
                message: "Login successful!",
                user: user
            });
        }
    );
});
// ===============================
// حفظ نتيجة الكويز
// ===============================

app.post("/quiz-result", (req, res) => {

    const {
        userId,
        subject,
        score,
        percentage,
        level
    } = req.body;

    // التأكد من البيانات
    if (
        !userId ||
        !subject ||
        score === undefined ||
        percentage === undefined ||
        level === undefined
    ) {
        return res.status(400).json({
            message: "Missing quiz result data."
        });
    }

    const sql = `
        INSERT INTO quiz_results
        (user_id, subject, score, percentage, level)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            subject,
            score,
            percentage,
            level
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to save quiz result."
                });
            }

            res.json({
                message: "Quiz result saved successfully!",
                resultId: result.insertId
            });
        }
    );
});


// تشغيل السيرفر
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});