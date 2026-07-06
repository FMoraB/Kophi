import type { socialMedia } from "../components/socialData"

export interface FooterProps {
    socialMedia: socialMedia[]
}

function Footer({ socialMedia }: FooterProps) {
    return (
        
        <div className="flex flex-col justify-center items-center pb-10">
            <div className="flex flex-row items-center gap-6 p-6">
                <p className="text-gray-600 font-light">About Kophi</p>
                <p className="text-gray-600 font-light">About Us</p>
                <p className="text-gray-600 font-light">Help</p>
                <p className="text-gray-600 font-light">Accessibility</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-6">
                    {socialMedia.map((social) => (
                        <a key={social.id} href={social.url}>
                            <img src={social.image} alt={social.name} />
                        </a>
                    ))}
                </div>
                <p className="text-gray-500 text-sm pt-4">©Kophi, 2026</p>
            </div>
        </div>

    )
}
export default Footer

