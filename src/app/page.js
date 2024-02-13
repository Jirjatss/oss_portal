import * as HomeComponent from "./components/home/Index";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="w-full -mt-[80px]">
        <HomeComponent.Hero />
      </div>
      <HomeComponent.Steps />
      <HomeComponent.Services />
      <HomeComponent.Appointment />
      <HomeComponent.Application />
      <HomeComponent.Faq />
    </div>
  );
}
