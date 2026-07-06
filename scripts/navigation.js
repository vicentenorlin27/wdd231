const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('nav ul');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
});