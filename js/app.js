/**
 * ==========================================================================
 * UTC HOUSING RISK MAP - LOGIC ỨNG DỤNG & BỘ LỌC
 * Xử lý: Tìm kiếm, Bộ lọc Mục 1 & Mục 2, Modals, Drawer danh sách trọ
 * ==========================================================================
 */

// Trạng thái bộ lọc hiện tại
const currentFilterState = {
    searchQuery: '',
    riskStatus: 'all',     // 'all' | 'good' | 'medium' | 'risk'
    priceRange: 'all',     // 'all' | '<=2tr' | '2-3tr' | '3-5tr' | '>=5tr'
    distanceRange: 'all',  // 'all' | '<=1km' | '1-2km' | '>=3km'
    minRating: 'all',      // 'all' | '5' | '4' | '3'
    transport: 'all'       // 'all' | 'personal' | 'public'
};

// Layer toggle states
const layerStates = {
    radiusCircles: true,
    riskZones: true,
    transitHubs: true
};

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo bản đồ Leaflet
    initMap();

    // 2. Render danh sách trọ ban đầu
    applyFilters();

    // 3. Gắn sự kiện giao diện
    setupEventListeners();
});

/**
 * Thiết lập các event listeners cho giao diện
 */
function setupEventListeners() {
    // A. THANH TÌM KIẾM
    const searchInput = document.getElementById('nav-search-input');
    const clearSearchBtn = document.getElementById('search-clear-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilterState.searchQuery = e.target.value.trim().toLowerCase();
            if (currentFilterState.searchQuery.length > 0) {
                clearSearchBtn.classList.add('active');
            } else {
                clearSearchBtn.classList.remove('active');
            }
            applyFilters();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilterState.searchQuery = '';
            clearSearchBtn.classList.remove('active');
            applyFilters();
            searchInput.focus();
        });
    }

    // B. MỤC 1: TỐT, ỔN, RỦI RO
    const statusButtons = document.querySelectorAll('.filter-btn-pill');
    statusButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            statusButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilterState.riskStatus = btn.getAttribute('data-status');
            applyFilters();
        });
    });

    // C. MỤC 2: TOGGLE DROPDOWN / POPOVER BỘ LỌC CHI TIẾT
    const filterTriggerBtn = document.getElementById('filter-trigger-btn');
    const filterPopover = document.getElementById('filter-popover-card');

    if (filterTriggerBtn && filterPopover) {
        filterTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterPopover.classList.toggle('show');
            filterTriggerBtn.classList.toggle('active');
        });

        // Click ngoài đóng dropdown
        document.addEventListener('click', (e) => {
            if (!filterPopover.contains(e.target) && !filterTriggerBtn.contains(e.target)) {
                filterPopover.classList.remove('show');
                filterTriggerBtn.classList.remove('active');
            }
        });
    }

    // Chip options trong Mục 2
    setupChipFilters('price-chips', 'priceRange');
    setupChipFilters('distance-chips', 'distanceRange');
    setupChipFilters('rating-chips', 'minRating');

    // Nút Reset bộ lọc chi tiết
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            resetDetailFilters();
        });
    }

    // D. DRAWER TOGGLE (DANH SÁCH PHÒNG TRỌ)
    const navListBtn = document.getElementById('nav-list-btn');
    const toggleListBtn = document.getElementById('toggle-list-btn');
    const bottomListBtn = document.getElementById('bottom-list-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const sideDrawer = document.getElementById('side-drawer');

    const toggleDrawer = () => {
        sideDrawer.classList.toggle('open');
        if (sideDrawer.classList.contains('open')) {
            renderRentalsDrawerList(getFilteredRentals());
        }
    };

    if (navListBtn) navListBtn.addEventListener('click', toggleDrawer);
    if (toggleListBtn) toggleListBtn.addEventListener('click', toggleDrawer);
    if (bottomListBtn) bottomListBtn.addEventListener('click', toggleDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => sideDrawer.classList.remove('open'));

    // E. NÚT VỀ TRUNG TÂM UTC
    const homeBtn = document.getElementById('dock-home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            resetMapToUTC();
            showToast('Đã định vị về trung tâm Trường ĐH GTVT (UTC)');
        });
    }

    // F. TOGGLE LAYERS TỪ DOCK
    const toggleRiskZoneBtn = document.getElementById('dock-riskzone-btn');
    if (toggleRiskZoneBtn) {
        toggleRiskZoneBtn.addEventListener('click', () => {
            layerStates.riskZones = !layerStates.riskZones;
            toggleRiskZones(layerStates.riskZones);
            toggleRiskZoneBtn.classList.toggle('active', layerStates.riskZones);
            showToast(layerStates.riskZones ? 'Đã bật lớp vùng rủi ro (Ngập & PCCC)' : 'Đã ẩn lớp vùng rủi ro');
        });
    }

    const toggleRadiusBtn = document.getElementById('dock-radius-btn');
    if (toggleRadiusBtn) {
        toggleRadiusBtn.addEventListener('click', () => {
            layerStates.radiusCircles = !layerStates.radiusCircles;
            toggleRadiusCircles(layerStates.radiusCircles);
            toggleRadiusBtn.classList.toggle('active', layerStates.radiusCircles);
            showToast(layerStates.radiusCircles ? 'Đã bật bán kính 1km, 2km, 3km UTC' : 'Đã ẩn bán kính UTC');
        });
    }

    // G. ĐỔI CHẾ ĐỘ GOOGLE MAPS (CHUẨN, VỆ TINH, GIAO THÔNG)
    const mapTypeBtns = document.querySelectorAll('.map-type-btn');
    mapTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            setMapType(type);
            showToast(`Đã chuyển sang: ${GOOGLE_MAP_LAYERS[type].name}`);
        });
    });

    // H. CẤU HÌNH GOOGLE MAPS API KEY
    const googleApiOpenBtn = document.getElementById('google-api-open-btn');
    if (googleApiOpenBtn) {
        googleApiOpenBtn.addEventListener('click', openGoogleApiModal);
    }

    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    if (saveApiKeyBtn) {
        saveApiKeyBtn.addEventListener('click', () => {
            const input = document.getElementById('google-api-key-input');
            const key = input ? input.value.trim() : '';
            if (key.length > 5) {
                localStorage.setItem('UTC_GOOGLE_MAPS_API_KEY', key);
                checkAndLoadGoogleMapsSDK();
                document.getElementById('google-api-modal').classList.remove('show');
                showToast('Đã lưu & kích hoạt Google Maps API Key thành công!');
            } else {
                showToast('Vui lòng nhập API Key hợp lệ từ Google Cloud!');
            }
        });
    }

    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    if (clearApiKeyBtn) {
        clearApiKeyBtn.addEventListener('click', () => {
            localStorage.removeItem('UTC_GOOGLE_MAPS_API_KEY');
            const input = document.getElementById('google-api-key-input');
            if (input) input.value = '';
            checkAndLoadGoogleMapsSDK();
            document.getElementById('google-api-modal').classList.remove('show');
            showToast('Đã xóa API Key. Đang dùng chế độ Google Maps Tiles trực tiếp!');
        });
    }

    // I. NÚT BÁO CÁO RỦI RO / ĐÓNG GÓP
    const ctaReportBtn = document.getElementById('cta-report-btn');
    const dockReportBtn = document.getElementById('dock-report-btn');
    if (ctaReportBtn) ctaReportBtn.addEventListener('click', openReportModal);
    if (dockReportBtn) dockReportBtn.addEventListener('click', openReportModal);

    // Form submit báo cáo rủi ro
    const reportForm = document.getElementById('report-risk-form');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleReportSubmit();
        });
    }

    // Modal close backdrops
    setupModalCloseHandlers();
}

