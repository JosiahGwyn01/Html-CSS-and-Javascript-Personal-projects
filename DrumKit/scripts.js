window.addEventListener('keydown', function(e){
    const keyPressed = e.key.toLowerCase();
    const audio = this.document.querySelector(`audio[data-key="${keyPressed}"]`);
    
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    const keyElement = document.querySelector(`.Key[data-key="${keyPressed}"]`)
    if (keyElement){
        keyElement.classList.add('playing')
        keyElement.classList.remove('releasing')
    }

});

window.addEventListener('keyup', function(e){
    const keyPressed = e.key.toLowerCase();
    const keyElement = document.querySelector(`.Key[data-key="${keyPressed}"]`);
    if (keyElement){
        keyElement.classList.remove('playing')
        keyElement.classList.add('releasing')

        setTimeout(() => {
            keyElement.classList.remove('releasing');
        });
    };

});