import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AutoCompleteInput from "@/component/AutoCompleteInput";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GoogleMapComponent = dynamic(() => import("../component/GoogleMapComponent"), { ssr: false });

export default function Home() {
  const origin = { lat: -23.55052, lng: -46.633308 }; // São Paulo
  const destination = { lat: -22.9068, lng: -43.1729 }; // Rio de Janeiro

  return (
    <div>
    <h1>Mapa com Rota</h1>
    <GoogleMapComponent origin={origin} destination={destination} />
    <AutoCompleteInput/>
    </div>
  );
}

