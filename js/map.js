/**
 * ==========================================================================
 * BẢN ĐỒ RỦI RO PHÒNG TRỌ QUANH ĐH GIAO THÔNG VẬN TẢI (UTC)
 * Kết nối Google Maps Tiles & Google Maps JavaScript API
 * ==========================================================================
 */

let mapInstance = null;
let currentBaseTileLayer = null;
let rentalsMarkerGroup = null;
let riskZonesGroup = null;
let transitGroup = null;
let radiusCirclesGroup = null;
let markersMap = {}; // Lưu trữ marker theo id trọ để điều khiển

// Các lớp bản đồ nền Google Maps sắc nét
const GOOGLE_MAP_LAYERS = {
    // 1. Google Maps Chuẩn (Roadmap - y như ảnh AI Traffic UTC của người dùng)
    roadmap: {
        name: 'Google Maps Chuẩn',
        url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=vi',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Map data &copy; Google'
    },
    // 2. Google Maps Vệ tinh kết hợp nhãn đường phố (Hybrid)
    satellite: {
        name: 'Google Vệ Tinh',
        url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=vi',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Map data &copy; Google'
    },
    // 3. Google Maps Giao thông thời gian thực (Traffic)
    traffic: {
        name: 'Google Giao Thông',
        url: 'https://mt{s}.google.com/vt/lyrs=m,traffic&x={x}&y={y}&z={z}&hl=vi',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Map data &copy; Google'
    },
    // 4. Google Maps Địa hình (Terrain)
    terrain: {
        name: 'Google Địa Hình',
        url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=vi',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Map data &copy; Google'
    }
};

// Giới hạn phạm vi bản đồ quanh UTC (Bán kính ~ 6km)
const MAP_BOUNDS = [
    [21.0000, 105.7600], // Southwest
    [21.0600, 105.8500]  // Northeast
];

/**
 * Khởi tạo bản đồ quanh trường ĐH GTVT với Google Maps Tile
 */
function initMap() {
    // Tạo bản đồ và căn tâm chuẩn xác tại ĐH GTVT (vị trí y như ảnh)
    mapInstance = L.map('map', {
        center: [21.0287, 105.8038],
        zoom: 16, // Zoom 16 hiển thị rõ ràng từng phố, hồ Thủ Lệ, Ga Cầu Giấy như ảnh
        minZoom: 13,
        maxZoom: 20,
        maxBounds: MAP_BOUNDS,
        maxBoundsViscosity: 0.8,
        zoomControl: false
    });

    // Thêm zoom control góc phải dưới
    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapInstance);

    // Kích hoạt mặc định lớp Google Maps Roadmap tiếng Việt
    setMapType('roadmap');

    // Khởi tạo các nhóm Layer
    rentalsMarkerGroup = L.layerGroup().addTo(mapInstance);
    riskZonesGroup = L.layerGroup().addTo(mapInstance);
    radiusCirclesGroup = L.layerGroup().addTo(mapInstance);

    // Vẽ các vòng bán kính từ trường UTC (1km, 2km, 3km)
    renderRadiusCircles();

    // Vẽ các vùng rủi ro (Ngập lụt, PCCC)
    renderRiskZones();

    // Kiểm tra và khởi động Google Maps JS API nếu người dùng đã lưu API Key
    checkAndLoadGoogleMapsSDK();
}

/**
 * Đổi loại bản đồ nền (Roadmap, Satellite, Traffic, Terrain)
 */
function setMapType(typeKey) {
    const config = GOOGLE_MAP_LAYERS[typeKey] || GOOGLE_MAP_LAYERS.roadmap;
    
    if (currentBaseTileLayer) {
        mapInstance.removeLayer(currentBaseTileLayer);
    }

    currentBaseTileLayer = L.tileLayer(config.url, {
        subdomains: config.subdomains,
        maxZoom: config.maxZoom,
        attribution: config.attribution
    }).addTo(mapInstance);

    // Cập nhật trạng thái nút bấm nếu có
    const mapTypeBtns = document.querySelectorAll('.map-type-btn');
    mapTypeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-type') === typeKey);
    });
}

/**
 * Vẽ vòng tròn bán kính 1km, 2km, 3km quanh UTC
 */
