export function emailErrorCheck(currentValue) {
  //console.log("Email current value", currentValue);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(currentValue)) {
    return "Must be a valid email";
  }
}

export function passwordErrorCheck(currentValue) {
  //console.log("Pswd current value", currentValue);
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  if (currentValue.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!passwordPattern.test(currentValue)) {
    return "Password must contain atlease a special character and a capital letter.";
  }
}

// research - https://medium.com/@chxiuy/mongodb-in-nextjs-overcoming-the-edge-runtime-middleware-hurdle-4beee31eaa30
