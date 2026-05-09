import { Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-navy flex items-center justify-center rounded-lg border border-brand-gold/30">
              <Home className="text-brand-gold w-5 h-5" />
            </div>
            <div className="text-white">
              <span className="block text-base font-bold leading-none tracking-tight font-serif">
                Grand Ender
              </span>
              <span className="block text-[8px] tracking-widest text-brand-gold uppercase font-sans opacity-70">
                Residence
              </span>
            </div>
          </div>

          <div className="text-white/40 text-sm">
            © 2026 Grand Ender Residence. All Rights Reserved.
          </div>

          <div className="flex gap-6">
            {["Instagram", "Facebook", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/40 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest font-semibold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
