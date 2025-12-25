import { useState } from 'react';
import { Menu as MenuIcon, X, UtensilsCrossed, Phone, Mail, MapPin, Clock, ChefHat, Heart, Sparkles } from 'lucide-react';

type Section = 'home' | 'menu' | 'gallery' | 'about' | 'reservation';

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const menuData: MenuCategory[] = [
    {
      title: 'Başlangıçlar',
      items: [
        { name: 'Humus', description: 'Ev yapımı nohut ezmesi, tahin ve zeytinyağı ile', price: '65 ₺' },
        { name: 'Közlenmiş Patlıcan Salatası', description: 'Közlenmiş patlıcan, biber, domates ve ceviz', price: '70 ₺' },
        { name: 'Sigara Böreği', description: 'Beyaz peynir ve maydanozlu çıtır börek (6 adet)', price: '80 ₺' },
        { name: 'Meze Tabağı', description: 'Seçilmiş 5 çeşit meze bir arada', price: '150 ₺' }
      ]
    },
    {
      title: 'Ana Yemekler',
      items: [
        { name: 'Kuzu Tandır', description: 'Yavaş pişirilmiş kuzu but, patates ve közlenmiş sebzeler', price: '280 ₺' },
        { name: 'Izgara Levrek', description: 'Taze levrek, mevsim sebzeleri ve limonlu sos', price: '320 ₺' },
        { name: 'Hünkar Beğendi', description: 'Kuzu güveç ve közlenmiş patlıcan püresi üzerinde', price: '260 ₺' },
        { name: 'Mantı', description: 'El açması mantı, yoğurt ve tereyağlı sos', price: '180 ₺' },
        { name: 'Dana Bonfile', description: 'Izgara dana bonfile, mantar sosu ve sebzeler', price: '340 ₺' }
      ]
    },
    {
      title: 'Tatlılar',
      items: [
        { name: 'Fırın Sütlaç', description: 'Geleneksel fırın sütlaç, tarçın serpme', price: '75 ₺' },
        { name: 'Baklava', description: 'Antep fıstıklı el açması baklava (4 dilim)', price: '95 ₺' },
        { name: 'Künefe', description: 'Sıcak künefe, Antep fıstığı ve kaymak', price: '120 ₺' },
        { name: 'Kabak Tatlısı', description: 'Fırınlanmış kabak, kaymak ve ceviz', price: '65 ₺' }
      ]
    },
    {
      title: 'İçecekler',
      items: [
        { name: 'Türk Kahvesi', description: 'Özel kavrulmuş Türk kahvesi', price: '45 ₺' },
        { name: 'Çay (İkram)', description: 'Taze demlenmiş çay', price: '15 ₺' },
        { name: 'Taze Sıkılmış Portakal Suyu', description: 'Günlük taze portakal', price: '55 ₺' },
        { name: 'Ayran', description: 'Ev yapımı soğuk ayran', price: '25 ₺' },
        { name: 'Limonata', description: 'Ev yapımı limonata, nane ve buzlu', price: '50 ₺' }
      ]
    }
  ];

  const galleryImages = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('https://randevu.app.n8n.cloud/webhook/778293ad-6324-4218-92e6-e01708d654bb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Rezervasyonunuz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.'
        });
        setFormData({ name: '', phone: '', guests: '', date: '', time: '' });
      } else {
        setSubmitMessage({
          type: 'error',
          text: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Bağlantı hatası. Lütfen telefon numaranızdan bizi arayınız.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="text-red-800" size={32} />
              <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                Lezzet Durağı
              </h1>
            </div>

            <div className="hidden md:flex gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors ${
                  activeSection === 'home' ? 'text-red-800' : 'text-stone-600 hover:text-red-800'
                }`}
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className={`font-medium transition-colors ${
                  activeSection === 'menu' ? 'text-red-800' : 'text-stone-600 hover:text-red-800'
                }`}
              >
                Menü
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className={`font-medium transition-colors ${
                  activeSection === 'gallery' ? 'text-red-800' : 'text-stone-600 hover:text-red-800'
                }`}
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`font-medium transition-colors ${
                  activeSection === 'about' ? 'text-red-800' : 'text-stone-600 hover:text-red-800'
                }`}
              >
                Hakkımızda
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="bg-red-800 text-white px-6 py-2 rounded-full font-medium hover:bg-red-900 transition-colors"
              >
                Rezervasyon
              </button>
            </div>

            <button
              className="md:hidden text-stone-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left py-2 text-stone-700 font-medium hover:text-red-800"
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-left py-2 text-stone-700 font-medium hover:text-red-800"
              >
                Menü
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left py-2 text-stone-700 font-medium hover:text-red-800"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-stone-700 font-medium hover:text-red-800"
              >
                Hakkımızda
              </button>
              <button
                onClick={() => scrollToSection('reservation')}
                className="block w-full bg-red-800 text-white px-6 py-3 rounded-full font-medium hover:bg-red-900 mt-2"
              >
                Rezervasyon Yap
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {activeSection === 'home' && (
          <>
            <section
              className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1920)',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Restoranımıza Hoş Geldiniz
                </h2>
                <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
                  Taze malzemelerle hazırlanan özel lezzetler, sıcak atmosfer ve kusursuz hizmet anlayışı ile unutulmaz bir deneyim sunuyoruz
                </p>
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="bg-red-800 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-900 transition-all transform hover:scale-105 shadow-lg"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </section>

            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ChefHat className="text-red-800" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Taze Malzemeler
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Her gün yerel üreticilerden tedarik ettiğimiz en taze ve kaliteli malzemelerle hazırlanır yemeklerimiz
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="text-red-800" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Sıcak Atmosfer
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Aileniz ve sevdiklerinizle keyifli vakit geçirebileceğiniz samimi ve şık bir ortam sunuyoruz
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="text-red-800" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-stone-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Özel Menüler
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      Geleneksel Türk mutfağını modern dokunuşlarla harmanlayarak sizlere özel lezzetler yaratıyoruz
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'menu' && (
          <section className="py-20 px-4 bg-stone-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Menümüz
                </h2>
                <p className="text-xl text-stone-600">
                  Özenle seçilmiş malzemelerle hazırlanan lezzetlerimiz
                </p>
              </div>

              <div className="space-y-16">
                {menuData.map((category, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <h3 className="text-3xl font-bold text-red-800 mb-8 border-b-2 border-red-200 pb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {category.title}
                    </h3>
                    <div className="space-y-6">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex justify-between items-start gap-4 hover:bg-stone-50 p-4 rounded-lg transition-colors">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-stone-800 mb-2">
                              {item.name}
                            </h4>
                            <p className="text-stone-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-xl font-bold text-red-800 whitespace-nowrap">
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'gallery' && (
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Galeri
                </h2>
                <p className="text-xl text-stone-600">
                  Lezzetlerimiz ve atmosferimizden kareler
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-80"
                  >
                    <img
                      src={image}
                      alt={`Galeri ${idx + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
                <h2 className="text-5xl font-bold text-stone-800 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Hakkımızda
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    Lezzet Durağı olarak 2015 yılından beri Türk mutfağının eşsiz lezzetlerini modern bir anlayışla sunuyoruz.
                    Ailece işlettiğimiz restoranımızda, geleneksel tariflerimizi günümüz zevklerine uygun şekilde yorumluyor
                    ve misafirlerimize unutulmaz bir gastronomi deneyimi yaşatıyoruz.
                  </p>
                  <p>
                    Mutfağımızda kullandığımız tüm malzemeler özenle seçiliyor ve günlük olarak tedarik ediliyor.
                    Taze sebzeler, kaliteli etler ve özel baharatlarımızla hazırladığımız yemeklerimiz, hem görsel hem de
                    lezzet olarak damak tadınızı tatmin etmek için özenle hazırlanıyor.
                  </p>
                  <p>
                    Deneyimli şeflerimiz ve samimi ekibimizle, her ziyaretinizde sizi evinizde hissetmenizi sağlamak için
                    çalışıyoruz. Bizim için yemek sadece beslenme değil, sevgiyle hazırlanmış bir sanat eseridir.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-4xl font-bold text-stone-800 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  İletişim
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-800 p-3 rounded-full">
                          <Clock className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-800 mb-2 text-lg">Çalışma Saatleri</h4>
                          <p className="text-stone-600">Pazartesi - Pazar</p>
                          <p className="text-stone-600">11:00 - 23:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-red-800 p-3 rounded-full">
                          <Phone className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-800 mb-2 text-lg">Telefon</h4>
                          <p className="text-stone-600">+90 212 555 0123</p>
                          <p className="text-stone-600">+90 212 555 0124</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-red-800 p-3 rounded-full">
                          <Mail className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-800 mb-2 text-lg">E-posta</h4>
                          <p className="text-stone-600">info@lezzetduragi.com</p>
                          <p className="text-stone-600">rezervasyon@lezzetduragi.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-red-800 p-3 rounded-full">
                          <MapPin className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-800 mb-2 text-lg">Adres</h4>
                          <p className="text-stone-600">
                            Bağdat Caddesi No: 123<br />
                            Kadıköy / İstanbul
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-200 rounded-xl h-80 flex items-center justify-center">
                    <div className="text-center text-stone-600">
                      <MapPin size={48} className="mx-auto mb-4 text-red-800" />
                      <p className="text-lg font-medium">Harita Entegrasyonu</p>
                      <p className="text-sm mt-2">Google Maps / OpenStreetMap</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'reservation' && (
          <section className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rezervasyon
                </h2>
                <p className="text-xl text-stone-600">
                  Masanızı ayırtın ve özel bir akşam geçirin
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-stone-700 font-semibold mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-red-700 focus:outline-none transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-stone-700 font-semibold mb-2">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-red-700 focus:outline-none transition-colors"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-stone-700 font-semibold mb-2">
                      Kişi Sayısı
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-red-700 focus:outline-none transition-colors"
                    >
                      <option value="">Seçiniz</option>
                      <option value="1">1 Kişi</option>
                      <option value="2">2 Kişi</option>
                      <option value="3">3 Kişi</option>
                      <option value="4">4 Kişi</option>
                      <option value="5">5 Kişi</option>
                      <option value="6">6 Kişi</option>
                      <option value="7+">7+ Kişi</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-stone-700 font-semibold mb-2">
                        Tarih
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-red-700 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-stone-700 font-semibold mb-2">
                        Saat
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-red-700 focus:outline-none transition-colors"
                      >
                        <option value="">Seçiniz</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-800 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-900 transition-all transform hover:scale-[1.02] shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Rezervasyon Yap'}
                  </button>
                </form>

                {submitMessage && (
                  <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                    submitMessage.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                <div className="mt-8 p-6 bg-red-50 rounded-lg">
                  <p className="text-stone-600 text-center">
                    <strong>Not:</strong> Rezervasyonunuz için en kısa sürede sizinle iletişime geçeceğiz.
                    Acil durumlar için lütfen bizi telefonla arayın.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-stone-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed size={28} />
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Lezzet Durağı
                </h3>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Modern Türk mutfağının eşsiz lezzetleri ve unutulmaz deneyimler için bizi ziyaret edin.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Hızlı Bağlantılar
              </h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-stone-300 hover:text-red-400 transition-colors">
                  Ana Sayfa
                </button>
                <button onClick={() => scrollToSection('menu')} className="block text-stone-300 hover:text-red-400 transition-colors">
                  Menü
                </button>
                <button onClick={() => scrollToSection('gallery')} className="block text-stone-300 hover:text-red-400 transition-colors">
                  Galeri
                </button>
                <button onClick={() => scrollToSection('about')} className="block text-stone-300 hover:text-red-400 transition-colors">
                  Hakkımızda
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                İletişim
              </h4>
              <div className="space-y-2 text-stone-300">
                <p>Bağdat Caddesi No: 123</p>
                <p>Kadıköy / İstanbul</p>
                <p className="mt-4">Tel: +90 212 555 0123</p>
                <p>Email: info@lezzetduragi.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-700 pt-8 text-center text-stone-400">
            <p>© 2024 Lezzet Durağı. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
