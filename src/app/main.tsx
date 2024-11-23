import HomePage from "./(products)/page";
import { MainProductDispay } from "./(products)/containers/gridProduct";
import { CarouselSize } from "./(products)/containers/carousel";

export default function Main() {
  return (
    <>
      <HomePage>
        {/* <CarouselSize /> */}
        <MainProductDispay />
      </HomePage>
    </>
  );
}
