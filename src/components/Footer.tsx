import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer({ lightMode }: any) {

  return (

    <footer
      className={`py-8 border-t ${
        lightMode ? "border-gray-200" : "border-[#30363d]"
      }`}
    >

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <span
          className={`text-sm ${
            lightMode ? "text-gray-600" : "text-gray-400"
          }`}
        >
          © 2024 Hariom Acharya. All rights reserved.
        </span>

        <div className="flex gap-4">

          {[Github, Linkedin, Twitter].map((Icon, i) => (

            <a
              key={i}
              href="#"
              className={`transition-colors ${
                lightMode
                  ? "text-gray-600 hover:text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={20} />
            </a>

          ))}

        </div>

      </div>

    </footer>

  );

}