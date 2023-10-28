import LogoImage from "./assets/logo.png";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[url('./assets/confetti.png')] bg-[#1637FC] bg-contain bg-no-repeat bg-center">
      <div className="flex text-white justify-center items-center flex-col">
        <h1 className="text-[54px] font-semibold">会場の総乾杯数</h1>
        <p className="font-[Chillax] text-[250px] leading-none">555</p>
        <img src={LogoImage} alt="Kanpai!" />
      </div>
    </div>
  );
}

export default App;
