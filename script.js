let videoMode = false;
    let viewedImages = new Set();
    let currentPlayingVideo = null;

    function flipCard() {
        const number = document.getElementById("numberInput").value;
        const card = document.getElementById("card" + number);
        const inputField = document.getElementById("numberInput");
        
        if (card) {
            const back = card.querySelector(".back");
            const front = card.querySelector(".front");
            const video = card.querySelector(".video");

            if (videoMode) {
                // Ha a videót már lejátszották, ne indítsuk újra
                if (currentPlayingVideo !== video) {
                    // Video mód esetén a kártya videóval forduljon meg
                    back.style.display = 'none';
                    front.style.display = 'none';
                    video.style.display = 'block';
                    video.play(); // Videó indítása automatikusan

                    // Ha már van egy lejátszott videó, állítsuk meg
                    if (currentPlayingVideo && currentPlayingVideo !== video) {
                        currentPlayingVideo.pause();
                        currentPlayingVideo.currentTime = 0;
                    }

                    // Állítsuk be az új lejátszott videót
                    currentPlayingVideo = video;

                    // Kártya szegélyének eltávolítása
                    card.style.border = 'none';
                }
            } else {
                // Kép mód esetén a kártya képpel forduljon meg
                back.style.display = 'none';
                front.style.display = 'block';
                video.style.display = 'none';
                viewedImages.add(number); // Hozzáadjuk a megtekintett képeket a halmazhoz

                // Kártya szegélyének eltávolítása
                card.style.border = 'none';
            }

            // Beviteli mező törlése
            inputField.value = '';
        } else {
            alert('Érvénytelen szám. Kérlek, válassz 1 és 5 között!');
        }
    }

    function startVideoMode() {
        if (viewedImages.size > 0) { // Ellenőrizzük, hogy legalább egy képet megtekintettek-e
            videoMode = true;
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                const back = card.querySelector(".back");
                const front = card.querySelector(".front");
                const video = card.querySelector(".video");
                
                // Alapértelmezetten csak a kártyák hátulja látszódjon
                back.style.display = 'flex';
                front.style.display = 'none';
                video.style.display = 'none';

                // Kártya szegélyének visszaállítása
                card.style.border = '2px solid #4a4a4a';
            });

            // "Mutasd a videókat" gomb elrejtése és új gomb megjelenítése
            document.querySelector("button").style.display = 'none';
            const replayButton = document.createElement("button");
            replayButton.innerHTML = "&#x21bb;"; // Újrajátszás szimbólum
            replayButton.onclick = function() {
                location.reload(); // Az oldal újratöltése a kezdőállapottal
            };
            document.body.appendChild(replayButton);
        } else {
            alert('Először legalább egy képet meg kell tekintened!');
        }
    }