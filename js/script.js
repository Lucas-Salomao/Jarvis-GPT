const darkModeToggle = document.getElementById('dark-mode-toggle');
let mode = "light";

darkModeToggle.addEventListener('click', () => {

  if (mode == "light") {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.querySelector('i').setAttribute('class', 'fa fa-sun');
    mode = "dark";
  }
  else {
    if (mode == "dark") {
      document.body.classList.toggle('dark-mode');
      darkModeToggle.querySelector('i').setAttribute('class', 'fa fa-moon');
      mode = "light";
    }
  }


});