/**
 * Xử lý click chọn chip option cho từng nhóm bộ lọc
 */
function setupChipFilters(containerId, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chips = container.querySelectorAll('.chip-option');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            currentFilterState[stateKey] = chip.getAttribute('data-value');
            updateActiveFilterBadgeCount();
            applyFilters();
        });
    });
}

/**
 * Reset toàn bộ tiêu chí trong Mục 2
 */
function resetDetailFilters() {
    currentFilterState.priceRange = 'all';
    currentFilterState.distanceRange = 'all';
    currentFilterState.minRating = 'all';

    // Đặt lại chip selected về "Tất cả"
    const groups = ['price-chips', 'distance-chips', 'rating-chips'];
    groups.forEach(groupId => {
        const groupEl = document.getElementById(groupId);
        if (groupEl) {
            const chips = groupEl.querySelectorAll('.chip-option');
            chips.forEach((c, idx) => {
                c.classList.toggle('selected', idx === 0);
            });
        }
    });

    updateActiveFilterBadgeCount();
    applyFilters();
    showToast('Đã đặt lại bộ lọc chi tiết');
}

/**
 * Cập nhật số lượng tiêu chí đang lọc ở Mục 2
 */
function updateActiveFilterBadgeCount() {
    let count = 0;
    if (currentFilterState.priceRange !== 'all') count++;
    if (currentFilterState.distanceRange !== 'all') count++;
    if (currentFilterState.minRating !== 'all') count++;

    const badge = document.getElementById('active-filter-count');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

/**
 * Lọc dữ liệu phòng trọ theo toàn bộ trạng thái filter
 */
function getFilteredRentals() {
    return MOCK_RENTALS.filter(rental => {
        // 1. Tìm kiếm (theo tên hoặc địa chỉ)
        if (currentFilterState.searchQuery) {
            const q = currentFilterState.searchQuery;
            const matchName = rental.name.toLowerCase().includes(q);
            const matchAddr = rental.address.toLowerCase().includes(q);
            const matchDesc = rental.description.toLowerCase().includes(q);
            if (!matchName && !matchAddr && !matchDesc) return false;
        }

        // 2. Mục 1: Trạng thái (Tốt, Ổn, Rủi ro)
        if (currentFilterState.riskStatus !== 'all') {
            if (rental.status !== currentFilterState.riskStatus) return false;
        }

        // 3. Mục 2 - Giá tiền
        if (currentFilterState.priceRange !== 'all') {
            if (rental.priceRange !== currentFilterState.priceRange) return false;
        }

        // 4. Mục 2 - Khoảng cách tới UTC
        if (currentFilterState.distanceRange !== 'all') {
            if (currentFilterState.distanceRange === '<=1km' && rental.distance > 1.0) return false;
            if (currentFilterState.distanceRange === '1-2km' && (rental.distance <= 1.0 || rental.distance > 2.0)) return false;
            if (currentFilterState.distanceRange === '>=3km' && rental.distance < 3.0) return false;
        }

        // 5. Mục 2 - Đánh giá sao (5 sao, 4 sao+, 3 sao+)
        if (currentFilterState.minRating !== 'all') {
            const minStar = parseFloat(currentFilterState.minRating);
            if (rental.ratingStars < minStar) return false;
        }

        return true;
    });
}

/**
 * Áp dụng bộ lọc lên bản đồ và danh sách hiển thị
 */
function applyFilters() {
    const filteredRentals = getFilteredRentals();

    // 1. Cập nhật marker lên Leaflet map
    renderRentalsOnMap(filteredRentals);

    // 2. Cập nhật số liệu thống kê trên thanh bar
    updateCounters(filteredRentals);

    // 3. Nếu drawer đang mở, cập nhật lại list
    const sideDrawer = document.getElementById('side-drawer');
    if (sideDrawer && sideDrawer.classList.contains('open')) {
        renderRentalsDrawerList(filteredRentals);
    }
}

/**
 * Cập nhật số lượng đếm trên giao diện
 */
function updateCounters(filteredList) {
    const countTotal = document.getElementById('count-total-rentals');
    const countGood = document.getElementById('count-good-rentals');
    const countMedium = document.getElementById('count-medium-rentals');
    const countRisk = document.getElementById('count-risk-rentals');

    const total = filteredList.length;
    const good = filteredList.filter(r => r.status === 'good').length;
    const medium = filteredList.filter(r => r.status === 'medium').length;
    const risk = filteredList.filter(r => r.status === 'risk').length;

    if (countTotal) countTotal.textContent = `${total} trọ`;
    if (countGood) countGood.textContent = good;
    if (countMedium) countMedium.textContent = medium;
    if (countRisk) countRisk.textContent = risk;
}

/**
 * Render danh sách phòng trọ vào Side Drawer
 */
function renderRentalsDrawerList(rentals) {
    const listContainer = document.getElementById('drawer-rentals-list');
    if (!listContainer) return;

    if (rentals.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 10px; color: #64748b;">
                <i class="fa-solid fa-house-circle-xmark" style="font-size: 42px; margin-bottom: 12px; color: #94a3b8;"></i>
                <h4 style="font-size: 15px; font-weight: 700;">Không tìm thấy phòng trọ phù hợp</h4>
                <p style="font-size: 12px; margin-top: 4px;">Hãy thử điều chỉnh lại bộ lọc giá tiền, khoảng cách hoặc từ khóa tìm kiếm.</p>
                <button onclick="resetDetailFilters()" class="filter-trigger-btn" style="margin: 14px auto 0; font-size: 12px;">
                    Đặt lại bộ lọc
                </button>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = rentals.map(r => `
        <div class="rental-card" onclick="selectRentalFromList('${r.id}')">
            <div class="card-image-box">
                <img src="${r.image}" alt="${r.name}" loading="lazy">
                <span class="card-risk-pill ${r.status}">
                    ${r.status === 'good' ? '<i class="fa-solid fa-shield-halved"></i>' : r.status === 'medium' ? '<i class="fa-solid fa-circle-exclamation"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>'}
                    ${r.statusText}
                </span>
                <span class="card-distance-pill">
                    <i class="fa-solid fa-location-arrow"></i> ${r.distanceDisplay.split('(')[0]}
                </span>
            </div>
            <div class="card-body">
                <h4 class="card-title">${r.name}</h4>
                <p class="card-address">
                    <i class="fa-solid fa-map-pin"></i> ${r.address}
                </p>
                <div class="card-meta-row">
                    <span class="card-price">${r.priceDisplay}</span>
                    <span class="card-rating">
                        ★ ${r.rating} <span style="color: #64748b; font-size: 11px; font-weight: 500;">(${r.reviewsCount})</span>
                    </span>
                </div>
                <div style="display: flex; gap: 6px; margin-top: 6px;">
                    <span style="font-size: 11px; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 9999px;">${r.roomType}</span>
                    <span style="font-size: 11px; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 9999px;">${r.area}</span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Khi click chọn 1 phòng trọ từ danh sách
 */
function selectRentalFromList(rentalId) {
    focusOnRental(rentalId);
    // Trên mobile tự thu drawer lại để xem bản đồ
    if (window.innerWidth <= 768) {
        document.getElementById('side-drawer').classList.remove('open');
    }
}

/**
 * Mở Modal chi tiết phòng trọ
 */
function openRentalDetailModal(rentalId) {
    const rental = MOCK_RENTALS.find(r => r.id === rentalId);
    if (!rental) return;

    const modal = document.getElementById('rental-detail-modal');
    const heroImg = document.getElementById('modal-hero-img');
    const title = document.getElementById('modal-rental-title');
    const address = document.getElementById('modal-rental-address');
    const scoreNum = document.getElementById('modal-risk-score-num');
    const scoreBar = document.getElementById('modal-risk-score-bar');
    const statusText = document.getElementById('modal-risk-status-text');
    const price = document.getElementById('modal-price');
    const distance = document.getElementById('modal-distance');
    const elec = document.getElementById('modal-elec');
    const water = document.getElementById('modal-water');
    const transport = document.getElementById('modal-transport');
    const highlightsContainer = document.getElementById('modal-highlights-list');
    const risksContainer = document.getElementById('modal-risks-list');
    const desc = document.getElementById('modal-description');

    heroImg.src = rental.image;
    title.textContent = rental.name;
    address.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #15803d;"></i> ${rental.address}`;

    // Risk Score
    scoreNum.textContent = rental.riskScore;
    scoreBar.style.width = `${rental.riskScore}%`;
    if (rental.riskScore < 30) {
        scoreNum.style.color = '#16a34a';
        scoreBar.style.backgroundColor = '#16a34a';
        statusText.textContent = 'Mức độ an toàn cao - Đạt chuẩn PCCC & An ninh';
        statusText.style.color = '#16a34a';
    } else if (rental.riskScore < 60) {
        scoreNum.style.color = '#d97706';
        scoreBar.style.backgroundColor = '#d97706';
        statusText.textContent = 'Mức độ rủi ro trung bình - Cần lưu ý hợp đồng & giờ giấc';
        statusText.style.color = '#d97706';
    } else {
        scoreNum.style.color = '#dc2626';
        scoreBar.style.backgroundColor = '#dc2626';
        statusText.textContent = 'Cảnh báo rủi ro cao - Tiềm ẩn mất an toàn PCCC / bẫy cọc';
        statusText.style.color = '#dc2626';
    }

    price.textContent = rental.priceDisplay;
    distance.textContent = rental.distanceDisplay;
    elec.textContent = rental.electricity;
    water.textContent = rental.water;
    transport.textContent = rental.transportText;
    desc.textContent = rental.description;

    // Highlights
    highlightsContainer.innerHTML = rental.highlights.map(h => `
        <div class="bullet-item">
            <i class="fa-solid fa-circle-check" style="color: #16a34a; margin-top: 2px;"></i>
            <span>${h}</span>
        </div>
    `).join('');

    // Risks
    risksContainer.innerHTML = rental.risks.map(rk => `
        <div class="bullet-item">
            <i class="fa-solid fa-triangle-exclamation" style="color: #dc2626; margin-top: 2px;"></i>
            <span>${rk}</span>
        </div>
    `).join('');

    modal.classList.add('show');
}

/**
 * Mở modal cấu hình kết nối Google Maps API
 */
function openGoogleApiModal() {
    const modal = document.getElementById('google-api-modal');
    const input = document.getElementById('google-api-key-input');
    const savedKey = localStorage.getItem('UTC_GOOGLE_MAPS_API_KEY') || '';
    if (input) input.value = savedKey;
    if (modal) modal.classList.add('show');
}
window.openGoogleApiModal = openGoogleApiModal;

/**
 * Mở modal báo cáo rủi ro
 */
function openReportModal() {
    const modal = document.getElementById('report-risk-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

/**
 * Xử lý khi người dùng gửi form báo cáo trọ
 */
function handleReportSubmit() {
    const nameInput = document.getElementById('report-rental-name');
    const addrInput = document.getElementById('report-rental-addr');
    const typeSelect = document.getElementById('report-risk-type');
    const descInput = document.getElementById('report-risk-desc');

    // Thêm tạm vào danh sách hoặc thông báo
    showToast('Cảm ơn bạn! Báo cáo rủi ro đã được gửi đến ban quản trị NCKH UTC để kiểm duyệt.');

    // Reset form & đóng modal
    nameInput.value = '';
    addrInput.value = '';
    descInput.value = '';
    document.getElementById('report-risk-modal').classList.remove('show');
}

/**
 * Thiết lập sự kiện đóng các modal khi click nút x hoặc click nền mờ
 */
function setupModalCloseHandlers() {
    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        const closeBtns = modal.querySelectorAll('.modal-close-icon');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        });
    });
}

/**
 * Hiển thị Toast thông báo nhanh
 */
function showToast(message) {
    const toast = document.getElementById('toast-msg');
    if (!toast) return;

    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: #22c55e;"></i> ${message}`;
    toast.classList.add('show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

