
const password = document.getElementById("password");
const strength = document.getElementById("strength");
const bar = document.getElementById("bar");
const suggestions = document.getElementById("suggestions");

const checks = {
    length: value => value.length >= 12,
    upper: value => /[A-Z]/.test(value),
    lower: value => /[a-z]/.test(value),
    number: value => /[0-9]/.test(value),
    special: value => /[^A-Za-z0-9]/.test(value)
};

password.addEventListener("input", () => {
    const value = password.value;
    let score = 0;
    const missing = [];

    for (const key in checks) {
        const passed = checks[key](value);

        document.getElementById(key).classList.toggle(
            "done", passed
        );

        if (passed) {
            score++;
        } else {
            missing.push({
                length: "Use at least 12 characters",
                upper: "Add an uppercase letter",
                lower: "Add a lowercase letter",
                number: "Add a number",
                special: "Add a special character"
            }[key]);
        }
    }

    if (value.length === 0) {
        strength.textContent = "Strength: Not checked";
        bar.style.width = "0";
        suggestions.textContent = "Enter a password to begin.";
        return;
    }

    let level;
    let color;

    if (score <= 2) {
        level = "Weak";
        color = "#c62828";
    } else if (score <= 4) {
        level = "Medium";
        color = "#ed8b00";
    } else {
        level = "Strong";
        color = "#188038";
    }

    strength.textContent = "Strength: " + level;
    strength.style.color = color;
    bar.style.width = (score / 5 * 100) + "%";
    bar.style.background = color;

    suggestions.textContent = missing.length
        ? missing.join(". ") + "."
        : "All listed requirements are satisfied!";
});

document.getElementById("toggle").addEventListener("click", function () {
    const showing = password.type === "text";
    password.type = showing ? "password" : "text";
    this.textContent = showing ? "Show Password" : "Hide Password";
});
