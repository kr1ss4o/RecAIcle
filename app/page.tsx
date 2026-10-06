import DesktopLanding from "@/components/DesktopLanding/DesktopLanding";
import ScanPage from "@/components/ScanPage/ScanPage";

export default function Home() {
  return (
    <>
      <div className="desktop:hidden">
        <ScanPage/>
      </div>
      <div className="hidden desktop:flex">
        <DesktopLanding/>
      </div>
    </>
  );
}
