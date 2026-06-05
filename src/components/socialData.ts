export interface socialMedia {
    id: number;
    name: string;
    image: string;
    url: string;
}

export const socialMedia: socialMedia[] = [
    {
        id: 1,
        name: "Facebook",
        image: "src/assets/facebook.png",
        url: "#"
    },
    {
        id: 2,
        name: "Instagram",
        image: "src/assets/instagram.png",
        url: "#"
    },
    {
        id: 3,
        name: "Twitter",
        image: "src/assets/twitter.png",
        url: "#"
    }
]