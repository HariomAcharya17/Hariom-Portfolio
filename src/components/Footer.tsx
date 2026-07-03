import SocialMediaGrid from "@/components/ui/SocialMediaGrid";

export default function Footer({ lightMode }: any) {

  return (

    <footer
      className="py-8 border-t border-border bg-background"
    >

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex flex-col gap-2">
          <span className="text-sm text-secondary_text">
            © 2026 Hariom Acharya. All rights reserved.
          </span>
          <span className="text-xs font-mono text-secondary_text">
            Built with IBM Carbon Design System · IBM Plex Sans + Plex Mono
          </span>
        </div>

        <div className="flex justify-end pr-8">
          <SocialMediaGrid />
        </div>

      </div>

    </footer>

  );

}