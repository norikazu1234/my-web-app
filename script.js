let currentCardIndex = 0;

// カードをスクロールする関数
function scrollCards(direction) {
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth;
    const totalCards = cards.length;

    currentCardIndex += direction;

    if (currentCardIndex < 0) {
        currentCardIndex = totalCards - 1;
    } else if (currentCardIndex >= totalCards) {
        currentCardIndex = 0;
    }

    const newTransform = -currentCardIndex * cardWidth;
    cardContainer.style.transform = `translateX(${newTransform}px)`;
}

// フリック操作を検出する関数
function detectSwipe() {
    const cardContainer = document.querySelector('.card-container');
    let touchStartX = 0;
    let touchEndX = 0;

    cardContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    cardContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // フリックとみなす移動距離の閾値

        if (touchEndX < touchStartX - swipeThreshold) {
            scrollCards(1); // 右方向のスライド
        } else if (touchEndX > touchStartX + swipeThreshold) {
            scrollCards(-1); // 左方向のスライド
        }
    }
}

// フリック操作の検出を初期化
detectSwipe();
