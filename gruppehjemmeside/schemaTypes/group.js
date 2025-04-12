export default {
    name: 'group',
    title: 'Group',
    type: 'document',
    fields: [
      {
        name: 'groupName',
        title: 'Group Name and Number',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'members',
        title: 'Members',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'member' }] }]
      }
    ]
  }
  