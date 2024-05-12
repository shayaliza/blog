import Content from "./components/content";
import Navbarr from "./components/navbar";

export default function Home() {
  return (
    <div className="bg-bluebg md:h-screen">
      <Navbarr />
      <Content />
    </div>
  );
}
