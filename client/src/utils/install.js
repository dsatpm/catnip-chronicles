const butInstall = document.getElementById('buttonInstall');

butInstall.addEventListener('click', async () => {
    butInstall.setAttribute('disabled', true);
});


window.addEventListener('appinstalled', (event) => {
    console.log ('the app has been installed', event);
    window.deferredPrompt = null;
});