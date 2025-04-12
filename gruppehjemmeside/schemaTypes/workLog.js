export default {
    name: 'workLog',
    title: 'Work log',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Task description',
            type: 'text',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(), //Fått hjälp av chatgpt så att datum och tid kommer upp automatiskt.
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'member' }],
        },
    ],
};