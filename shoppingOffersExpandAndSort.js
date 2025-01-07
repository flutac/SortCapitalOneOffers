(() => {
    // Scroll until there are no more offers to load
    function scrollToLoadMore(callback) {
        const scrollableElement = document.scrollingElement || document.documentElement;
        const scrollHeightBefore = scrollableElement.scrollHeight;

        // Scroll to the bottom of the page
        window.scrollTo(0, scrollableElement.scrollHeight);

        setTimeout(() => {
            const scrollHeightAfter = scrollableElement.scrollHeight;
            // If no new content is loaded, stop scrolling
            if (scrollHeightBefore === scrollHeightAfter) {
                callback();
            } else {
                scrollToLoadMore(callback);
            }
        }, 1000); // Adjust timeout if necessary for slower loading pages
    }

    // Sorting logic for the offers
    function sortOffers() {
        const offers = Array.from(document.querySelectorAll('.deal-list-item'));
        if (!offers.length) return;

        // Parse offer data
        const parsedOffers = offers.map(offer => {
            const text = offer.textContent;
            const flatCashbackMatch = text.match(/\+ \$([\d,]+)/); // Match "+ $x Back"
            const percentCashbackMatch = text.match(/(?:\+|After) (\d+)% Back/); // Match "+ x% Back" or "After x% Back"

            const flatCashback = flatCashbackMatch ? parseFloat(flatCashbackMatch[1].replace(/,/g, '')) : 0;
            const percentCashback = percentCashbackMatch ? parseFloat(percentCashbackMatch[1]) : 0;

            return { element: offer, flatCashback, percentCashback };
        });

        // Sort offers by flat cashback first, then by percentage cashback
        const sortedOffers = parsedOffers.sort((a, b) => {
            if (b.flatCashback !== a.flatCashback) {
                return b.flatCashback - a.flatCashback; // Sort by flat cashback
            }
            return b.percentCashback - a.percentCashback; // Sort by percent cashback
        });

        // Rearrange the DOM to reflect the sorted order
        const container = offers[0].parentElement;
        sortedOffers.forEach(({ element }) => container.appendChild(element));
    }

    // Start by scrolling and then sorting
    scrollToLoadMore(sortOffers);
})();
