// Lógica principal de interacción para Distrito Arocena
// Museo Arocena - Torreón, Coahuila

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Estado global de la aplicación
const AppState = {
  experiences: [...INITIAL_EXPERIENCES],
  currentCategory: 'all',
  searchQuery: '',
  user: JSON.parse(localStorage.getItem('arocena_user')) || {
    name: 'Visitante Lagunero',
    email: 'visitante@distritoarocena.mx',
    registered: false,
    interests: ['vino', 'gastronomia', 'arte']
  },
  bookings: JSON.parse(localStorage.getItem('arocena_bookings')) || [],
  adminData: JSON.parse(localStorage.getItem('arocena_admin')) || INITIAL_ADMIN_DATA,
  tempSelectedExp: null
};

function initApp() {
  lucide.createIcons();
  updateUserInterface();
  renderFeaturedCategories();
  renderExperiences();
  renderRecommendations();
  renderCommunityStories();
  setupEventListeners();
}

// ----------------------------------------------------
// Actualización del perfil y encabezado
// ----------------------------------------------------
function updateUserInterface() {
  const userGreeting = document.getElementById('user-greeting');
  const userBadge = document.getElementById('user-badge-btn');
  const heroPersonalizeBtn = document.getElementById('hero-personalize-btn');

  if (AppState.user.registered) {
    if (userGreeting) userGreeting.textContent = `¡Hola, ${AppState.user.name.split(' ')[0]}!`;
    if (userBadge) {
      userBadge.innerHTML = `
        <i data-lucide="user-check" class="w-4 h-4 text-amber-400"></i>
        <span>${AppState.user.name.split(' ')[0]} (${AppState.user.interests.length} intereses)</span>
      `;
    }
    if (heroPersonalizeBtn) {
      heroPersonalizeBtn.innerHTML = `
        <i data-lucide="sliders-horizontal" class="w-4 h-4"></i>
        <span>Editar mis Intereses</span>
      `;
    }
  } else {
    if (userGreeting) userGreeting.textContent = 'Bienvenido a Distrito Arocena';
    if (userBadge) {
      userBadge.innerHTML = `
        <i data-lucide="qr-code" class="w-4 h-4 text-terracota"></i>
        <span>Escanear QR / Registrar</span>
      `;
    }
  }
  lucide.createIcons();
}

