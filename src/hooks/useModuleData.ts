// import { useState, useEffect } from "react";
// import type { Section } from "../components/ModuleComponents/Section";
// import type { Tag } from "../components/ModuleComponents/Tag";

// export interface Module {
//     id: number;
//     title: string,
//     image: string,
//     description: string,
//     type: "Default" | "Recommended" | "Popular",
//     sections: Section[],
//     tags: Tag[],
//     difficulty: string,
//     language: string,
//     duration: number,
//     ageRange: string,
//     views: number
// }

// // Raw shape returned by the backend 
// interface RawModule {
//     id: number;
//     title: string;
//     image: string;
//     description: string;
//     module_types_id: number;
//     difficulty: string;
//     language: string;
//     duration: number;
//     age_range: string;
//     views: number;
// }
// //Convierte los id a su equivalente en texto
// const TYPE_MAP: Record<number, Module["type"]> = {
//     1: "Default",
//     2: "Popular",
//     3: "Recommended",
// };

// function mapModule(raw: RawModule): Module {
//     return {
//         id: raw.id,
//         title: raw.title,
//         image: raw.image,
//         description: raw.description,
//         type: TYPE_MAP[raw.module_types_id] ?? "Default",
//         sections: [],
//         tags: [],
//         difficulty: raw.difficulty,
//         language: raw.language,
//         duration: raw.duration,
//         ageRange: raw.age_range,
//         views: raw.views,
//     };
// }

// interface UseModulesResult {
//     modules: Module[];
//     loading: boolean;
//     error: string | null;
// }

// //Fetch to the backend and return the modules
// export function useModules(): UseModulesResult {
//     const [modules, setModules] = useState<Module[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     useEffect(() => {
//         const controller = new AbortController();
//         async function fetchModules() {
//             try {
//                 const response = await fetch('http://localhost:3000/api/modules', { signal: controller.signal });
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const rawData: RawModule[] = await response.json();
//                 setModules(rawData.map(mapModule));
//             } catch (err) {
//                 if ((err instanceof DOMException || err instanceof Error) && err.name === 'AbortError') return;

//                 setError(err instanceof Error ? err.message : 'An unexpected error occurred');
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchModules();
//         return () => controller.abort();
//     }, []);
//     return { modules, loading, error };
// }