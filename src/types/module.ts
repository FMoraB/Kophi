import type { Tag } from "../components/ModuleComponents/Tag"

export interface Module {
    age_range: string,
    description: string,
    difficulty: string,
    duration: number,
    id: number,
    image: string,
    language: string,
    module_types_id: number,
    tags: Tag[],
    title: string,
    views: number
}