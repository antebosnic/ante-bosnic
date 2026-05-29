import { type SchemaTypeDefinition } from 'sanity'
import { about } from './about'
import { post } from './post'
import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, post, project, service, testimonial],
}
