'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OrderForm {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  quantity: number;
}

export default function Home() {
  const [formData, setFormData] = useState<OrderForm>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product images - using actual product photos
  const productImages = [
    {
      src: "/images/main-image-1.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 1"
    },
    {
      src: "/images/main-image-2.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 2"
    },
    {
      src: "/images/main-image-3.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 3"
    },
    {
      src: "/images/main-image-4.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 4"
    },
    {
      src: "/images/main-image-5.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 5"
    },
    {
      src: "/images/main-image-6.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 6"
    },
    {
      src: "/images/main-image-7.jpeg",
      alt: "Carreau de chaîne magnétique professionnel - Vue 7"
    }
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      quantity: parseInt(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Commande envoyée avec succès! Nous vous contacterons bientôt.');
        setFormData({ firstName: '', lastName: '', phone: '', address: '', quantity: 1 });
      } else {
        setSubmitMessage('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
      }
    } catch {
      setSubmitMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const productPrice = 23; // TND
  const shippingPrice = 8; // TND
  const totalPrice = (productPrice * formData.quantity) + shippingPrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Mobile Optimized */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 sm:py-3">
            <div className="flex items-center space-x-3 sm:space-x-3">
              <div className="w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center">
                <Image
                  src="/navix.jpeg"
                  alt="Navix Shop"
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-lg font-medium text-gray-900">Navix Shop</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Livraison partout en Tunisie</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm sm:text-sm text-gray-600">Prix:</p>
              <p className="text-lg sm:text-lg font-semibold text-gray-900">{productPrice} TND</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Product Section - Fully Mobile Responsive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-6 py-4 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-6 lg:gap-8">
          {/* Product Images - Mobile First */}
          <div className="space-y-4 sm:space-y-4">
            {/* Main Image - Responsive */}
            <div className="aspect-square bg-gray-50 overflow-hidden relative">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              {/* Image indicators - Mobile optimized */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-orange-500' : 'bg-white bg-opacity-60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images - Responsive Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-gray-50 cursor-pointer transition-all hover:opacity-80 ${
                    index === currentImageIndex ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info & Order Form - Mobile Optimized */}
          <div className="space-y-6 sm:space-y-6">
            {/* Product Title - Mobile */}
            <div>
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900 leading-tight">
                Carreau de Chaîne Magnétique Professionnel
              </h1>
              <p className="text-base text-gray-600 mt-2">
                Rétractable - 80cm - Force 15kg - ABS Renforcé
              </p>
            </div>

            {/* Price Section - Mobile */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-4">
              <div className="flex items-center space-x-3 sm:space-x-3">
                <span className="text-2xl sm:text-2xl font-bold text-gray-900">{productPrice} TND</span>
                <span className="text-base text-gray-500 line-through">{productPrice + 12} TND</span>
                <span className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
                  Économie: 34%
                </span>
              </div>
              <p className="text-base text-gray-600 mt-2">
                + {shippingPrice} TND livraison (Tunisie entière)
              </p>
            </div>

            {/* Product Features - Mobile */}
            <div className="space-y-3">
              <h3 className="text-base font-medium text-gray-900">Caractéristiques:</h3>
              <ul className="space-y-2 text-base text-gray-600">
                <li>• Câble en acier inoxydable de 80cm</li>
                <li>• Force magnétique de 15kg</li>
                <li>• Boîtier ABS renforcé</li>
                <li>• Rotation 360°</li>
                <li>• Résistant aux conditions industrielles</li>
              </ul>
            </div>

            {/* Order Form - Mobile Optimized */}
            <div className="bg-white p-4 sm:p-4 border border-gray-200 sm:border-0">
              <h3 className="text-base font-medium text-gray-900 mb-4">Passer Commande</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-b border-orange-300 text-base text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-b border-orange-300 text-base text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b border-orange-300 text-base text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Adresse de livraison *</label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b border-orange-300 text-base text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Rue, Ville, Code postal..."
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-2">Quantité</label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      className="w-full px-4 py-3 border-b border-orange-300 text-base text-gray-900 focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">Total</div>
                    <div className="text-xl font-semibold text-gray-900">{totalPrice} TND</div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 font-semibold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Commander Maintenant'}
                </button>
                
                {submitMessage && (
                  <div className={`p-3 text-base text-center ${
                    submitMessage.includes('succès') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Trust Badges - Mobile */}
            <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-2">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Livraison rapide</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>Retour gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Mobile */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-6 h-6 sm:w-6 sm:h-6 flex items-center justify-center">
              <Image
                src="/navix.jpeg"
                alt="Navix Shop"
                width={24}
                height={24}
                className="rounded"
              />
            </div>
            <span className="text-base font-medium text-gray-900">Navix Shop</span>
          </div>
          <p className="text-sm text-gray-500 text-center">
            © 2024 Navix Shop - Tous droits réservés - Livraison partout en Tunisie
          </p>
        </div>
      </footer>
    </div>
  );
}