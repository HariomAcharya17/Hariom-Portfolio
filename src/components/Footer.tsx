import { Github, Linkedin } from "lucide-react";

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

          <a
            href="https://github.com/HariomAcharya17"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              lightMode
                ? "text-gray-600 hover:text-purple-600"
                : "text-gray-400 hover:text-purple-400"
            }`}
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/hariom-a-218649318/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BDJ7lHxwLT%2BuV6z4SFkcuhA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              lightMode
                ? "text-gray-600 hover:text-purple-600"
                : "text-gray-400 hover:text-purple-400"
            }`}
          >
            <Linkedin size={20} />
          </a>

        </div>

      </div>

    </footer>

  );

}