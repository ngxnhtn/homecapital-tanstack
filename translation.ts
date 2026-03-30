import type { TranslationText } from './src/hooks/locales'

const translation = {
  collection: {
    en: 'Collections',
    vi: 'Bộ Sưu tập',
  },
  contact: {
    en: 'Contact',
    vi: 'Liên hệ',
  },
  'about-us': {
    en: 'About Us',
    vi: 'Về chúng tôi',
  },
  navigation: {
    vi: 'Điều hướng',
    en: 'Navigation',
  },
  rights: {
    en: 'All Rights Reserved.',
    vi: 'Bảo lưu toàn quyền.',
  },
  office: {
    en: 'Our Office',
    vi: 'Văn phòng chúng tôi',
  },
  viewCollection: {
    en: 'View Collection',
    vi: 'Xem bộ sưu tập',
  },
  philosophy: {
    en: 'Our philosophy',
    vi: 'Triết lý của chúng tôi',
  },
  member: {
    en: 'Member',
    vi: 'Thành viên',
  },
  memberSubtitle: {
    en: "Meet the experts behind Budapest's most exclusive real estate transactions.",
    vi: 'Gặp gỡ các chuyên gia đằng sau các giao dịch bất động sản độc quyền nhất của Budapest.',
  },
  featuredResidences: {
    en: 'Featured Residences',
    vi: 'Dinh Thự Nổi Bật',
  },
  exclusivePortfolio: {
    en: 'Exclusive Portfolio',
    vi: 'Danh mục độc quyền',
  },
  bathrooms: {
    en: 'Bathrooms',
    vi: 'Phòng tắm',
  },
  bedrooms: {
    en: 'Bedrooms',
    vi: 'Phòng ngủ',
  },
  livingArea: {
    en: 'Living area',
    vi: 'Diện tích',
  },
  district: {
    vi: 'Quận',
    en: 'District',
  },
  viewMore: {
    vi: 'Xem thêm',
    en: 'View more',
  },
  latestAcquisitions: {
    vi: 'Mới nhất',
    en: 'Latest',
  },
  saleProperty: {
    vi: 'Căn hộ bán',
    en: 'For sale',
  },
  rentProperty: {
    vi: 'Căn hộ thuê',
    en: 'For rent',
  },
  closedProperty: {
    vi: 'Ngừng giao dịch',
    en: 'Closed',
  },
  rooms: {
    vi: 'phòng',
    en: 'rooms',
  },
  month: {
    vi: '/tháng',
    en: '/month',
  },
  collectionTitle: {
    en: 'The Collection',
    vi: 'Bộ sưu tập',
  },
  collectionSubtitle: {
    en: 'Explore our exclusive portfolio of historic and luxury properties across Budapest.',
    vi: 'Khám phá danh mục đầu tư độc quyền của chúng tôi về các bất động sản lịch sử và xa xỉ trên khắp Budapest.',
  },
  all: {
    vi: 'Tất cả',
    en: 'All',
  },
  allDistricts: {
    vi: 'Tất cả quận',
    en: 'All districts',
  },
  notFound: {
    vi: 'Không tìm thấy',
    en: 'Not Found',
  },
  openInMaps: {
    vi: 'Xem trong Maps',
    en: 'Open in Maps',
  },
  residenceFeatures: {
    vi: 'Tiện ích',
    en: 'Features',
  },
  gallery: {
    vi: 'Thư viện',
    en: 'Gallery',
  },
  contactTitle: {
    vi: 'Liên Hệ Chúng Tôi',
    en: 'Contact Us',
  },
  contactSubtitle: {
    vi: 'Chúng tôi mời bạn liên hệ với xưởng của chúng tôi để thảo luận về nguyện vọng bất động sản của bạn.',
    en: 'We invite you to reach out to our atelier to discuss your real estate aspirations.',
  },
  contactInfo: {
    vi: 'Thông tin liên lạc',
    en: 'Contact Information',
  },
  visitUs: {
    vi: 'Ghé thăm chúng tôi',
    en: 'Visit Us',
  },
  callUs: {
    vi: 'Gọi cho chúng tôi',
    en: 'Call Us',
  },
  emailUs: {
    vi: 'Email cho chúng tôi',
    en: 'Email Us',
  },
  openingHours: {
    vi: 'Giờ mở cửa',
    en: 'Opening Hours',
  },
  sendMessage: {
    vi: 'Gửi tin nhắn cho chúng tôi',
    en: 'Send Us a Message',
  },
  contactName: {
    vi: 'Tên bạn',
    en: 'Your name',
  },
  emailAddress: {
    vi: 'Địa chỉ Email',
    en: 'Email Address',
  },
  inquiryType: {
    vi: 'Loại yêu cầu',
    en: 'Inquiry Type',
  },
  inquiryMessage: {
    vi: 'Tin nhắn',
    en: 'Your Message',
  },
  submit: {
    vi: 'Gửi',
    en: 'Submit',
  },
  headline: {
    vi: `Ngôi nhà của bạn - Đầu tư thông minh - Cuộc sống trọn vẹn`,
    en: 'For your home - Invest smart - Live better',
  },
  subheadline: {
    vi: 'Chuyên nghiệp trên từng dự án BĐS',
    en: 'Experience in real estate',
  },
  expert: {
    vi: 'Chuyên gia',
    en: 'Expert',
  },
} satisfies TranslationText

export { translation }

export type TranslationKey = keyof typeof translation
