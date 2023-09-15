const calculatePriorityAndTimeLeft = (dueDateTime) => {
  const currentDate = new Date();
  const taskDueDateTime = new Date(dueDateTime);

  const timeDifference = taskDueDateTime - currentDate; // Calculate time difference in milliseconds

  let priority = "";
  let timeLeft = "";
  let daysLeft;
  let days = "";

  if (timeDifference <= 24 * 60 * 60 * 1000) {
    priority = "High";
    timeLeft = "Less than 24 hours left";
  } else if (timeDifference <= 3 * 24 * 60 * 60 * 1000) {
    daysLeft = Math.round(timeDifference / (24 * 60 * 60 * 1000));
    priority = "Medium";
    timeLeft = `${daysLeft} ${
      daysLeft > 1 ? (days = "days") : (days = "day")
    } left`;
  } else {
    priority = "Low";
    // Calculate the number of days left (rounded to the nearest day)
    daysLeft = Math.round(timeDifference / (24 * 60 * 60 * 1000));
    timeLeft = `${daysLeft} days left`;
  }

  return { priority, timeLeft };
};
// console.log(calculatePriorityLevel("2023-09-16T23:58:00Z"));
// Test cases with different due dates
// const dueDate1 = new Date("2023-09-18T06:02:00Z"); // Within the current week
// const dueDate2 = new Date("2023-09-21T23:58:00Z"); // Outside the current week

// console.log("Priority Level for dueDate1:", calculatePriorityLevel(dueDate1));
// console.log("Priority Level for dueDate2:", calculatePriorityLevel(dueDate2));
module.exports = {
  calculatePriorityAndTimeLeft,
};
