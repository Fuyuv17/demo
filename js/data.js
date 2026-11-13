/**
 * Dữ liệu phòng trọ mẫu thực tế quanh Trường Đại học Giao thông Vận tải (UTC) - Hà Nội
 * Tọa độ trung tâm UTC: [21.0287, 105.8038] - Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội
 */

const UTC_COORDS = [21.0287, 105.8038];

const MOCK_RENTALS = [
    {
        id: "tro-01",
        name: "Nhà trọ Sinh viên Ngõ 84 Chùa Láng",
        address: "Số 18, Ngách 12, Ngõ 84 Chùa Láng, Đống Đa, Hà Nội",
        coords: [21.0255, 105.8042],
        price: 2800000,
        priceDisplay: "2.8 triệu/tháng",
        priceRange: "2-3tr",
        distance: 0.5, // km
        distanceDisplay: "0.5 km (Đi bộ 6 phút)",
        distanceRange: "<=1km",
        rating: 4.8,
        ratingStars: 5,
        status: "good", // good | medium | risk
        statusText: "Tốt / An toàn",
        riskScore: 18, // 0 - 100 (càng thấp càng an toàn)
        transport: ["personal", "public"], // cá nhân, công cộng
        transportText: "Cá nhân & Công cộng (Gần Bus 09, 12, Metro Cầu Giấy)",
        roomType: "Khép kín có gác xép",
        area: "24m²",
        electricity: "3.500đ/số",
        water: "80.000đ/người/tháng",
        highlights: [
            "Đã trang bị thang thoát hiểm ngoài trời & hệ thống báo cháy tự động",
            "Cửa khóa vân tay 2 lớp, camera 24/7 từng tầng",
            "Chủ trọ thân thiện, ký hợp đồng mẫu có điều khoản minh bạch",
            "Không chung chủ, giờ giấc tự do"
        ],
        risks: [
            "Ngõ hơi dốc nhẹ khi mưa rất to, nhưng không ngập vào trong nhà",
            "Giá gửi xe điện có quy định sạc giờ giấc an toàn"
        ],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 32,
        verifiedByUTC: true,
        description: "Phòng trọ mới sơn sửa, đầy đủ điều hòa, nóng lạnh, bàn học. Rất phù hợp cho sinh viên UTC năm 1-4. Ngõ thông ra hồ Chùa Láng thoáng mát."
    },
    {
        id: "tro-02",
        name: "Phòng trọ CCMN Ngõ 185 Chùa Láng (Cảnh báo PCCC)",
        address: "Số 42, Hẻm 3, Ngõ 185 Chùa Láng, Đống Đa",
        coords: [21.0241, 105.8021],
        price: 2400000,
        priceDisplay: "2.4 triệu/tháng",
        priceRange: "2-3tr",
        distance: 0.7,
        distanceDisplay: "0.7 km (Đi bộ 9 phút)",
        distanceRange: "<=1km",
        rating: 2.1,
        ratingStars: 2,
        status: "risk",
        statusText: "Rủi ro cao (PCCC & Giữ cọc)",
        riskScore: 88,
        transport: ["personal"],
        transportText: "Phương tiện cá nhân (Ngõ cụt sâu 1.2m)",
        roomType: "Phòng trọ mini tầng 5",
        area: "16m²",
        electricity: "4.800đ/số (Giá rất cao)",
        water: "130.000đ/người/tháng",
        highlights: [
            "Giá thuê mềm, gần cổng sau ĐH Ngoại Thương và ĐH Giao Thông"
        ],
        risks: [
            "CỰC KỲ NGUY HIỂM: Nhà ống 6 tầng, tầng 1 chứa hơn 40 xe máy chật kín lối đi, không có lối thoát hiểm phụ",
            "Ban công các tầng đều hàn 'chuồng cọp' kiên cố không có cửa thoát",
            "Nhiều sinh viên UTC phản ánh bị giữ cọc vô lý khi chuyển đi (trừ 100% tiền cọc)",
            "Chủ nhà tự thu điện 4.800đ/số và phụ phí dịch vụ chung không báo trước"
        ],
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 45,
        verifiedByUTC: false,
        description: "Tòa nhà 6 tầng trong ngõ cụt sâu. Cầu thang hẹp 0.8m. Sinh viên cần đặc biệt cảnh giác về an toàn phòng cháy và hợp đồng đặt cọc."
    },
    {
        id: "tro-03",
        name: "Nhà trọ tập thể Ngõ 1120 Đê La Thành",
        address: "Khu tập thể GTVT, Ngõ 1120 Đê La Thành, Ba Đình",
        coords: [21.0298, 105.8065],
        price: 1800000,
        priceDisplay: "1.8 triệu/tháng",
        priceRange: "<=2tr",
        distance: 0.4,
        distanceDisplay: "0.4 km (Đi bộ 5 phút)",
        distanceRange: "<=1km",
        rating: 3.4,
        ratingStars: 3,
        status: "medium",
        statusText: "Tương đối ổn (Lưu ý ẩm mốc)",
        riskScore: 45,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Đi bộ thuận tiện ra trạm trung chuyển UTC",
        roomType: "Phòng trọ dãy cấp 4 cải tạo",
        area: "18m²",
        electricity: "3.800đ/số",
        water: "25.000đ/m³",
        highlights: [
            "Giá rẻ sinh viên dưới 2 triệu, ngay sát khuôn viên trường UTC",
            "Có sân để xe chung có mái tôn, hàng xóm chủ yếu là cán bộ trường cũ"
        ],
        risks: [
            "Mùa hè tầng trên cùng khá nóng bức, tường hơi ẩm mốc mùa nồm",
            "Giờ đóng cổng 23h00 (chung chủ khóa cổng)",
            "Khu vực ngõ Đê La Thành giờ cao điểm hay ùn tắc xe cộ"
        ],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 19,
        verifiedByUTC: true,
        description: "Dãy phòng cải tạo sạch sẽ, chủ nhà là giáo viên hưu trí. Thích hợp cho bạn sinh viên muốn tiết kiệm ngân sách và chỉ cần đi bộ tới trường."
    },
    {
        id: "tro-04",
        name: "Căn hộ Studio Dịch Vọng - Ngõ 68 Cầu Giấy",
        address: "Tòa nhà Green Home, Ngõ 68 Cầu Giấy, Quan Hoa",
        coords: [21.0335, 105.7995],
        price: 4500000,
        priceDisplay: "4.5 triệu/tháng",
        priceRange: "3-5tr",
        distance: 1.2,
        distanceDisplay: "1.2 km (Xe máy 4 phút / Bus 26)",
        distanceRange: "1-2km",
        rating: 4.9,
        ratingStars: 5,
        status: "good",
        statusText: "Rất tốt / Chuẩn an toàn",
        riskScore: 12,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Bus (Gần trạm xe buýt Cầu Giấy - ĐH GTVT)",
        roomType: "Studio full nội thất cao cấp",
        area: "32m²",
        electricity: "3.800đ/số",
        water: "90.000đ/người/tháng",
        highlights: [
            "Hệ thống PCCC nghiệm thu chuẩn: Cửa chống cháy, thang thoát hiểm gắn ngoài, tủ cứu hỏa mỗi tầng",
            "Bảo vệ túc trực 24/7, hầm để xe riêng biệt có khu sạc xe điện thông minh chống cháy nổ",
            "Hợp đồng pháp lý rõ ràng, hoàn cọc 100% nếu báo trước 30 ngày"
        ],
        risks: [
            "Chi phí tương đối cao so với sinh viên đơn lẻ (thích hợp ở nhóm 2 bạn)"
        ],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 58,
        verifiedByUTC: true,
        description: "Phòng studio ban công thoáng sáng, view đường sắt trên cao Nhổn - Ga Hà Nội. Đi lại bằng Metro hoặc Bus cực kỳ tiện lợi tới UTC."
    },
    {
        id: "tro-05",
        name: "Nhà trọ Ngõ 79 Cầu Giấy (Điểm đen ngập úng khi mưa)",
        address: "Ngách 18, Ngõ 79 Cầu Giấy, Quan Hoa, Cầu Giấy",
        coords: [21.0321, 105.8030],
        price: 2100000,
        priceDisplay: "2.1 triệu/tháng",
        priceRange: "2-3tr",
        distance: 0.8,
        distanceDisplay: "0.8 km (Đi bộ 10 phút)",
        distanceRange: "<=1km",
        rating: 2.3,
        ratingStars: 2,
        status: "risk",
        statusText: "Rủi ro ngập úng nặng",
        riskScore: 78,
        transport: ["personal"],
        transportText: "Phương tiện cá nhân (Ngập xe khi mưa to)",
        roomType: "Phòng trọ tầng 1 khép kín",
        area: "20m²",
        electricity: "4.000đ/số",
        water: "100.000đ/người",
        highlights: [
            "Vị trí ngay sát ngã tư Cầu Giấy - ĐH GTVT, xung quanh nhiều quán ăn sinh viên"
        ],
        risks: [
            "CẢNH BÁO NGẬP LỤT: Cứ mưa rào trên 40 phút là ngõ ngập 30-50cm, nước tràn vào tầng 1 làm hỏng xe và đồ đạc",
            "Ẩm thấp, muỗi nhiều vào mùa mưa",
            "An ninh mức trung bình, từng có vụ mất trộm gương xe máy ban đêm"
        ],
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 37,
        verifiedByUTC: false,
        description: "Điểm trũng ngập lụt của khu vực Quan Hoa sát sông Tô Lịch. Sinh viên UTC thuê trọ tầng 1 ở đây thường xuyên phải kê cao đồ đạc mỗi mùa mưa bão."
    },
    {
        id: "tro-06",
        name: "Chung cư mini Ngõ 102 Pháo Đài Láng",
        address: "Số 8B Ngõ 102 Pháo Đài Láng, Láng Thượng, Đống Đa",
        coords: [21.0215, 105.8078],
        price: 3300000,
        priceDisplay: "3.3 triệu/tháng",
        priceRange: "3-5tr",
        distance: 1.4,
        distanceDisplay: "1.4 km (Xe máy 5 phút)",
        distanceRange: "1-2km",
        rating: 4.2,
        ratingStars: 4,
        status: "good",
        statusText: "Ổn định / An ninh tốt",
        riskScore: 24,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Xe bus đường Huỳnh Thúc Kháng / Nguyễn Chí Thanh",
        roomType: "Phòng gác lửng ban công",
        area: "26m²",
        electricity: "3.800đ/số",
        water: "30.000đ/khối",
        highlights: [
            "Tòa nhà mới bàn giao 2023, có thang bộ và thang thoát hiểm ziczac",
            "Khu phố văn minh, gần chợ Pháo Đài Láng mua sắm rẻ",
            "Không gian yên tĩnh, an ninh tốt, camera hành lang"
        ],
        risks: [
            "Đường Pháo Đài Láng hẹp, giờ tan tầm từ UTC về hơi đông"
        ],
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 22,
        verifiedByUTC: true,
        description: "Phòng trọ đẹp, sạch sẽ, thoáng khí. Phù hợp cho 2 sinh viên ở chung chia tiền phòng tiết kiệm."
    },
    {
        id: "tro-07",
        name: "Ký túc xá dịch vụ Homestay Ngõ 100 Đội Cấn",
        address: "Ngõ 100 Đội Cấn, Ba Đình, Hà Nội",
        coords: [21.0360, 105.8190],
        price: 1500000,
        priceDisplay: "1.5 triệu/người/tháng",
        priceRange: "<=2tr",
        distance: 2.3,
        distanceDisplay: "2.3 km (Xe bus 09A / 34 thẳng tới UTC)",
        distanceRange: "1-2km",
        rating: 4.6,
        ratingStars: 5,
        status: "good",
        statusText: "Tốt / Tiết kiệm",
        riskScore: 20,
        transport: ["public", "personal"],
        transportText: "Phương tiện công cộng (Đi bus 09A 10 phút)",
        roomType: "Giường KTX cao cấp bao trọn chi phí",
        area: "Giường tầng riêng tư",
        electricity: "Đã bao gồm",
        water: "Đã bao gồm",
        highlights: [
            "Giá trọn gói 1.5tr gồm điện, nước, wifi, dọn phòng tuần 2 lần",
            "Phòng trang bị rèm che, tủ khóa cá nhân, điều hòa 24/24",
            "PCCC đầy đủ, bình chữa cháy mỗi phòng"
        ],
        risks: [
            "Không gian sinh hoạt chung nhiều người, cần ý thức giữ gìn vệ sinh"
        ],
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 64,
        verifiedByUTC: true,
        description: "Mô hình SleepBox / Homestay cao cấp cho tân sinh viên K64, K65 UTC muốn tiết kiệm chi phí sinh hoạt tối đa."
    },
    {
        id: "tro-08",
        name: "Nhà nguyên căn chia phòng Ngõ 1014 Đê La Thành",
        address: "Số 15, Ngách 29, Ngõ 1014 Đê La Thành, Ngọc Khánh",
        coords: [21.0268, 105.8115],
        price: 2700000,
        priceDisplay: "2.7 triệu/tháng",
        priceRange: "2-3tr",
        distance: 1.1,
        distanceDisplay: "1.1 km (Đi bộ 14 phút)",
        distanceRange: "1-2km",
        rating: 3.2,
        ratingStars: 3,
        status: "medium",
        statusText: "Ổn / Cần lưu ý hợp đồng",
        riskScore: 48,
        transport: ["personal"],
        transportText: "Phương tiện cá nhân",
        roomType: "Phòng trọ tầng 2 nhà 4 tầng",
        area: "20m²",
        electricity: "4.000đ/số",
        water: "100.000đ/người",
        highlights: [
            "Gần bệnh viện Phụ Sản & Nhi TW, đường thông sang Nguyễn Chí Thanh",
            "Chủ nhà hỗ trợ sửa chữa đồ đạc nhanh chóng"
        ],
        risks: [
            "Hợp đồng ép thuê tối thiểu 1 năm, nếu nghỉ hè về quê trả phòng bị phạt cọc",
            "Khu vực Đê La Thành nhiều xưởng mộc gia công gỗ, ban ngày hơi ồn và bụi"
        ],
        image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 15,
        verifiedByUTC: false,
        description: "Nhà xây kiên cố nhưng nằm trong ngõ làm mộc. Cần đọc kỹ phụ lục hợp đồng về việc chấm dứt thuê trước hạn."
    },
    {
        id: "tro-09",
        name: "Căn hộ 2 ngủ Vinhomes Metropolis - Liễu Giai",
        address: "29 Liễu Giai, Ba Đình (Gần trạm bus UTC)",
        coords: [21.0328, 105.8142],
        price: 6500000,
        priceDisplay: "6.5 triệu/người (Share 2PN)",
        priceRange: ">=5tr",
        distance: 1.5,
        distanceDisplay: "1.5 km (Đi Bus 09/32 hoặc xe máy 5 phút)",
        distanceRange: "1-2km",
        rating: 5.0,
        ratingStars: 5,
        status: "good",
        statusText: "Tuyệt đối an toàn / Cao cấp",
        riskScore: 5,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Công cộng (Tuyến Metro 3 & Tuyến Bus)",
        roomType: "Căn hộ chung cư cao cấp",
        area: "78m²",
        electricity: "Giá nhà nước EVN",
        water: "Giá nhà nước",
        highlights: [
            "Tiêu chuẩn PCCC quốc tế, cảm biến khói tự động, thang thoát nạn áp suất dương",
            "An ninh bảo vệ đa lớp 24/7, hầm để xe quy chuẩn tuyệt đối",
            "Tiện ích gym, bể bơi, siêu thị ngay dưới chân tòa"
        ],
        risks: [
            "Chi phí cao, thích hợp cho sinh viên có điều kiện kinh tế khá"
        ],
        image: "https://images.unsplash.com/photo-1502005229762-ee1b2da9730f?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 18,
        verifiedByUTC: true,
        description: "Căn hộ cao cấp dành cho sinh viên ở ghép nhóm 3-4 bạn, tận hưởng an ninh và tiện ích tối đa, không lo rủi ro cháy nổ hay cọc tiền."
    },
    {
        id: "tro-10",
        name: "Phòng trọ bẫy cọc Ngõ 165 Cầu Giấy (Cảnh báo lừa đảo)",
        address: "Ngõ 165 Cầu Giấy, Dịch Vọng, Cầu Giấy",
        coords: [21.0345, 105.7940],
        price: 1900000,
        priceDisplay: "1.9 triệu/tháng (Giá ảo)",
        priceRange: "<=2tr",
        distance: 1.8,
        distanceDisplay: "1.8 km (Bus 20A / 26 / 32)",
        distanceRange: "1-2km",
        rating: 1.5,
        ratingStars: 1,
        status: "risk",
        statusText: "Cực kỳ rủi ro (Bẫy cọc & Môi giới ảo)",
        riskScore: 96,
        transport: ["personal", "public"],
        transportText: "Gần đường lớn Cầu Giấy",
        roomType: "Phòng trọ dán mác Studio giá rẻ",
        area: "20m²",
        electricity: "5.000đ/số",
        water: "150.000đ/người/tháng",
        highlights: [
            "Ảnh đăng bài trên Facebook rất lung linh nhưng thực tế là phòng cũ nát"
        ],
        risks: [
            "BẪY CỌC ĐIỂN HÌNH: Đăng bài giá 1.9tr, yêu cầu sinh viên chuyển cọc giữ chỗ 1 triệu qua Zalo rồi chặn liên lạc",
            "Nếu đến tận nơi ký hợp đồng thì phát sinh phụ phí: phí thang máy 150k, vệ sinh 100k, rác 50k, bảo trì 120k",
            "Đã có 5 sinh viên UTC trình báo Công an phường Dịch Vọng về địa chỉ này"
        ],
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 89,
        verifiedByUTC: false,
        description: "ĐỊA ĐIỂM CẦN TRÁNH: Môi giới cò mồi chuyên lừa gạt tân sinh viên chưa có kinh nghiệm tìm phòng trọ tại khu vực Cầu Giấy."
    },
    {
        id: "tro-11",
        name: "Dãy trọ sinh viên Ngõ 157 Chùa Láng",
        address: "Số 23 Ngõ 157 Chùa Láng, Láng Thượng, Đống Đa",
        coords: [21.0260, 105.8010],
        price: 2500000,
        priceDisplay: "2.5 triệu/tháng",
        priceRange: "2-3tr",
        distance: 0.6,
        distanceDisplay: "0.6 km (Đi bộ 7 phút)",
        distanceRange: "<=1km",
        rating: 3.9,
        ratingStars: 4,
        status: "medium",
        statusText: "Tương đối ổn định",
        riskScore: 36,
        transport: ["personal", "public"],
        transportText: "Đi bộ cực gần UTC",
        roomType: "Phòng khép kín tầng 3",
        area: "19m²",
        electricity: "3.700đ/số",
        water: "80.000đ/người",
        highlights: [
            "Vị trí rất đắc địa cho sinh viên GTVT, có sân phơi chung rộng rãi",
            "Chủ nhà ở riêng, mỗi phòng có chìa khóa cổng riêng"
        ],
        risks: [
            "Tầng 1 chứa xe hơi chật vào buổi tối, lối thoát hiểm chỉ có cửa chính",
            "Đã trang bị bình chữa cháy cầm tay nhưng chưa có chuông báo cháy tập trung"
        ],
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 27,
        verifiedByUTC: true,
        description: "Khu trọ lâu đời, sinh viên UTC nhiều thế hệ từng thuê ở. Mức độ an toàn đạt mức trung bình khá."
    },
    {
        id: "tro-12",
        name: "Phòng trọ cao cấp Trần Thái Tông - Cầu Giấy",
        address: "Ngõ 45 Trần Thái Tông, Dịch Vọng Hậu",
        coords: [21.0310, 105.7865],
        price: 3800000,
        priceDisplay: "3.8 triệu/tháng",
        priceRange: "3-5tr",
        distance: 2.5,
        distanceDisplay: "2.5 km (Bus 34 / 20A từ Ga Cầu Giấy)",
        distanceRange: "1-2km",
        rating: 4.7,
        ratingStars: 5,
        status: "good",
        statusText: "Rất tốt & Hiện đại",
        riskScore: 15,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Xe bus dọc Xuân Thủy - Cầu Giấy",
        roomType: "Phòng 1 ngủ 1 khách",
        area: "35m²",
        electricity: "3.500đ/số",
        water: "28.000đ/m³",
        highlights: [
            "Đầy đủ giấy phép PCCC, thang bộ thoát nạn ngoài nhà",
            "Khu văn phòng văn minh, đường rộng 2 ô tô tránh nhau",
            "Quản lý bằng app điện tử, báo hỏng hóc xử lý trong 24h"
        ],
        risks: [
            "Cách trường UTC hơn 2km, nên có xe máy hoặc đi xe bus"
        ],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 41,
        verifiedByUTC: true,
        description: "Phòng trọ thiết kế phong cách Hàn Quốc, sàn gỗ, máy giặt riêng từng phòng, phù hợp nhóm 2 sinh viên ở lâu dài."
    },
    {
        id: "tro-13",
        name: "Khu trọ Ngõ 846 Đê La Thành (Cảnh báo ngõ sâu, thiếu an toàn)",
        address: "Ngách 35, Ngõ 846 Đê La Thành, Giảng Võ, Ba Đình",
        coords: [21.0252, 105.8160],
        price: 1700000,
        priceDisplay: "1.7 triệu/tháng",
        priceRange: "<=2tr",
        distance: 1.6,
        distanceDisplay: "1.6 km (Xe đạp / Xe máy 6 phút)",
        distanceRange: "1-2km",
        rating: 2.4,
        ratingStars: 2,
        status: "risk",
        statusText: "Rủi ro PCCC & Ngõ sâu nguy hiểm",
        riskScore: 82,
        transport: ["personal"],
        transportText: "Phương tiện cá nhân (Ngõ xe máy lách nhau)",
        roomType: "Phòng trọ cũ không khép kín",
        area: "14m²",
        electricity: "4.500đ/số",
        water: "120.000đ/người",
        highlights: [
            "Giá thuê cực rẻ dưới 2 triệu, gần trạm xe bus Giảng Võ"
        ],
        risks: [
            "Ngõ sâu hơn 500m, quanh co hẹp dưới 1m, xe cứu hỏa hoàn toàn KHÔNG THỂ tiếp cận nếu có hỏa hoạn",
            "Dây điện chằng chịt như mạng nhện trước cửa nhà",
            "Khu vệ sinh dùng chung 3 phòng, ẩm ướt và thiếu ánh sáng tự nhiên"
        ],
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 30,
        verifiedByUTC: false,
        description: "Dãy trọ cũ xây dựng từ năm 2005, kết cấu xuống cấp. Khuyến cáo sinh viên UTC không nên thuê vì nguy cơ mất an toàn PCCC rất lớn."
    },
    {
        id: "tro-14",
        name: "Căn hộ dịch vụ Nguyễn Khánh Toàn",
        address: "Số 68 Nguyễn Khánh Toàn, Quan Hoa, Cầu Giấy",
        coords: [21.0390, 105.8015],
        price: 5200000,
        priceDisplay: "5.2 triệu/tháng",
        priceRange: ">=5tr",
        distance: 1.3,
        distanceDisplay: "1.3 km (Xe máy 4 phút)",
        distanceRange: "1-2km",
        rating: 4.8,
        ratingStars: 5,
        status: "good",
        statusText: "Chất lượng cao / An toàn",
        riskScore: 10,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Bus (Gần tuyến 12, 38)",
        roomType: "Căn hộ 1 phòng ngủ đầy đủ tiện nghi",
        area: "40m²",
        electricity: "3.500đ/số",
        water: "100.000đ/người",
        highlights: [
            "Hệ thống báo khói thông minh kết nối điện thoại",
            "Mặt đường ô tô tải vào được, vị trí thông thoáng",
            "Tự do bạn bè đến chơi, ban quản lý hỗ trợ đăng ký tạm trú miễn phí"
        ],
        risks: [
            "Mức giá thuộc phân khúc cao cấp"
        ],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 34,
        verifiedByUTC: true,
        description: "Căn hộ dịch vụ cao cấp, thang máy tốc độ cao, camera an ninh mọi góc, bếp từ an toàn không dùng gas."
    },
    {
        id: "tro-15",
        name: "Nhà trọ sinh viên Ngõ 20 Huỳnh Thúc Kháng",
        address: "Ngõ 20 Huỳnh Thúc Kháng kéo dài, Đống Đa",
        coords: [21.0210, 105.8050],
        price: 3100000,
        priceDisplay: "3.1 triệu/tháng",
        priceRange: "3-5tr",
        distance: 1.0,
        distanceDisplay: "1.0 km (Đi bộ 12 phút)",
        distanceRange: "<=1km",
        rating: 4.0,
        ratingStars: 4,
        status: "good",
        statusText: "Tốt / Vị trí thuận lợi",
        riskScore: 26,
        transport: ["personal", "public"],
        transportText: "Cá nhân & Đi bộ thuận tiện qua phố Huỳnh Thúc Kháng mới mở",
        roomType: "Phòng khép kín có ban công",
        area: "22m²",
        electricity: "3.800đ/số",
        water: "80.000đ/người",
        highlights: [
            "Đường Huỳnh Thúc Kháng kéo dài mới mở rộng 30m, đi thẳng sang UTC chỉ 3 phút",
            "Khu vực an ninh tốt vì gần các cơ quan công quyền",
            "Có bình bọt chữa cháy và dây thoát hiểm thả chậm tại mỗi tầng"
        ],
        risks: [
            "Số lượng phòng có hạn, thường hết phòng sớm trước mùa tựu trường"
        ],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 29,
        verifiedByUTC: true,
        description: "Vị trí cực kỳ kết nối giữa ĐH Ngoại Thương, ĐH Luật và ĐH Giao Thông Vận Tải. Môi trường sống sạch sẽ, an ninh tuyệt đối."
    },
    {
        id: "tro-16",
        name: "Chung cư mini Ngõ 32 Chùa Láng (Rủi ro sạc xe điện tầng hầm)",
        address: "Số 14 Ngõ 32 Chùa Láng, Láng Thượng, Đống Đa",
        coords: [21.0270, 105.8035],
        price: 2900000,
        priceDisplay: "2.9 triệu/tháng",
        priceRange: "2-3tr",
        distance: 0.35,
        distanceDisplay: "0.35 km (Đi bộ 4 phút tới cổng UTC)",
        distanceRange: "<=1km",
        rating: 2.8,
        ratingStars: 3,
        status: "risk",
        statusText: "Cảnh báo an toàn cháy nổ xe điện",
        riskScore: 75,
        transport: ["personal", "public"],
        transportText: "Đi bộ cực gần UTC",
        roomType: "Phòng tầng 4 khép kín",
        area: "18m²",
        electricity: "4.200đ/số",
        water: "110.000đ/người",
        highlights: [
            "Vị trí siêu gần cổng trường ĐH Giao Thông Vận Tải"
        ],
        risks: [
            "Tầng trệt nhồi nhét hơn 50 xe máy và xe đạp điện, ổ cắm kéo chằng chịt để cắm sạc qua đêm không người trông coi",
            "Không có vách ngăn chống cháy lan giữa khu để xe và cầu thang bộ duy nhất",
            "Từng bị Công an phường xử phạt vi phạm quy định PCCC vào tháng 6/2024"
        ],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 52,
        verifiedByUTC: false,
        description: "Dù rất gần trường nhưng tiềm ẩn nguy cơ chập cháy sạc pin xe điện rất cao. Sinh viên cân nhắc kỹ trước khi ký hợp đồng."
    },
    {
        id: "tro-17",
        name: "Căn hộ dịch vụ Mỹ Đình - Lê Đức Thọ",
        address: "Ngõ 20 Lê Đức Thọ, Nam Từ Liêm",
        coords: [21.0315, 105.7680],
        price: 3500000,
        priceDisplay: "3.5 triệu/tháng",
        priceRange: "3-5tr",
        distance: 3.8,
        distanceDisplay: "3.8 km (Bus 26 / 32 thẳng đến UTC)",
        distanceRange: ">=3km",
        rating: 4.5,
        ratingStars: 5,
        status: "good",
        statusText: "Tốt / Rộng rãi thoáng mát",
        riskScore: 16,
        transport: ["public", "personal"],
        transportText: "Phương tiện công cộng (Tuyến Bus 26, 32 đi 15 phút)",
        roomType: "Căn 1N1K full nội thất",
        area: "35m²",
        electricity: "3.800đ/số",
        water: "30.000đ/m³",
        highlights: [
            "Diện tích rộng gấp rưỡi các phòng khu trung tâm với cùng mức giá",
            "Đầy đủ thang thoát hiểm ngoài trời và tiêu chuẩn PCCC hiện đại",
            "Khuôn viên thoáng đãng, nhiều công viên cây xanh"
        ],
        risks: [
            "Khoảng cách xa trường (>3km), bắt buộc phải đi bus hoặc xe máy"
        ],
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80",
        reviewsCount: 16,
        verifiedByUTC: true,
        description: "Lựa chọn tuyệt vời cho các bạn sinh viên chấp nhận đi xe bus 15-20 phút để đổi lại không gian sống rộng rãi, an toàn, không khí trong lành."
    }
];

