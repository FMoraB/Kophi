import type { Details } from "./ModuleComponents/Details";
import type { Section } from "./ModuleComponents/Section";
import type { Tag } from "./ModuleComponents/Tag";
import reactIcon from "../assets/React-icon.png";



export interface Module {
    id: number;
    title: string,
    image: string,
    description: string,
    type: "Default" | "Recommended" | "Popular",
    sections: Section[],
    tags: Tag[],
    about: Details[]
    views: number
}

export const modulesArray: Module[] = [
    {
        id: 1,
        title: "IA PARA ADULTOS MAYORES",
        image: reactIcon,
        description: "First Module description",
        type: "Default",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 1
    },
    {
        id: 2,
        title: "IA EN REDES SOCIALES",
        image: reactIcon,
        description: "Second Module description",
        type: "Default",
        sections: [],
        tags: [{ name: "Social Media" }],
        about: [],
        views: 1
    },
    {
        id: 3,
        title: "GUÍA DE PROMPTS",
        image: reactIcon,
        description: "Third Module description",
        type: "Default",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 1
    },
    {
        id: 4,
        title: "¿QUÉ ES CLOUD?",
        image: reactIcon,
        description: "Fourth Module description",
        type: "Popular",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 40
    },
    {
        id: 5,
        title: "RIESGOS DE LA IA",
        image: reactIcon,
        description: "Fifth Module description",
        type: "Popular",
        sections: [],
        tags: [{ name: "Social Media" }],
        about: [],
        views: 30
    },
    {
        id: 6,
        title: "DESARROLLO WEB CON IA",
        image: reactIcon,
        description: "Sixth Module description",
        type: "Popular",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 25
    },
    {
        id: 7,
        title: "IA PARA JOVENES",
        image: reactIcon,
        description: "First Module description",
        type: "Recommended",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 1
    },
    {
        id: 8,
        title: "IA EN REDES SOCIALES",
        image: reactIcon,
        description: "Second Module description",
        type: "Recommended",
        sections: [],
        tags: [{ name: "Cloud" }],
        about: [],
        views: 1
    },
    {
        id: 9,
        title: "GUÍA DE PROMPTS",
        image: reactIcon,
        description: "Third Module description",
        type: "Recommended",
        sections: [],
        tags: [{ name: "Social Media" }],
        about: [],
        views: 1
    },
]