function renderRadiusCircles() {
    radiusCirclesGroup.clearLayers();

    // 1km Circle (Đi bộ < 12 phút)
    L.circle([21.0287, 105.8038], {
        radius: 1000,
        color: '#16a34a',
        fillColor: '#16a34a',
        fillOpacity: 0.04,
        weight: 1.5,
        dashArray: '5, 5'
    }).bindTooltip('Bán kính 1km (Đi bộ lý tưởng tới UTC)', {
        permanent: false,
        direction: 'top'
    }).addTo(radiusCirclesGroup);

    // 2km Circle (Xe đạp / Xe máy < 7 phút)
    L.circle([21.0287, 105.8038], {
        radius: 2000,
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.02,
        weight: 1.5,
        dashArray: '5, 5'
    }).bindTooltip('Bán kính 2km (Đi xe đạp / xe máy nhanh)', {
        permanent: false,
        direction: 'top'
    }).addTo(radiusCirclesGroup);

    // 3km Circle (Xe bus 15 phút)
    L.circle([21.0287, 105.8038], {
        radius: 3000,
        color: '#2563eb',
        fillColor: '#2563eb',
        fillOpacity: 0.015,
        weight: 1.5,
        dashArray: '5, 5'
    }).bindTooltip('Bán kính 3km (Đi xe buýt / metro)', {
        permanent: false,
        direction: 'top'
    }).addTo(radiusCirclesGroup);
}

/**
 * Vẽ các vùng rủi ro (Ngập úng, PCCC) và vùng an toàn
 */
function renderRiskZones() {
    riskZonesGroup.clearLayers();

    RISK_ZONES.forEach(zone => {
        const polygon = L.polygon(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.22,
            weight: 2,
            dashArray: zone.type === 'safe' ? null : '6, 6'
        }).addTo(riskZonesGroup);

        polygon.bindPopup(`
            <div style="padding: 12px; font-family: var(--font-sans);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <i class="fa-solid ${zone.type === 'flood' ? 'fa-water' : zone.type === 'fire' ? 'fa-fire-flame-curved' : 'fa-shield-heart'}" style="color: ${zone.color}; font-size: 16px;"></i>
                    <strong style="color: #0f172a; font-size: 13px;">${zone.name}</strong>
                </div>
                <p style="font-size: 12px; color: #475569; line-height: 1.4;">${zone.description}</p>
            </div>
        `);
    });
}

/**
 * Vẽ các điểm trung chuyển xe buýt và Metro quanh UTC
 */
function renderTransitHubs() {
    transitGroup.clearLayers();

    TRANSIT_HUBS.forEach(hub => {
        const transitIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `
                <div class="pin-bubble transit">
                    <i class="fa-solid fa-${hub.icon}"></i>
                    <span>${hub.name.split('(')[0]}</span>
                </div>
            `,
            iconSize: [160, 28],
            iconAnchor: [80, 14]
        });

        const marker = L.marker(hub.coords, { icon: transitIcon }).addTo(transitGroup);
        marker.bindPopup(`
            <div style="padding: 12px; font-family: var(--font-sans);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                    <i class="fa-solid fa-${hub.icon}" style="color: #0284c7; font-size: 16px;"></i>
                    <strong style="color: #0f172a; font-size: 13px;">${hub.name}</strong>
                </div>
                <p style="font-size: 12px; color: #475569; line-height: 1.4;">${hub.description}</p>
            </div>
        `);
    });
}

/**
 * Hiển thị danh sách các phòng trọ lên bản đồ theo bộ lọc
 * @param {Array} rentals Danh sách trọ sau khi lọc
 */