// ----------------------------------------------------
// Categorías Destacadas (Hero Section)
// ----------------------------------------------------
function renderFeaturedCategories() {
  const container = document.getElementById('featured-categories-grid');
  if (!container) return;

  const categories = [
    {
      id: 'gastronomia',
      title: 'Gastronomía de Autor',
      desc: 'Cenas maridaje y colaboraciones con chefs de la región',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      count: '3 experiencias'
    },
    {
      id: 'vino',
      title: 'Cultura del Vino',
      desc: 'Catas guiadas con bodegas del Valle de Parras y Coahuila',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
      count: '4 experiencias'
    },
    {
      id: 'arte',
      title: 'Arte & Patrimonio',
      desc: 'Recorridos nocturnos por salas históricas y virreinales',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      count: '3 experiencias'
    },
    {
      id: 'social',
      title: 'Noches de Música & Jazz',
      desc: 'Convivencia bajo las estrellas en el Patio Central',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
      count: '2 experiencias'
    }
  ];

  container.innerHTML = categories.map(cat => `
    <div onclick="filterByCategory('${cat.id}')" class="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md card-museum">
      <img src="${cat.image}" alt="${cat.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <span class="inline-block text-xs uppercase tracking-wider font-semibold text-amber-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm mb-2 border border-amber-300/30">
          ${cat.count}
        </span>
        <h3 class="text-xl font-editorial font-bold mb-1 group-hover:text-amber-200 transition-colors">${cat.title}</h3>
        <p class="text-xs text-stone-300 line-clamp-2">${cat.desc}</p>
        <div class="mt-3 flex items-center text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
          <span>Ver experiencias</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 ml-1.5"></i>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// ----------------------------------------------------
// Recomendaciones Personalizadas
// ----------------------------------------------------
function renderRecommendations() {
  const section = document.getElementById('recommendations-section');
  const container = document.getElementById('recommendations-grid');
  const interestsListSpan = document.getElementById('user-interests-tags');
  if (!section || !container) return;

  const userInterests = AppState.user.interests || [];
  
  // Filtrar experiencias afines a los intereses del usuario
  const matches = AppState.experiences.filter(exp => 
    exp.interests.some(interest => userInterests.includes(interest))
  );

  if (matches.length > 0) {
    section.classList.remove('hidden');
    if (interestsListSpan) {
      interestsListSpan.textContent = userInterests.map(i => {
        const found = INTERESTS_LIST.find(item => item.id === i);
        return found ? found.label : i;
      }).join(' • ');
    }

    container.innerHTML = matches.slice(0, 3).map(exp => `
      <div class="bg-white rounded-2xl overflow-hidden card-museum flex flex-col h-full border border-amber-900/10 shadow-sm">
        <div class="relative h-48 w-full overflow-hidden flex-shrink-0 bg-stone-100">
          <img src="${exp.image}" alt="${exp.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          <div class="absolute top-3 left-3">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
              ${exp.categoryLabel}
            </span>
          </div>
          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span class="flex items-center drop-shadow-sm font-medium">
              <i data-lucide="calendar" class="w-3.5 h-3.5 mr-1 text-amber-300"></i>
              ${exp.date.split(',')[0]}, ${exp.date.split(',')[1]}
            </span>
          </div>
        </div>

        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <h4 class="text-lg font-bold font-editorial text-stone-900 mb-2 leading-snug line-clamp-2 hover:text-terracota transition-colors cursor-pointer" onclick="openDetailModal('${exp.id}')">
              ${exp.title}
            </h4>
            <p class="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
              ${exp.tagline}
            </p>
          </div>

          <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
            <div class="flex flex-col min-w-0 pr-2">
              <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Costo</span>
              <span class="text-xs sm:text-sm font-bold text-terracota truncate" title="${exp.price}">
                ${exp.price}
              </span>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <button onclick="openDetailModal('${exp.id}')" class="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                Detalles
              </button>
              <button onclick="openBookingModal('${exp.id}')" class="px-3 py-1.5 text-xs font-bold text-white bg-terracota hover:bg-terracota-dark rounded-lg shadow-sm transition-colors flex items-center gap-1">
                <span>Reservar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  } else {
    section.classList.add('hidden');
  }
}

