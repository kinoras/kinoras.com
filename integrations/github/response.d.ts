export type RepositoryResponse = {
    /** Repository short name. */
    name: string
    /** Repository full name including owner. */
    full_name: string
    /** Repository owner info. */
    owner: {
        /** Owner’s GitHub username. */
        login: string
        /** URL of the owner's avatar. */
        avatar_url: string
        /** URL of the owner's  profile. */
        html_url: string
        /** Account type ('User' or 'Organization'). */
        type: string
    }

    /** Short description of the project. */
    description: string | null
    /** Repository tags. */
    topics: string[]
    /** Main programming language used. */
    language: string | null
    /** GitHub page of the repository. */
    html_url: string
    /** Project website. */
    homepage: string | null

    /** Repository visibility level. */
    visibility: 'public' | 'private' | 'internal'
    /** Whether the repo is archived (read-only). */
    archived: boolean
    /** License info (`null` if none). */
    license: {
        /** Short license key. */
        key: string
        /** Full license name. */
        name: string
    } | null

    /** ISO date string of the repo's creation. */
    created_at: string
    /** ISO date string of the repo's last update. */
    updated_at: string
    /** ISO date string of the repo's last push. */
    pushed_at: string
}
