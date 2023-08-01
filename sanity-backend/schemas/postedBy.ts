import {defineField, defineType} from 'sanity'
export default defineType({
    name: 'postedBy',
    title:'Posted By',
    type: 'reference',
    to: [{type: 'user'}]
})