// Các vùng rủi ro đặc thù quanh UTC (được hiển thị polygon mờ trên bản đồ)
const RISK_ZONES = [
    {
        id: "zone-flood-chualang",
        name: "Vùng trũng ngập lụt Chùa Láng - Quan Hoa",
        type: "flood",
        color: "#2563eb",
        description: "Khu vực trũng thấp sát sông Tô Lịch, thường ngập sâu 30-50cm khi có mưa lớn kéo dài trên 45 phút.",
        coords: [
            [21.0310, 105.8015],
            [21.0325, 105.8035],
            [21.0305, 105.8050],
            [21.0290, 105.8028]
        ]
    },
    {
        id: "zone-pccc-delathanh",
        name: "Khu vực ngõ sâu hẹp Đê La Thành (Cảnh báo cứu hỏa)",
        type: "fire",
        color: "#dc2626",
        description: "Các ngõ hẹp quanh co dưới 1.2m, mật độ xây dựng cao, xe cứu hỏa không thể tiếp cận trực tiếp. Tiềm ẩn rủi ro PCCC lớn.",
        coords: [
            [21.0280, 105.8080],
            [21.0295, 105.8110],
            [21.0265, 105.8125],
            [21.0250, 105.8095]
        ]
    },
    {
        id: "zone-safe-chualang-ho",
        name: "Khu vực hồ Chùa Láng (Môi trường sống tốt)",
        type: "safe",
        color: "#16a34a",
        description: "Quanh hồ Chùa Láng thoáng đãng, nhiều tòa CCMN mới nghiệm thu PCCC, dân trí cao, an ninh tốt.",
        coords: [
            [21.0235, 105.8030],
            [21.0260, 105.8055],
            [21.0245, 105.8075],
            [21.0220, 105.8048]
        ]
    }
];

