// PLAZA NUEVA — INTERACCIONES DE LA PÁGINA PRINCIPAL
// Catálogo público: consulta PostgreSQL mediante la API del servidor.
const country = document.querySelector('#country');
const region = document.querySelector('#region');
const city = document.querySelector('#city');
const message = document.querySelector('#search-message');
const operation = document.querySelector('#operation');
const rentalPeriod = document.querySelector('#rental-period');
const listingType = document.querySelector('#listing-type');

const regionsByCountry = {
  UY: ['Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto', 'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres'],
  AR: ['Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']
};

// Habilitar la modalidad únicamente cuando se selecciona alquiler.
function updateRentalPeriod() {
  if (!operation || !rentalPeriod) return;
  const isRental = operation.value === 'alquiler';
  rentalPeriod.disabled = !isRental;
  if (!isRental) rentalPeriod.value = '';
}

// Mostrar departamentos o provincias según el país elegido.
function updateRegions() {
  if (!country || !region) return;
  const selected = country.value;
  region.replaceChildren();
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = selected ? 'Todas las regiones' : 'Primero elegí un país';
  region.append(placeholder);
  for (const name of regionsByCountry[selected] || []) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    region.append(option);
  }
  region.disabled = !selected;
  if (city) {
    city.value = '';
    city.placeholder = selected ? 'Ej.: ciudad, localidad o barrio' : 'Ej.: Buceo o Ciudad de la Costa';
  }
}

operation?.addEventListener('change', updateRentalPeriod);
country?.addEventListener('change', updateRegions);

// Los accesos Venta y Alquiler llevan al buscador con la operación elegida.
document.querySelectorAll('[data-operation]').forEach(link => {
  link.addEventListener('click', () => {
    if (operation) operation.value = link.dataset.operation;
    updateRentalPeriod();
    if (message) message.textContent = '';
  });
});

// Solo se muestran propiedades marcadas explícitamente como publicadas.
// La API pública excluye borradores y propiedades no publicadas.
const resultsContainer = document.querySelector('#search-results');
const featuredContainer = document.querySelector('#featured-properties');
const featuredEmpty = document.querySelector('#featured-empty');
let publicProperties = [];
let catalogReady = false;

const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

function textElement(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = String(text ?? '');
  if (className) node.className = className;
  return node;
}

function displayType(value) {
  const types = { casa: 'Casa', casas: 'Casa', apartamento: 'Apartamento', apartamentos: 'Apartamento', terreno: 'Terreno', terrenos: 'Terreno' };
  return types[normalize(value)] || String(value || 'Inmueble');
}

function propertyCard(property) {
  const article = document.createElement('article');
  article.className = 'property-card';
  if (Array.isArray(property.photos) && property.photos.length) {
    const img = document.createElement('img'); img.src = property.photos[0]; img.alt = 'Fotografía de ' + (property.title || 'propiedad'); img.loading = 'lazy'; img.className = 'plaza-card-photo'; article.append(img);
  } else {
    const placeholder = textElement('div', '⌂', 'property-placeholder'); placeholder.setAttribute('aria-hidden', 'true'); article.append(placeholder);
  }
  const body = document.createElement('div');
  body.className = 'property-body';
  const operationName = normalize(property.operation) === 'alquiler' ? 'Alquiler' : 'Venta';
  const periodName = normalize(property.operation) === 'alquiler' && property.period ? ' · ' + property.period : '';
  body.append(textElement('span', operationName + periodName, 'property-tag'));
  body.append(textElement('h3', property.title || displayType(property.type)));
  const location = [property.city, property.region, property.country === 'AR' ? 'Argentina' : 'Uruguay'].filter(Boolean).join(', ');
  body.append(textElement('p', location));
  if (property.price !== '' && property.price != null && Number.isFinite(Number(property.price))) {
    const amount = Number(property.price).toLocaleString('es-UY');
    body.append(textElement('div', (property.currency || 'USD') + ' ' + amount, 'property-price'));
  }
  if (property.description) body.append(textElement('p', property.description, 'property-description'));
  const link=document.createElement('a');
  link.href='/anuncio.html?id='+encodeURIComponent(property.id);
  link.className='button button-primary';link.textContent='Ver propiedad y consultar';
  body.append(link);
  article.append(body);
  return article;
}

function renderCards(container, properties) {
  if (!container) return;
  container.replaceChildren(...properties.map(propertyCard));
  container.hidden = properties.length === 0;
}

async function loadCatalog() {
  try {
   
    const response = await fetch('/api/public/propiedades', { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo consultar PostgreSQL');

    const data = await response.json();
       if (!Array.isArray(data)) throw new Error('Formato de datos inválido');

    publicProperties = data;
    catalogReady = true;
    // Si el administrador no marcó destacados, mostramos hasta tres propiedades publicadas.
    const highlighted = publicProperties.filter(item => item.featured === true || item.destacada === true);
    renderCards(featuredContainer, (highlighted.length ? highlighted : publicProperties).slice(0, 3));
    if (featuredEmpty) featuredEmpty.hidden = publicProperties.length > 0;
  } catch (error) {
    catalogReady = false;
    console.warn('No se pudo cargar el catálogo:', error);
    if (message) message.textContent = 'No se pudo cargar el catálogo. Comprobá que el servidor esté funcionando.';
  }
}

document.querySelector('#search-form')?.addEventListener('submit', event => {
  event.preventDefault();
  if (!catalogReady) {
    if (message) message.textContent = 'El catálogo todavía no está disponible.';
    return;
  }
  const selectedCity = normalize(city?.value);
  const keywords = normalize(document.querySelector('#keywords')?.value);
  const selectedType = normalize(listingType?.value).replace(/s$/, '');
  const matches = publicProperties.filter(property => {
    if (operation?.value && normalize(property.operation) !== normalize(operation.value)) return false;
    if (operation?.value === 'alquiler' && rentalPeriod?.value && normalize(property.period) !== normalize(rentalPeriod.value)) return false;
    if (country?.value && normalize(property.country) !== normalize(country.value)) return false;
    if (region?.value && normalize(property.region) !== normalize(region.value)) return false;
    if (selectedType && normalize(property.type).replace(/s$/, '') !== selectedType) return false;
    if (selectedCity && !normalize([property.city, property.region].join(' ')).includes(selectedCity)) return false;
    if (keywords && !normalize([property.title, property.type, property.city, property.region, property.description].join(' ')).includes(keywords)) return false;
    return true;
  });

  const alternativas = matches.length === 0 ? publicProperties : matches;
renderCards(resultsContainer, alternativas);

if (message) message.textContent = matches.length
  ? `${matches.length} propiedad(es) encontrada(s).`
  : publicProperties.length
    ? 'No encontramos coincidencias exactas. Te mostramos otras propiedades disponibles que podrían interesarte.'
    : 'Todavía no hay propiedades publicadas.';
if (resultsContainer) resultsContainer.hidden = alternativas.length === 0;

  
});

updateRentalPeriod();
updateRegions();
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
loadCatalog();
