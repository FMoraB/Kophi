interface BannerProps {
    title: string,
    description: string
    image: string
}
function MainBanner({ title, description, image }: BannerProps) {
    return (
        <div className="h-screen w-full justify-items-center ">
            <div className="flex flex-row-2">
                <div className="flex flex-col items-start justify-center text-left text-black px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">{description}</p>
                </div>
                <div >
                    <img src={image} alt={title} className="opacity-40 w-fit h-fit max-w-2xl object-cover fade-mask" />
                </div>
            </div>

        </div>
    )
}

export default MainBanner