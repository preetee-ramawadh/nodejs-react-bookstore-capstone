import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

function HomePageCarousal() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image src="/images/intro.jpg" fluid />
        <Carousel.Caption className="text-dark">
          <h2>
            <strong>BookShip</strong>
          </h2>
          <p>Connecting the World through Books.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/bookmission.jpg" fluid />
        <Carousel.Caption>
          <h2>
            <strong>Mission</strong>
          </h2>
          <p>
            "To connect book lovers with the stories and knowledge they seek{" "}
            <br />
            by providing a personalized, accessible, and engaging reading
            experience."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/images/bookvision.jpg" fluid />
        <Carousel.Caption>
          <h2>
            <strong>Vision</strong>
          </h2>
          <p>
            "To be the leading digital destination for readers worldwide,
            <br />
            revolutionizing the way people discover, access, and enjoy books."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePageCarousal;
