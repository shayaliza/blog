import Content from "./components/content";
// import Mainpage from "./(pages)/document/page.";
import Navbarr from "./components/navbar";

export default function Home() {
  return (
    <div className="bg-bluebg h-[100vh]">
      <Navbarr />
      {/* <Mainpage/> */}

      <Content />
    </div>
  );
}
