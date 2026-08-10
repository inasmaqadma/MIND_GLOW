// ========================================
// MINDGLOW - script.js
// ========================================

var userAnswers = {};

// ========================================
// عند تحميل الصفحة
// ========================================

document.addEventListener("DOMContentLoaded", function () {


// ========================================
// PROGRAMMING QUIZ
// ========================================

var options = document.querySelectorAll(".option");

for (var i = 0; i < options.length; i++) {

    options[i].addEventListener("click", function () {

        var questionNumber = this.getAttribute("data-q");

        var sameQuestion = document.querySelectorAll(
            '.option[data-q="' + questionNumber + '"]'
        );

        for (var j = 0; j < sameQuestion.length; j++) {
            sameQuestion[j].classList.remove("selected");
        }

        this.classList.add("selected");

        userAnswers[questionNumber] =
            this.getAttribute("data-a");

    });

}


// ========================================
// DARK MODE
// ========================================

var savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


// ========================================
// SHOW STUDENT NAME
// ========================================

var firstname = localStorage.getItem("firstname");
var lastname = localStorage.getItem("lastname");

var studentName =
    document.getElementById("studentName");

if (studentName && firstname) {

    studentName.innerHTML =
        firstname + " " + (lastname || "");

}


// ========================================
// SHOW PROGRAMMING LEVEL
// ========================================



var level =
localStorage.getItem("programmingLevel");

var levelText =
document.getElementById("levelText");

if (level && levelText) {

    levelText.innerHTML =
        "Your level is Level " + level;
}


});

// ========================================
// CHECK QUIZ
// ========================================

function checkQuiz() {


var correctAnswers = {
    1: "a",
    2: "b",
    3: "c",
    4: "a",
    5: "b",
    6: "b",
    7: "c",
    8: "a",
    9: "b",
    10: "c"
};

var score = 0;


// ========================================
// فحص الإجابات
// ========================================

for (var i = 1; i <= 10; i++) {

    var userAnswer = userAnswers[i];
    var correctAnswer = correctAnswers[i];

    var questionOptions = document.querySelectorAll(
        '.option[data-q="' + i + '"]'
    );


    // إزالة الألوان القديمة

    for (var j = 0; j < questionOptions.length; j++) {

        questionOptions[j].classList.remove("correct");
        questionOptions[j].classList.remove("wrong");

    }


    // حساب الدرجة

    if (userAnswer === correctAnswer) {
        score++;
    }


    // إظهار الصحيح والخطأ

    for (var k = 0; k < questionOptions.length; k++) {

        var answer =
            questionOptions[k].getAttribute("data-a");

        if (answer === correctAnswer) {

            questionOptions[k].classList.add("correct");

        }

        if (
            answer === userAnswer &&
            userAnswer !== correctAnswer
        ) {

            questionOptions[k].classList.add("wrong");

        }

    }

}


// ========================================
// النسبة
// ========================================

var percentage = score * 10;


// ========================================
// تحديد المستوى
// ========================================

var level;

if (percentage < 40) {

    level = 1;

} else if (percentage < 70) {

    level = 2;

} else {

    level = 3;

}


// ========================================
// حفظ النتيجة
// ========================================

localStorage.setItem(
    "programmingScore",
    score
);

localStorage.setItem(
    "programmingPercentage",
    percentage
);

localStorage.setItem(
    "programmingLevel",
    level
);


// ========================================
// إظهار النتيجة
// ========================================

var result = document.getElementById("result");

if (result) {

    result.innerHTML =
    "Your Score: " + score + "/10<br>" +
    "Percentage: " + percentage + "%<br>" +
    "Your Level: " + level + "<br><br>" +
    '<button type="button" class="btn" onclick="goToDashboard()">Go to Dashboard</button>';
}


}
function goToDashboard() {
    window.location.href = "dashboard.html";
}

// ========================================
// DARK / LIGHT THEME
// ========================================

function toggleTheme() {

```
if (document.body.classList.contains("dark")) {

    document.body.classList.remove("dark");

    localStorage.setItem(
        "theme",
        "light"
    );

} else {

    document.body.classList.add("dark");

    localStorage.setItem(
        "theme",
        "dark"
    );

}


}

// ========================================
// ASSIGNMENTS
// ========================================

function submitAssignment(number) {

```
var answer =
    document.getElementById("ans" + number);

var file =
    document.getElementById("file" + number);

var status =
    document.getElementById("status" + number);

var hasAnswer = false;
var hasFile = false;


if (
    answer &&
    answer.value.trim() !== ""
) {

    hasAnswer = true;

}


if (
    file &&
    file.files &&
    file.files.length > 0
) {

    hasFile = true;

}


if (!hasAnswer && !hasFile) {

    alert(
        "Please write your answer or upload a file."
    );

    return;

}


if (status) {

    status.innerHTML = "Submitted";

    status.classList.remove("pending");

    status.classList.add("submitted");

}


localStorage.setItem(
    "assignment" + number,
    "submitted"
);


alert(
    "Assignment submitted successfully!"
);
```

}

// ========================================
// LOGOUT
// ========================================

function logout() {

```
localStorage.removeItem(
    "programmingScore"
);

localStorage.removeItem(
    "programmingPercentage"
);

localStorage.removeItem(
    "programmingLevel"
);

window.location.href = "index.html";


}
// ========================================
// PROGRAMMING LESSONS BY LEVEL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // جلب مستوى الطالب من الكويز
    var level = localStorage.getItem("programmingLevel");

    // نتأكد أننا في صفحة الدروس
    var lessons = document.querySelectorAll(".lesson");

    if (lessons.length === 0) {
        return;
    }

    // إذا لم يعمل الطالب الكويز
    if (!level) {
        return;
    }

    level = parseInt(level);

    // إظهار الدروس حسب المستوى
    for (var i = 0; i < lessons.length; i++) {

        var lessonNumber = i + 1;

        if (level === 1) {

            // Level 1: الدروس 1 - 3
            if (lessonNumber >= 1 && lessonNumber <= 3) {
                lessons[i].style.display = "block";
            } else {
                lessons[i].style.display = "none";
            }

        } else if (level === 2) {

            // Level 2: الدروس 4 - 7
            if (lessonNumber >= 4 && lessonNumber <= 7) {
                lessons[i].style.display = "block";
            } else {
                lessons[i].style.display = "none";
            }

        } else if (level === 3) {

            // Level 3: الدروس 8 - 10
            if (lessonNumber >= 8 && lessonNumber <= 10) {
                lessons[i].style.display = "block";
            } else {
                lessons[i].style.display = "none";
            }
        }
    }

});