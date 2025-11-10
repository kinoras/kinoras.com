'use client'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Section, SectionTitle } from '@/components/ui/section'
import { Separator } from '@/components/ui/separator'

import { type RevalidateOptions, revalidate } from '@/services/revalidate'

type FormValues = {
    secret: string
    revalidatePosts: boolean
    revalidateNotionProjects: boolean
    revalidateGithubProjects: boolean
}

export default function RevalidatePage() {
    const { register, handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            secret: '',
            revalidatePosts: true,
            revalidateNotionProjects: true,
            revalidateGithubProjects: true
        }
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const options: RevalidateOptions = {}

            if (values.revalidatePosts) options.posts = { all: true }
            if (values.revalidateNotionProjects) options.notionProjects = { all: true }
            if (values.revalidateGithubProjects) options.githubProjects = { all: true }

            await revalidate(values.secret, options)

            alert('Revalidation successful.')
        } catch (err: unknown) {
            const cause = err instanceof Error ? err.message : 'Unexpected error.'
            alert(`Revalidation failed: ${cause}`)
        }
    }

    return (
        <Section>
            <SectionTitle>Cache Revalidation</SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className="sm:flex-row">
                    <FieldSet className="sm:flex-2">
                        <FieldLegend className="text-xl! font-bold">Authentication</FieldLegend>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="secret">Secret</FieldLabel>
                                <Input
                                    id="secret"
                                    type="password"
                                    placeholder="Enter the magic words here"
                                    {...register('secret', { required: true })}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <div>
                        <Separator className="sm:hidden" />
                        <Separator orientation="vertical" className="hidden sm:block" />
                    </div>

                    <FieldSet className="sm:flex-3">
                        <FieldLegend className="text-xl! font-bold">Scope</FieldLegend>
                        <FieldDescription>
                            Select which content types should be revalidated.
                        </FieldDescription>
                        <FieldGroup data-slot="checkbox-group">
                            <Controller
                                name="revalidatePosts"
                                control={control}
                                render={({ field: { name, value, onChange } }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="scope-posts"
                                            name={name}
                                            checked={value}
                                            onCheckedChange={onChange}
                                        />
                                        <FieldLabel htmlFor="scope-posts">Posts</FieldLabel>
                                    </Field>
                                )}
                            />
                            <Controller
                                name="revalidateNotionProjects"
                                control={control}
                                render={({ field: { name, value, onChange } }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="scope-projects"
                                            name={name}
                                            checked={value}
                                            onCheckedChange={onChange}
                                        />
                                        <FieldLabel htmlFor="scope-projects">
                                            Projects (Notion)
                                        </FieldLabel>
                                    </Field>
                                )}
                            />
                            <Controller
                                name="revalidateGithubProjects"
                                control={control}
                                render={({ field: { name, value, onChange } }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="scope-projects"
                                            name={name}
                                            checked={value}
                                            onCheckedChange={onChange}
                                        />
                                        <FieldLabel htmlFor="scope-projects">
                                            Projects (GitHub)
                                        </FieldLabel>
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Field orientation="horizontal" className="my-3">
                            <Button type="submit" className="cursor-pointer">
                                Proceed
                            </Button>
                        </Field>
                    </FieldSet>
                </FieldGroup>
            </form>
        </Section>
    )
}
