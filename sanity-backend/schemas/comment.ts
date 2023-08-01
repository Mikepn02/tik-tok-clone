import { defineField, defineType } from 'sanity'


export default defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        defineField({
            name: 'postedBy',
            title: 'PostedBy',
            type: 'reference', // Change the type to 'reference'
            to: [{ type: 'user' }] // Specify the referenced type as 'author'
        }),
        defineField({
            name: 'comment',
            title: 'comment',
            type: 'string'
        })
    ]
})