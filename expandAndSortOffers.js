(() => {
    // Define a function to check and click the "View More Offers" button
    function clickShowMore(callback) {
        // Find the button based on its text content
        const buttons = Array.from(document.querySelectorAll('button'));
        const showMoreButton = buttons.find(
            button => button.textContent.trim() === "View More Offers"
        );

        if (showMoreButton) {
            showMoreButton.click();
            // Wait for the page to load new offers
            setTimeout(() => clickShowMore(callback), 1000);
        } else {
            // When no more "View More Offers" button is found, call the callback to sort
            callback();
        }
    }

    // Define the sorting logic
    function sortOffers() {
        const g = document.querySelector('.grid-cols-2');
        if (!g) return;

        const s = [].slice.call(g.children).sort(function (a, b) {
            if (!a.innerText || !b.innerText) {
                return 0;
            }
            const exp = /([\d,]+)x? miles/i;
            const re1 = a.innerText.match(exp);
            const re2 = b.innerText.match(exp);
            return Number(re2[1].replaceAll(',', '')) - Number(re1[1].replaceAll(',', ''));
        });
        for (let x of s) {
            g.removeChild(x);
        }
        for (let x of s) {
            g.appendChild(x);
        }
    }

    // Start by clicking "View More Offers" and then sorting
    clickShowMore(sortOffers);
})();
