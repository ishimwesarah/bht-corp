import { 
  FaLaptopCode, FaNetworkWired, FaTools, FaSearch, FaBook, FaUserGraduate, FaHdd, FaServer, FaPlane, FaPassport,
  FaGem, FaMugHot, FaPalette, FaPrint, FaTshirt, FaCamera, FaVideo, FaTags, FaBoxOpen, FaEdit, FaBroadcastTower, FaBrush 
} from 'react-icons/fa';

// --- ACTION REQUIRED: ADD YOUR SERVICE-SPECIFIC IMAGES TO THE ASSETS FOLDER ---
// --- AND UPDATE THESE IMPORT PATHS ACCORDINGLY ---

// Placeholders for Technology Service Images
import maintenanceImg from '../assets/services/maint.jpg';
import networkImg from '../assets/services/network.jpg';
import websiteImg from '../assets/services/website.jpg';
import phoneTrackImg from '../assets/services/tracking.jpg';
import elearningImg from '../assets/services/elearning.jpg';
import internshipImg from '../assets/services/internship.jpg';
import accessoriesImg from '../assets/accessories.webp';
import egovernmentImg from '../assets/services/government.jpg';
import studyAbroadImg from '../assets/services/elearning.jpg';
import visaImg from '../assets/services/visa.jpg';

// Placeholders for Design Service Images
import crystalImg from '../assets/services/visa.jpg';
import mugImg from '../assets/services/website.jpg';
import epoxyImg from '../assets/services/website.jpg';
import heatPressImg from '../assets/services/government.jpg';
import engravingImg from '../assets/services/tracking.jpg';
import uvPrintingImg from '../assets/services/tracking.jpg';
import invitationImg from '../assets/services/tracking.jpg';
import stampImg from '../assets/services/tracking.jpg';
import tshirtImg from '../assets/services/tracking.jpg';
import braceletImg from '../assets/services/tracking.jpg';
import photoStudioImg from '../assets/services/tracking.jpg';
import brochureImg from '../assets/services/tracking.jpg';
import bookCoverImg from '../assets/services/tracking.jpg';
import logoImg from '../assets/services/tracking.jpg';
import labelImg from '../assets/services/tracking.jpg';
import largeFormatImg from '../assets/services/tracking.jpg';
import packageImg from '../assets/services/tracking.jpg';
import videoEditImg from '../assets/services/tracking.jpg';
import stickerImg from '../assets/services/tracking.jpg';
import liveStreamImg from '../assets/services/tracking.jpg';


export const allTechServices = [
  { 
    id: 'computer-maintenance', name: 'Computer Maintenance', 
    description: 'Expert repairs, tune-ups, and optimizations to keep your systems running at peak performance.', 
    icon: FaTools, image: maintenanceImg,
    deliverables: ['Virus & Malware Removal', 'Hardware Cleaning & Inspection', 'Software Updates & Patches', 'Performance Optimization'],
    ctaText: "Book a Maintenance Check"
  },
  { 
    id: 'networking', name: 'Networking Services', 
    description: 'Installation and repair of robust, high-speed networks for home and office, ensuring seamless connectivity.', 
    icon: FaNetworkWired, image: networkImg,
    deliverables: ['Site Survey & Analysis', 'Hardware Installation & Setup', 'Secure Wi-Fi Configuration', 'Ongoing Support & Troubleshooting'],
    ctaText: "Quote Your Network Setup"
  },
  { 
    id: 'website-design', name: 'Website Designing', 
    description: 'Creating beautiful, functional, and responsive websites that tell your brand’s story and drive growth.', 
    icon: FaLaptopCode, image: websiteImg,
    deliverables: ['Responsive on all devices', 'SEO-friendly structure', 'Custom UI/UX design', 'Content Management System'],
    ctaText: "Get a Quote for Your Website"
  },
  { 
    id: 'phone-tracking', name: 'Stolen Phone Tracking', 
    description: 'Specialized services to assist in the process of locating lost or stolen mobile devices using its serial number.', 
    icon: FaSearch, image: phoneTrackImg,
    deliverables: ['Serial Number Search Assistance', 'Status Reporting', 'Coordination with Authorities Guidance', 'Data Protection Advice'],
    ctaText: "Request Tracking Assistance"
  },
  { 
    id: 'elearning', name: 'E-learning Services', 
    description: 'Developing and supporting digital learning platforms and creating engaging educational content.', 
    icon: FaBook, image: elearningImg,
    deliverables: ['Platform Setup & Customization', 'Interactive Course Creation', 'User Management & Support', 'Content Hosting'],
    ctaText: "Discuss Your E-learning Project"
  },
  { 
    id: 'internship', name: 'Internship Opportunity', 
    description: 'Providing hands-on experience and mentorship for the next generation of Rwandan tech talent.', 
    icon: FaUserGraduate, image: internshipImg,
    deliverables: ['Real-world Project Experience', 'Mentorship from Industry Experts', 'Professional Skills Development', 'Certificate of Completion'],
    ctaText: "Apply for an Internship"
  },
  { 
    id: 'accessories', name: 'Computer & Networking Accessories', 
    description: 'Selling a curated selection of high-quality accessories for computers and networking hardware.', 
    icon: FaHdd, image: accessoriesImg,
    deliverables: ['Keyboards & Mice', 'Cables & Adapters', 'Routers & Switches', 'Webcams & Headsets'],
    ctaText: "Browse Our Accessories"
  },
  { 
    id: 'egovernment', name: 'E-Government Services', 
    description: 'Providing clear, step-by-step assistance with navigating and using online government platforms like Irembo.', 
    icon: FaServer, image: egovernmentImg,
    deliverables: ['Service Application Assistance', 'Document Upload Support', 'Payment Process Guidance', 'Follow-up Support'],
    ctaText: "Get E-Government Help"
  },
  { 
    id: 'study-abroad', name: 'Study Abroad', 
    description: 'Connecting students with international universities and facilitating the scholarship application process.', 
    icon: FaPlane, image: studyAbroadImg,
    deliverables: ['University & Course Matching', 'Scholarship Search & Application', 'Admission Essay Guidance', 'Document Verification'],
    ctaText: "Explore Study Options"
  },
  { 
    id: 'visa-application', name: 'Visa Application', 
    description: 'Expert guidance for student, tourist, permanent residence, and visit visa applications worldwide.', 
    icon: FaPassport, image: visaImg,
    deliverables: ['Application Form Filling', 'Documentation Checklist', 'Mock Interview Preparation', 'Submission & Follow-up'],
    ctaText: "Start Your Visa Application"
  },
];

