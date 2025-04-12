export default {
    name: 'workLog',
    title: 'Work Log',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Task Description',
        type: 'text'
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
        initialValue: () => new Date().toISOString()
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'member' }]
      },
      {
        name: 'timer',
        title: 'Time Used (hours)',
        type: 'number'
      }
    ]
  }
  