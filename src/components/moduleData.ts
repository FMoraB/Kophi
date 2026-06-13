//import type { Details } from "./ModuleComponents/Details";
import type { Section } from "./ModuleComponents/Section";
import type { Tag } from "./ModuleComponents/Tag";
//import reactIcon from "../assets/React-icon.png";



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