interface BannerProps {
    title: string,
    description: string
    image: string
}
function MainBanner({ title, description, image }: BannerProps) {
    return (
        <div className="min-h-[70vh] w-full flex justify-center items-center py-10">
            <div className="flex flex-col md:flex-row items-center w-full max-w-6xl px-4">
                <div className="flex flex-col items-start justify-center text-left text-black w-full md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">{description}</p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={image} alt={title} className="opacity-40 w-full max-w-lg h-auto object-cover fade-mask" />
                </div>
            </div>
        </div>
    )
}

export default MainBanner