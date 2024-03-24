import Content from "./components/content";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="bg-bluebg h-[100vh]">
      <Navbar />
      <Content />
    </div>
  );
}
