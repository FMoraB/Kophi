export interface Tag{
    id: number,
    name: string
}

export interface Module {
    age_range: string,
    description: string,
    difficulty: string,
    duration: number,
    id: number,
    image: string,
    icon: string,
    language: string,
    module_types_id: number,
    tags: Tag[],
    title: string,
    views: number
}
