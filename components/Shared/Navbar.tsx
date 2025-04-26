"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useNavigation } from "@/lib/hooks/useNavigation";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, loading } = useNavigation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1280px] mx-auto">
        <nav className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
          <div className="animate-pulse bg-gray-700 h-10 w-20 rounded"></div>
          <div className="animate-pulse bg-gray-700 h-10 w-32 rounded"></div>
        </nav>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1280px] mx-auto">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="font-bold text-xl bg-gray-700 px-4 py-2 rounded flex items-center gap-2"
          >
            {data?.favicon && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data.favicon.url}`}
                alt={data.siteName}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            )}
            {data?.siteName}
          </Link>
        </div>

        {/* Get a ride button - positioned to the left of the nav items */}
        <div className="hidden md:flex items-end justify-end flex-grow">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-full border border-red-500 whitespace-nowrap mr-6">
            Get a ride
          </button>
        </div>

        {/* Navigation Items - desktop */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
          {data?.navigation.slice(0, 3).map((item, index) => (
            <Link
              key={item.id}
              href={item.url}
              className={`text-white hover:text-gray-300 ${
                index < 2 ? "border-r border-gray-600 pr-2 lg:pr-6" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button className="text-white hover:text-gray-300 border-r border-gray-600 pr-2 lg:pr-6 flex items-center gap-1">
            <span className="hidden lg:inline">GIFT MODAL</span>
            <span className="lg:hidden">GIFT</span>
         
          </button>

          <button className="text-white hover:text-gray-300 flex items-center gap-1">
            <span className="hidden lg:inline">GET THE ANDROID APP</span>
            <span className="lg:hidden">APP</span>
          
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFDEDE] py-4 px-4 absolute w-full z-10">
          <div className="flex flex-col space-y-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full border border-red-500 w-full">
              Get a ride
            </button>

            {data?.navigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-700 hover:text-gray-300 py-2 border-b border-gray-600"
              >
                {item.label}
              </Link>
            ))}

            <button className="text-gray-700 hover:text-gray-300 flex items-center justify-between py-2 border-b border-gray-600">
              <span>GIFT MODAL</span>
           
            </button>

            <button className="text-gray-700 hover:text-gray-300 flex items-center justify-between py-2">
              <span>GET THE ANDROID APP</span>
            
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