export const allDesignServices = [
  { 
    id: 'crystals-design', name: 'Crystals Design', 
    description: 'Elegant and bespoke designs embedded in high-quality crystal, perfect for awards, gifts, and decor.', 
    icon: FaGem, image: crystalImg,
    deliverables: ['Custom Design Mockup', 'High-Quality Crystal Medium', 'Precision UV Printing', 'Premium Gift Boxing'],
    ctaText: "Design Your Crystal Award"
  },
  { 
    id: 'mug-design', name: 'Mug Design', 
    description: 'Personalized and branded mugs using high-quality sublimation for vibrant, long-lasting images.', 
    icon: FaMugHot, image: mugImg,
    deliverables: ['Custom Artwork Setup', 'Full-Color Sublimation Print', 'Durable Ceramic Mug', 'Individual or Bulk Orders'],
    ctaText: "Order Custom Mugs"
  },
  { 
    id: 'epoxy-design', name: 'Epoxy Design', 
    description: 'Unique and durable custom designs crafted with high-quality epoxy for items like keychains and decor.', 
    icon: FaPalette, image: epoxyImg,
    deliverables: ['Personalized Design Concept', 'High-Gloss Epoxy Finish', 'Color & Additive Customization', 'Durable, Hand-crafted Item'],
    ctaText: "Create an Epoxy Piece"
  },
  { 
    id: 'heat-press', name: 'Heat Press (Sublimation)', 
    description: 'Vibrant, full-color printing on a variety of materials and apparel, perfect for custom gear.', 
    icon: FaPrint, image: heatPressImg,
    deliverables: ['Polyester & Polymer-coated Items', 'Vibrant, Permanent Colors', 'Photo-realistic Prints', 'No-feel, Breathable Finish'],
    ctaText: "Quote a Heat Press Job"
  },
  { 
    id: 'engraving', name: 'Engraving Machine', 
    description: 'Precision engraving on metal, wood, glass, and other materials for a permanent, high-class finish.', 
    icon: FaTools, image: engravingImg,
    deliverables: ['Text & Logo Engraving', 'Wide Material Compatibility', 'Detailed, Precise Finish', 'Personal & Corporate Gifts'],
    ctaText: "Inquire About Engraving"
  },
  { 
    id: 'uv-printing', name: 'UV Printing Services', 
    description: 'High-quality, durable direct-to-object printing on a vast range of flat or cylindrical surfaces.', 
    icon: FaPrint, image: uvPrintingImg,
    deliverables: ['Vibrant, Full-color Prints', 'Textured & 3D Effects (Varnish)', 'Excellent Adhesion & Durability', 'Wide Substrate Compatibility'],
    ctaText: "Get a UV Printing Quote"
  },
  { 
    id: 'invitation-design', name: 'Invitation Design', 
    description: 'Beautiful, custom invitations for weddings, events, and corporate functions that set the perfect tone.', 
    icon: FaPalette, image: invitationImg,
    deliverables: ['Bespoke Design Concepts', 'High-Quality Cardstock', 'Matching Envelopes', 'Print & Digital Versions'],
    ctaText: "Design Your Invitations"
  },
  { 
    id: 'stamp-design', name: 'Stamp Design', 
    description: 'Custom rubber and self-inking stamps for business and personal use.', 
    icon: FaEdit, image: stampImg, 
    deliverables: ['Custom Logo & Text Stamps', 'Self-inking Mechanism', 'Multiple Ink Color Options', 'Fast Turnaround'], 
    ctaText: "Order a Custom Stamp" 
  },
  { 
    id: 'tshirt-design', name: 'T-Shirt Design', 
    description: 'Creative and eye-catching custom apparel for your brand or event.', 
    icon: FaTshirt, image: tshirtImg, 
    deliverables: ['Custom Graphic Design', 'Choice of Print Method (DTG, Screen)', 'Wide Range of Apparel Styles', 'Mockups for Approval'], 
    ctaText: "Design Your T-Shirts" 
  },
  { 
    id: 'bracelets-design', name: 'Bracelets Design', 
    description: 'Custom-designed bracelets for events, causes, or personal style.', 
    icon: FaTags, image: braceletImg, 
    deliverables: ['Silicone, Woven, or Beaded Styles', 'Custom Colors & Text', 'Logo Integration', 'Bulk Order Discounts'], 
    ctaText: "Create Custom Bracelets" 
  },
  { 
    id: 'photo-studio', name: 'Photo Studio Services', 
    description: 'Professional photography for portraits, products, and events.', 
    icon: FaCamera, image: photoStudioImg, 
    deliverables: ['In-studio or On-location Shoots', 'Professional Lighting & Backdrops', 'High-resolution Digital Images', 'Expert Retouching'], 
    ctaText: "Book a Photo Session" 
  },
  { 
    id: 'brochure-design', name: 'Brochure Design', 
    description: 'Informative and visually appealing brochures that grab attention.', 
    icon: FaBook, image: brochureImg, 
    deliverables: ['Bi-fold, Tri-fold, or Custom Folds', 'Professional Layout & Typography', 'Print-ready PDF Files', 'Stock Photography Sourcing'], 
    ctaText: "Design Your Brochure" 
  },
  { 
    id: 'book-cover-design', name: 'Book Cover Design', 
    description: 'Compelling and professional book covers that sell your story.', 
    icon: FaBook, image: bookCoverImg, 
    deliverables: ['Unique Cover Concept', 'Front, Back, and Spine Design', 'E-book & Print Versions', '3D Mockup for Marketing'], 
    ctaText: "Start Your Book Cover" 
  },
  { 
    id: 'logo-design', name: 'Logo Design', 
    description: 'Crafting the unique and memorable visual identity for your brand.', 
    icon: FaBrush, image: logoImg, 
    deliverables: ['3 Initial Concepts', 'Full Color Palette', 'Vector Source Files', 'Brand Style Guide'], 
    ctaText: "Start Your Logo Project" 
  },
  { 
    id: 'label-design', name: 'Label Design', 
    description: 'Professional labels for products that stand out on the shelf.', 
    icon: FaTags, image: labelImg, 
    deliverables: ['Custom Shape & Size', 'FDA/Regulatory Compliance Guidance', 'Material & Finish Selection', 'Print-ready Artwork'], 
    ctaText: "Design Your Product Label" 
  },
  { 
    id: 'large-formats', name: 'Large Format Printing', 
    description: 'High-impact banners, posters, and signs for maximum visibility.', 
    icon: FaPrint, image: largeFormatImg, 
    deliverables: ['Vinyl Banners, Posters, Canvases', 'Indoor & Outdoor Materials', 'Vibrant, Fade-resistant Inks', 'Grommets & Finishing Options'], 
    ctaText: "Quote Large Format Printing" 
  },
  { 
    id: 'package-design', name: 'Package Design', 
    description: 'Creative and functional packaging that enhances your product.', 
    icon: FaBoxOpen, image: packageImg, 
    deliverables: ['Structural Box Design (Dieline)', 'Branded Graphics & Layout', '3D Mockups & Renders', 'Print-ready Production Files'], 
    ctaText: "Design Your Packaging" 
  },
  { 
    id: 'video-editing', name: 'Video Editing', 
    description: 'Professional post-production to make your video content shine.', 
    icon: FaVideo, image: videoEditImg, 
    deliverables: ['Color Correction & Grading', 'Audio Mixing & Sound Design', 'Motion Graphics & Titles', 'Final Export for Any Platform'], 
    ctaText: "Edit Your Video" 
  },
  { 
    id: 'sticker-designer', name: 'Sticker Designer', 
    description: 'Custom, high-quality stickers for branding, events, or fun.', 
    icon: FaTags, image: stickerImg, 
    deliverables: ['Die-cut or Kiss-cut Styles', 'Durable, Weatherproof Vinyl', 'Glossy or Matte Finish', 'Proof for Approval'], 
    ctaText: "Order Custom Stickers" 
  },
  { 
    id: 'live-streaming', name: 'Live Streaming Services', 
    description: 'Reliable, multi-camera live streaming for your events, conferences, and services.', 
    icon: FaBroadcastTower, image: liveStreamImg, 
    deliverables: ['Multi-camera Setup', 'Professional Audio & Lighting', 'Streaming to Multiple Platforms (YT, FB)', 'On-screen Graphics & Titles'], 
    ctaText: "Book Live Streaming" 
  },
];