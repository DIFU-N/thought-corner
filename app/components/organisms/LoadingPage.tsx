"use client";
import Image from "next/image";

export default function LoadingPage() {
  return (
    <main className="flex items-center flex-col justify-center min-h-screen bg-white z-50 relative">
      {/* <div className="text-white">Welcome to te USO Penitentiary</div> */}
      {/* <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#feae53"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> */}
      <Image alt="" src={'/assets/tc-nobg.png'} width={200} height={200}/>
    </main>
  );
}
