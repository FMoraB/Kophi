import type { Section } from "./Section";
import type { Tag } from "./Tag";
//import type { Details } from "./Details";
import moduleImg from "../../assets/Module.png";

export interface Module {
    id: number;
    title: string,
    image: string,
    description: string,
    type: "Default" | "Recommended" | "Popular",
    sections: Section[],
    tags: Tag[],
    difficulty: string,
    language: string,
    duration: number,
    ageRange: string,
    views: number
}

export const module1: Module = {
    id: 1,
    title: "Title",
    image: moduleImg,
    description: "Module description",
    type: "Default",
    sections: [],
    tags: [],
    difficulty: "",
    language: "",
    duration: 0,
    ageRange: "",
    views: 0
}