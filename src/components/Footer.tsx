import type { socialMedia } from "./socialData"

export interface FooterProps {
    socialMedia: socialMedia[]
}

function Footer({ socialMedia }: FooterProps) {
    return (
        <div className="flex flex-items justify-center items-center pb-10">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-6">
                    {socialMedia.map((social) => (
                        <a key={social.id} href={social.url}>
                            <img src={social.image} alt={social.name} />
                        </a>
                    ))}
                </div>
                <p>©Kophi, 2026</p>
            </div>
        </div>

    )
}
export default Footer