// Các điểm giao thông công cộng trọng điểm phục vụ sinh viên UTC
const TRANSIT_HUBS = [
    {
        id: "transit-utc-main",
        name: "Điểm trung chuyển xe buýt Cầu Giấy (Trước cổng UTC)",
        type: "bus_hub",
        coords: [21.0292, 105.8033],
        description: "Điểm trung chuyển buýt lớn nhất Hà Nội: Tuyến 07, 09A, 20A, 24, 26, 27, 28, 32, 34, 38, 49, 105...",
        icon: "bus"
    },
    {
        id: "transit-metro-s8",
        name: "Ga Cầu Giấy (Tuyến ĐSĐT số 3 Nhổn - Ga Hà Nội)",
        type: "metro",
        coords: [21.0289, 105.8020],
        description: "Ga Metro trên cao cách cổng trường UTC chỉ 100m, kết nối thẳng về Nhổn, ĐH Sư Phạm, ĐH Quốc Gia.",
        icon: "train"
    },
    {
        id: "transit-chua-lang",
        name: "Điểm dừng xe buýt Phố Chùa Láng (ĐH Ngoại Thương)",
        type: "bus_stop",
        coords: [21.0248, 105.8048],
        description: "Tuyến buýt số 09B, 12 kết nối Chùa Láng với các trục đường chính.",
        icon: "bus"
    }
];

