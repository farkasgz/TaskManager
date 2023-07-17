// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("taskManager JS imported successfully!");

  const allTasks = document.querySelectorAll(".added-task")

  allTasks.forEach(task => {
    task.addEventListener("click", () => {
      task.classList.toggle("crossed-task");
    })
  })
  
});