// ----------------------------------------------------
// Catálogo de Experiencias ("Vive Distrito Arocena")
// ----------------------------------------------------
function renderExperiences() {
  const container = document.getElementById('experiences-grid');
  if (!container) return;

  let filtered = AppState.experiences;

  if (AppState.currentCategory !== 'all') {
    filtered = filtered.filter(e => e.category === AppState.currentCategory);
  }

  if (AppState.searchQuery.trim() !== '') {
    const q = AppState.searchQuery.toLowerCase();
    filtered = filtered.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-500">
        <i data-lucide="compass" class="w-12 h-12 mx-auto text-stone-300 mb-3"></i>
        <h4 class="text-lg font-bold text-stone-700 mb-1">No se encontraron experiencias</h4>
        <p class="text-sm">Prueba seleccionando otra categoría o limpiando la búsqueda.</p>
        <button onclick="filterByCategory('all')" class="mt-4 px-4 py-2 text-xs font-semibold text-terracota bg-terracota/10 rounded-lg hover:bg-terracota/20 transition-colors">
          Ver todas las experiencias
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(exp => {
    const spotsRatio = (exp.spotsAvailable / exp.spotsTotal) * 100;
    const isLowSpots = exp.spotsAvailable <= 5;

    return `
      <div class="bg-white rounded-2xl overflow-hidden card-museum flex flex-col justify-between">
        <div class="relative h-56 overflow-hidden">
          <img src="${exp.image}" alt="${exp.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="text-xs font-semibold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
              ${exp.categoryLabel}
            </span>
          </div>
          <div class="absolute bottom-3 right-3">
            <span class="text-xs font-bold px-3 py-1 rounded-lg bg-amber-400 text-stone-900 shadow-md">
              ${exp.price}
            </span>
          </div>
        </div>

        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center text-xs text-stone-500 mb-2 gap-3">
              <span class="flex items-center">
                <i data-lucide="calendar" class="w-3.5 h-3.5 mr-1 text-terracota"></i>
                ${exp.date.split(',')[0]}, ${exp.date.split(',')[1]}
              </span>
              <span class="flex items-center">
                <i data-lucide="clock" class="w-3.5 h-3.5 mr-1 text-terracota"></i>
                ${exp.time}
              </span>
            </div>

            <h3 class="text-xl font-editorial font-bold text-stone-900 mb-2 hover:text-terracota transition-colors cursor-pointer" onclick="openDetailModal('${exp.id}')">
              ${exp.title}
            </h3>

            <p class="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed">
              ${exp.description}
            </p>
          </div>

          <div>
            <!-- Indicador de Disponibilidad de Aforo -->
            <div class="mb-4 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <div class="flex justify-between items-center text-xs mb-1">
                <span class="text-stone-600 flex items-center">
                  <i data-lucide="users" class="w-3.5 h-3.5 mr-1 text-stone-400"></i>
                  Disponibilidad de cupo
                </span>
                <span class="font-bold ${isLowSpots ? 'text-amber-600' : 'text-emerald-700'}">
                  ${exp.spotsAvailable} de ${exp.spotsTotal} lugares
                </span>
              </div>
              <div class="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div class="h-full ${isLowSpots ? 'bg-amber-500' : 'bg-emerald-600'} rounded-full" style="width: ${100 - spotsRatio}%"></div>
              </div>
            </div>

            <div class="flex gap-2">
              <button onclick="openDetailModal('${exp.id}')" class="flex-1 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                <i data-lucide="info" class="w-3.5 h-3.5"></i>
                Conocer más
              </button>
              <button onclick="openBookingModal('${exp.id}')" class="flex-1 py-2.5 text-xs font-bold text-white bg-terracota hover:bg-terracota-dark rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5">
                <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// ----------------------------------------------------
// Filtros de Categorías
// ----------------------------------------------------
window.filterByCategory = function(category) {
  AppState.currentCategory = category;
  
  // Actualizar botones de filtro
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('bg-terracota', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
    } else {
      btn.classList.remove('bg-terracota', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
    }
  });

  renderExperiences();

  // Scroll suave al catálogo si se hace clic desde el Hero
  const section = document.getElementById('catalogo-section');
  if (section && window.scrollY < section.offsetTop - 150) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// ----------------------------------------------------
// Búsqueda en tiempo real
// ----------------------------------------------------
window.handleSearch = function(event) {
  AppState.searchQuery = event.target.value;
  renderExperiences();
};

// ----------------------------------------------------
// Modal: Detalle de Experiencia
// ----------------------------------------------------
window.openDetailModal = function(id) {
  const exp = AppState.experiences.find(e => e.id === id);
  if (!exp) return;

  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('detail-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative h-64 md:h-80 w-full overflow-hidden">
      <img src="${exp.image}" alt="${exp.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <button onclick="closeModal('detail-modal')" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <div class="absolute bottom-6 left-6 right-6 text-white">
        <span class="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-terracota text-white mb-2 inline-block">
          ${exp.categoryLabel}
        </span>
        <h2 class="text-2xl md:text-3xl font-editorial font-bold mb-1">${exp.title}</h2>
        <p class="text-sm text-stone-200 font-light">${exp.tagline}</p>
      </div>
    </div>

    <div class="p-6 md:p-8 space-y-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
        <div>
          <span class="block text-stone-400 font-medium mb-1">Fecha</span>
          <span class="font-bold text-stone-800">${exp.date}</span>
        </div>
        <div>
          <span class="block text-stone-400 font-medium mb-1">Horario</span>
          <span class="font-bold text-stone-800">${exp.time}</span>
        </div>
        <div>
          <span class="block text-stone-400 font-medium mb-1">Ubicación</span>
          <span class="font-bold text-stone-800">${exp.location}</span>
        </div>
        <div>
          <span class="block text-stone-400 font-medium mb-1">Costo</span>
          <span class="font-bold text-terracota text-sm">${exp.price}</span>
        </div>
      </div>

      <div>
        <h4 class="text-base font-editorial font-bold text-stone-900 mb-2">Sobre esta experiencia</h4>
        <p class="text-sm text-stone-600 leading-relaxed">${exp.description}</p>
      </div>

      <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
        <i data-lucide="sparkles" class="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5"></i>
        <div>
          <h5 class="text-xs font-bold text-amber-900 uppercase tracking-wide">Anfitrión y Colaboradores</h5>
          <p class="text-xs text-amber-800 mt-0.5 font-medium">${exp.host}</p>
        </div>
      </div>

      <div class="pt-4 border-t border-stone-200 flex justify-end gap-3">
        <button onclick="closeModal('detail-modal')" class="px-5 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors">
          Cerrar
        </button>
        <button onclick="closeModal('detail-modal'); openBookingModal('${exp.id}');" class="px-6 py-2.5 text-xs font-bold text-white bg-terracota hover:bg-terracota-dark rounded-xl shadow-md transition-colors flex items-center gap-2">
          <i data-lucide="ticket" class="w-4 h-4"></i>
          Reservar mis lugares
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
};

// ----------------------------------------------------
// Modal: Reservación & Generador de Pase Digital
// ----------------------------------------------------
window.openBookingModal = function(id) {
  const exp = AppState.experiences.find(e => e.id === id);
  if (!exp) return;

  AppState.tempSelectedExp = exp;
  let attendeeCount = 1;

  const modal = document.getElementById('booking-modal');
  const content = document.getElementById('booking-modal-content');
  if (!modal || !content) return;

  function renderBookingForm() {
    const totalCost = exp.priceNumber === 0 ? 'Acceso Gratuito' : `$${exp.priceNumber * attendeeCount} MXN`;

    content.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-xs font-semibold text-terracota uppercase tracking-wider">Reservación Oficial</span>
            <h3 class="text-2xl font-editorial font-bold text-stone-900">${exp.title}</h3>
          </div>
          <button onclick="closeModal('booking-modal')" class="text-stone-400 hover:text-stone-700">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6 text-xs text-stone-600 space-y-1">
          <p><strong class="text-stone-800">Fecha y hora:</strong> ${exp.date} • ${exp.time}</p>
          <p><strong class="text-stone-800">Ubicación:</strong> ${exp.location}</p>
          <p><strong class="text-stone-800">Precio individual:</strong> ${exp.price}</p>
        </div>

        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">Nombre del titular</label>
            <input type="text" id="booking-name" value="${AppState.user.name}" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-terracota focus:border-terracota outline-none">
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">Correo electrónico de confirmación</label>
            <input type="email" id="booking-email" value="${AppState.user.email}" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-terracota focus:border-terracota outline-none">
          </div>

          <div>
            <label class="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">Número de asistentes</label>
            <div class="flex items-center gap-3">
              <button id="btn-dec-guests" class="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors">
                <i data-lucide="minus" class="w-4 h-4"></i>
              </button>
              <span id="guest-count" class="text-lg font-bold text-stone-800 w-10 text-center">${attendeeCount}</span>
              <button id="btn-inc-guests" class="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
              <span class="text-xs text-stone-500 ml-2">(Máximo 6 personas por registro)</span>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200/80 flex justify-between items-center mb-6">
          <div>
            <span class="text-xs text-amber-800 font-medium">Total de la reservación:</span>
            <p class="text-xs text-amber-600">Simulación de pase directo sin cargo bancario</p>
          </div>
          <span class="text-xl font-bold font-editorial text-amber-900">${totalCost}</span>
        </div>

        <div class="flex justify-end gap-3">
          <button onclick="closeModal('booking-modal')" class="px-5 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900">
            Cancelar
          </button>
          <button id="btn-confirm-booking" class="px-6 py-2.5 text-xs font-bold text-white bg-terracota hover:bg-terracota-dark rounded-xl shadow-md transition-colors flex items-center gap-2">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            Confirmar y Obtener Pase Digital
          </button>
        </div>
      </div>
    `;

    lucide.createIcons();

    // Eventos del contador
    document.getElementById('btn-dec-guests').addEventListener('click', () => {
      if (attendeeCount > 1) {
        attendeeCount--;
        renderBookingForm();
      }
    });

    document.getElementById('btn-inc-guests').addEventListener('click', () => {
      if (attendeeCount < 6 && attendeeCount < exp.spotsAvailable) {
        attendeeCount++;
        renderBookingForm();
      } else if (attendeeCount >= exp.spotsAvailable) {
        showToast('No hay más lugares disponibles en esta experiencia', 'warning');
      }
    });

    document.getElementById('btn-confirm-booking').addEventListener('click', () => {
      const name = document.getElementById('booking-name').value.trim();
      const email = document.getElementById('booking-email').value.trim();

      if (!name || !email) {
        showToast('Por favor completa tu nombre y correo', 'warning');
        return;
      }

      // Guardar reservación
      const bookingCode = `ARO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking = {
        code: bookingCode,
        expId: exp.id,
        expTitle: exp.title,
        category: exp.categoryLabel,
        date: exp.date,
        time: exp.time,
        location: exp.location,
        holderName: name,
        holderEmail: email,
        attendees: attendeeCount,
        totalPrice: totalCost,
        createdAt: new Date().toLocaleDateString('es-MX')
      };

      AppState.bookings.unshift(newBooking);
      localStorage.setItem('arocena_bookings', JSON.stringify(AppState.bookings));

      // Reducir aforo simulado
      exp.spotsAvailable = Math.max(0, exp.spotsAvailable - attendeeCount);
      renderExperiences();

      closeModal('booking-modal');
      renderDigitalTicket(newBooking);
      showToast('¡Reservación confirmada exitosamente!', 'success');
    });
  }

  renderBookingForm();
  modal.classList.remove('hidden');
};

// ----------------------------------------------------
// Pase Digital de Acceso (Ticket con QR)
// ----------------------------------------------------
function renderDigitalTicket(booking) {
  const modal = document.getElementById('ticket-modal');
  const container = document.getElementById('ticket-modal-container');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="digital-ticket rounded-2xl p-6 md:p-8 max-w-md mx-auto text-stone-900 border border-amber-800/20">
      <div class="flex justify-between items-center pb-4 border-b border-stone-200">
        <div>
          <span class="text-[10px] tracking-widest font-extrabold uppercase text-terracota">MUSEO AROCENA • TORREÓN</span>
          <h4 class="text-lg font-editorial font-bold text-stone-900">Distrito Arocena</h4>
        </div>
        <span class="text-xs px-2.5 py-1 rounded bg-stone-900 text-amber-300 font-mono font-bold">
          ${booking.code}
        </span>
      </div>

      <div class="py-5">
        <span class="text-xs font-semibold uppercase tracking-wider text-stone-500">${booking.category}</span>
        <h3 class="text-xl font-editorial font-bold text-stone-900 mb-2 leading-tight">${booking.expTitle}</h3>
        
        <div class="grid grid-cols-2 gap-3 text-xs mt-4 bg-stone-100/70 p-3 rounded-xl">
          <div>
            <span class="text-stone-400 block">Titular:</span>
            <span class="font-bold text-stone-800">${booking.holderName}</span>
          </div>
          <div>
            <span class="text-stone-400 block">Asistentes:</span>
            <span class="font-bold text-stone-800">${booking.attendees} persona(s)</span>
          </div>
          <div>
            <span class="text-stone-400 block">Fecha:</span>
            <span class="font-bold text-stone-800">${booking.date.split(',')[1]}</span>
          </div>
          <div>
            <span class="text-stone-400 block">Horario:</span>
            <span class="font-bold text-stone-800">${booking.time}</span>
          </div>
        </div>
      </div>

      <div class="ticket-perforation my-4 pt-5 text-center">
        <!-- Código QR SVG Simulado con alta resolución -->
        <div class="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl border border-stone-200 shadow-inner flex items-center justify-center">
          <svg viewBox="0 0 100 100" class="w-full h-full text-stone-900">
            <!-- Patrón QR Simulado -->
            <rect x="0" y="0" width="30" height="30" fill="currentColor" />
            <rect x="5" y="5" width="20" height="20" fill="white" />
            <rect x="10" y="10" width="10" height="10" fill="currentColor" />
            
            <rect x="70" y="0" width="30" height="30" fill="currentColor" />
            <rect x="75" y="5" width="20" height="20" fill="white" />
            <rect x="80" y="10" width="10" height="10" fill="currentColor" />
            
            <rect x="0" y="70" width="30" height="30" fill="currentColor" />
            <rect x="5" y="75" width="20" height="20" fill="white" />
            <rect x="10" y="80" width="10" height="10" fill="currentColor" />
            
            <rect x="40" y="10" width="15" height="10" fill="currentColor" />
            <rect x="40" y="30" width="20" height="10" fill="currentColor" />
            <rect x="15" y="45" width="25" height="10" fill="currentColor" />
            <rect x="50" y="50" width="15" height="15" fill="currentColor" />
            <rect x="75" y="40" width="15" height="20" fill="currentColor" />
            <rect x="40" y="75" width="20" height="15" fill="currentColor" />
            <rect x="70" y="75" width="15" height="15" fill="currentColor" />
          </svg>
        </div>
        <p class="text-[11px] text-stone-500 mt-2 font-mono">Presenta este código al ingresar al Museo Arocena</p>
      </div>

      <div class="mt-6 flex gap-2">
        <button onclick="window.print()" class="flex-1 py-2 text-xs font-semibold text-stone-700 bg-stone-200/80 hover:bg-stone-300 rounded-lg transition-colors flex items-center justify-center gap-1.5">
          <i data-lucide="printer" class="w-3.5 h-3.5"></i>
          Imprimir / Guardar
        </button>
        <button onclick="closeModal('ticket-modal')" class="flex-1 py-2 text-xs font-bold text-white bg-terracota hover:bg-terracota-dark rounded-lg transition-colors">
          Cerrar
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

// ----------------------------------------------------
// Modal: Registro Rápido & Selección de Intereses (QR)
// ----------------------------------------------------
window.openOnboardingModal = function() {
  const modal = document.getElementById('onboarding-modal');
  const container = document.getElementById('interests-chips-container');
  if (!modal || !container) return;

  const currentInterests = new Set(AppState.user.interests || []);

  container.innerHTML = INTERESTS_LIST.map(item => {
    const isActive = currentInterests.has(item.id);
    return `
      <button 
        type="button" 
        data-interest="${item.id}" 
        class="chip-interest px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${
          isActive 
            ? 'active bg-terracota text-white border-terracota' 
            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
        }"
        onclick="toggleInterestChip(this, '${item.id}')"
      >
        <i data-lucide="${item.icon}" class="w-3.5 h-3.5"></i>
        <span>${item.label}</span>
      </button>
    `;
  }).join('');

  document.getElementById('input-user-name').value = AppState.user.name;
  document.getElementById('input-user-email').value = AppState.user.email;

  modal.classList.remove('hidden');
  lucide.createIcons();
};

window.toggleInterestChip = function(el, id) {
  const interests = new Set(AppState.user.interests);
  if (interests.has(id)) {
    interests.delete(id);
    el.classList.remove('active', 'bg-terracota', 'text-white', 'border-terracota');
    el.classList.add('bg-stone-50', 'text-stone-700', 'border-stone-200');
  } else {
    interests.add(id);
    el.classList.add('active', 'bg-terracota', 'text-white', 'border-terracota');
    el.classList.remove('bg-stone-50', 'text-stone-700', 'border-stone-200');
  }
  AppState.user.interests = Array.from(interests);
};

window.saveOnboardingProfile = function() {
  const name = document.getElementById('input-user-name').value.trim() || 'Visitante Arocena';
  const email = document.getElementById('input-user-email').value.trim() || 'visitante@distritoarocena.mx';

  AppState.user.name = name;
  AppState.user.email = email;
  AppState.user.registered = true;

  localStorage.setItem('arocena_user', JSON.stringify(AppState.user));

  closeModal('onboarding-modal');
  updateUserInterface();
  renderRecommendations();
  showToast('¡Perfil e intereses actualizados! Personalizamos tu feed.', 'success');
};

// ----------------------------------------------------
// Historias de la Comunidad Lagunera
// ----------------------------------------------------
function renderCommunityStories() {
  const container = document.getElementById('community-stories-grid');
  if (!container) return;

  container.innerHTML = COMMUNITY_STORIES.map(story => `
    <div class="bg-white rounded-2xl p-6 card-museum flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-1 text-amber-500 mb-3">
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current"></i>
        </div>
        <p class="text-xs text-stone-600 italic mb-4 leading-relaxed">
          "${story.quote}"
        </p>
      </div>

      <div class="flex items-center gap-3 pt-4 border-t border-stone-100">
        <img src="${story.avatar}" alt="${story.author}" class="w-10 h-10 rounded-full object-cover border border-amber-900/20">
        <div>
          <h5 class="text-xs font-bold text-stone-900">${story.author}</h5>
          <span class="text-[11px] text-stone-400 block">${story.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// ----------------------------------------------------
// Simulador de Seguimiento Post-Visita (Email / WhatsApp)
// ----------------------------------------------------
window.openPostVisitModal = function() {
  const modal = document.getElementById('postvisit-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  lucide.createIcons();
};

// ----------------------------------------------------
// Panel Administrativo del Museo (Dashboard)
// ----------------------------------------------------
window.openAdminDashboard = function() {
  const modal = document.getElementById('admin-modal');
  const content = document.getElementById('admin-modal-content');
  if (!modal || !content) return;

  const data = AppState.adminData;
  const bookingsCount = AppState.bookings.length;

  content.innerHTML = `
    <div class="p-6 md:p-8 space-y-6">
      <div class="flex flex-col md:flex-row justify-between md:items-center pb-4 border-b border-stone-200 gap-3">
        <div>
          <span class="text-xs font-bold text-terracota uppercase tracking-widest">DIRECCIÓN & CURADURÍA</span>
          <h2 class="text-2xl font-editorial font-bold text-stone-900">Panel Administrativo: Distrito Arocena</h2>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="resetDemoData()" class="px-3 py-1.5 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
            Restablecer demo
          </button>
          <button onclick="closeModal('admin-modal')" class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- KPIs Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span class="text-xs text-stone-500 font-medium">Visitantes Registrados</span>
          <p class="text-2xl font-bold font-editorial text-stone-900 mt-1">${data.totalVisitors + (AppState.user.registered ? 1 : 0)}</p>
          <span class="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">↑ +18.4% este mes</span>
        </div>
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span class="text-xs text-stone-500 font-medium">Reservaciones Activas</span>
          <p class="text-2xl font-bold font-editorial text-stone-900 mt-1">${data.activeBookings + bookingsCount}</p>
          <span class="text-[11px] text-amber-600 font-semibold mt-1 inline-block">${bookingsCount} en esta sesión</span>
        </div>
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span class="text-xs text-stone-500 font-medium">Tasa de Retorno</span>
          <p class="text-2xl font-bold font-editorial text-stone-900 mt-1">${data.retentionRate}</p>
          <span class="text-[11px] text-stone-500 mt-1 inline-block">Visitantes recurrentes</span>
        </div>
        <div class="bg-stone-50 p-4 rounded-xl border border-stone-200">
          <span class="text-xs text-stone-500 font-medium">Categoría Top</span>
          <p class="text-sm font-bold text-stone-900 mt-2 truncate">${data.popularCategory}</p>
          <span class="text-[11px] text-terracota font-semibold inline-block">32% del interés</span>
        </div>
      </div>

      <!-- Gráficas SVG Interactivas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Gráfica de Barras: Crecimiento de Asistencia -->
        <div class="bg-white p-5 rounded-xl border border-stone-200">
          <h4 class="text-xs font-bold text-stone-800 uppercase tracking-wide mb-4 flex items-center justify-between">
            <span>Crecimiento Mensual de Visitantes</span>
            <span class="text-[10px] text-stone-400 font-normal">Torreón 2026</span>
          </h4>
          <div class="h-44 flex items-end gap-3 justify-between pt-6 border-b border-stone-200 px-2">
            ${data.monthlyGrowth.map(item => {
              const height = (item.count / 800) * 100;
              return `
                <div class="flex-1 flex flex-col items-center gap-1 group">
                  <span class="text-[10px] font-bold text-terracota opacity-0 group-hover:opacity-100 transition-opacity">${item.count}</span>
                  <div class="w-full bg-terracota/85 hover:bg-terracota rounded-t transition-all" style="height: ${height}%"></div>
                  <span class="text-[11px] text-stone-500 mt-1 font-medium">${item.month}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Distribución de Intereses -->
        <div class="bg-white p-5 rounded-xl border border-stone-200">
          <h4 class="text-xs font-bold text-stone-800 uppercase tracking-wide mb-4">
            Distribución de Intereses de la Comunidad
          </h4>
          <div class="space-y-3">
            ${data.interestDistribution.map(item => `
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="font-medium text-stone-700">${item.name}</span>
                  <span class="font-bold text-stone-900">${item.percentage}%</span>
                </div>
                <div class="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-amber-600 h-full rounded-full" style="width: ${item.percentage}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Tabla de Reservaciones Recientes -->
      <div class="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div class="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
          <h4 class="text-xs font-bold text-stone-800 uppercase tracking-wide">
            Control de Pases y Asistencia (${AppState.bookings.length} en sesión)
          </h4>
        </div>
        <div class="overflow-x-auto max-h-56">
          <table class="w-full text-left text-xs">
            <thead class="bg-stone-100 text-stone-500 uppercase font-semibold">
              <tr>
                <th class="p-3">Folio</th>
                <th class="p-3">Titular</th>
                <th class="p-3">Experiencia</th>
                <th class="p-3">Cupos</th>
                <th class="p-3">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              ${AppState.bookings.length === 0 ? `
                <tr>
                  <td colspan="5" class="p-4 text-center text-stone-400">No hay reservaciones emitidas aún en esta sesión. Prueba reservar una experiencia en la plataforma.</td>
                </tr>
              ` : AppState.bookings.map(b => `
                <tr class="hover:bg-stone-50">
                  <td class="p-3 font-mono font-bold text-terracota">${b.code}</td>
                  <td class="p-3 font-medium text-stone-900">${b.holderName}</td>
                  <td class="p-3 text-stone-600">${b.expTitle}</td>
                  <td class="p-3 text-stone-800 font-bold">${b.attendees}</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      Confirmada
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
};

window.resetDemoData = function() {
  localStorage.removeItem('arocena_bookings');
  localStorage.removeItem('arocena_user');
  AppState.bookings = [];
  AppState.user = {
    name: 'Visitante Lagunero',
    email: 'visitante@distritoarocena.mx',
    registered: false,
    interests: ['vino', 'gastronomia', 'arte']
  };
  AppState.experiences = [...INITIAL_EXPERIENCES];
  updateUserInterface();
  renderExperiences();
  renderRecommendations();
  closeModal('admin-modal');
  showToast('Datos demo restablecidos a su estado original', 'info');
};

// ----------------------------------------------------
// Utilidades de Modal y Toasts
// ----------------------------------------------------
window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
};

window.showToast = function(message, type = 'info') {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  if (type === 'success') {
    toast.className = 'fixed bottom-5 right-5 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-700';
    toastIcon.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-300"></i>';
  } else if (type === 'warning') {
    toast.className = 'fixed bottom-5 right-5 z-50 bg-amber-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-amber-700';
    toastIcon.innerHTML = '<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-300"></i>';
  } else {
    toast.className = 'fixed bottom-5 right-5 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-stone-700';
    toastIcon.innerHTML = '<i data-lucide="info" class="w-5 h-5 text-terracota"></i>';
  }

  lucide.createIcons();
  toast.classList.remove('hidden', 'translate-y-8', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-8', 'opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 3500);
};

function setupEventListeners() {
  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
    }
  });

  // Cerrar al hacer clic fuera del contenido
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.add('hidden');
    });
  });
}
