import type { Section } from "./Section";
import type { Tag } from "./Tag";
//import type { Details } from "./Details";


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
