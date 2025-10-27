import type { File } from './common'

export type ProjectData = {
    /** Hero image or emoji of the project. */
    hero: File | string | null
    /** Name of the project. */
    name: string
    /** Description of the project. */
    description: string | null
    /** The GitHub repository of the project. */
    repository: string | null
}

export type ProjectService = {
    getList: (options?: Partial<ProjectListQueryOptions>) => Promise<ProjectListQueryResponse>
    // getSingle: (id: ProjectId) => Promise<ProjectData | null>
    // getContent: (id: ProjectId) => Promise<string | null>
}

export type ProjectListQueryOptions = {
    category: string
    cursor: string
    limit: number
}

export type ProjectListQueryResponse = {
    projects: ProjectData[]
    nextCursor: string | null
}
