import HomePage from "./(products)/page";
import { MainProductDispay } from "./(products)/containers/gridProduct";

export default function Main() {
  return (
    <>
      <HomePage>
        <MainProductDispay />
      </HomePage>
    </>
  );
}
