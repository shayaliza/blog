import Content from "./components/content";
import Mainpage from "./components/home";
import Navbarr from "./components/navbar";


export default function Home() {
  return (
    <div className="bg-bluebg h-[100vh]">
      <Navbarr />
<Mainpage/>

      <Content />
    </div>
  );
}
