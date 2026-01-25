// components/CertificatesCard.js
import { FaCertificate ,FaAward} from 'react-icons/fa';

function CertificatesCard({ certificate }) {
  return (
    <div className="bg-[#1b203e] border border-[#1d293a] p-4 rounded-lg transition-all duration-400 transform hover:scale-125 hover:border-[#464c6a]">
      <div className="p-4 flex flex-col items-center text-center">
        <div className="text-violet-500 text-4xl">
          {/* <FaCertificate /> */}
          <FaAward className="text-[#16f2b3] text-2xl" />
        </div>
        <h3 className="text-lg text-white font-semibold mt-3">{certificate.name}</h3>
        <p className="text-sm text-[#16f2b3]">{certificate.issuer}</p>
        <p className="text-sm text-[#d3d8e8] mt-2">{certificate.date}</p>
        <p className="text-sm text-[#d3d8e8] mt-2">{certificate.description}</p>
      </div>
    </div>
  );
}

export default CertificatesCard;
