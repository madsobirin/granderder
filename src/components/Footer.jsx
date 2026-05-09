import { Home, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand & Address Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-navy flex items-center justify-center rounded-lg border border-brand-gold/30">
                <Home className="text-brand-gold w-6 h-6" />
              </div>
              <div className="text-white">
                <span className="block text-xl font-bold leading-none tracking-tight font-serif">
                  Grand Ender
                </span>
                <span className="block text-[10px] tracking-widest text-brand-gold uppercase font-sans opacity-70">
                  Residence
                </span>
              </div>
            </div>
            <div className="text-white/60 mb-6 flex items-start gap-3 max-w-sm">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                Desa Ender, Pangenan, Kabupaten Cirebon, Jawa Barat.
              </p>
            </div>
            <a
              href="https://share.google/n0AF50sjoS2nGDLI3"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-brand-gold/10 hover:bg-brand-gold hover:text-white text-brand-gold border border-brand-gold/30 px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Buka di Google Maps
            </a>
          </div>

          {/* Map Embed Section */}
          <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl group">
            <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none"></div>
            <iframe
              title="Lokasi Grand Ender Residence"
              src="https://maps.google.com/maps?q=Perumahan%20Grand%20Ender,%20Pangenan,%20Cirebon&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-white/40 text-sm">
            © 2026 Grand Ender Residence. All Rights Reserved.
          </div>

          {/* <div className="flex gap-6">
            {["Instagram", "Facebook", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/40 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest font-semibold"
              >
                {social}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
