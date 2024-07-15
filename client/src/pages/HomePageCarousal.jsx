import Carousel from "react-bootstrap/Carousel";
//import ExampleCarouselImage from "components/ExampleCarouselImage";

function HomePageCarousal() {
  return (
    <Carousel fade>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <Carousel.Caption>
          <h3>Mission</h3>
          <p>
            "To connect book lovers with the stories and knowledge they seek by
            providing a personalized, accessible, and engaging reading
            experience. Our bookstore app offers a vast collection of books,
            thoughtful recommendations, and a vibrant community where readers
            can discover, share, and celebrate their love for literature."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Carousel.Caption>
          <h3>Vision</h3>
          <p>
            "To be the leading digital destination for readers worldwide,
            revolutionizing the way people discover, access, and enjoy books. We
            envision a future where our app empowers every reader with the tools
            and inspiration to explore diverse literary worlds, fostering a
            global community united by the joy of reading."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePageCarousal;