function renderRentalsOnMap(rentals) {
    rentalsMarkerGroup.clearLayers();
    markersMap = {};

    rentals.forEach(rental => {
        const statusClass = rental.status; // good, medium, risk
        const statusIcon = statusClass === 'good' 
            ? 'fa-shield-halved' 
            : statusClass === 'medium' 
            ? 'fa-circle-exclamation' 
            : 'fa-triangle-exclamation';

        const customIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `
                <div class="pin-bubble ${statusClass}">
                    <i class="fa-solid ${statusIcon}"></i>
                    <span>${rental.priceDisplay.split('/')[0]}</span>
                </div>
            `,
            iconSize: [110, 32],
            iconAnchor: [55, 16]
        });

        const marker = L.marker(rental.coords, { icon: customIcon }).addTo(rentalsMarkerGroup);
        markersMap[rental.id] = marker;

        // Custom Leaflet Popup
        const popupContent = `
            <div class="popup-container">
                <div class="popup-cover">
                    <img src="${rental.image}" alt="${rental.name}">
                    <span class="popup-badge ${statusClass}">${rental.statusText}</span>
                </div>
                <div class="popup-body">
                    <h4 class="popup-title">${rental.name}</h4>
                    <p style="font-size: 11px; color: #64748b; margin-bottom: 4px;">
                        <i class="fa-solid fa-location-dot" style="color: #94a3b8;"></i> ${rental.address}
                    </p>
                    <div class="popup-row">
                        <span class="popup-price">${rental.priceDisplay}</span>
                        <span style="font-size: 11.5px; font-weight: 600; color: #475569;">
                            <i class="fa-solid fa-person-walking" style="color: #15803d;"></i> ${rental.distanceDisplay.split('(')[0]}
                        </span>
                    </div>
                    <div class="popup-row" style="margin-top: 2px;">
                        <span style="font-size: 11.5px; color: #ea580c; font-weight: 700;">
                            ★ ${rental.rating} (${rental.reviewsCount} SV đánh giá)
                        </span>
                        <span style="font-size: 11px; color: ${rental.riskScore > 70 ? '#dc2626' : rental.riskScore > 35 ? '#d97706' : '#16a34a'}; font-weight: 700;">
                            Điểm rủi ro: ${rental.riskScore}/100
                        </span>
                    </div>
                    <button class="popup-details-btn" onclick="openRentalDetailModal('${rental.id}')">
                        <i class="fa-solid fa-circle-info"></i> Xem chi tiết & Rủi ro PCCC
                    </button>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 300 });
    });
}

/**
 * Di chuyển camera và mở popup của một phòng trọ
 * @param {string} rentalId 
 */
function focusOnRental(rentalId) {
    const marker = markersMap[rentalId];
    if (marker) {
        mapInstance.flyTo(marker.getLatLng(), 17, {
            duration: 1.2,
            easeLinearity: 0.25
        });
        setTimeout(() => {
            marker.openPopup();
        }, 800);
    }
}

/**
 * Đưa bản đồ về vị trí trung tâm trường UTC
 */
function resetMapToUTC() {
    mapInstance.flyTo([21.0287, 105.8038], 16, {
        duration: 1.2
    });
}

/**
 * Bật/tắt lớp vòng bán kính
 */
function toggleRadiusCircles(show) {
    if (show) {
        mapInstance.addLayer(radiusCirclesGroup);
    } else {
        mapInstance.removeLayer(radiusCirclesGroup);
    }
}

/**
 * Bật/tắt lớp vùng rủi ro
 */
function toggleRiskZones(show) {
    if (show) {
        mapInstance.addLayer(riskZonesGroup);
    } else {
        mapInstance.removeLayer(riskZonesGroup);
    }
}

/**
 * Bật/tắt lớp trạm giao thông công cộng
 */
function toggleTransitHubs(show) {
    if (show) {
        mapInstance.addLayer(transitGroup);
    } else {
        mapInstance.removeLayer(transitGroup);
    }
}

/**
 * ==========================================================================
 * KẾT NỐI VỚI GOOGLE MAPS JAVASCRIPT API (NẾU CÓ API KEY)
 * Hỗ trợ: Google Places Autocomplete & Google Distance Matrix
 * ==========================================================================
 */
let googlePlacesAutocomplete = null;

function checkAndLoadGoogleMapsSDK() {
    const savedApiKey = localStorage.getItem('UTC_GOOGLE_MAPS_API_KEY');
    const apiStatusPill = document.getElementById('google-api-status-badge');

    if (savedApiKey && savedApiKey.trim().length > 10) {
        if (apiStatusPill) {
            apiStatusPill.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> Google Maps API: Đã kết nối';
            apiStatusPill.classList.add('connected');
        }
        loadGoogleMapsScript(savedApiKey.trim());
    } else {
        if (apiStatusPill) {
            apiStatusPill.innerHTML = '<i class="fa-brands fa-google"></i> Google Maps Tiles: Đang chạy';
        }
    }
}

function loadGoogleMapsScript(apiKey) {
    if (window.google && window.google.maps) {
        initGooglePlacesAutocomplete();
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=vi&callback=onGoogleMapsSDKLoaded`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
        showToast('Không thể kích hoạt Google Maps API Key. Vui lòng kiểm tra lại Key!');
    };
    document.head.appendChild(script);
}

window.onGoogleMapsSDKLoaded = function() {
    initGooglePlacesAutocomplete();
    showToast('Đã kết nối thành công Google Maps JavaScript API!');
};

function initGooglePlacesAutocomplete() {
    const searchInput = document.getElementById('nav-search-input');
    if (!searchInput || !window.google || !window.google.maps || !window.google.maps.places) return;

    // Giới hạn gợi ý địa điểm quanh ĐH GTVT (Hà Nội)
    const defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(21.0100, 105.7800),
        new google.maps.LatLng(21.0500, 105.8300)
    );

    googlePlacesAutocomplete = new google.maps.places.Autocomplete(searchInput, {
        bounds: defaultBounds,
        componentRestrictions: { country: 'vn' },
        fields: ['geometry', 'name', 'formatted_address']
    });

    googlePlacesAutocomplete.addListener('place_changed', () => {
        const place = googlePlacesAutocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            mapInstance.flyTo([lat, lng], 17);
            showToast(`Đã di chuyển tới: ${place.name || place.formatted_address}`);
        }
    });
}
