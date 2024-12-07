const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
        toggleButton.classList.remove('light-mode');
        toggleButton.classList.add('dark-mode');
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
        toggleButton.classList.remove('dark-mode');
        toggleButton.classList.add('light-mode');
    }
});
