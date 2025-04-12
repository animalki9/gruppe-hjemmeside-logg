export default {
    name: 'member',
    title: 'Member',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'interests',
        title: 'Interests',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'bio',
        title: 'Biography',
        type: 'text',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
          slugify: input =>
            input
              .toLowerCase()
              .replace(/\s+/g, '-')
              .slice(0, 96)
        }
      }
    ],
  };
  