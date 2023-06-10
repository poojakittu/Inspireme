import React from "react";

const ScrollToTopPage = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h1>Scroll to Top Example</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
        a, semper congue, euismod non, mi.
      </p>
      <p>
        Praesent interdum ullamcorper libero. Curabitur at lacus ac velit ornare
        lobortis. Praesent nonummy mi in odio. In turpis. Aenean massa. Sed
        lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Fusce id purus.
      </p>
      {/* Add more content here */}
      <br />
      <button onClick={handleScrollToTop} style={{marginTop:"1000px"}}>
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollToTopPage;
